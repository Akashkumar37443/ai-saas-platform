import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Card, CardContent } from '@/components/common/Card'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleFillDemo = () => {
    setName('Akash Thakur')
    setEmail('user@example.com')
    setPassword('user1234')
    setConfirmPassword('user1234')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    // Set user token and navigate to user portal
    localStorage.setItem('userToken', 'user-jwt-token')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Glow Orbs */}
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
          <h2 className="text-3xl font-extrabold text-white">Create Developer Account</h2>
          <p className="text-gray-400 mt-2">Start building with 50+ AI APIs today</p>
        </div>

        {/* Quick Demo User Box */}
        <div className="mb-4 p-4 rounded-xl border border-primary-500/30 bg-primary-500/10 backdrop-blur-md flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-primary-300 uppercase tracking-wider">Demo Account</div>
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
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 z-10" />
                <Input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-11"
                  required
                />
              </div>
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
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 z-10" />
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-11"
                  required
                />
              </div>

              <label className="flex items-start gap-2 text-sm cursor-pointer pt-1">
                <input type="checkbox" className="rounded border-white/20 bg-white/5 mt-1" required />
                <span className="text-gray-400">
                  I agree to the{' '}
                  <Link to="#" className="text-primary-400 hover:text-primary-300">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="#" className="text-primary-400 hover:text-primary-300">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <Button type="submit" className="w-full justify-center group" size="lg">
                Create Account
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
