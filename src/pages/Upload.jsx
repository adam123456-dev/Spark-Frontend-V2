import { useState, useEffect } from 'react';
import { createPageUrl } from '@/utils';
import SparkzLogo from '../components/SparkzLogo';
import ApiHealthBanner from '../components/ApiHealthBanner';
import { sparkzApi } from '../components/services/sparkzApi';

export default function Upload() {
  const [allTemplates, setAllTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  useEffect(() => {
    sparkzApi.templates()
      .then(data => { setAllTemplates(data); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  // Use a composite key so templates with the same code across different frameworks stay distinct
  const chosen = allTemplates.find(t => `${t.framework_code}:${t.code}` === selectedTemplate);

  const handleContinue = () => {
    const params = new URLSearchParams({
      templateCode: chosen.code,
      frameworkCode: chosen.framework_code,
      frameworkName: `${chosen.framework_name} (${chosen.entity_type?.replace(/_/g, ' ')})`,
    });
    window.location.href = createPageUrl(`DisclosureChecklist?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#f8f8fb]">
      <ApiHealthBanner />
      <header className="bg-[#1e1b4b] border-b border-white/10">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <SparkzLogo size="sm" />
          <nav className="flex gap-6 text-sm text-purple-200">
            <button onClick={() => window.location.href = createPageUrl('Dashboard')} className="hover:text-white">Dashboard</button>
            <button onClick={() => window.location.href = createPageUrl('Analysis')} className="hover:text-white font-semibold text-[#e6c33a]">Document analysis</button>
            <button onClick={() => window.location.href = createPageUrl('History')} className="hover:text-white">History</button>
          </nav>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 pt-16">
        <h1 className="text-3xl font-black text-[#1e1b4b] mb-2">Get started</h1>
        <p className="text-sm text-gray-400 mb-6">Choose how you want to work: AI PDF analysis (local v2 API) or a browsable manual checklist (legacy template catalogue).</p>

        <div className="mb-8 rounded-2xl border border-[#1e1b4b]/20 bg-[#1e1b4b]/5 p-6">
          <p className="text-xs font-bold text-[#1e1b4b] uppercase tracking-wider mb-1">Recommended — Sparkz v2</p>
          <h2 className="text-lg font-black text-[#1e1b4b] mb-2">Analyse a PDF</h2>
          <p className="text-sm text-gray-600 mb-4">
            Upload financial statements and run the checklist against the document using your local backend (<code className="text-xs bg-white px-1 rounded">VITE_SPARKZ_API_URL</code>, default <code className="text-xs bg-white px-1 rounded">localhost:8002</code>).
          </p>
          <button
            type="button"
            onClick={() => { window.location.href = createPageUrl('Analysis'); }}
            className="w-full sm:w-auto px-6 py-3 bg-[#1e1b4b] text-white text-sm font-bold rounded-xl hover:bg-[#2d2a6e] transition-colors"
          >
            Open document analysis →
          </button>
        </div>

        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Or — manual checklist (legacy API)</p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              Failed to load templates: {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center gap-2 text-sm text-gray-400 py-4">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Loading templates...
            </div>
          ) : (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Disclosure Checklist Template</label>
              <select
                value={selectedTemplate}
                onChange={e => setSelectedTemplate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e1b4b]/20 focus:border-[#1e1b4b] bg-white"
              >
                <option value="">Select a template...</option>
                {allTemplates.map(t => (
                  <option key={`${t.framework_code}:${t.code}`} value={`${t.framework_code}:${t.code}`}>
                    {t.framework_name} — {t.name} ({t.entity_type?.replace(/_/g, ' ')})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={() => window.location.href = createPageUrl('Dashboard')}
              className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={!chosen}
              onClick={handleContinue}
              className="px-6 py-2.5 bg-[#e6c33a] text-[#1e1b4b] text-sm font-bold rounded-xl hover:bg-[#d4b034] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Open Checklist →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
