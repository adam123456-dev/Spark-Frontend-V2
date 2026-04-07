import { createPageUrl } from '@/utils';
import SparkzLogo from '../components/SparkzLogo';
import { mockUser, mockBillingHistory } from '../components/services/api';

export default function Account() {
  const pct = Math.round((mockUser.creditsUsed / mockUser.creditsTotal) * 100);
  const initials = mockUser.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="min-h-screen bg-[#f8f8fb]">
      <header className="bg-[#1e1b4b] border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <SparkzLogo size="sm" />
          <div className="flex items-center gap-3">
            <button className="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#e6c33a] flex items-center justify-center text-[#1e1b4b] text-xs font-bold cursor-pointer">
              {initials}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Profile header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-5 flex-wrap">
            <div className="w-20 h-20 rounded-2xl bg-[#1e1b4b] flex items-center justify-center text-white text-2xl font-black">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-black text-[#1e1b4b]">{mockUser.name}</h2>
              <p className="text-gray-400 text-sm mt-0.5">{mockUser.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-[#1e1b4b]/10 text-[#1e1b4b] text-xs font-semibold rounded-full border border-[#1e1b4b]/20">Active Workspace</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button className="px-4 py-2 border border-gray-200 text-sm font-semibold text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">Edit Profile</button>
              <button
                onClick={() => window.location.href = createPageUrl('Landing')}
                className="flex items-center gap-2 px-4 py-2 bg-[#e6c33a] text-[#1e1b4b] text-sm font-bold rounded-xl hover:bg-[#d4b034] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                Log out
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Subscription */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold text-gray-900">Subscription Overview</h3>
                  <p className="text-sm text-gray-400 mt-0.5">Manage your plan and usage limits</p>
                </div>
                <span className="px-3 py-1 bg-[#1e1b4b] text-white text-xs font-bold rounded-full uppercase tracking-wider">Builder Plan</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-[#f6f6f8] rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Monthly Billing</p>
                  <p className="text-2xl font-black text-[#1e1b4b]">{mockUser.billingAmount} <span className="text-sm text-gray-400 font-normal">/ mo</span></p>
                  <p className="text-xs text-gray-400 mt-1.5">📅 Next: {mockUser.nextBillingDate}</p>
                </div>
                <div className="bg-[#f6f6f8] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-400">Usage</p>
                    <p className="text-xs font-bold"><span className="text-[#1e1b4b]">{mockUser.creditsUsed}</span><span className="text-gray-400"> / {mockUser.creditsTotal}</span></p>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-[#e6c33a] rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-xs text-gray-400">{mockUser.creditsTotal - mockUser.creditsUsed} remaining</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <button className="px-5 py-2.5 bg-[#e6c33a] text-[#1e1b4b] text-sm font-bold rounded-xl hover:bg-[#d4b034] transition-colors">Upgrade Plan</button>
                <button className="px-5 py-2.5 border border-gray-200 text-sm font-semibold text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">Update Payment</button>
                <button className="ml-auto text-sm text-gray-400 hover:text-red-500 transition-colors">Cancel Plan</button>
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-1">Billing History</h3>
              <p className="text-sm text-gray-400 mb-5">View and download your past invoices</p>
              <table className="w-full">
                <thead>
                  <tr>
                    {['Date', 'Amount', 'Status', 'Invoice'].map(h => (
                      <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockBillingHistory.map((b) => (
                    <tr key={b.id} className="border-t border-gray-50">
                      <td className="py-3.5 text-sm text-gray-700">{b.date}</td>
                      <td className="py-3.5 text-sm font-medium text-gray-700">{b.amount}</td>
                      <td className="py-3.5">
                        <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">{b.status}</span>
                      </td>
                      <td className="py-3.5">
                        <button className="flex items-center gap-1.5 text-[#1e1b4b] text-sm font-semibold hover:underline">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                          PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right col */}
          <div className="space-y-5">
            <div className="bg-[#1e1b4b] rounded-2xl p-6 text-white">
              <h4 className="font-bold text-lg mb-2">Need more power?</h4>
              <p className="text-purple-200 text-sm leading-relaxed mb-5">Scale with the Enterprise plan. Unlimited analyses and priority support.</p>
              <button className="w-full py-2.5 bg-[#e6c33a] text-[#1e1b4b] text-sm font-bold rounded-xl hover:bg-[#d4b034] transition-colors">Contact Sales</button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4">Payment Method</h4>
              <div className="flex items-center gap-3 p-4 bg-[#f6f6f8] rounded-xl mb-4">
                <div className="w-10 h-7 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">•••• •••• •••• 4242</p>
                  <p className="text-xs text-gray-400">Expires 12/26</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {['Securely encrypted', 'Automatic renewal'].map(item => (
                  <div key={item} className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-[#e6c33a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12" /></svg>
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-10 text-center text-xs text-gray-400 border-t border-gray-100 pt-6">
          © 2026 Sparkz Technologies Inc. All rights reserved.
        </footer>
      </div>
    </div>
  );
}