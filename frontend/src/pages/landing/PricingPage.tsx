import { Pricing } from '@/components/landing/Pricing';
import { FaqAccordion } from '@/components/landing/FaqAccordion';
import { RoiCalculator } from '@/components/landing/RoiCalculator';
import { Check, X, Sparkles } from 'lucide-react';

export function PricingPage() {
  const comparisonRows = [
    { feature: 'Monthly Included Tokens', starter: '100,000', pro: '500,000', enterprise: 'Unlimited' },
    { feature: 'Flagship Models (GPT-4o, Claude 3.5)', starter: false, pro: true, enterprise: true },
    { feature: 'Fast Models (GPT-3.5, Llama 3.3)', starter: true, pro: true, enterprise: true },
    { feature: 'DALL-E 3 Image Generation', starter: false, pro: true, enterprise: true },
    { feature: 'Streaming SSE API Protocol', starter: true, pro: true, enterprise: true },
    { feature: 'Active API Keys Limit', starter: '3 Keys', pro: '15 Keys', enterprise: 'Unlimited' },
    { feature: 'API Key IP Whitelisting', starter: false, pro: true, enterprise: true },
    { feature: 'Detailed Analytics & Cost Center', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom BI' },
    { feature: 'Custom Model Fine-Tuning', starter: false, pro: false, enterprise: true },
    { feature: 'Support SLA', starter: 'Community', pro: '12-Hour Priority', enterprise: '1-Hour Dedicated' },
  ];

  return (
    <div className="pt-24 pb-20">
      <Pricing />
      <RoiCalculator />

      {/* Feature Comparison Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Comprehensive Breakdown
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Compare All <span className="gradient-text">Plan Features</span>
          </h2>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="p-5 text-sm font-bold text-gray-300">Feature</th>
                  <th className="p-5 text-sm font-bold text-white text-center">Starter ($19/mo)</th>
                  <th className="p-5 text-sm font-bold text-indigo-400 text-center">Pro ($49/mo)</th>
                  <th className="p-5 text-sm font-bold text-purple-400 text-center">Enterprise ($199/mo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition">
                    <td className="p-4 sm:p-5 font-medium text-gray-300">{row.feature}</td>
                    
                    {/* Starter */}
                    <td className="p-4 sm:p-5 text-center text-gray-400">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : <X className="h-4 w-4 text-gray-600 mx-auto" />
                      ) : (
                        <span className="font-mono text-white">{row.starter}</span>
                      )}
                    </td>

                    {/* Pro */}
                    <td className="p-4 sm:p-5 text-center text-indigo-300 bg-indigo-500/[0.02]">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : <X className="h-4 w-4 text-gray-600 mx-auto" />
                      ) : (
                        <span className="font-mono font-bold text-white">{row.pro}</span>
                      )}
                    </td>

                    {/* Enterprise */}
                    <td className="p-4 sm:p-5 text-center text-purple-300">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? <Check className="h-4 w-4 text-emerald-400 mx-auto" /> : <X className="h-4 w-4 text-gray-600 mx-auto" />
                      ) : (
                        <span className="font-mono font-bold text-white">{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <FaqAccordion />
    </div>
  );
}

export default PricingPage;
