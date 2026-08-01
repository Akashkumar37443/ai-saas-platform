import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
  ChevronRight,
  Zap,
} from 'lucide-react'
import { cn } from '@/utils/cn'

const userNav = [
  { name: 'AI Playground', href: '/dashboard', icon: Cpu },
  { name: 'My API Keys', href: '/dashboard/api-keys', icon: Key },
  { name: 'Usage & Stats', href: '/dashboard/usage', icon: BarChart3 },
  { name: 'Billing & Plan', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Account Settings', href: '/dashboard/settings', icon: Settings },
]

export function UserSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    navigate('/login')
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/8">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary-500 rounded-lg blur-md opacity-50" />
            <div className="relative bg-gradient-to-br from-primary-500 to-accent-500 p-1.5 rounded-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>
          <div>
            <span className="text-base font-bold text-white tracking-tight">
              AI<span className="gradient-text">Platform</span>
            </span>
            <div className="text-[10px] text-primary-400 uppercase tracking-widest font-semibold">User Portal</div>
          </div>
        </Link>
      </div>

      {/* Usage Quota Card */}
      <div className="mx-3 mt-4 p-3.5 rounded-xl border border-primary-500/30 bg-primary-500/10 backdrop-blur-sm">
        <div className="flex items-center justify-between text-xs font-semibold text-white mb-1">
          <span className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-primary-400" /> Pro Plan
          </span>
          <span className="text-primary-300">76%</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-gradient-to-r from-primary-500 to-accent-500 w-[76%]" />
        </div>
        <div className="text-[10px] text-gray-400">38,420 / 50,000 requests used</div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest px-3 mb-2">
          Main Menu
        </p>
        {userNav.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                isActive
                  ? 'text-white font-semibold'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              )}
              style={
                isActive
                  ? {
                      background:
                        'linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(168,85,247,0.15) 100%)',
                      borderLeft: '3px solid #6366f1',
                    }
                  : {}
              }
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200',
                  isActive
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'text-gray-500 group-hover:text-gray-300 group-hover:bg-white/5'
                )}
              >
                <item.icon className="h-4 w-4" />
              </div>
              <span className="truncate">{item.name}</span>
              {isActive && (
                <ChevronRight className="h-3.5 w-3.5 ml-auto text-primary-400 opacity-70" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom links */}
      <div className="px-3 py-4 border-t border-white/8 space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all duration-200"
        >
          <Sparkles className="h-4 w-4 text-primary-400" /> Back to Home
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </>
  )

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-xl border border-white/10 backdrop-blur-md text-gray-400 hover:text-white"
        style={{ background: 'rgba(15,15,26,0.9)' }}
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 flex-shrink-0 z-40 border-r border-white/8"
        style={{ background: 'rgba(10,10,15,0.97)' }}
      >
        <SidebarContent />
      </div>

      <div
        className={cn(
          'md:hidden fixed left-0 top-0 h-screen w-64 flex-col flex-shrink-0 z-40 transition-transform duration-300 border-r border-white/8',
          isMobileMenuOpen ? 'translate-x-0 flex' : '-translate-x-full hidden'
        )}
        style={{ background: 'rgba(10,10,15,0.97)' }}
      >
        <SidebarContent />
      </div>

      <div className="hidden md:block w-64 flex-shrink-0" />
    </>
  )
}
