import { useState } from 'react';
import { Bell, Search, Zap, ExternalLink, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function UserHeader() {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Search bar */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search prompts, models, API keys..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Fast Docs Link */}
          <Link
            to="/docs"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition"
          >
            <span>API Docs</span>
            <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
          </Link>

          {/* Notifications Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 p-3 rounded-2xl bg-[#0f0f1a] border border-white/10 shadow-2xl backdrop-blur-xl z-50 space-y-2 animate-slide-up">
                <div className="text-xs font-bold text-white px-2">Notifications</div>
                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-300 space-y-1">
                  <div className="font-semibold text-indigo-300">🎉 50,000 Starter Tokens</div>
                  <div className="text-[11px] text-gray-400">Your Pro trial is active with full GPT-4o access.</div>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-300 space-y-1">
                  <div className="font-semibold text-emerald-300">⚡ Claude 3.5 Sonnet Live</div>
                  <div className="text-[11px] text-gray-400">Available in your Studio selector now.</div>
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-white/10" />

          {/* User Profile Info */}
          <Link to="/dashboard/settings" className="flex items-center gap-3 pl-1 group">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-indigo-500/20">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition">
                {user?.name || 'Developer'}
              </p>
              <p className="text-[10px] text-indigo-400 font-mono capitalize">
                {user?.plan || 'pro'} plan
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
