import { Search, Bell, User } from 'lucide-react'
import { Input } from '@/components/common/Input'

export function Header() {
  return (
    <header
      className="sticky top-0 z-10 border-b border-white/8 backdrop-blur-xl"
      style={{ background: 'rgba(10,10,15,0.85)' }}
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        {/* Spacer for mobile menu button */}
        <div className="w-10 md:hidden" />

        {/* Search */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none" />
            <Input
              placeholder="Search anything..."
              className="pl-10 pr-20 py-2.5 text-sm"
              id="dashboard-search"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="text-[10px] text-gray-600 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 font-mono">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <button
            className="relative p-2.5 rounded-xl text-gray-500 hover:text-gray-300 hover:bg-white/8 transition-all duration-200"
            id="header-notifications"
            aria-label="Notifications"
          >
            <Bell className="h-4.5 w-4.5" style={{ height: '1.125rem', width: '1.125rem' }} />
            <span
              className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full border border-dark-900"
              style={{ background: 'linear-gradient(135deg, #f43f5e, #ef4444)' }}
            />
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* User profile */}
          <button
            className="flex items-center gap-3 pl-1 pr-3 py-1.5 rounded-xl hover:bg-white/8 transition-all duration-200 group"
            id="header-user-menu"
          >
            <div
              className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0 border border-primary-500/30"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(168,85,247,0.2))' }}
            >
              <User className="h-4 w-4 text-primary-400" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                Admin User
              </p>
              <p className="text-xs text-gray-600">admin@example.com</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
