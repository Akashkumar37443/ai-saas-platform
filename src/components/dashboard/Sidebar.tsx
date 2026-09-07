import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Key,
  BarChart3,
  Cpu,
  CreditCard,
  Settings,
  ShieldCheck,
  LogOut,
  Sparkles,
  Menu,
  X,
  Activity,
  ArrowUpRight,
  User as UserIcon
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/cn';

const mainNav = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'AI Playground', href: '/admin/playground', icon: Cpu, badge: 'Studio' },
  { name: 'Users Management', href: '/admin/users', icon: Users },
  { name: 'API Keys Audit', href: '/admin/api-keys', icon: Key },
  { name: 'Analytics & Costs', href: '/admin/analytics', icon: BarChart3 },
];

const managementNav = [
  { name: 'Billing & MRR', href: '/admin/billing', icon: CreditCard },
  { name: 'Security & Logs', href: '/admin/security', icon: ShieldCheck },
  { name: 'System Settings', href: '/admin/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const renderNavGroup = (title: string, items: typeof mainNav) => (
    <div className="mb-6">
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-2">
        {title}
      </p>
      <div className="space-y-1">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all',
                isActive
                  ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/20 text-white border border-purple-500/40 shadow-md shadow-purple-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn('h-4 w-4', isActive ? 'text-purple-400' : 'text-gray-500')} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold font-mono bg-purple-500/20 text-purple-300">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );

  const SidebarContent = () => (
    <>
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600 p-2 rounded-xl text-white shadow-lg shadow-purple-500/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <span className="text-base font-black text-white tracking-tight">
              AI<span className="gradient-text">Platform</span>
            </span>
            <div className="text-[10px] text-purple-400 uppercase tracking-widest font-bold font-mono">
              Admin Console
            </div>
          </div>
        </Link>
      </div>

      {/* System Gateway Status */}
      <div className="mx-3.5 mt-4 p-3.5 rounded-2xl border border-purple-500/30 bg-purple-500/10 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <div className="text-xs font-bold text-white">FastAPI Gateway</div>
            <div className="text-[10px] text-gray-400 font-mono">Latency: 38ms • Health: OK</div>
          </div>
        </div>
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {renderNavGroup('Core Platform', mainNav)}
        {renderNavGroup('Administration', managementNav)}

        <div className="pt-2 border-t border-white/5 space-y-1">
          <Link
            to="/dashboard"
            className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/10 rounded-xl transition"
          >
            <span className="flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-indigo-400" />
              Switch to User Studio
            </span>
            <ArrowUpRight className="h-3 w-3 text-indigo-400" />
          </Link>
        </div>
      </nav>

      {/* Admin Profile & Logout */}
      <div className="p-4 border-t border-white/10 bg-black/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              A
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{user?.name || 'Platform Admin'}</div>
              <div className="text-[10px] text-purple-400 truncate font-mono">Super Administrator</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-[#0a0a0f] border-b border-white/10">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="bg-purple-600 p-1.5 rounded-lg text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-bold text-sm text-white">Admin Console</span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 bg-[#07070c] border-r border-white/10 z-30">
        <SidebarContent />
      </aside>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-64 max-w-full bg-[#07070c] border-r border-white/10 flex flex-col z-10">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
