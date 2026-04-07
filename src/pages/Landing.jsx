import { createPageUrl } from '@/utils';
import SparkzLogo from '../components/SparkzLogo';

const plans = [
  { name: 'Free',    price: '£0',   analyses: '3 analyses/mo',   cta: 'Get Started',      highlight: false },
  { name: 'Starter', price: '£50',  analyses: '10 analyses/mo',  cta: 'Start Free Trial',  highlight: false },
  { name: 'Builder', price: '£100', analyses: '25 analyses/mo',  cta: 'Start Free Trial',  highlight: true  },
  { name: 'Pro',     price: '£200', analyses: '50 analyses/mo',  cta: 'Contact Sales',     highlight: false },
  { name: 'Elite',   price: '£300', analyses: '100 analyses/mo', cta: 'Contact Sales',     highlight: false },
];

const features = [
  { icon: '🔍', title: 'Automated Extraction', desc: 'Our AI parses your PDFs and spreadsheets, instantly mapping data to disclosure requirements without manual work.' },
  { icon: '✅', title: 'Framework Checks', desc: 'Built-in intelligence for IFRS, FRS, and UK GAAP. Stay compliant with the latest regulatory updates automatically applied.' },
  { icon: '📄', title: 'Export-Ready Reports', desc: 'Generate audit-ready Excel or PDF reports in seconds. Ready to be included in your financial statements or workpapers.' },
];

export default function Landing() {
  const goToAuth = (mode = 'signup') => {
    const tab = typeof mode === 'string' && (mode === 'signup' || mode === 'signin') ? mode : 'signup';
    window.location.href = createPageUrl(`Auth?tab=${encodeURIComponent(tab)}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-white/10 sticky top-0 bg-[#1e1b4b]/95 backdrop-blur z-30">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <SparkzLogo variant="light" />
          <div className="hidden md:flex items-center gap-6 text-sm text-purple-200">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => goToAuth('signin')} className="text-sm font-medium text-purple-200 hover:text-white transition-colors">Login</button>
            <button type="button" onClick={() => goToAuth('signup')} className="px-4 py-2 bg-[#e6c33a] text-[#1e1b4b] text-sm font-bold rounded-lg hover:bg-[#d4b034] transition-colors">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero - dark purple like reference site */}
      <section className="bg-[#1e1b4b] py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 text-purple-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-[#e6c33a] rounded-full animate-pulse" />
              AI-Powered Compliance
            </div>
            <h1 className="text-5xl font-black text-white leading-tight mb-6">
              Automate your<br />
              <span className="text-[#e6c33a]">disclosure</span><br />
              checklists with AI.
            </h1>
            <p className="text-purple-200 text-lg mb-8 leading-relaxed">
              Upload financial statements, select your framework, and get instant compliance insights. Save hours of manual review.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <button type="button" onClick={() => goToAuth('signup')} className="flex items-center gap-2 px-6 py-3 bg-[#e6c33a] text-[#1e1b4b] font-bold rounded-xl hover:bg-[#d4b034] transition-colors">
                Start your free analysis →
              </button>
              <button className="px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                Book a demo
              </button>
            </div>
            <p className="mt-6 text-xs text-purple-300">Trusted by 500+ accounting firms</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="space-y-3">
                {[
                  { label: 'IAS 1.10 — Complete Statements', status: 'Met', color: 'bg-green-500', chip: 'bg-green-900/50 text-green-300' },
                  { label: 'IFRS 16.53 — Lease Disclosures', status: 'Partial', color: 'bg-[#e6c33a]', chip: 'bg-yellow-900/50 text-yellow-300' },
                  { label: 'IAS 24.18 — Related Parties', status: 'Missing', color: 'bg-red-400', chip: 'bg-red-900/50 text-red-300' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.color}`} />
                    <span className="text-sm text-white font-medium">{item.label}</span>
                    <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${item.chip}`}>{item.status}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 bg-green-900/30 rounded-lg p-3">
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12" /></svg>
                <span className="text-sm text-green-300 font-semibold">98.4% Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-[#f8f8fb] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-[#1e1b4b] mb-3">Streamline Your Compliance Workflow</h2>
            <p className="text-gray-500">Everything you need to manage financial reporting disclosures in one secure, AI-powered platform.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover:border-[#e6c33a]/40">
                <div className="w-12 h-12 bg-[#1e1b4b] rounded-xl flex items-center justify-center mb-4 text-2xl">
                  {f.icon}
                </div>
                <h3 className="font-bold text-[#1e1b4b] mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-[#1e1b4b] mb-3">Simple, scalable pricing</h2>
            <p className="text-gray-500">Choose the plan that fits your firm's volume. No hidden setup fees.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {plans.map(plan => (
              <div key={plan.name} className={`rounded-2xl p-6 border-2 flex flex-col transition-all ${plan.highlight ? 'border-[#e6c33a] bg-[#1e1b4b] text-white shadow-xl scale-105' : 'border-gray-200 bg-white hover:border-[#1e1b4b]/30'}`}>
                <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${plan.highlight ? 'text-[#e6c33a]' : 'text-gray-400'}`}>{plan.name}</div>
                <div className={`text-2xl font-black mb-1 ${plan.highlight ? 'text-white' : 'text-[#1e1b4b]'}`}>{plan.price}</div>
                <div className={`text-xs mb-4 ${plan.highlight ? 'text-purple-300' : 'text-gray-400'}`}>/mo</div>
                <div className={`text-sm font-medium mb-6 ${plan.highlight ? 'text-purple-200' : 'text-gray-600'}`}>{plan.analyses}</div>
                <button
                  type="button"
                  onClick={() => goToAuth('signup')}
                  className={`mt-auto py-2.5 rounded-xl text-sm font-bold transition-colors ${plan.highlight ? 'bg-[#e6c33a] text-[#1e1b4b] hover:bg-[#d4b034]' : 'bg-[#1e1b4b] text-white hover:opacity-90'}`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#1e1b4b] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-3">Ready to automate your disclosures?</h2>
          <p className="text-purple-200 mb-8">Join hundreds of accounting firms saving hours on compliance every week.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button type="button" onClick={() => goToAuth('signup')} className="px-6 py-3 bg-[#e6c33a] text-[#1e1b4b] font-bold rounded-xl hover:bg-[#d4b034] transition-colors">Start your free analysis</button>
            <button className="px-6 py-3 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">Schedule a demo</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#17153d] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <SparkzLogo variant="light" size="sm" />
              <p className="mt-3 text-sm text-purple-300 leading-relaxed">The AI platform for modern financial compliance.</p>
            </div>
            {[
              { title: 'Product', links: ['AI Disclosures', 'Frameworks', 'Reporting', 'Pricing'] },
              { title: 'Company', links: ['About Us', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-white font-semibold text-sm mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link}><a href="#" className="text-purple-300 text-sm hover:text-white transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-6 flex items-center justify-between">
            <p className="text-purple-300 text-xs">© 2026 Sparkz AI Technologies Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}