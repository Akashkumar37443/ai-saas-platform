import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Shield, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Card, CardContent } from '@/components/common/Card'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleFillDemo = () => {
    setEmail('admin@example.com')
    setPassword('admin123')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'admin@example.com' && password === 'admin123') {
      localStorage.setItem('adminToken', 'fake-jwt-token')
      navigate('/admin')
    } else {
      alert('Invalid admin credentials. Use: admin@example.com / admin123')
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="orb w-[500px] h-[500px] -top-20 -left-20"
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="orb w-[400px] h-[400px] -bottom-20 -right-20"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)' }}
        />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-lg blur-md opacity-40" />
              <div className="relative bg-gradient-to-br from-red-500 to-primary-600 p-2.5 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="font-bold text-2xl text-white">
              AI<span className="gradient-text">Platform</span>
            </span>
          </Link>
          <h2 className="text-3xl font-extrabold text-white">Admin Access</h2>
          <p className="text-gray-400 mt-2">AI Platform Control Center</p>
        </div>

        {/* Quick Demo Admin Box */}
        <div className="mb-4 p-4 rounded-xl border border-red-500/30 bg-red-500/10 backdrop-blur-md flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-red-300 uppercase tracking-wider">Admin Credentials</div>
            <div className="text-sm text-gray-300 font-mono">admin@example.com / admin123</div>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs bg-red-600 hover:bg-red-500 text-white font-medium px-3 py-1.5 rounded-lg transition-colors"
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
                  placeholder="Admin email"
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
              <Button type="submit" className="w-full justify-center group" size="lg">
                Access Control Center
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/" className="text-primary-400 hover:text-primary-300 text-sm font-medium">
                ← Back to Website
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
