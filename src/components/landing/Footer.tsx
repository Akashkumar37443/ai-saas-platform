import { Link } from 'react-router-dom'
import { Sparkles, Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react'

export function Footer() {
  const productLinks = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'API Docs', href: '#' },
    { name: 'Changelog', href: '#' },
  ]

  const companyLinks = [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' },
  ]

  const resourceLinks = [
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'Support', href: '#' },
  ]

  const legalLinks = [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Admin Access', href: '/admin/login' },
  ]

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ]

  const linkColumns = [
    { title: 'Product', links: productLinks },
    { title: 'Company', links: companyLinks },
    { title: 'Resources', links: resourceLinks },
    { title: 'Legal', links: legalLinks },
  ]

  return (
    <footer className="relative overflow-hidden bg-dark-900 border-t border-white/8">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="orb w-[400px] h-[400px] bottom-0 right-0"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }}
        />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12 mb-16">
          {/* Brand column */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-500 rounded-lg blur-md opacity-50 group-hover:opacity-70 transition-opacity" />
                <div className="relative bg-gradient-to-br from-primary-500 to-accent-500 p-1.5 rounded-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                AI<span className="gradient-text">Platform</span>
              </span>
            </Link>

            <p className="text-sm text-gray-500 mb-6 max-w-xs leading-relaxed">
              Empowering developers with cutting-edge AI APIs and tools for the next generation of intelligent applications.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl glass-card border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-primary-500/40 transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-2">
              <span className="glow-dot" />
              <span className="text-xs text-gray-500">All systems operational</span>
              <a href="#" className="text-xs text-primary-500 hover:text-primary-400 flex items-center gap-0.5 transition-colors">
                Status <ArrowUpRight className="h-2.5 w-2.5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {linkColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        <div className="glass-card border-white/8 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-white font-semibold mb-1">Stay in the loop</h4>
            <p className="text-sm text-gray-500">Get the latest AI news and product updates.</p>
          </div>
          <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@example.com"
              className="input-field flex-1 md:w-64 text-sm py-2.5"
              id="footer-newsletter-email"
            />
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:shadow-glow hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} AIPlatform Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Built with</span>
            <span className="text-red-500">♥</span>
            <span>using React + Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
