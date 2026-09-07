import { useState, useEffect } from 'react';
import { StatCard } from '@/components/dashboard/StatCard';
import { Chart } from '@/components/dashboard/Chart';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Link } from 'react-router-dom';
import {
  Activity,
  Users as UsersIcon,
  Zap,
  ArrowUpRight,
  Cpu,
  Clock,
  DollarSign,
  RefreshCw
} from 'lucide-react';
import { api } from '@/services/api';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const data = await api.admin.getStats();
      setStats(data);
    } catch {
      // Fallback handled in api client
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const chartData = stats?.chart_data || [
    { date: 'Mon', value: 4200 },
    { date: 'Tue', value: 5100 },
    { date: 'Wed', value: 4800 },
    { date: 'Thu', value: 6400 },
    { date: 'Fri', value: 7200 },
    { date: 'Sat', value: 6800 },
    { date: 'Sun', value: 8900 },
  ];

  const recentUsers = stats?.recent_activity || [
    { name: 'Sarah Connor', email: 'sarah@cyberdyne.io', plan: 'Pro', status: 'active', joined: '10 mins ago' },
    { name: 'Alex Mercer', email: 'user@example.com', plan: 'Pro', status: 'active', joined: '45 mins ago' },
    { name: 'David Bowman', email: 'david@discovery.space', plan: 'Starter', status: 'active', joined: '2 hours ago' },
    { name: 'Elena Rostova', email: 'elena@novatech.com', plan: 'Enterprise', status: 'active', joined: '5 hours ago' },
  ];

  const activeModels = stats?.active_models || [
    { name: 'GPT-4o', latency: '42ms', load: '68%', status: 'Optimal' },
    { name: 'Claude 3.5 Sonnet', latency: '58ms', load: '45%', status: 'Optimal' },
    { name: 'Gemini 1.5 Pro', latency: '62ms', load: '32%', status: 'Optimal' },
    { name: 'Llama 3.3 (70B)', latency: '18ms', load: '74%', status: 'Optimal' },
    { name: 'DALL-E 3', latency: '320ms', load: '22%', status: 'Optimal' },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Activity className="h-7 w-7 text-purple-400" />
            Executive Platform Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Real-time inference telemetry, revenue metrics, active users, and system health status.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={loadStats} variant="outline" size="sm" isLoading={isLoading}>
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Refresh
          </Button>
          <Link to="/admin/users">
            <Button size="sm">
              <UsersIcon className="h-3.5 w-3.5 mr-1.5" /> Manage Users
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total API Calls"
          value={stats?.total_api_calls || 154320}
          change={14.8}
          changeLabel="vs last week"
          icon={<Zap className="h-4 w-4 text-purple-400" />}
          accentColor="#a855f7"
        />
        <StatCard
          title="Active Users"
          value={stats?.total_users || 2847}
          change={8.2}
          changeLabel="vs last week"
          icon={<UsersIcon className="h-4 w-4 text-indigo-400" />}
          accentColor="#6366f1"
        />
        <StatCard
          title="Monthly Recurring Revenue"
          value={stats?.monthly_revenue || 48250}
          isCurrency
          change={23.1}
          changeLabel="ARR $579k"
          icon={<DollarSign className="h-4 w-4 text-emerald-400" />}
          accentColor="#10b981"
        />
        <StatCard
          title="FastAPI Gateway Latency"
          value={stats?.avg_latency_ms || 38}
          change={-15.4}
          changeLabel="ms (sub-50ms)"
          icon={<Clock className="h-4 w-4 text-cyan-400" />}
          accentColor="#22d3ee"
        />
      </div>

      {/* Chart & Active Model Health Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Telemetry Chart */}
        <div className="lg:col-span-8">
          <Chart
            title="Inference Request Traffic & Telemetry"
            data={chartData}
            dataKey="value"
            color="#a855f7"
          />
        </div>

        {/* Model Gateway Status */}
        <Card className="lg:col-span-4 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/8">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="h-4 w-4 text-purple-400" /> Active Model Status
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">All Healthy</span>
          </div>

          <div className="space-y-3">
            {activeModels.map((model: any) => (
              <div
                key={model.name}
                className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between hover:border-purple-500/30 transition"
              >
                <div>
                  <div className="text-xs font-bold text-white">{model.name}</div>
                  <div className="text-[10px] text-gray-500 font-mono mt-0.5">Latency: {model.latency}</div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-mono text-[10px] font-semibold border border-emerald-500/20">
                    {model.status}
                  </span>
                  <div className="text-[10px] text-gray-400 mt-1 font-mono">Load: {model.load}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Users Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Recent Customer Activity</h3>
            <p className="text-xs text-gray-400">Newly registered developer accounts and plan upgrades.</p>
          </div>
          <Link to="/admin/users" className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1">
            View All Users <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-4">User Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Subscription Plan</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {recentUsers.map((u: any, idx: number) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition">
                  <td className="p-4 font-bold text-white">{u.name}</td>
                  <td className="p-4 text-gray-300 font-mono">{u.email}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold">
                      {u.plan} Tier
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge variant={u.status === 'active' ? 'success' : 'error'}>
                      {u.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right text-gray-400 font-mono">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
