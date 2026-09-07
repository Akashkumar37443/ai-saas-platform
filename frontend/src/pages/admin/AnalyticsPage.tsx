import { useState, useEffect } from 'react';
import { Chart } from '@/components/dashboard/Chart';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { BarChart3, Clock, AlertTriangle, DollarSign, Cpu, TrendingUp, Sparkles, Layers } from 'lucide-react';
import { api } from '@/services/api';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    api.admin.getAnalytics().then((d) => setAnalytics(d));
  }, []);

  const chartData = [
    { date: 'Week 1', value: 45000 },
    { date: 'Week 2', value: 52000 },
    { date: 'Week 3', value: 48000 },
    { date: 'Week 4', value: 61000 },
    { date: 'Week 5', value: 58000 },
    { date: 'Week 6', value: 67000 },
  ];

  const providerBreakdown = analytics?.charts?.provider_breakdown || [
    { provider: 'OpenAI (GPT-4o & DALL-E 3)', cost: 2840, share: 58 },
    { provider: 'Anthropic (Claude 3.5 Sonnet)', cost: 1120, share: 23 },
    { provider: 'Groq / Llama 3.3', cost: 480, share: 10 },
    { provider: 'Google (Gemini 1.5 Pro)', cost: 385, share: 9 },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
          <BarChart3 className="h-7 w-7 text-purple-400" />
          Analytics & AI Cost Center
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Deep-dive telemetry into request volumes, LLM provider expense margins, and error rates.
        </p>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Monthly Requests"
          value={154320}
          change={18.2}
          changeLabel="vs last month"
          icon={<BarChart3 className="h-4 w-4 text-purple-400" />}
          accentColor="#a855f7"
        />
        <StatCard
          title="Avg. Inference Latency"
          value={52}
          change={-12.3}
          changeLabel="ms (faster)"
          icon={<Clock className="h-4 w-4 text-cyan-400" />}
          accentColor="#22d3ee"
        />
        <StatCard
          title="System Error Rate"
          value={0.08}
          change={-0.03}
          changeLabel="99.92% success"
          icon={<AlertTriangle className="h-4 w-4 text-amber-400" />}
          accentColor="#f59e0b"
        />
        <StatCard
          title="Gross Margin"
          value={89.4}
          change={3.5}
          changeLabel="profit margin"
          icon={<DollarSign className="h-4 w-4 text-emerald-400" />}
          accentColor="#10b981"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <Chart
            title="Weekly Request Volume Growth"
            data={chartData}
            dataKey="value"
            color="#a855f7"
          />
        </div>

        {/* Cost Distribution */}
        <Card className="lg:col-span-4 p-6 space-y-5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu className="h-4 w-4 text-purple-400" /> Provider Expense Breakdown
          </h3>

          <div className="space-y-4">
            {providerBreakdown.map((item: any) => (
              <div key={item.provider} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-gray-200">{item.provider}</span>
                  <span className="font-mono text-purple-300 font-bold">
                    ${item.cost.toLocaleString()} ({item.share}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                    style={{ width: `${item.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-white/5 text-xs text-gray-400 flex items-center justify-between">
            <span>Total Provider Invoiced:</span>
            <span className="font-mono font-bold text-white">$4,825.00</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
