import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Sparkles, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, demoLogin } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const handleFillDemo = () => {
    setName('Alex Mercer');
    setEmail(`user_${Math.floor(Math.random() * 9000 + 1000)}@example.com`);
    setPassword('password123');
    setConfirmPassword('password123');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      error('Passwords do not match', 'Please ensure both password fields are identical.');
      return;
    }
    if (password.length < 6) {
      error('Password too short', 'Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate/execute register + auto login
      await login(email, password);
      success('Account created!', 'Welcome to AI SaaS Developer Platform. 50,000 free tokens credited.');
      navigate('/dashboard');
    } catch (err: any) {
      error('Registration failed', err.message || 'Please try again.');
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
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/25">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl text-white tracking-tight">
              AI<span className="gradient-text">Platform</span>
            </span>
          </Link>
          <h2 className="text-3xl font-black text-white tracking-tight">Create Developer Account</h2>
          <p className="text-gray-400 mt-2 text-xs sm:text-sm">
            Get instant access to 50+ AI models with 50,000 free starter tokens.
          </p>
        </div>

        {/* Quick Demo Autofill */}
        <div className="p-3.5 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-xl flex items-center justify-between">
          <div className="text-xs text-indigo-300 font-semibold">Testing demo registration?</div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1 shadow"
          >
            <Zap className="h-3 w-3 text-yellow-300" /> Autofill Demo
          </button>
        </div>

        <Card className="p-7 sm:p-8 backdrop-blur-2xl border-white/10 bg-white/[0.02]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Mercer"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Confirm
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Includes 14-day free trial on Pro tier. No credit card required.</span>
            </div>

            <Button type="submit" size="lg" className="w-full !mt-6 shadow-xl shadow-indigo-500/20" isLoading={isLoading}>
              Create Account <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
            <span>Already registered?</span>
            <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Sign In →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
