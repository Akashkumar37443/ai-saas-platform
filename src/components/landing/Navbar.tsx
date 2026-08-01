import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sparkles, ChevronRight } from 'lucide-react'
import { Button } from '../common/Button'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Features', href: '/features', external: false },
    { name: 'Pricing', href: '/pricing', external: false },
    { name: 'API Docs', href: 'https://docs.example.com', external: true },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-900/90 backdrop-blur-xl border-b border-white/8 shadow-dark'
          : 'bg-dark-900/70 backdrop-blur-md border-b border-white/5'
      }`}
    >
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-primary-600/30 via-accent-600/30 to-primary-600/30 border-b border-white/8 py-1.5 px-4 text-center hidden md:block">
        <p className="text-xs text-gray-300 flex items-center justify-center gap-2">
          <span className="glow-dot" />
          <span>
            🚀 Now with <strong className="text-primary-400">GPT-4o</strong> & <strong className="text-accent-400">Claude 3.5</strong> support
          </span>
          <a href="#" className="text-primary-400 hover:text-primary-300 inline-flex items-center gap-0.5 transition-colors font-medium">
            Learn more <ChevronRight className="h-3 w-3" />
          </a>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500 rounded-lg blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="relative bg-gradient-to-br from-primary-500 to-accent-500 p-1.5 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              AI<span className="gradient-text">Platform</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/8 transition-all duration-200"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/8 transition-all duration-200"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="group">
                Get Started
                <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-dark-800/95 backdrop-blur-xl border-t border-white/8 px-4 py-4 space-y-1">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 rounded-xl text-gray-300 hover:bg-white/8 hover:text-white transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center px-4 py-3 rounded-xl text-gray-300 hover:bg-white/8 hover:text-white transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            )
          )}
          <div className="pt-3 border-t border-white/8 flex flex-col gap-2">
            <Link to="/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center">
                Sign In
              </Button>
            </Link>
            <Link to="/register" className="w-full" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full justify-center">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
