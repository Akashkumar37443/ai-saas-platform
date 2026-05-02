import { StatCard } from '@/components/dashboard/StatCard'
import { Chart } from '@/components/dashboard/Chart'

const mockChartData = [
  { date: 'Mon', value: 4000 },
  { date: 'Tue', value: 3000 },
  { date: 'Wed', value: 2000 },
  { date: 'Thu', value: 2780 },
  { date: 'Fri', value: 1890 },
  { date: 'Sat', value: 2390 },
  { date: 'Sun', value: 3490 },
]

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total API Calls"
          value={154320}
          change={12.5}
          changeLabel="vs last week"
        />
        <StatCard
          title="Active Users"
          value={2847}
          change={8.2}
          changeLabel="vs last week"
        />
        <StatCard
          title="Revenue"
          value={48250}
          isCurrency
          change={23.1}
          changeLabel="vs last week"
        />
        <StatCard
          title="Avg. Latency"
          value={78}
          change={-5.3}
          changeLabel="vs last week"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          title="API Usage"
          data={mockChartData}
          color="#3b82f6"
          dataKey="value"
        />
        <Chart
          title="Revenue"
          data={mockChartData.map(d => ({ ...d, value: d.value * 0.3 }))}
          color="#10b981"
          dataKey="value"
        />
      </div>
    </div>
  )
}
