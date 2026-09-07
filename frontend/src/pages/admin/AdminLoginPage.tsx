import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Shield, ArrowRight, Eye, EyeOff, Zap } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { adminLogin, demoLogin } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await adminLogin(email, password);
      success('Admin Authenticated', 'Entering Platform Control Center.');
      navigate('/admin');
    } catch (err: any) {
      error('Admin Access Denied', err.message || 'Invalid administrator credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handle1ClickAdmin = async () => {
    setIsLoading(true);
    try {
      await demoLogin('admin');
      success('Logged in as Platform Admin');
      navigate('/admin');
    } catch (err: any) {
      error('Demo admin login failed', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080d] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="orb w-[500px] h-[500px] -top-20 -left-20"
          style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.2) 0%, transparent 70%)' }}
        />
        <div
          className="orb w-[400px] h-[400px] -bottom-20 -right-20"
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)' }}
        />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="max-w-md w-full relative z-10 space-y-6">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-purple-500/25">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl text-white tracking-tight">
              AI<span className="gradient-text">Platform</span>
            </span>
          </Link>
          <h2 className="text-3xl font-black text-white tracking-tight">Admin Control Center</h2>
          <p className="text-gray-400 mt-2 text-xs sm:text-sm">
            Restricted access portal for platform administrators.
          </p>
        </div>

        {/* 1-Click Fast Admin Demo Box */}
        <div className="p-4 rounded-2xl border border-purple-500/30 bg-purple-500/10 backdrop-blur-xl flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">Demo Admin Credentials</div>
            <div className="text-[11px] text-gray-300 font-mono mt-0.5">admin@example.com / admin123</div>
          </div>
          <button
            onClick={handle1ClickAdmin}
            className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-md flex items-center gap-1"
          >
            <Zap className="h-3.5 w-3.5 text-yellow-300" />
            1-Click Admin
          </button>
        </div>

        <Card className="p-7 sm:p-8 backdrop-blur-2xl border-white/10 bg-white/[0.02]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Admin Secret Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full !mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 shadow-xl shadow-purple-500/25"
              isLoading={isLoading}
            >
              Access Admin Console <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-gray-400">
            <Link to="/login" className="hover:text-white transition">
              ← Return to Standard User Login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
