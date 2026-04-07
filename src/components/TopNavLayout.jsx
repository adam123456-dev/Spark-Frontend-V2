import SparkzLogo from './SparkzLogo';
import { createPageUrl } from '@/utils';
import { mockUser } from './services/api';

const navLinks = [
  { label: 'Dashboard', page: 'Dashboard' },
  { label: 'Document analysis', page: 'Analysis' },
  { label: 'Analysis History', page: 'History' },
  { label: 'Manual checklist', page: 'DisclosureChecklist' },
];

export default function TopNavLayout({ children, activePage }) {
  const navigate = (page) => { window.location.href = createPageUrl(page); };

  return (
    <div className="min-h-screen bg-[#f6f6f8]">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 flex items-center h-14 gap-8">
          <SparkzLogo size="sm" />
          <nav className="flex items-center gap-1">
            {navLinks.map(link => (
              <button key={link.label} onClick={() => navigate(link.page)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activePage === link.page ? 'text-[#1e1b4b] bg-[#1e1b4b]/10 font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                {link.label}
              </button>
            ))}
            <button className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">Reports</button>
            <button className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">Settings</button>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input className="pl-9 pr-4 py-1.5 bg-[#f6f6f8] rounded-lg text-sm w-52 focus:outline-none placeholder-gray-400" placeholder="Quick find..." />
            </div>
            <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            </button>
            <button onClick={() => navigate('Account')} className="w-8 h-8 rounded-full bg-[#1e1b4b] flex items-center justify-center text-white text-xs font-bold hover:opacity-90">
              {mockUser.name.split(' ').map(n => n[0]).join('')}
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}