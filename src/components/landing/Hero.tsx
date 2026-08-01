import { ArrowRight, Play, Zap, Shield, Globe, Star, TrendingUp } from 'lucide-react'
import { Button } from '../common/Button'

export function Hero() {
  const stats = [
    { value: '99.9%', label: 'Uptime SLA', icon: '🔒' },
    { value: '<100ms', label: 'Response Time', icon: '⚡' },
    { value: '10M+', label: 'API Calls/Day', icon: '📡' },
    { value: '50+', label: 'AI Models', icon: '🤖' },
  ]

  const trustedBy = ['OpenAI', 'Anthropic', 'Mistral', 'Google', 'Meta']

  const codeLines = [
    { tokens: [{ t: 'import', c: 'text-pink-400' }, { t: ' { AIPlatform } ', c: 'text-gray-300' }, { t: 'from', c: 'text-pink-400' }, { t: " '@aiplatform/sdk'", c: 'text-green-400' }] },
    { tokens: [] },
    { tokens: [{ t: 'const ', c: 'text-pink-400' }, { t: 'ai', c: 'text-cyan-400' }, { t: ' = ', c: 'text-gray-400' }, { t: 'new AIPlatform', c: 'text-yellow-400' }, { t: '({', c: 'text-gray-300' }] },
    { tokens: [{ t: '  apiKey', c: 'text-cyan-300' }, { t: ': ', c: 'text-gray-400' }, { t: "'your-api-key'", c: 'text-green-400' }] },
    { tokens: [{ t: '})', c: 'text-gray-300' }] },
    { tokens: [] },
    { tokens: [{ t: '// ', c: 'text-gray-500' }, { t: 'Generate text with GPT-4o', c: 'text-gray-500' }] },
    { tokens: [{ t: 'const ', c: 'text-pink-400' }, { t: 'response', c: 'text-cyan-400' }, { t: ' = await ', c: 'text-pink-400' }, { t: 'ai', c: 'text-cyan-400' }, { t: '.chat.', c: 'text-gray-300' }, { t: 'create', c: 'text-yellow-400' }, { t: '({', c: 'text-gray-300' }] },
    { tokens: [{ t: '  model', c: 'text-cyan-300' }, { t: ': ', c: 'text-gray-400' }, { t: "'gpt-4o'", c: 'text-green-400' }, { t: ',', c: 'text-gray-400' }] },
    { tokens: [{ t: '  messages', c: 'text-cyan-300' }, { t: ': [{', c: 'text-gray-300' }, { t: ' role', c: 'text-cyan-300' }, { t: ': ', c: 'text-gray-400' }, { t: "'user'", c: 'text-green-400' }, { t: ' }]', c: 'text-gray-300' }] },
    { tokens: [{ t: '})', c: 'text-gray-300' }] },
    { tokens: [] },
    { tokens: [{ t: 'console', c: 'text-cyan-400' }, { t: '.', c: 'text-gray-300' }, { t: 'log', c: 'text-yellow-400' }, { t: '(response)', c: 'text-gray-300' }] },
  ]

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-dark-900">
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="orb w-[600px] h-[600px] -top-40 -left-40 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)' }}
        />
        <div
          className="orb w-[500px] h-[500px] top-1/3 -right-40 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, rgba(217,70,239,0.15) 0%, transparent 70%)', animationDelay: '2s' }}
        />
        <div
          className="orb w-[300px] h-[300px] bottom-20 left-1/3 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)', animationDelay: '4s' }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="badge-primary">
                <Zap className="h-3 w-3" />
                Now with GPT-4o & Claude 3.5
              </span>
              <span className="flex items-center gap-1 text-yellow-400 text-xs font-medium">
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <span className="text-gray-400 ml-1">4.9/5</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight">
              <span className="text-white">Build AI Apps</span>
              <br />
              <span className="relative inline-block">
                <span className="gradient-text">in Minutes</span>
                {/* Underline accent */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <path
                    d="M0 8 Q75 0 150 8 Q225 16 300 8"
                    stroke="url(#grad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#e879f9" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Access <strong className="text-gray-200">50+ cutting-edge AI models</strong> through a simple, unified API. From text generation to image synthesis — ship faster than ever.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button size="lg" className="group w-full sm:w-auto">
                Start Building Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto group">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-1"
                  style={{ background: 'rgba(99,102,241,0.2)' }}>
                  <Play className="h-3.5 w-3.5 text-primary-400 ml-0.5" />
                </div>
                Watch Demo
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mb-12">
              <p className="text-xs text-gray-600 uppercase tracking-widest mb-3 font-medium">
                Trusted by teams at
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start items-center">
                {trustedBy.map((name) => (
                  <span
                    key={name}
                    className="text-sm font-semibold text-gray-500 hover:text-gray-300 transition-colors cursor-default"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left group">
                  <div className="text-2xl md:text-3xl font-extrabold text-white mb-0.5 group-hover:gradient-text transition-all">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 justify-center lg:justify-start">
                    <span>{stat.icon}</span>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Code Demo */}
          <div className="relative min-w-0 w-full animate-float">
            {/* Main code card */}
            <div
              className="relative rounded-2xl border border-white/10 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(15,15,26,0.95) 0%, rgba(10,10,15,0.98) 100%)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-xs text-gray-500 font-mono bg-white/5 px-3 py-1 rounded-full border border-white/8">
                    api-demo.js
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="glow-dot" />
                  <span className="text-xs text-green-400">Live</span>
                </div>
              </div>

              {/* Code content */}
              <div className="p-5 font-mono text-sm leading-7 overflow-x-auto">
                {codeLines.map((line, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-gray-700 text-xs w-4 shrink-0 mt-1 select-none">{i + 1}</span>
                    <div>
                      {line.tokens.map((token, j) => (
                        <span key={j} className={token.c}>{token.t}</span>
                      ))}
                      {line.tokens.length === 0 && <span>&nbsp;</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Response preview */}
              <div className="mx-5 mb-5 rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="glow-dot" />
                  <span className="text-xs text-green-400 font-mono font-semibold">Response received — 87ms</span>
                </div>
                <p className="text-xs text-gray-400 font-mono">
                  <span className="text-gray-500">{'{ role: '}</span>
                  <span className="text-green-400">'assistant'</span>
                  <span className="text-gray-500">{', content: '}</span>
                  <span className="text-yellow-400">'Hello! How can I help?'</span>
                  <span className="text-gray-500">{' }'}</span>
                </p>
              </div>
            </div>

            {/* Floating badge: Enterprise */}
            <div
              className="absolute -top-5 -right-5 glass-card p-4 flex items-center gap-3 rounded-2xl border-white/15 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Enterprise Ready</div>
                <div className="text-xs text-gray-500">SOC 2 · ISO 27001</div>
              </div>
            </div>

            {/* Floating badge: Global CDN */}
            <div
              className="absolute -bottom-5 -left-5 glass-card p-4 flex items-center gap-3 rounded-2xl border-white/15 animate-slide-in-right"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/10 border border-primary-500/20 flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Global CDN</div>
                <div className="text-xs text-gray-500">15 Edge Locations</div>
              </div>
            </div>

            {/* Floating badge: Trending */}
            <div
              className="absolute top-1/2 -right-8 glass-card p-3 flex items-center gap-2 rounded-xl border-white/10 animate-fade-in-up"
              style={{ animationDelay: '0.7s' }}
            >
              <TrendingUp className="h-4 w-4 text-accent-400" />
              <span className="text-xs text-white font-semibold">+42% this week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(10,10,15,0.8))' }}
      />
    </section>
  )
}
