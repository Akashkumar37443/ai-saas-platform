import { useState } from 'react';
import { Check, X, Sparkles, Zap, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: 'Starter',
      monthlyPrice: 19,
      annualPrice: 15,
      description: 'Ideal for indie hackers and developers building their first AI MVP.',
      features: [
        { name: '100,000 Tokens included/mo', included: true },
        { name: 'GPT-3.5 & Llama 3.3 access', included: true },
        { name: '3 Active API Keys', included: true },
        { name: 'Community Discord Support', included: true },
        { name: 'Standard Analytics Dashboard', included: true },
        { name: 'GPT-4o & Claude 3.5 Sonnet', included: false },
        { name: 'DALL-E 3 Image Studio', included: false },
        { name: 'Custom Fine-Tuning', included: false },
      ],
      cta: 'Start Free Trial',
      highlighted: false,
      badge: null,
    },
    {
      name: 'Pro',
      monthlyPrice: 49,
      annualPrice: 39,
      description: 'For growing startups requiring flagship reasoning and image generation.',
      features: [
        { name: '500,000 Tokens included/mo', included: true },
        { name: 'GPT-4o, Claude 3.5 & Gemini Pro', included: true },
        { name: '15 Active API Keys + IP Filtering', included: true },
        { name: 'DALL-E 3 Image Studio (HD)', included: true },
        { name: 'Real-time Streaming SSE API', included: true },
        { name: 'Advanced Token Usage Analytics', included: true },
        { name: '12-Hour Priority Support', included: true },
        { name: 'Custom Fine-Tuning SLA', included: false },
      ],
      cta: 'Start Pro Plan',
      highlighted: true,
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise',
      monthlyPrice: 199,
      annualPrice: 159,
      description: 'For organizations demanding dedicated throughput, SLAs, and fine-tuning.',
      features: [
        { name: 'Unlimited Fair-Use Tokens', included: true },
        { name: 'All 50+ Global AI Models', included: true },
        { name: 'Unlimited API Keys & Scopes', included: true },
        { name: 'Dedicated Fast Worker Gateway', included: true },
        { name: 'Custom Model Fine-Tuning & RAG', included: true },
        { name: 'SOC2 & HIPAA Compliance Ready', included: true },
        { name: '1-Hour Dedicated SLA Support', included: true },
        { name: 'Dedicated Account Engineer', included: true },
      ],
      cta: 'Get Enterprise',
      highlighted: false,
      badge: 'Maximum Scale',
    },
  ];

  return (
    <section id="pricing" className="py-24 relative bg-[#0a0a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-4">
            <Zap className="h-3.5 w-3.5" />
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Simple Plans for <span className="gradient-text">Every Scale</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            Start with our generous free trial. Upgrade or cancel anytime with zero lock-in.
          </p>

          {/* Billing Cycle Toggle Switch */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                !isAnnual ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                isAnnual ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            return (
              <div
                key={tier.name}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  tier.highlighted
                    ? 'border-2 border-indigo-500 bg-gradient-to-b from-indigo-950/40 via-purple-950/20 to-black shadow-2xl shadow-indigo-500/20 ring-1 ring-indigo-500/50 -translate-y-2'
                    : 'border border-white/10 bg-white/[0.02] backdrop-blur-xl hover:border-white/20'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/30">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 min-h-[32px] leading-relaxed">{tier.description}</p>

                  <div className="my-6 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-white font-mono">${price}</span>
                      <span className="text-sm text-gray-400 font-medium">/ month</span>
                    </div>
                    {isAnnual && (
                      <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                        Billed annually (${price * 12}/yr)
                      </div>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pb-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Included Features</div>
                    {tier.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                        {feat.included ? (
                          <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-4 w-4 text-gray-600 shrink-0 mt-0.5" />
                        )}
                        <span className={feat.included ? 'text-gray-200' : 'text-gray-500 line-through'}>
                          {feat.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/register" className="w-full block">
                  <Button
                    variant={tier.highlighted ? 'primary' : 'outline'}
                    size="lg"
                    className="w-full shadow-lg"
                  >
                    {tier.cta} <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
