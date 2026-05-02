import { 
  MessageSquare, 
  Image, 
  Code, 
  BarChart3, 
  Webhook, 
  Shield,
  Zap,
  Globe,
  Clock
} from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: 'Text Generation',
    description: 'Access GPT-4, Claude, and other leading LLMs through a unified API with streaming support.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Image,
    title: 'Image Synthesis',
    description: 'Generate stunning images with DALL-E 3, Midjourney, and Stable Diffusion models.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Code,
    title: 'Code Assistant',
    description: 'Get intelligent code completions, reviews, and explanations powered by CodeT5 and Copilot.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Real-time insights into API usage, latency, and costs with detailed reporting.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: Webhook,
    title: 'Webhooks & Events',
    description: 'Subscribe to real-time events and integrate seamlessly with your existing workflows.',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 Type II certified with end-to-end encryption and role-based access control.',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: Zap,
    title: 'Edge Caching',
    description: 'Global CDN with intelligent caching reduces latency to under 100ms worldwide.',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    icon: Globe,
    title: 'Multi-language',
    description: 'Support for 50+ languages with automatic translation and localization features.',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Dedicated support team with 99.9% SLA guarantee for enterprise customers.',
    color: 'bg-indigo-100 text-indigo-600',
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">
              Build with AI
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive suite of AI tools and APIs designed for developers, by developers.
            Ship faster with our battle-tested infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
