import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Shield } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Card, CardContent } from '@/components/common/Card'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted', { email, password })
    // Simple admin auth - in production, use proper authentication
    if (email === 'admin@example.com' && password === 'admin123') {
      console.log('Credentials valid, setting token and navigating...')
      localStorage.setItem('adminToken', 'fake-jwt-token')
      console.log('Token set, navigating to /admin')
      navigate('/admin')
    } else {
      console.log('Invalid credentials')
      alert('Invalid admin credentials. Use: admin@example.com / admin123')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-12 w-12 bg-primary-600 rounded-xl flex items-center justify-center">
              <Shield className="h-7 w-7 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">Admin Access</h2>
          <p className="text-gray-400 mt-2">AI Platform Administration</p>
        </div>

        <Card className="border-gray-700 bg-gray-800">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Access Admin Panel
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-400">Demo credentials:</p>
              <p className="text-gray-500">admin@example.com / admin123</p>
            </div>

            <div className="mt-4 text-center">
              <Link to="/" className="text-primary-400 hover:text-primary-300 text-sm">
                ← Back to Website
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
