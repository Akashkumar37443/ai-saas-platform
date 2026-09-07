import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Sparkles, ArrowRight, Eye, EyeOff, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card, CardContent } from '@/components/common/Card';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function LoginPage() {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('user123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, demoLogin } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      success('Welcome back!', 'Signed into Developer AI Studio.');
      navigate('/dashboard');
    } catch (err: any) {
      error('Login failed', err.message || 'Please check your email and password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handle1ClickDemo = async (role: 'user' | 'admin') => {
    setIsLoading(true);
    try {
      await demoLogin(role);
      success(`Signed in as Demo ${role === 'admin' ? 'Admin' : 'User'}`);
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    } catch (err: any) {
      error('Demo login failed', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="orb w-[500px] h-[500px] -top-20 -left-20"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)' }}
        />
        <div
          className="orb w-[400px] h-[400px] -bottom-20 -right-20"
          style={{ background: 'radial-gradient(circle, rgba(217,70,239,0.15) 0%, transparent 70%)' }}
        />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/25">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl text-white tracking-tight">
              AI<span className="gradient-text">Platform</span>
            </span>
          </Link>
          <h2 className="text-3xl font-black text-white tracking-tight">User Sign In</h2>
          <p className="text-gray-400 mt-2 text-xs sm:text-sm">
            Sign in to access your Developer AI Studio & API credentials.
          </p>
        </div>

        {/* 1-Click Fast Demo Login */}
        <div className="p-4 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-xl flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Demo Credentials</div>
            <div className="text-[11px] text-gray-300 font-mono mt-0.5">user@example.com / user123</div>
          </div>
          <button
            onClick={() => handle1ClickDemo('user')}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md flex items-center gap-1"
          >
            <Zap className="h-3.5 w-3.5 text-yellow-300" />
            1-Click Login
          </button>
        </div>

        {/* Form Card */}
        <Card className="p-7 sm:p-8 backdrop-blur-2xl border-white/10 bg-white/[0.02]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Password
                </label>
                <Link to="/contact" className="text-xs text-indigo-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
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

            <Button type="submit" size="lg" className="w-full !mt-6 shadow-xl shadow-indigo-500/20" isLoading={isLoading}>
              Sign In to Studio <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
            <span>Don't have an account?</span>
            <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Create an account →
            </Link>
          </div>
        </Card>

        {/* Switch to Admin Login */}
        <div className="text-center">
          <Link
            to="/admin/login"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-purple-300 transition"
          >
            <Shield className="h-3.5 w-3.5 text-purple-400" />
            Are you a platform administrator? <strong className="text-white">Admin Login</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}
