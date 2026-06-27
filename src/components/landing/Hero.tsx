import { ArrowRight, Play, Zap, Shield, Globe } from 'lucide-react'
import { Button } from '../common/Button'

export function Hero() {
  const stats = [
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '<100ms', label: 'Response Time' },
    { value: '10M+', label: 'API Calls/Day' },
    { value: '50+', label: 'AI Models' },
  ]

  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Now with GPT-4 Turbo support
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Build AI-Powered Apps{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">
                in Minutes
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Access cutting-edge AI models through a simple, unified API. From text generation to image synthesis, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="w-full sm:w-auto">
                Start Building <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Play className="mr-2 h-5 w-5" /> Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 pt-8 border-t border-primary-200">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-w-0 w-full">
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4 sm:mb-6 pb-4 border-b border-gray-100">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="ml-4 text-xs sm:text-sm text-gray-500">api-demo.js</span>
              </div>
              <pre className="text-xs sm:text-sm md:text-base overflow-x-auto w-full">
                <code className="language-javascript">
{`import { AIPlatform } from '@aiplatform/sdk';

const ai = new AIPlatform({
  apiKey: 'your-api-key'
});

// Generate text with GPT-4
const response = await ai.chat.create({
  model: 'gpt-4-turbo',
  messages: [
    { role: 'user', content: 'Hello, AI!' }
  ]
});

console.log(response.choices[0].message);
// Output: { role: 'assistant', content: '...' }`}
                </code>
              </pre>
            </div>

            <div className="hidden sm:block absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-green-500" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Enterprise Ready</div>
                  <div className="text-xs text-gray-500">SOC 2 Compliant</div>
                </div>
              </div>
            </div>

            <div className="hidden sm:block absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <Globe className="h-8 w-8 text-primary-500" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Global CDN</div>
                  <div className="text-xs text-gray-500">15 Edge Locations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
