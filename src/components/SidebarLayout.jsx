import SparkzLogo from './SparkzLogo';
import { createPageUrl } from '@/utils';
import { mockUser } from './services/api';

const navItems = [
  {
    label: 'Dashboard', page: 'Dashboard',
    icon: <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />,
  },
  {
    label: 'Document analysis', page: 'Analysis',
    icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></>,
  },
  {
    label: 'Analysis History', page: 'History',
    icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
  },
  {
    label: 'Account', page: 'Account',
    icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  },
  {
    label: 'Billing', page: 'Account',
    icon: <><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></>,
  },
];

export default function SidebarLayout({ children, activePage }) {
  const navigate = (page) => { window.location.href = createPageUrl(page); };

  return (
    <div className="flex h-screen bg-[#f8f8fb] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-52 flex-shrink-0 bg-[#1e1b4b] flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <SparkzLogo size="sm" variant="light" />
          <p className="text-[10px] text-purple-300 font-medium tracking-widest uppercase mt-1 ml-[46px]">AI Disclosure</p>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive = activePage === item.page;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.page)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-[#e6c33a] text-[#1e1b4b] font-bold' : 'text-purple-200 hover:bg-white/10 hover:text-white'}`}
              >
                <svg className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#1e1b4b]' : 'text-purple-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {item.icon}
                </svg>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={() => navigate('Account')} className="w-full flex items-center gap-3 hover:bg-white/10 rounded-lg p-2 transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#e6c33a] flex items-center justify-center text-[#1e1b4b] text-xs font-bold flex-shrink-0">
              {mockUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-semibold text-white truncate">{mockUser.name}</p>
              <p className="text-[11px] text-purple-300 truncate">{mockUser.plan}</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
          <div className="relative">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input className="pl-9 pr-4 py-2 bg-[#f8f8fb] rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#1e1b4b]/20 placeholder-gray-400" placeholder="Search analyses..." />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            </button>
            <button onClick={() => navigate('Account')} className="w-8 h-8 rounded-full bg-[#e6c33a] flex items-center justify-center text-[#1e1b4b] text-xs font-bold hover:opacity-90 transition-opacity">
              {mockUser.name.split(' ').map(n => n[0]).join('')}
            </button>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}