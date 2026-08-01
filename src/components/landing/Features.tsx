import {
  MessageSquare,
  Image,
  Code,
  BarChart3,
  Webhook,
  Shield,
  Zap,
  Globe,
  Clock,
} from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: 'Text Generation',
    description: 'Access GPT-4o, Claude 3.5, and other leading LLMs through a unified API with streaming support.',
    gradient: 'from-blue-500/20 to-indigo-500/10',
    iconColor: 'text-blue-400',
    border: 'border-blue-500/20',
    glow: 'rgba(59, 130, 246, 0.3)',
  },
  {
    icon: Image,
    title: 'Image Synthesis',
    description: 'Generate stunning visuals with DALL-E 3, Midjourney API, and Stable Diffusion models.',
    gradient: 'from-purple-500/20 to-pink-500/10',
    iconColor: 'text-purple-400',
    border: 'border-purple-500/20',
    glow: 'rgba(168, 85, 247, 0.3)',
  },
  {
    icon: Code,
    title: 'Code Assistant',
    description: 'Intelligent code completions, reviews, and explanations powered by CodeLlama and DeepSeek.',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    iconColor: 'text-emerald-400',
    border: 'border-emerald-500/20',
    glow: 'rgba(52, 211, 153, 0.3)',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Real-time insights into API usage, latency, and costs with detailed reporting.',
    gradient: 'from-orange-500/20 to-amber-500/10',
    iconColor: 'text-orange-400',
    border: 'border-orange-500/20',
    glow: 'rgba(251, 146, 60, 0.3)',
  },
  {
    icon: Webhook,
    title: 'Webhooks & Events',
    description: 'Subscribe to real-time events and integrate seamlessly with your existing workflows.',
    gradient: 'from-pink-500/20 to-rose-500/10',
    iconColor: 'text-pink-400',
    border: 'border-pink-500/20',
    glow: 'rgba(236, 72, 153, 0.3)',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 Type II certified with end-to-end encryption and role-based access control.',
    gradient: 'from-red-500/20 to-rose-500/10',
    iconColor: 'text-red-400',
    border: 'border-red-500/20',
    glow: 'rgba(239, 68, 68, 0.3)',
  },
  {
    icon: Zap,
    title: 'Edge Caching',
    description: 'Global CDN with intelligent caching reduces latency to under 100ms worldwide.',
    gradient: 'from-yellow-500/20 to-amber-500/10',
    iconColor: 'text-yellow-400',
    border: 'border-yellow-500/20',
    glow: 'rgba(234, 179, 8, 0.3)',
  },
  {
    icon: Globe,
    title: 'Multi-language',
    description: 'Support for 50+ languages with automatic translation and localization features.',
    gradient: 'from-teal-500/20 to-cyan-500/10',
    iconColor: 'text-teal-400',
    border: 'border-teal-500/20',
    glow: 'rgba(45, 212, 191, 0.3)',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Dedicated support team with 99.9% SLA guarantee for enterprise customers.',
    gradient: 'from-indigo-500/20 to-violet-500/10',
    iconColor: 'text-indigo-400',
    border: 'border-indigo-500/20',
    glow: 'rgba(99, 102, 241, 0.3)',
  },
]

export function Features() {
  return (
    <section className="py-28 relative overflow-hidden bg-dark-900" id="features">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="orb w-[500px] h-[500px] top-1/4 left-1/2 -translate-x-1/2"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
        />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="badge-primary inline-flex mb-4">
            <Zap className="h-3 w-3" />
            All the tools you need
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Everything You Need to{' '}
            <span className="gradient-text">Build with AI</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Comprehensive suite of AI tools and APIs designed for developers, by developers.{' '}
            <span className="text-gray-300">Ship faster</span> with our battle-tested infrastructure.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-6 rounded-2xl border border-white/8 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.02)',
                animationDelay: `${index * 0.05}s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.borderColor = feature.border.replace('border-', '').replace('/20', '')
                el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 30px ${feature.glow}`
                el.style.background = 'rgba(255,255,255,0.04)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.borderColor = ''
                el.style.boxShadow = ''
                el.style.background = 'rgba(255,255,255,0.02)'
              }}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} border ${feature.border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:gradient-text transition-all">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                {feature.description}
              </p>

              {/* Bottom gradient line on hover */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${feature.glow}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
