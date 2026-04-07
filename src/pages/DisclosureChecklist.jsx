import { useState, useEffect, useMemo } from 'react';
import { createPageUrl } from '@/utils';
import SparkzLogo from '../components/SparkzLogo';
import ApiHealthBanner from '../components/ApiHealthBanner';
import ChecklistNode from '../components/checklist/ChecklistNode';
import { sparkzApi, SPARKZ_LEGACY_API_BASE, SPARKZ_V2_API_BASE } from '../components/services/sparkzApi';

function countAnswerable(nodes) {
  let total = 0;
  const walk = (arr) => {
    for (const n of arr) {
      if (n.is_answerable) total++;
      if (n.children?.length) walk(n.children);
    }
  };
  walk(nodes);
  return total;
}

function countAnswered(nodes, answers) {
  let answered = 0;
  const walk = (arr) => {
    for (const n of arr) {
      if (n.is_answerable && answers[n.id]) answered++;
      if (n.children?.length) walk(n.children);
    }
  };
  walk(nodes);
  return answered;
}

const filterNode = (node, q) => {
  const match = node.title?.toLowerCase().includes(q) || node.display_number?.toLowerCase().includes(q);
  const filteredChildren = (node.children || []).map(c => filterNode(c, q)).filter(Boolean);
  if (match || filteredChildren.length > 0) return { ...node, children: filteredChildren };
  return null;
};

