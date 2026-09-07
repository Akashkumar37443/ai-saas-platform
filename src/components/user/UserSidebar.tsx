import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Cpu,
  Key,
  BarChart3,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
  BookOpen,
  ArrowUpRight,
  Shield,
  Layers
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/cn';

const userNav = [
  { name: 'AI Studio', href: '/dashboard', icon: Cpu },
  { name: 'My API Keys', href: '/dashboard/api-keys', icon: Key },
  { name: 'Prompt Templates', href: '/dashboard/templates', icon: Layers },
  { name: 'Usage Analytics', href: '/dashboard/usage', icon: BarChart3 },
  { name: 'Billing & Plan', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Account Settings', href: '/dashboard/settings', icon: Settings },
];

export function UserSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const remainingTokens = user?.credits_remaining ?? 48500;
  const totalTokens = 50000;
  const usedPct = Math.min(100, Math.round(((totalTokens - remainingTokens) / totalTokens) * 100));

  const SidebarContent = () => (
    <>
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <span className="text-base font-black text-white tracking-tight">
              AI<span className="gradient-text">Platform</span>
            </span>
            <div className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold font-mono">
              Developer Studio
            </div>
          </div>
        </Link>
      </div>

      {/* Quota Progress Widget */}
      <div className="mx-3.5 mt-4 p-4 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/30 to-purple-950/20 backdrop-blur-md">
        <div className="flex items-center justify-between text-xs font-bold text-white mb-1.5">
          <span className="flex items-center gap-1.5 text-indigo-300">
            <Zap className="h-3.5 w-3.5 text-yellow-300" /> {user?.plan ? user.plan.toUpperCase() : 'PRO'} PLAN
          </span>
          <span className="font-mono text-emerald-400">{remainingTokens.toLocaleString()} tokens</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(10, 100 - usedPct)}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-gray-400">
          <span>Active billing cycle</span>
          <Link to="/dashboard/billing" className="text-indigo-400 hover:underline">
            Upgrade
          </Link>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {userNav.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all',
                isActive
                  ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/20 text-white border border-indigo-500/40 shadow-md shadow-indigo-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className={cn('h-4 w-4', isActive ? 'text-indigo-400' : 'text-gray-500')} />
              <span>{item.name}</span>
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-white/5 space-y-1">
          <Link
            to="/docs"
            className="flex items-center justify-between px-3.5 py-2 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-gray-500" />
              API Reference
            </span>
            <ArrowUpRight className="h-3 w-3 text-gray-500" />
          </Link>

          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-purple-300 hover:bg-purple-500/10 rounded-xl transition"
            >
              <Shield className="h-4 w-4 text-purple-400" />
              Switch to Admin Panel
            </Link>
          )}
        </div>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-white/10 bg-black/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{user?.name || 'Developer'}</div>
              <div className="text-[10px] text-gray-400 truncate font-mono">{user?.email || 'user@example.com'}</div>
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
      {/* Mobile menu toggle bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-[#0a0a0f] border-b border-white/10">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-bold text-sm text-white">Developer Studio</span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 bg-[#07070c] border-r border-white/10 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
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
