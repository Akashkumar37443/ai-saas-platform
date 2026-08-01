import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Card, CardContent } from '@/components/common/Card'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleFillDemo = () => {
    setEmail('user@example.com')
    setPassword('user1234')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save user token and navigate specifically to user dashboard (/dashboard)
    localStorage.setItem('userToken', 'user-jwt-token')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500 rounded-lg blur-md opacity-60" />
              <div className="relative bg-gradient-to-br from-primary-500 to-accent-500 p-2 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="font-bold text-2xl text-white">
              AI<span className="gradient-text">Platform</span>
            </span>
          </Link>
          <h2 className="text-3xl font-extrabold text-white">User Sign in</h2>
          <p className="text-gray-400 mt-2">Welcome back! Sign in to access your AI developer portal.</p>
        </div>

        {/* Quick Demo User Box */}
        <div className="mb-4 p-4 rounded-xl border border-primary-500/30 bg-primary-500/10 backdrop-blur-md flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-primary-300 uppercase tracking-wider">Demo User Credentials</div>
            <div className="text-sm text-gray-300 font-mono">user@example.com / user1234</div>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs bg-primary-600 hover:bg-primary-500 text-white font-medium px-3 py-1.5 rounded-lg transition-colors shadow-glow"
          >
            Auto-fill
          </button>
        </div>

        <Card className="glass-card border-white/10">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 z-10" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 z-10" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11"
                  required
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-white/20 bg-white/5" />
                  <span className="text-gray-400">Remember me</span>
                </label>
                <Link to="#" className="text-primary-400 hover:text-primary-300">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full justify-center group" size="lg">
                Sign in to Developer Portal
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
