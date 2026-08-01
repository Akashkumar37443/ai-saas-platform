import { StatCard } from '@/components/dashboard/StatCard'
import { Chart } from '@/components/dashboard/Chart'
import { Card, CardHeader, CardContent } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Link } from 'react-router-dom'
import {
  Activity,
  Users as UsersIcon,
  Key as KeyIcon,
  Zap,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Clock,
  CheckCircle2,
} from 'lucide-react'

const mockChartData = [
  { date: 'Mon', value: 4200 },
  { date: 'Tue', value: 5100 },
  { date: 'Wed', value: 4800 },
  { date: 'Thu', value: 6400 },
  { date: 'Fri', value: 7200 },
  { date: 'Sat', value: 6800 },
  { date: 'Sun', value: 8900 },
]

const recentUsers = [
  { name: 'Sarah Connor', email: 'sarah@cyberdyne.io', plan: 'Pro', status: 'active', joined: '10 mins ago' },
  { name: 'Alex Mercer', email: 'alex@gentek.org', plan: 'Enterprise', status: 'active', joined: '45 mins ago' },
  { name: 'David Bowman', email: 'david@discovery.space', plan: 'Starter', status: 'active', joined: '2 hours ago' },
  { name: 'Elena Rostova', email: 'elena@novatech.com', plan: 'Pro', status: 'inactive', joined: '5 hours ago' },
]

const recentApiKeys = [
  { name: 'Production App Key', key: 'sk_live_...9f4a', calls: '48,120', status: 'active' },
  { name: 'Staging Server', key: 'sk_test_...3a1b', calls: '1,240', status: 'active' },
  { name: 'Mobile App Client', key: 'sk_live_...8c2e', calls: '12,980', status: 'active' },
]

const activeModels = [
  { name: 'GPT-4o', latency: '42ms', load: '68%', status: 'Optimal' },
  { name: 'Claude 3.5 Sonnet', latency: '65ms', load: '45%', status: 'Optimal' },
  { name: 'DALL-E 3', latency: '320ms', load: '22%', status: 'Optimal' },
  { name: 'Whisper v3', latency: '89ms', load: '12%', status: 'Optimal' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Overview Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">Real-time platform metrics, recent activities & active AI services.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/analytics">
            <Button variant="outline" size="sm">
              <Activity className="h-4 w-4 mr-1.5" /> Full Analytics
            </Button>
          </Link>
          <Link to="/admin/api-keys">
            <Button size="sm">
              <Zap className="h-4 w-4 mr-1.5" /> Create API Key
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total API Calls"
          value={154320}
          change={14.8}
          changeLabel="vs last week"
          icon={<Zap className="h-4 w-4 text-primary-400" />}
          accentColor="#6366f1"
        />
        <StatCard
          title="Active Users"
          value={2847}
          change={8.2}
          changeLabel="vs last week"
          icon={<UsersIcon className="h-4 w-4 text-accent-400" />}
          accentColor="#d946ef"
        />
        <StatCard
          title="Monthly Revenue"
          value={48250}
          isCurrency
          change={23.1}
          changeLabel="vs last week"
          icon={<TrendingUp className="h-4 w-4 text-emerald-400" />}
          accentColor="#10b981"
        />
        <StatCard
          title="Avg Latency"
          value={78}
          change={-5.3}
          changeLabel="ms (faster)"
          icon={<Clock className="h-4 w-4 text-cyan-400" />}
          accentColor="#22d3ee"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          title="API Requests (Last 7 Days)"
          data={mockChartData}
          color="#6366f1"
          dataKey="value"
        />
        <Chart
          title="Revenue Growth ($ USD)"
          data={mockChartData.map(d => ({ ...d, value: d.value * 5.2 }))}
          color="#10b981"
          dataKey="value"
        />
      </div>

      {/* Limited Summary Sections: Quick Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 1. Recent Users Summary */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between py-4 border-b border-white/8">
            <div className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4 text-primary-400" />
              <h3 className="text-sm font-bold text-white">Recent Users</h3>
            </div>
            <Link to="/admin/users" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-0.5">
              View All <ArrowUpRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {recentUsers.map((u) => (
                <div key={u.email} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div>
                    <div className="text-sm font-semibold text-white">{u.name}</div>
                    <div className="text-xs text-gray-500">{u.email}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant={u.plan === 'Enterprise' ? 'info' : u.plan === 'Pro' ? 'warning' : 'default'}>
                      {u.plan}
                    </Badge>
                    <div className="text-[10px] text-gray-500 mt-1">{u.joined}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 2. Top API Keys Summary */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between py-4 border-b border-white/8">
            <div className="flex items-center gap-2">
              <KeyIcon className="h-4 w-4 text-accent-400" />
              <h3 className="text-sm font-bold text-white">Top API Keys</h3>
            </div>
            <Link to="/admin/api-keys" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-0.5">
              Manage Keys <ArrowUpRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {recentApiKeys.map((k) => (
                <div key={k.name} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div>
                    <div className="text-sm font-semibold text-white">{k.name}</div>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">{k.key}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-bold text-gray-200">{k.calls}</div>
                    <div className="text-[10px] text-gray-500">calls</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 3. AI Service Health Summary */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between py-4 border-b border-white/8">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Model Fleet Status</h3>
            </div>
            <span className="badge-success">Operational</span>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {activeModels.map((m) => (
                <div key={m.name} className="p-3.5 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-white">{m.name}</div>
                      <div className="text-[10px] text-gray-500">Latency: {m.latency}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-gray-300">Load: {m.load}</div>
                    <div className="text-[10px] text-emerald-400 font-medium">{m.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
