import { useState } from 'react';
import { checklistService } from './services/api';

export default function ExportReportModal({ analysisId, companyName, onClose }) {
  const [format, setFormat] = useState('pdf');
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    await checklistService.exportReport(analysisId, format);
    setTimeout(() => { setLoading(false); onClose(); }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f6f6f8] rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-[#1313ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Export Report</h2>
              <p className="text-xs text-gray-400">Sparkz Compliance Engine</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Prepare your export</h3>
            <p className="text-sm text-gray-500 mt-1">Select your preferred format and review the modules included.</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-3">Report Format</p>
            <div className="space-y-3">
              {[
                { val: 'pdf', label: 'PDF Report', desc: 'Best for presentations and sharing', icon: '📄', bg: 'bg-red-50' },
                { val: 'excel', label: 'Excel Spreadsheet', desc: 'Best for data analysis and raw logs', icon: '📊', bg: 'bg-green-50' },
              ].map(opt => (
                <label key={opt.val} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${format === opt.val ? 'border-[#1313ec] bg-blue-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className={`w-9 h-9 ${opt.bg} rounded-lg flex items-center justify-center text-lg flex-shrink-0`}>{opt.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{opt.label}</p>
                    <p className="text-xs text-gray-400">{opt.desc}</p>
                  </div>
                  <input type="radio" checked={format === opt.val} onChange={() => setFormat(opt.val)} className="w-4 h-4 accent-[#1313ec]" />
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-3">Included in Report</p>
            {['Executive Summary', 'Full Compliance Table', 'AI Evidence Notes'].map(item => (
              <div key={item} className="flex items-center gap-2.5 mb-2.5">
                <div className="w-5 h-5 rounded-full bg-[#1313ec] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 pb-6">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900">Cancel</button>
          <button
            onClick={handleDownload}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1313ec] text-white text-sm font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-70 transition-colors"
          >
            {loading ? 'Generating...' : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                Download Report
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}