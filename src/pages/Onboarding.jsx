import { useState } from 'react';
import { createPageUrl } from '@/utils';
import SparkzLogo from '../components/SparkzLogo';

const STEPS = [
  { id: 1, label: 'About you' },
  { id: 2, label: 'Choose plan' },
  { id: 3, label: 'Your workspace' },
];

const PLANS = [
  { name: 'Free',    price: '£0',   analyses: '3 analyses / month',   highlight: false },
  { name: 'Starter', price: '£50',  analyses: '10 analyses / month',  highlight: false },
  { name: 'Builder', price: '£100', analyses: '25 analyses / month',  highlight: true  },
  { name: 'Pro',     price: '£200', analyses: '50 analyses / month',  highlight: false },
  { name: 'Elite',   price: '£300', analyses: '100 analyses / month', highlight: false },
];

const ACCOUNT_TYPES = [
  { val: 'individual', label: 'Individual accountant', icon: '👤' },
  { val: 'firm',       label: 'Accounting firm',       icon: '🏢' },
];

const COUNTRIES = [
  'United Kingdom', 'United States', 'Canada', 'Australia', 'Ireland',
  'South Africa', 'Singapore', 'New Zealand', 'India', 'Other',
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    accountType: '',
    practiceName: '',
    country: '',
  });

  const [selectedPlan, setSelectedPlan] = useState('Free');

  const [workspace, setWorkspace] = useState({
    name: '',
  });

  const setInfo = (key, val) => setUserInfo(prev => ({ ...prev, [key]: val }));

  const canProceedStep1 = userInfo.accountType && userInfo.country;
  const canProceedStep3 = workspace.name.trim();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleFinish = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    window.location.href = createPageUrl('Dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f8f8fb] flex flex-col">
      {/* Top bar */}
      <header className="bg-[#1e1b4b] border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <SparkzLogo size="sm" variant="light" />
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 ${step === s.id ? 'text-[#e6c33a]' : step > s.id ? 'text-green-400' : 'text-purple-400'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${step === s.id ? 'border-[#e6c33a] bg-[#e6c33a] text-[#1e1b4b]' : step > s.id ? 'border-green-400 bg-green-400 text-white' : 'border-purple-400 text-purple-400'}`}>
                    {step > s.id ? (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><polyline points="20 6 9 17 4 12" /></svg>
                    ) : s.id}
                  </div>
                  <span className="text-xs font-medium hidden md:block">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`w-8 h-px ${step > s.id ? 'bg-green-400' : 'bg-purple-500'}`} />}
              </div>
            ))}
          </div>
          <div className="sm:hidden text-sm font-medium text-purple-200">Step {step} of {STEPS.length}</div>
        </div>
        <a href="#" onClick={() => { window.location.href = createPageUrl('Dashboard'); }} className="text-xs text-purple-300 hover:text-white transition-colors">Skip for now</a>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-[#1e1b4b]/10">
        <div className="h-full bg-[#e6c33a] transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center p-6 pt-12">
        <div className="w-full max-w-2xl">

          {/* Step 1: About you */}
          {step === 1 && (
            <div>
              <div className="mb-8">
                <p className="text-xs font-semibold text-[#e6c33a] uppercase tracking-widest mb-2">Step 1 of 3</p>
                <h1 className="text-3xl font-black text-[#1e1b4b] mb-2">Tell us about yourself</h1>
                <p className="text-gray-500">Help us personalise Sparkz for your workflow.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">I am a...</label>
                  <div className="grid grid-cols-2 gap-3">
                    {ACCOUNT_TYPES.map(type => (
                      <button
                        key={type.val}
                        onClick={() => setInfo('accountType', type.val)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${userInfo.accountType === type.val ? 'border-[#1e1b4b] bg-[#1e1b4b]/5' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                      >
                        <span className="text-2xl">{type.icon}</span>
                        <span className={`text-sm font-semibold ${userInfo.accountType === type.val ? 'text-[#1e1b4b]' : 'text-gray-700'}`}>{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Practice or company name <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    value={userInfo.practiceName}
                    onChange={e => setInfo('practiceName', e.target.value)}
                    placeholder="e.g. Rivera & Associates LLP"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e1b4b]/20 focus:border-[#1e1b4b] bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Country</label>
                  <select
                    value={userInfo.country}
                    onChange={e => setInfo('country', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e1b4b]/20 focus:border-[#1e1b4b] bg-white transition-all"
                  >
                    <option value="">Select country</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={handleNext}
                  disabled={!canProceedStep1}
                  className="flex items-center gap-2 px-6 py-3 bg-[#e6c33a] text-[#1e1b4b] font-bold text-sm rounded-xl hover:bg-[#d4b034] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Continue
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Plan selection */}
          {step === 2 && (
            <div>
              <div className="mb-8">
                <p className="text-xs font-semibold text-[#e6c33a] uppercase tracking-widest mb-2">Step 2 of 3</p>
                <h1 className="text-3xl font-black text-[#1e1b4b] mb-2">Choose your plan</h1>
                <p className="text-gray-500">Start free, upgrade anytime. No credit card required for the Free plan.</p>
              </div>

              <div className="space-y-3">
                {PLANS.map(plan => (
                  <button
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan.name)}
                    className={`w-full flex items-center gap-5 p-5 rounded-2xl border-2 text-left transition-all ${selectedPlan === plan.name ? 'border-[#1e1b4b] bg-[#1e1b4b]/5' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${selectedPlan === plan.name ? 'border-[#1e1b4b]' : 'border-gray-300'}`}>
                      {selectedPlan === plan.name && <div className="w-2.5 h-2.5 rounded-full bg-[#1e1b4b]" />}
                    </div>

                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-base font-bold ${selectedPlan === plan.name ? 'text-[#1e1b4b]' : 'text-gray-900'}`}>{plan.name}</span>
                          {plan.highlight && (
                            <span className="px-2 py-0.5 bg-[#e6c33a] text-[#1e1b4b] text-xs font-bold rounded-full">Popular</span>
                          )}
                          {plan.name === 'Free' && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">No card needed</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{plan.analyses}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xl font-black ${selectedPlan === plan.name ? 'text-[#1e1b4b]' : 'text-[#1e1b4b]'}`}>{plan.price}</span>
                        <span className="text-xs text-gray-400 ml-1">/mo</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-400 text-center mt-4">You can change your plan at any time from your account settings.</p>

              <div className="flex items-center justify-between mt-8">
                <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="15 18 9 12 15 6" /></svg>
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-[#e6c33a] text-[#1e1b4b] font-bold text-sm rounded-xl hover:bg-[#d4b034] transition-all"
                >
                  Continue with {selectedPlan}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Workspace */}
          {step === 3 && (
            <div>
              <div className="mb-8">
                <p className="text-xs font-semibold text-[#e6c33a] uppercase tracking-widest mb-2">Step 3 of 3</p>
                <h1 className="text-3xl font-black text-[#1e1b4b] mb-2">Create your workspace</h1>
                <p className="text-gray-500">Your workspace is where all your analyses and reports will live.</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Workspace name</label>
                  <input
                    value={workspace.name}
                    onChange={e => setWorkspace({ name: e.target.value })}
                    placeholder={userInfo.practiceName || 'My Sparkz Workspace'}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e1b4b]/20 focus:border-[#1e1b4b] transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">This is typically your firm or company name.</p>
                </div>

                <div className="bg-[#f8f8fb] rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Workspace preview</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#e6c33a] flex items-center justify-center text-[#1e1b4b] font-bold text-sm flex-shrink-0">
                      {(workspace.name || userInfo.practiceName || 'W')[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{workspace.name || userInfo.practiceName || 'Your Workspace'}</p>
                      <p className="text-xs text-gray-400">{selectedPlan} Plan</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1e1b4b]/5 border border-[#1e1b4b]/10 rounded-2xl p-5 mb-6">
                <p className="text-sm font-semibold text-[#1e1b4b] mb-3">Your workspace includes:</p>
                <div className="space-y-2">
                  {[
                    'All your analyses and disclosure checklists',
                    'Exportable PDF and Excel compliance reports',
                    'Team collaboration (on Starter and above)',
                    'Framework-specific AI trained on your settings',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#e6c33a] flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-[#1e1b4b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button onClick={() => setStep(2)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="15 18 9 12 15 6" /></svg>
                  Back
                </button>
                <button
                  onClick={handleFinish}
                  disabled={!canProceedStep3 || loading}
                  className="flex items-center gap-2 px-6 py-3 bg-[#e6c33a] text-[#1e1b4b] font-bold text-sm rounded-xl hover:bg-[#d4b034] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Setting up...
                    </>
                  ) : (
                    <>
                      Launch my workspace
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="9 18 15 12 9 6" /></svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}