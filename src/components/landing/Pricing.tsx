import { Check, X, Sparkles, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
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
    ctaLink: '/register',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Pro',
    price: 49,
    description: 'For growing startups and small teams',
    features: [
      { name: '50,000 API calls/month', included: true },
      { name: 'GPT-4o & Claude 3.5', included: true },
      { name: 'Image generation (DALL-E 3)', included: true },
      { name: 'Email support', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Team collaboration', included: true },
      { name: 'Priority support', included: false },
      { name: 'Custom models', included: false },
    ],
    cta: 'Start Pro Trial',
    ctaLink: '/register',
    highlighted: true,
    badge: 'Most Popular',
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
    ctaLink: '#',
    highlighted: false,
    badge: null,
  },
]

export function Pricing() {
  return (
    <section className="py-28 relative overflow-hidden" id="pricing">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="orb w-[600px] h-[600px] top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="orb w-[400px] h-[400px] bottom-0 left-0"
          style={{ background: 'radial-gradient(circle, rgba(217,70,239,0.08) 0%, transparent 70%)' }}
        />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="badge-primary inline-flex mb-4">
            <Sparkles className="h-3 w-3" />
            Simple, transparent pricing
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Plans That{' '}
            <span className="gradient-text">Scale With You</span>
          </h2>
          <p className="text-lg text-gray-400">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2">
            <span className="text-sm font-medium text-white">Monthly</span>
            <div className="w-10 h-5 bg-primary-600 rounded-full flex items-center px-0.5 cursor-pointer">
              <div className="w-4 h-4 rounded-full bg-white translate-x-5 transition-transform" />
            </div>
            <span className="text-sm font-medium text-gray-400">
              Annual{' '}
              <span className="badge-success ml-1">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-md mx-auto lg:max-w-none items-start">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'relative rounded-2xl border transition-all duration-300 overflow-hidden group',
                tier.highlighted
                  ? 'border-primary-500/50 lg:scale-105'
                  : 'border-white/10 hover:border-white/20'
              )}
              style={{
                background: tier.highlighted
                  ? 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.08) 50%, rgba(99,102,241,0.04) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                boxShadow: tier.highlighted
                  ? '0 0 40px rgba(99,102,241,0.15), 0 8px 32px rgba(0,0,0,0.3)'
                  : '0 8px 32px rgba(0,0,0,0.2)',
              }}
            >
              {/* Popular badge */}
              {tier.badge && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2">
                  <div
                    className="px-4 py-1.5 text-xs font-bold text-white rounded-b-xl flex items-center gap-1.5"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                  >
                    <Zap className="h-3 w-3" />
                    {tier.badge}
                  </div>
                </div>
              )}

              <div className="relative p-8">
                {/* Tier header */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-1">{tier.name}</h3>
                  <p className="text-sm text-gray-500">{tier.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-end gap-1">
                    <span
                      className={cn(
                        'text-5xl font-extrabold tracking-tight',
                        tier.highlighted ? 'gradient-text' : 'text-white'
                      )}
                    >
                      {typeof tier.price === 'number' ? `$${tier.price}` : tier.price}
                    </span>
                    {typeof tier.price === 'number' && tier.price > 0 && (
                      <span className="text-gray-500 mb-2">/month</span>
                    )}
                    {tier.price === 0 && (
                      <span className="text-gray-500 mb-2">forever</span>
                    )}
                  </div>
                  {typeof tier.price === 'number' && tier.price > 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                      ${Math.floor(tier.price * 0.8)}/mo billed annually
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Link to={tier.ctaLink}>
                  <Button
                    variant={tier.highlighted ? 'primary' : 'outline'}
                    className="w-full mb-8 justify-center"
                    id={`pricing-cta-${tier.name.toLowerCase()}`}
                  >
                    {tier.cta}
                  </Button>
                </Link>

                {/* Divider */}
                <div className="border-t border-white/8 mb-6" />

                {/* Features list */}
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature.name} className="flex items-center gap-3">
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-emerald-400" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <X className="h-3 w-3 text-gray-600" />
                        </div>
                      )}
                      <span
                        className={cn(
                          'text-sm',
                          feature.included ? 'text-gray-300' : 'text-gray-600'
                        )}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-gray-600 mt-12">
          All plans include a 14-day free trial. No credit card required.{' '}
          <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">
            View full comparison →
          </a>
        </p>
      </div>
    </section>
  )
}
