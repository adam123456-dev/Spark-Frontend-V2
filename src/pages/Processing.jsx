import { useEffect, useState } from 'react';
import { createPageUrl } from '@/utils';
import SparkzLogo from '../components/SparkzLogo';

const STEPS = [
  { label: 'Document ingestion', duration: 2000 },
  { label: 'Section extraction', duration: 2500 },
  { label: 'Disclosure detection', duration: 3000 },
  { label: 'Checklist generation', duration: 2000 },
];

export default function Processing() {
  const urlParams = new URLSearchParams(window.location.search);
  const companyName = urlParams.get('companyName') ?? 'Your Company';
  const framework = urlParams.get('framework') ?? 'IFRS';

  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let step = 0;
    const totalMs = STEPS.reduce((a, s) => a + s.duration, 0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 100;
      const pct = Math.min(Math.round((elapsed / totalMs) * 100), 99);
      setProgress(pct);

      let cumulative = 0;
      for (let i = 0; i < STEPS.length; i++) {
        cumulative += STEPS[i].duration;
        if (elapsed >= cumulative && step === i) {
          step = i + 1;
          setCurrentStep(step);
        }
      }

      if (elapsed >= totalMs) {
        clearInterval(interval);
        setProgress(100);
        const params = new URLSearchParams({ companyName, framework });
        setTimeout(() => {
          window.location.href = createPageUrl(`Results?${params.toString()}`);
        }, 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const stepStatus = (i) => {
    if (i < currentStep) return 'done';
    if (i === currentStep) return 'active';
    return 'waiting';
  };

  const statusMessage =
    progress < 30 ? 'Ingesting your document...' :
    progress < 60 ? 'Extracting sections and notes...' :
    progress < 90 ? 'Almost there... Finalizing disclosure checks.' :
    'Generating your checklist...';

  return (
    <div className="min-h-screen bg-[#f6f6f8] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <SparkzLogo size="sm" />
          <button onClick={() => window.location.href = createPageUrl('Dashboard')} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#1313ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="18" y="3" width="4" height="14" rx="1" /><rect x="10" y="8" width="4" height="9" rx="1" /><rect x="2" y="13" width="4" height="4" rx="1" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-black text-[#1e1b4b] text-center mb-2">Analyzing Your Document</h2>
          <p className="text-sm text-gray-400 text-center mb-8">
            Our AI is extracting insights and detecting disclosures from <strong>{companyName}</strong>.
          </p>

          <div className="bg-[#f6f6f8] rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Overall Progress</span>
              <span className="text-lg font-black text-[#1313ec]">{progress}%</span>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-[#1313ec] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-gray-500">{statusMessage}</p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Analysis Steps</h3>
            <div className="space-y-3">
              {STEPS.map((step, i) => {
                const s = stepStatus(i);
                return (
                  <div key={step.label} className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${s === 'done' ? 'bg-green-50' : s === 'active' ? 'bg-blue-50' : 'bg-gray-50'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${s === 'done' ? 'bg-green-500' : s === 'active' ? 'bg-[#1313ec]' : 'bg-gray-200'}`}>
                      {s === 'done' ? (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><polyline points="20 6 9 17 4 12" /></svg>
                      ) : s === 'active' ? (
                        <svg className="w-4 h-4 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 10-12h-7l1-8z" /></svg>
                      ) : (
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /></svg>
                      )}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${s === 'done' ? 'text-green-800' : s === 'active' ? 'text-[#1313ec]' : 'text-gray-400'}`}>{step.label}</p>
                      <p className={`text-xs ${s === 'done' ? 'text-green-600' : s === 'active' ? 'text-blue-500' : 'text-gray-300'}`}>
                        {s === 'done' ? 'Completed successfully' : s === 'active' ? 'In progress...' : 'Waiting'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            <p className="text-xs text-gray-400">Your document is encrypted and processed securely.</p>
          </div>
        </div>

        <div className="border-t border-gray-100 py-3 text-center">
          <p className="text-xs text-gray-300 font-medium tracking-widest uppercase">Powered by Sparkz Intelligence Engine</p>
        </div>
      </div>
    </div>
  );
}