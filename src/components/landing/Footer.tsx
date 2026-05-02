import { Link } from 'react-router-dom'
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  const footerLinks = {
    Product: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'API Docs', href: '#' },
      { name: 'Changelog', href: '#' },
    ],
    Company: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    Resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Guides', href: '#' },
      { name: 'Community', href: '#' },
      { name: 'Support', href: '#' },
    ],
    Legal: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Admin Access', href: '/admin/login' },
    ],
  }

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ]

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">AI Platform</span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-xs">
              Empowering developers with cutting-edge AI APIs and tools for the next generation of applications.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-gray-900 mb-3">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-gray-600 hover:text-gray-900 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} AI Platform. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
