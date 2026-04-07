import { useEffect, useState } from 'react';
import { createPageUrl } from '@/utils';
import TopNavLayout from '../components/TopNavLayout';
import ExportReportModal from '../components/ExportReportModal';
import { checklistService } from '../components/services/api';

const StatusChip = ({ status }) => {
  const map = {
    Met: 'bg-green-50 text-green-700 border border-green-200',
    Partial: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    Missing: 'bg-red-50 text-red-600 border border-red-200',
  };
  const dot = { Met: 'bg-green-500', Partial: 'bg-yellow-400', Missing: 'bg-red-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${map[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot[status]}`} />
      {status === 'Met' ? 'Fully Met' : status}
    </span>
  );
};

export default function Results() {
  const urlParams = new URLSearchParams(window.location.search);
  const companyName = urlParams.get('companyName') ?? 'Velvet Labs Ltd';
  const framework = urlParams.get('framework') ?? 'IFRS';

  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    checklistService.getByAnalysisId('1').then(setItems);
  }, []);

  const filtered = items.filter(item => {
    const matchFilter = filter === 'All' || item.status === filter;
    const matchSearch = !search ||
      item.requirement.toLowerCase().includes(search.toLowerCase()) ||
      `${item.standard} ${item.clause}`.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const total = items.length;
  const missing = items.filter(i => i.status === 'Missing').length;
  const partial = items.filter(i => i.status === 'Partial').length;
  const met = items.filter(i => i.status === 'Met').length;

  return (
    <TopNavLayout activePage="Results">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <button onClick={() => window.location.href = createPageUrl('History')} className="hover:text-gray-600 transition-colors">Clients</button>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="9 18 15 12 9 6" /></svg>
        <span className="text-gray-700 font-medium">{companyName}</span>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-[#1e1b4b]">{companyName}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="px-3 py-1 bg-[#1e1b4b] text-white text-xs font-bold rounded-full uppercase tracking-wider">{framework} Framework</span>
            <span className="text-sm text-gray-400">• FY 2025 Audit Checklist</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowExport(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-sm font-semibold text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Export Report
          </button>
          <button
            onClick={() => window.location.href = createPageUrl('Upload')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#e6c33a] text-[#1e1b4b] text-sm font-bold rounded-xl hover:bg-[#d4b034] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            New Analysis
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Disclosures', value: total, border: 'border-[#1e1b4b]', bar: 'bg-[#1e1b4b]', pct: 100 },
          { label: 'Missing', value: missing, border: 'border-red-400', bar: 'bg-red-400', pct: total ? Math.round((missing/total)*100) : 0 },
          { label: 'Partially Met', value: partial, border: 'border-yellow-400', bar: 'bg-yellow-400', pct: total ? Math.round((partial/total)*100) : 0 },
          { label: 'Fully Met', value: met, border: 'border-green-500', bar: 'bg-green-500', pct: total ? Math.round((met/total)*100) : 0 },
        ].map(card => (
          <div key={card.label} className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 border-l-4 ${card.border}`}>
            <p className="text-xs font-semibold text-gray-400 mb-2">{card.label}</p>
            <p className="text-3xl font-black text-[#1e1b4b]">{card.value}</p>
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full ${card.bar} rounded-full`} style={{ width: `${card.pct}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-wrap gap-3">
          <div className="flex items-center bg-[#f6f6f8] rounded-xl p-1 gap-1">
            {['All', 'Missing', 'Partial', 'Met'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${filter === f ? 'bg-[#1e1b4b] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search requirements..."
              className="pl-9 pr-4 py-2 bg-[#f8f8fb] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e1b4b]/20 w-60"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f6f6f8]">
                {['ID', 'Requirement', 'Status', 'Evidence / Snippet', ''].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t border-gray-50 hover:bg-[#f6f6f8]/40 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded block mb-0.5">{item.standard}</span>
                    <span className="text-sm font-bold text-[#1e1b4b]">{item.clause}</span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">{item.requirement}</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusChip status={item.status} />
                  </td>
                  <td className="px-6 py-4 max-w-sm">
                    {item.status === 'Missing' ? (
                      <div className="flex items-center gap-2 bg-red-50 rounded-lg px-3 py-2">
                        <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                        <span className="text-xs text-red-500 font-medium">No evidence found.</span>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 italic leading-relaxed line-clamp-3">{item.evidence}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-400">Showing {filtered.length} of {total} results</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">Previous</button>
            <button className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">Next</button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 bg-[#1e1b4b]/5 border border-[#1e1b4b]/10 rounded-2xl p-5">
        <svg className="w-5 h-5 text-[#1e1b4b] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
        <div>
          <p className="text-sm font-bold text-gray-900">Audit Progress Update</p>
          <p className="text-sm text-gray-600 mt-0.5">AI analysis completed. Please review the evidence snippets in the table above.</p>
        </div>
      </div>

      {showExport && (
        <ExportReportModal analysisId="1" companyName={companyName} onClose={() => setShowExport(false)} />
      )}
    </TopNavLayout>
  );
}