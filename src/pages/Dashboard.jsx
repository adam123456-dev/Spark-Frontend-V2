import { useEffect, useState } from 'react';
import { createPageUrl } from '@/utils';
import SidebarLayout from '../components/SidebarLayout';
import { analysisService, mockUser } from '../components/services/api';

const StatusDot = ({ status }) => {
  const color = status === 'Completed' ? 'bg-green-500' : status === 'Processing' ? 'bg-blue-500' : 'bg-red-400';
  return <span className={`inline-block w-2 h-2 rounded-full ${color} mr-2`} />;
};

export default function Dashboard() {
  const [analyses, setAnalyses] = useState([]);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const pct = Math.round((mockUser.creditsUsed / mockUser.creditsTotal) * 100);

  useEffect(() => {
    analysisService.getAll().then(data => setAnalyses(data.slice(0, 4)));
  }, []);

  return (
    <SidebarLayout activePage="Dashboard">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#1e1b4b]">{greeting}, {mockUser.name.split(' ')[0]}</h1>
          <p className="text-gray-400 mt-1">Here's an overview of your accounting disclosures and compliance status.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => window.location.href = createPageUrl('Analysis')}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1e1b4b] text-white font-bold text-sm rounded-xl hover:bg-[#2d2a6e] transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
            Analyse PDF (v2 API)
          </button>
          <button
            onClick={() => window.location.href = createPageUrl('Upload')}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#e6c33a] text-[#1e1b4b] font-bold text-sm rounded-xl hover:bg-[#d4b034] transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Manual checklist
          </button>
        </div>
      </div>

      {/* Welcome banner for new users */}
      {analyses.length === 0 && (
        <div className="bg-[#1e1b4b] rounded-2xl p-6 mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-white font-bold text-lg mb-1">Welcome to Sparkz! 🎉</p>
            <p className="text-purple-200 text-sm">You're all set. Upload your first financial statement to generate a disclosure checklist.</p>
          </div>
          <button
            onClick={() => window.location.href = createPageUrl('Analysis')}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#e6c33a] text-[#1e1b4b] font-bold text-sm rounded-xl hover:bg-[#d4b034] transition-colors flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
            Analyse a PDF
          </button>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-5 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Analyses</p>
            <div className="w-9 h-9 bg-[#1e1b4b]/10 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-[#1e1b4b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>
            </div>
          </div>
          <p className="text-4xl font-black text-[#1e1b4b]">1,284</p>
          <p className="text-sm text-green-600 font-semibold mt-1">↑12% <span className="text-gray-400 font-normal">vs last month</span></p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Credits Remaining</p>
            <div className="w-9 h-9 bg-yellow-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-[#e6c33a]" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
            </div>
          </div>
          <p className="text-4xl font-black text-[#1e1b4b]">
            {mockUser.creditsTotal - mockUser.creditsUsed}
            <span className="text-xl text-gray-400 font-medium"> / {mockUser.creditsTotal}</span>
          </p>
          <div className="mt-3">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#e6c33a] rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Analyses Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-900">Recent Analyses</h2>
          <button onClick={() => window.location.href = createPageUrl('History')} className="text-sm text-[#1e1b4b] font-semibold hover:underline">View all</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-[#f6f6f8]">
              {['Company Name', 'Framework', 'Date', 'Status', 'Action'].map(h => (
                <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {analyses.map((a) => (
              <tr key={a.id} className="border-t border-gray-50 hover:bg-[#f6f6f8]/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#1e1b4b] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {a.companyName[0]}
                    </div>
                    <span className="font-medium text-gray-900 text-sm">{a.companyName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md">{a.framework}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{a.dateUploaded}</td>
                <td className="px-6 py-4 text-sm">
                  <StatusDot status={a.status} />
                  <span className={a.status === 'Completed' ? 'text-green-700' : a.status === 'Processing' ? 'text-[#1e1b4b]' : 'text-red-500'}>{a.status}</span>
                </td>
                <td className="px-6 py-4">
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => window.location.href = createPageUrl('History')}
          className="w-full py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:bg-[#f6f6f8] transition-colors border-t border-gray-50"
        >
          Load More Analyses ↓
        </button>
      </div>
    </SidebarLayout>
  );
}