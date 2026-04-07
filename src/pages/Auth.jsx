import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import SparkzLogo from '../components/SparkzLogo';

const passwordRules = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p) => /\d/.test(p) },
];

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState('signup');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const t = searchParams.get('tab');
    if (t === 'signin' || t === 'signup') setTab(t);
  }, [searchParams]);

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSocialAuth = (provider) => {
    window.location.href = createPageUrl('Onboarding');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allRulesPassed = passwordRules.every(r => r.test(form.password));
    if (tab === 'signup' && !allRulesPassed) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    if (tab === 'signup') {
      window.location.href = createPageUrl('Onboarding');
    } else {
      window.location.href = createPageUrl('Dashboard');
    }
  };

  const pwStrength = passwordRules.filter(r => r.test(form.password)).length;

  return (
    <div className="min-h-screen bg-[#f8f8fb] flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex w-[420px] flex-shrink-0 bg-[#1e1b4b] flex-col justify-between p-12">
        <SparkzLogo variant="light" />
        <div>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 text-purple-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-[#e6c33a] rounded-full animate-pulse" />
              Trusted by 500+ accounting firms
            </div>
            <h2 className="text-3xl font-black text-white leading-tight mb-4">
              The smarter way to manage disclosure checklists.
            </h2>
            <p className="text-purple-200 text-sm leading-relaxed">
              AI-powered compliance for IFRS, FRS 102, and more. Save hours of manual review every month.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { icon: '🛡️', title: 'Enterprise-grade security', desc: 'SOC2 & GDPR compliant' },
              { icon: '⚡', title: 'Instant analysis', desc: 'Results in under 60 seconds' },
              { icon: '📄', title: 'Audit-ready exports', desc: 'PDF and Excel reports' },
            ].map(item => (
              <div key={item.title} className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                <div className="text-2xl flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="text-white text-sm font-semibold">{item.title}</p>
                  <p className="text-purple-200 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-purple-300 text-xs">© 2026 Sparkz AI Technologies Inc.</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <SparkzLogo />
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            {[{ val: 'signup', label: 'Create account' }, { val: 'signin', label: 'Sign in' }].map(t => (
              <button
                key={t.val}
                onClick={() => setTab(t.val)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${tab === t.val ? 'bg-white text-[#1e1b4b] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'signup' ? (
            <>
              <h1 className="text-2xl font-black text-[#1e1b4b] mb-1">Create your account</h1>
              <p className="text-sm text-gray-500 mb-6">Start automating your disclosure checklists today.</p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-black text-[#1e1b4b] mb-1">Welcome back</h1>
              <p className="text-sm text-gray-500 mb-6">Sign in to your Sparkz workspace.</p>
            </>
          )}

          {/* Social auth */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialAuth('google')}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialAuth('microsoft')}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#f25022" d="M1 1h10v10H1z"/>
                <path fill="#00a4ef" d="M13 1h10v10H13z"/>
                <path fill="#7fba00" d="M1 13h10v10H1z"/>
                <path fill="#ffb900" d="M13 13h10v10H13z"/>
              </svg>
              Continue with Microsoft
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'signup' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First name</label>
                  <input
                    value={form.firstName}
                    onChange={e => set('firstName', e.target.value)}
                    placeholder="Alex"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e1b4b]/20 focus:border-[#1e1b4b] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
                  <input
                    value={form.lastName}
                    onChange={e => set('lastName', e.target.value)}
                    placeholder="Rivera"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e1b4b]/20 focus:border-[#1e1b4b] transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Work email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="alex@yourfirm.com"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e1b4b]/20 focus:border-[#1e1b4b] transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">Password</label>
                {tab === 'signin' && <a href="#" className="text-xs text-[#1e1b4b] hover:underline">Forgot password?</a>}
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  onFocus={() => setFocused(true)}
                  placeholder={tab === 'signup' ? 'Create a strong password' : 'Enter your password'}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e1b4b]/20 focus:border-[#1e1b4b] pr-11 transition-all"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {showPw ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></>
                    : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}
                  </svg>
                </button>
              </div>

              {tab === 'signup' && focused && form.password && (
                <div className="mt-3 space-y-2">
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= pwStrength ? pwStrength === 1 ? 'bg-red-400' : pwStrength === 2 ? 'bg-[#e6c33a]' : 'bg-green-500' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <div className="space-y-1">
                    {passwordRules.map(rule => (
                      <div key={rule.label} className="flex items-center gap-2">
                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${rule.test(form.password) ? 'bg-green-500' : 'bg-gray-200'}`}>
                          {rule.test(form.password) && <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><polyline points="20 6 9 17 4 12" /></svg>}
                        </div>
                        <span className={`text-xs transition-colors ${rule.test(form.password) ? 'text-green-700' : 'text-gray-400'}`}>{rule.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#e6c33a] text-[#1e1b4b] font-bold rounded-xl hover:bg-[#d4b034] transition-colors disabled:opacity-70 text-sm mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Please wait...
                </span>
              ) : tab === 'signup' ? 'Create account →' : 'Sign in to Sparkz →'}
            </button>
          </form>

          {tab === 'signup' && (
            <p className="mt-5 text-center text-xs text-gray-400 leading-relaxed">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-[#1e1b4b] hover:underline">Terms of Service</a> and{' '}
              <a href="#" className="text-[#1e1b4b] hover:underline">Privacy Policy</a>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}