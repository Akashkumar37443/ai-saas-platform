import { Check, X } from 'lucide-react'
import { Button } from '../common/Button'
import { cn } from '@/utils/cn'

const tiers = [
  {
    name: 'Starter',
    price: 0,
    description: 'Perfect for side projects and experimentation',
    features: [
      { name: '1,000 API calls/month', included: true },
      { name: 'GPT-3.5 access', included: true },
      { name: 'Community support', included: true },
      { name: 'Basic analytics', included: true },
      { name: 'GPT-4 access', included: false },
      { name: 'Image generation', included: false },
      { name: 'Priority support', included: false },
      { name: 'Custom models', included: false },
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 49,
    description: 'For growing startups and small teams',
    features: [
      { name: '50,000 API calls/month', included: true },
      { name: 'GPT-4 & GPT-4 Turbo', included: true },
      { name: 'Image generation (DALL-E 3)', included: true },
      { name: 'Email support', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Team collaboration', included: true },
      { name: 'Priority support', included: false },
      { name: 'Custom models', included: false },
    ],
    cta: 'Start Pro Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with custom needs',
    features: [
      { name: 'Unlimited API calls', included: true },
      { name: 'All AI models included', included: true },
      { name: 'Dedicated infrastructure', included: true },
      { name: '24/7 phone support', included: true },
      { name: 'Custom model fine-tuning', included: true },
      { name: 'SLA guarantees', included: true },
      { name: 'SSO & advanced security', included: true },
      { name: 'Dedicated account manager', included: true },
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section className="py-20 bg-gray-50" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">
              Pricing
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-md mx-auto lg:max-w-6xl">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'relative rounded-2xl border p-8 transition-all duration-300',
                tier.highlighted
                  ? 'border-primary-500 shadow-xl scale-105 bg-white'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              )}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{tier.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  {typeof tier.price === 'number' ? `$${tier.price}` : tier.price}
                </span>
                {typeof tier.price === 'number' && tier.price > 0 && (
                  <span className="text-gray-600">/month</span>
                )}
              </div>

              <Button
                variant={tier.highlighted ? 'primary' : 'outline'}
                className="w-full mb-6"
              >
                {tier.cta}
              </Button>

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature.name} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={cn(
                        'text-sm',
                        feature.included ? 'text-gray-700' : 'text-gray-400'
                      )}
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
