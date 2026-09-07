import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, ChevronRight, Zap, Shield, User as UserIcon, LayoutDashboard, Terminal } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const { user, isAuthenticated, demoLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '/features' },
    { name: 'Models', href: '/#models' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'API Docs', href: '/docs' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleDemoAccess = async (type: 'user' | 'admin') => {
    await demoLogin(type);
    setDemoMenuOpen(false);
    setIsMenuOpen(false);
    if (type === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-indigo-950/20'
          : 'bg-[#0a0a0f]/70 backdrop-blur-md border-b border-white/5'
      }`}
    >
      {/* Top announcement ticker */}
      <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-indigo-900/40 border-b border-white/5 py-1 px-4 text-center hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-gray-400">FastAPI Gateway v1.0 • Global Latency: <strong className="text-emerald-400 font-mono">38ms</strong></span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-indigo-300 font-medium">⚡ 50+ Models Supported</span>
            <Link to="/docs" className="text-gray-400 hover:text-white transition flex items-center gap-1">
              Live Swagger Docs <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold text-white tracking-tight flex items-center gap-1">
                AI<span className="gradient-text">Platform</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono ml-1">SaaS</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-3.5 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-xl hover:bg-white/5 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* 1-Click Quick Demo Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDemoMenuOpen(!demoMenuOpen)}
                className="px-3 py-1.5 rounded-xl border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Zap className="h-3.5 w-3.5 text-indigo-400" />
                1-Click Demo
                <ChevronRight className={`h-3 w-3 transition-transform ${demoMenuOpen ? 'rotate-90' : ''}`} />
              </button>

              {demoMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 p-2 rounded-2xl bg-[#0f0f1a] border border-white/10 shadow-2xl backdrop-blur-xl z-50 space-y-1">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Instant Live Portals
                  </div>
                  <button
                    onClick={() => handleDemoAccess('user')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-left text-gray-200 hover:text-white hover:bg-white/5 rounded-xl transition"
                  >
                    <UserIcon className="h-4 w-4 text-indigo-400" />
                    <div>
                      <div className="font-semibold text-white">User AI Studio</div>
                      <div className="text-[10px] text-gray-400">Chat, Code, Keys & Billing</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleDemoAccess('admin')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-left text-gray-200 hover:text-white hover:bg-white/5 rounded-xl transition"
                  >
                    <Shield className="h-4 w-4 text-purple-400" />
                    <div>
                      <div className="font-semibold text-white">Admin Control Panel</div>
                      <div className="text-[10px] text-gray-400">Users, Analytics & System</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <Link
                to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl hover:opacity-90 shadow-md shadow-indigo-500/20 flex items-center gap-1.5 transition"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                {user?.role === 'admin' ? 'Admin Panel' : 'AI Studio'}
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary !px-4 !py-2 !text-xs !rounded-xl"
                >
                  Start Building Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none transition"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0a0f]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2">Instant Demo Access</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleDemoAccess('user')}
                className="p-2.5 text-left rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-white text-xs font-semibold"
              >
                🧑 Developer Studio
              </button>
              <button
                onClick={() => handleDemoAccess('admin')}
                className="p-2.5 text-left rounded-xl border border-purple-500/30 bg-purple-500/10 text-white text-xs font-semibold"
              >
                🛡️ Admin Panel
              </button>
            </div>
            
            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-semibold text-gray-200 border border-white/10 rounded-xl"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
