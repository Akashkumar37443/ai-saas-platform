import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'
import { Button } from '../common/Button'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Features', href: '/features', external: false },
    { name: 'Pricing', href: '/pricing', external: false },
    { name: 'API Docs', href: 'https://docs.example.com', external: true },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">AI Platform</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            )}
            <div className="pt-2 border-t border-gray-200">
              <Link to="/login" className="block w-full" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Sign In</Button>
              </Link>
              <Link to="/register" className="block w-full mt-2" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
