import { useEffect, useState } from 'react';
import { createPageUrl } from '@/utils';
import TopNavLayout from '../components/TopNavLayout';
import { analysisService } from '../components/services/api';

const StatusBadge = ({ status }) => {
  const map = {
    Completed: 'bg-green-50 text-green-700 border border-green-200',
    Processing: 'bg-blue-50 text-blue-700 border border-blue-200',
    Failed: 'bg-red-50 text-red-600 border border-red-200',
  };
  const dot = { Completed: 'bg-green-500', Processing: 'bg-blue-500', Failed: 'bg-red-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${map[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot[status]}`} />
      {status}
    </span>
  );
};

export default function History() {
  const [analyses, setAnalyses] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [frameworkFilter, setFrameworkFilter] = useState('All Frameworks');

  useEffect(() => { analysisService.getAll().then(setAnalyses); }, []);

  const filtered = analyses.filter(a => {
    const matchSearch = !search || a.companyName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All Statuses' || a.status === statusFilter;
    const matchFramework = frameworkFilter === 'All Frameworks' || a.framework === frameworkFilter;
    return matchSearch && matchStatus && matchFramework;
  });

  const viewResults = (a) => {
    const params = new URLSearchParams({ companyName: a.companyName, framework: a.framework });
    window.location.href = createPageUrl(`Results?${params.toString()}`);
  };

  return (
    <TopNavLayout activePage="History">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-[#1e1b4b]">Analysis History</h1>
          <p className="text-gray-400 mt-1">Track and manage your automated financial statement extractions.</p>
        </div>
        <button
          onClick={() => window.location.href = createPageUrl('Upload')}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#e6c33a] text-[#1e1b4b] font-bold text-sm rounded-xl hover:bg-[#d4b034] transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          New Analysis
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100 flex-wrap">
          <div className="relative">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by company name..."
              className="pl-9 pr-4 py-2 bg-[#f8f8fb] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e1b4b]/20 w-56"
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <select
              value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1313ec]/20 bg-white"
            >
              {['All Statuses', 'Completed', 'Processing', 'Failed'].map(s => <option key={s}>{s}</option>)}
            </select>
            <select
              value={frameworkFilter} onChange={e => setFrameworkFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1313ec]/20 bg-white"
            >
              {['All Frameworks', 'IFRS', 'IFRS for SMEs', 'FRS 102', 'FRS 105'].map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f6f6f8]">
                {['Company Name', 'Framework', 'Date Uploaded', 'Status', 'Missing', 'Actions'].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-t border-gray-50 hover:bg-[#f6f6f8]/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-600">
                        {a.companyName[0]}
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{a.companyName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{a.framework}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{a.dateUploaded}</td>
                  <td className="px-6 py-4"><StatusBadge status={a.status} /></td>
                  <td className="px-6 py-4 text-sm">
                    {a.missingDisclosures === null ? (
                      <span className="text-gray-400 italic">Pending</span>
                    ) : (
                      <span className={`font-bold ${a.missingDisclosures > 0 ? 'text-red-500' : 'text-green-600'}`}>{a.missingDisclosures}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {a.status === 'Completed' && (
                        <>
                          <button onClick={() => viewResults(a)} className="p-1.5 text-[#1e1b4b] hover:bg-[#1e1b4b]/10 rounded-lg transition-colors" title="View">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                          </button>
                          <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" title="Download">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                          </button>
                        </>
                      )}
                      {a.status === 'Failed' && (
                        <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Retry">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.75" /></svg>
                        </button>
                      )}
                      <button className="p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors" title="Delete">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-400">Showing {filtered.length} of {analyses.length} results</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg transition-colors text-sm">←</button>
            <button className="w-8 h-8 flex items-center justify-center bg-[#1e1b4b] text-white rounded-lg text-sm font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-lg transition-colors text-sm">2</button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg transition-colors text-sm">→</button>
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-6">
        <p>⚡ © 2026 Sparkz Technologies Inc.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Help Center</a>
        </div>
      </footer>
    </TopNavLayout>
  );
}