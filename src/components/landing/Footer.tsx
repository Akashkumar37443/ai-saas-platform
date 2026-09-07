import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { success } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    success('Subscribed successfully!', 'Thank you for joining our AI developer newsletter.');
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const productLinks = [
    { name: 'Features Matrix', href: '/features' },
    { name: 'Model Explorer', href: '/#models' },
    { name: 'Pricing Plans', href: '/pricing' },
    { name: 'API Documentation', href: '/docs' },
    { name: 'Contact & Sales', href: '/contact' },
  ];

  const portals = [
    { name: 'Developer AI Studio', href: '/dashboard' },
    { name: 'API Key Manager', href: '/dashboard/api-keys' },
    { name: 'Usage Analytics', href: '/dashboard/usage' },
    { name: 'Admin Dashboard', href: '/admin' },
    { name: 'Admin Login', href: '/admin/login' },
  ];

  const documentation = [
    { name: 'Quickstart Guide', href: '/docs' },
    { name: 'FastAPI Architecture', href: '/docs' },
    { name: 'Streaming SSE Protocol', href: '/docs' },
    { name: 'Swagger /docs URL', href: 'http://localhost:8000/docs', external: true },
  ];

  const legal = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Security Audit', href: '#' },
    { name: 'Codester Commercial License', href: '#' },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#06060a] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                AI<span className="gradient-text">Platform</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Production-ready AI SaaS starter template built with React 18, TypeScript, TailwindCSS, and Python FastAPI.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="pt-2 max-w-sm">
              <div className="text-xs font-semibold text-gray-300 mb-2">Subscribe to AI Product Updates</div>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition flex items-center gap-1 shrink-0"
                >
                  <Send className="h-3.5 w-3.5" />
                  Join
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-emerald-400 mt-1.5 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="h-3 w-3" /> Subscribed successfully!
                </div>
              )}
            </form>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-300">Product</div>
            <ul className="space-y-2">
              {productLinks.map((l) => (
                <li key={l.name}>
                  <Link to={l.href} className="text-xs text-gray-400 hover:text-white transition">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-300">Portals</div>
            <ul className="space-y-2">
              {portals.map((l) => (
                <li key={l.name}>
                  <Link to={l.href} className="text-xs text-gray-400 hover:text-white transition">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentation & Legal */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-300">Developers & Legal</div>
            <ul className="space-y-2">
              {documentation.map((l) => (
                <li key={l.name}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:underline">
                      {l.name} ↗
                    </a>
                  ) : (
                    <Link to={l.href} className="text-xs text-gray-400 hover:text-white transition">
                      {l.name}
                    </Link>
                  )}
                </li>
              ))}
              {legal.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="text-xs text-gray-500 hover:text-gray-300 transition">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} AI SaaS Platform. All rights reserved. Ready to sell on Codester.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-400 font-mono">FastAPI Backend Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