export default function DisclosureChecklist() {
  const urlParams = new URLSearchParams(window.location.search);
  const templateCode = urlParams.get('templateCode') || '';
  const templateId = urlParams.get('templateId') || '';
  const companyName = urlParams.get('companyName') || '';
  const frameworkCode = urlParams.get('frameworkCode') || '';
  const frameworkName = urlParams.get('frameworkName') || '';
  const isStepFlow = !!urlParams.get('companyName');

  // Derive entity_type from the template: passed via URL or fallback
  const entityType = urlParams.get('entityType') || '';

  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    const code = templateCode || templateId;
    if (!code) { setLoading(false); return; }
    setLoading(true);
    sparkzApi.checklistTree(code, frameworkCode)
      .then(data => { setTree(data); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [templateCode, templateId, frameworkCode]);

  const handleAnswer = (nodeId, val) => {
    setAnswers(prev => ({ ...prev, [nodeId]: val }));
  };

  const sections = tree?.sections || [];
  const resolvedEntityType = entityType || tree?.entity_type || '';
  const total = useMemo(() => countAnswerable(sections), [sections]);
  const answered = useMemo(() => countAnswered(sections, answers), [sections, answers]);
  const pct = total > 0 ? Math.round((answered / total) * 100) : 0;
  const yCount = Object.values(answers).filter(v => v === 'Y').length;
  const nCount = Object.values(answers).filter(v => v === 'N').length;
  const naCount = Object.values(answers).filter(v => v === 'NA').length;

  const displayedSections = search.trim()
    ? sections.map(s => filterNode(s, search.toLowerCase())).filter(Boolean)
    : sections;

  const handleContinue = () => {
    window.location.href = createPageUrl('Analysis');
  };

  return (
    <div className="min-h-screen bg-[#f8f8fb]">
      <ApiHealthBanner />
      <header className="bg-[#1e1b4b] border-b border-white/10 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <SparkzLogo size="sm" />
          <nav className="flex gap-6 text-sm text-purple-200">
            <button onClick={() => window.location.href = createPageUrl('Dashboard')} className="hover:text-white">Dashboard</button>
            <button onClick={() => window.location.href = createPageUrl('Analysis')} className="hover:text-white font-semibold text-[#e6c33a]">Document analysis</button>
            <button onClick={() => window.location.href = createPageUrl('History')} className="hover:text-white">History</button>
          </nav>
          <div className="w-8 h-8 rounded-full bg-[#e6c33a] flex items-center justify-center text-[#1e1b4b] text-xs font-bold">AR</div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-8 pb-16">

        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-950">
          <p className="font-bold text-amber-900 mb-1">You are on the manual disclosure checklist</p>
          <p className="text-amber-800/90 mb-3">
            This screen loads checklist structure from the <strong>legacy catalogue API</strong> ({SPARKZ_LEGACY_API_BASE.replace(/^https?:\/\//, '')}).
            It does <strong>not</strong> call your local Sparkz v2 server and has <strong>no PDF upload</strong>.
          </p>
          <p className="text-amber-800/90 mb-3">
            To analyse a PDF with the LLM pipeline (FRS 105 / FRS 102), use <strong>Document analysis</strong> — that talks to{' '}
            <code className="text-xs bg-amber-100/80 px-1.5 py-0.5 rounded">{SPARKZ_V2_API_BASE}</code>.
          </p>
          <button
            type="button"
            onClick={() => { window.location.href = createPageUrl('Analysis'); }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1e1b4b] text-white text-xs font-bold hover:bg-[#2d2a6e] transition-colors"
          >
            Go to PDF document analysis →
          </button>
        </div>

        {isStepFlow && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[#1e1b4b] uppercase tracking-wider">Step 2 of 3: Disclosure Checklist</span>
              <span className="text-xs text-gray-400 font-medium">66% Complete</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[#e6c33a] rounded-full w-2/3" />
            </div>
            <p className="text-xs text-gray-400">→ Next: AI Analysis & Processing</p>
          </div>
        )}

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black text-[#1e1b4b]">Disclosure Checklist</h1>
            <p className="text-gray-400 mt-1">
              {companyName && <span className="font-semibold text-gray-600">{companyName} · </span>}
              {tree ? `${tree.framework_name} · ${tree.framework_version}` : frameworkName || 'Loading...'}
              {resolvedEntityType && <span className="ml-2 text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5 font-medium">{resolvedEntityType.replace(/_/g, ' ')}</span>}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isStepFlow && (
              <button
                onClick={handleContinue}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#e6c33a] text-[#1e1b4b] font-bold text-sm rounded-xl hover:bg-[#d4b034] transition-colors shadow-sm"
              >
                Continue to Analysis →
              </button>
            )}
            {!isStepFlow && (
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#e6c33a] text-[#1e1b4b] font-bold text-sm rounded-xl hover:bg-[#d4b034] transition-colors shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Export Report
              </button>
            )}
          </div>
        </div>

        {!loading && !error && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Progress</p>
                  <p className="text-2xl font-black text-[#1e1b4b]">{pct}%</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /><span className="font-semibold text-green-700">{yCount}</span> <span className="text-gray-400">Yes</span></span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" /><span className="font-semibold text-red-500">{nCount}</span> <span className="text-gray-400">No</span></span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-300 inline-block" /><span className="font-semibold text-gray-500">{naCount}</span> <span className="text-gray-400">N/A</span></span>
                </div>
              </div>
              <p className="text-sm text-gray-400 font-medium">{answered} / {total} answered</p>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#e6c33a] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="relative mb-4">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search checklist items..."
              className="pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm w-full max-w-md focus:outline-none focus:ring-2 focus:ring-[#1e1b4b]/20"
            />
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <svg className="w-8 h-8 animate-spin text-[#1e1b4b] mb-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            <p className="text-sm text-gray-400 font-medium">Loading checklist...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-600 font-semibold mb-1">Failed to load checklist</p>
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && !templateCode && !templateId && (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
            <p className="text-gray-400 text-sm">No checklist template selected. Please start from the <button onClick={() => window.location.href = createPageUrl('Upload')} className="text-[#1e1b4b] font-semibold underline">Upload</button> page.</p>
          </div>
        )}

        {!loading && !error && (templateCode || templateId) && (
          <div className="space-y-2">
            {displayedSections.map(section => (
              <ChecklistNode key={section.id} node={section} answers={answers} onChange={handleAnswer} entityType={resolvedEntityType} />
            ))}
            {displayedSections.length === 0 && (
              <p className="text-center text-gray-400 py-12 text-sm">No checklist items match your search.</p>
            )}
          </div>
        )}

        {isStepFlow && !loading && !error && (
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              onClick={() => window.location.href = createPageUrl('Upload')}
              className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← Back to Upload
            </button>
            <button
              onClick={handleContinue}
              className="px-6 py-2.5 bg-[#e6c33a] text-[#1e1b4b] text-sm font-bold rounded-xl hover:bg-[#d4b034] transition-colors"
            >
              Continue to AI Analysis →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}