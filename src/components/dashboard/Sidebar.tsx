import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
  ChevronRight,
  Activity,
} from 'lucide-react'
import { cn } from '@/utils/cn'

const mainNav = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'AI Playground', href: '/admin/playground', icon: Cpu, badge: 'New' },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'API Keys', href: '/admin/api-keys', icon: Key },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
]

const managementNav = [
  { name: 'Billing & Subscriptions', href: '/admin/billing', icon: CreditCard },
  { name: 'Security & Logs', href: '/admin/security', icon: ShieldCheck },
  { name: 'System Settings', href: '/admin/settings', icon: Settings },
]

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  const renderNavGroup = (title: string, items: typeof mainNav) => (
    <div className="mb-6">
      <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest px-3 mb-2">
        {title}
      </p>
      <div className="space-y-0.5">
        {items.map((item) => {
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
              {item.badge && (
                <span className="ml-auto px-2 py-0.5 text-[10px] font-bold bg-accent-500/20 text-accent-300 border border-accent-500/30 rounded-full">
                  {item.badge}
                </span>
              )}
              {isActive && !item.badge && (
                <ChevronRight className="h-3.5 w-3.5 ml-auto text-primary-400 opacity-70" />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )

  const SidebarContent = () => (
    <>
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
        <Link to="/admin" className="flex items-center gap-3 group">
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
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Control Center</div>
          </div>
        </Link>
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {renderNavGroup('Core Menu', mainNav)}
        {renderNavGroup('Management', managementNav)}

        {/* System Health Card in Sidebar */}
        <div className="mx-1 mt-4 p-3 rounded-xl border border-white/8 bg-white/[0.02] backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              System Status
            </div>
            <span className="glow-dot" />
          </div>
          <p className="text-[11px] text-gray-500 leading-snug">All 50 AI models online & operational.</p>
        </div>
      </nav>

      {/* Footer Nav */}
      <div className="px-3 py-4 border-t border-white/8 space-y-1">
        <Link
          to="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-white/8 transition-colors">
            <Sparkles className="h-4 w-4" />
          </div>
          Public Landing Page
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full group"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-red-500/10 transition-colors">
            <LogOut className="h-4 w-4" />
          </div>
          Logout Session
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-xl border border-white/10 backdrop-blur-md text-gray-400 hover:text-white transition-colors"
        style={{ background: 'rgba(15,15,26,0.9)' }}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div
        className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 flex-shrink-0 z-40 border-r border-white/8"
        style={{ background: 'rgba(10,10,15,0.97)' }}
      >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          'md:hidden fixed left-0 top-0 h-screen w-64 flex-col flex-shrink-0 z-40 transition-transform duration-300 border-r border-white/8',
          isMobileMenuOpen ? 'translate-x-0 flex' : '-translate-x-full hidden'
        )}
        style={{ background: 'rgba(10,10,15,0.97)' }}
      >
        <SidebarContent />
      </div>

      {/* Spacer for layout */}
      <div className="hidden md:block w-64 flex-shrink-0" />
    </>
  )
}
