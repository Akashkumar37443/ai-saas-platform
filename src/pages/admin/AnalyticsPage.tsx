import { Chart } from '@/components/dashboard/Chart'
import { StatCard } from '@/components/dashboard/StatCard'
import { Card, CardHeader, CardContent } from '@/components/common/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table'
import { BarChart3, Clock, AlertTriangle, DollarSign } from 'lucide-react'

const mockUsageData = [
  { date: 'Week 1', value: 45000 },
  { date: 'Week 2', value: 52000 },
  { date: 'Week 3', value: 48000 },
  { date: 'Week 4', value: 61000 },
  { date: 'Week 5', value: 58000 },
  { date: 'Week 6', value: 67000 },
]

const mockModelData = [
  { name: 'GPT-4o', requests: 35000, cost: 2800 },
  { name: 'GPT-3.5 Turbo', requests: 52000, cost: 780 },
  { name: 'DALL-E 3', requests: 8500, cost: 2550 },
  { name: 'Claude 3.5 Sonnet', requests: 12000, cost: 960 },
]

export default function AnalyticsPage() {
  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <BarChart3 className="h-7 w-7 text-primary-400" />
          Analytics
        </h1>
        <p className="text-sm text-gray-400 mt-1">Deep dive into API usage, costs, and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Total Requests"
          value={154320}
          change={18.2}
          changeLabel="vs last month"
          icon={<BarChart3 className="h-4 w-4 text-primary-400" />}
          accentColor="#6366f1"
        />
        <StatCard
          title="Avg. Response Time"
          value={85}
          change={-12.3}
          changeLabel="ms (faster)"
          icon={<Clock className="h-4 w-4 text-cyan-400" />}
          accentColor="#22d3ee"
        />
        <StatCard
          title="Error Rate"
          value={0.8}
          change={-0.3}
          changeLabel="vs last month"
          icon={<AlertTriangle className="h-4 w-4 text-amber-400" />}
          accentColor="#f59e0b"
        />
        <StatCard
          title="Total Cost"
          value={4825}
          isCurrency
          change={15.7}
          changeLabel="vs last month"
          icon={<DollarSign className="h-4 w-4 text-emerald-400" />}
          accentColor="#10b981"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Chart
          title="API Usage Over Time"
          data={mockUsageData}
          color="#6366f1"
          dataKey="value"
        />
        <Chart
          title="Cost Analysis"
          data={mockUsageData.map(d => ({ ...d, value: d.value * 0.08 }))}
          color="#10b981"
          dataKey="value"
        />
      </div>

      <Card>
        <CardHeader className="border-b border-white/8">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Model Usage Breakdown</h3>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead className="text-right">Requests</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead className="text-right">Avg Cost/Request</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockModelData.map((model) => (
                <TableRow key={model.name}>
                  <TableCell className="font-semibold text-white">{model.name}</TableCell>
                  <TableCell className="text-right text-gray-300 font-mono">{model.requests.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-gray-300 font-mono">${model.cost.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-gray-400 font-mono">
                    ${model.requests > 0 ? (model.cost / model.requests).toFixed(4) : '0.0000'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
