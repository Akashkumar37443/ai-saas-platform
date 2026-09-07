import { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';

export function RoiCalculator() {
  const [activeUsers, setActiveUsers] = useState(500);
  const [avgPrice, setAvgPrice] = useState(49);
  const [callsPerUser, setCallsPerUser] = useState(150);

  // Calculations
  const monthlyRevenue = activeUsers * avgPrice;
  const annualRevenue = monthlyRevenue * 12;
  const totalApiCalls = activeUsers * callsPerUser;
  const infraCost = Math.round(totalApiCalls * 0.0035);
  const grossProfit = Math.max(0, monthlyRevenue - infraCost);
  const profitMargin = monthlyRevenue > 0 ? ((grossProfit / monthlyRevenue) * 100).toFixed(1) : '90';

  return (
    <section className="py-24 relative bg-[#0a0a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-semibold mb-4">
            <Calculator className="h-3.5 w-3.5" />
            Interactive ROI Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Calculate Your <span className="gradient-text">SaaS Revenue Potential</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            Estimate your monthly recurring revenue (MRR) and gross profit margins using our optimized inference architecture.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Slider Box */}
          <div className="lg:col-span-6 p-7 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-400" /> Platform Assumptions
            </h3>

            {/* Slider 1: Active Subscribers */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300 font-medium">Paying Subscribers</span>
                <span className="font-mono font-bold text-white text-base">{activeUsers.toLocaleString()} users</span>
              </div>
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={activeUsers}
                onChange={(e) => setActiveUsers(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[11px] text-gray-500 font-mono">
                <span>50</span>
                <span>2,500</span>
                <span>5,000</span>
              </div>
            </div>

            {/* Slider 2: Average Subscription Price */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300 font-medium">Monthly Plan Price</span>
                <span className="font-mono font-bold text-white text-base">${avgPrice} / mo</span>
              </div>
              <input
                type="range"
                min="19"
                max="199"
                step="10"
                value={avgPrice}
                onChange={(e) => setAvgPrice(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-[11px] text-gray-500 font-mono">
                <span>$19 (Starter)</span>
                <span>$49 (Pro)</span>
                <span>$199 (Enterprise)</span>
              </div>
            </div>

            {/* Slider 3: Usage volume */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300 font-medium">Monthly AI Prompts / User</span>
                <span className="font-mono font-bold text-white text-base">{callsPerUser} prompts</span>
              </div>
              <input
                type="range"
                min="20"
                max="1000"
                step="20"
                value={callsPerUser}
                onChange={(e) => setCallsPerUser(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
              <div className="flex justify-between text-[11px] text-gray-500 font-mono">
                <span>20</span>
                <span>500</span>
                <span>1,000</span>
              </div>
            </div>
          </div>

          {/* Revenue & Profit Display */}
          <div className="lg:col-span-6 p-7 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-black to-indigo-950/30 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Estimated MRR</div>
                  <div className="text-3xl sm:text-4xl font-black text-white mt-1 font-mono">
                    ${monthlyRevenue.toLocaleString()}
                    <span className="text-xs font-normal text-gray-400 ml-1">/ month</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Annual Run-Rate</div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1 font-mono">
                    ${annualRevenue.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Profit & Cost Breakdown */}
              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/8">
                  <div className="text-xs text-gray-400">Estimated AI Cost</div>
                  <div className="text-lg font-bold text-rose-300 mt-1 font-mono">
                    ${infraCost.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{totalApiCalls.toLocaleString()} total calls</div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/8">
                  <div className="text-xs text-gray-400">Gross Margin</div>
                  <div className="text-lg font-bold text-emerald-300 mt-1 font-mono">
                    {profitMargin}%
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">${grossProfit.toLocaleString()} net profit</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-400 text-center sm:text-left">
                Ready to monetize your AI SaaS in days?
              </div>
              <Link to="/register" className="w-full sm:w-auto">
                <Button size="md" className="w-full sm:w-auto">
                  Start Your SaaS <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
