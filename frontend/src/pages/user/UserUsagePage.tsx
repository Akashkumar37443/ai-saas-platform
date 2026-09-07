import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { StatCard } from '@/components/dashboard/StatCard';
import { Chart } from '@/components/dashboard/Chart';
import { BarChart3, Clock, Zap, Cpu, History, ArrowUpRight, DollarSign } from 'lucide-react';
import { api } from '@/services/api';

export function UserUsagePage() {
  const [usageData, setUsageData] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.user.getUsage().then((d) => setUsageData(d));
    api.user.getStats().then((s) => setStats(s));
  }, []);

  const chartData = usageData?.chart_data || [
    { date: 'Mon', value: 4200 },
    { date: 'Tue', value: 7800 },
    { date: 'Wed', value: 5100 },
    { date: 'Thu', value: 9400 },
    { date: 'Fri', value: 12100 },
    { date: 'Sat', value: 8200 },
    { date: 'Sun', value: 14500 },
  ];

  const modelBreakdown = usageData?.model_breakdown || [
    { model: 'GPT-4o', percentage: 54, tokens: 32800 },
    { model: 'Claude 3.5 Sonnet', percentage: 28, tokens: 17200 },
    { model: 'DALL-E 3', percentage: 12, tokens: 7400 },
    { model: 'Llama 3.3', percentage: 6, tokens: 3900 },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
          <BarChart3 className="h-7 w-7 text-indigo-400" />
          Usage & Consumption Analytics
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Monitor your real-time token consumption, model distribution, and recent inference requests.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Tokens Consumed"
          value={stats?.tokens_consumed || 38420}
          change={12.4}
          changeLabel="vs last week"
          icon={<Zap className="h-4 w-4 text-indigo-400" />}
          accentColor="#6366f1"
        />
        <StatCard
          title="Total API Calls"
          value={stats?.total_requests || 1542}
          change={8.5}
          changeLabel="vs last week"
          icon={<Cpu className="h-4 w-4 text-purple-400" />}
          accentColor="#a855f7"
        />
        <StatCard
          title="Estimated Cost"
          value={18.42}
          isCurrency
          change={4.2}
          changeLabel="metered"
          icon={<DollarSign className="h-4 w-4 text-emerald-400" />}
          accentColor="#10b981"
        />
        <StatCard
          title="Active API Keys"
          value={stats?.active_api_keys || 3}
          change={0}
          changeLabel="active now"
          icon={<Clock className="h-4 w-4 text-cyan-400" />}
          accentColor="#22d3ee"
        />
      </div>

      {/* Chart & Model Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Usage Over Time Chart */}
        <div className="lg:col-span-8">
          <Chart
            title="Daily Token Consumption"
            data={chartData}
            dataKey="value"
            color="#6366f1"
          />
        </div>

        {/* Model Breakdown */}
        <Card className="lg:col-span-4 p-6 space-y-5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu className="h-4 w-4 text-indigo-400" /> Model Consumption Share
          </h3>

          <div className="space-y-4">
            {modelBreakdown.map((item: any) => (
              <div key={item.model} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-gray-200">{item.model}</span>
                  <span className="font-mono text-gray-400">
                    {item.tokens.toLocaleString()} tokens ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Generations Log */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <History className="h-4 w-4 text-indigo-400" /> Recent Generation Activity
          </h3>
          <span className="text-xs text-gray-400">Last 10 executions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-4">Model</th>
                <th className="p-4">Prompt Excerpt</th>
                <th className="p-4">Tokens Used</th>
                <th className="p-4">Type</th>
                <th className="p-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {(usageData?.recent_generations || []).map((gen: any) => (
                <tr key={gen.id} className="hover:bg-white/[0.02] transition">
                  <td className="p-4 font-mono font-bold text-indigo-300">{gen.model}</td>
                  <td className="p-4 text-gray-300 font-mono truncate max-w-xs">{gen.prompt}</td>
                  <td className="p-4 font-mono text-white">{gen.tokens_used} tokens</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-gray-300 font-mono text-[10px] uppercase">
                      {gen.type}
                    </span>
                  </td>
                  <td className="p-4 text-right text-gray-400 font-mono">
                    {new Date(gen.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default UserUsagePage;
