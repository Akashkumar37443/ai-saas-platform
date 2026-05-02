import { Chart } from '@/components/dashboard/Chart'
import { StatCard } from '@/components/dashboard/StatCard'
import { Card, CardHeader, CardContent } from '@/components/common/Card'

const mockUsageData = [
  { date: 'Week 1', value: 45000 },
  { date: 'Week 2', value: 52000 },
  { date: 'Week 3', value: 48000 },
  { date: 'Week 4', value: 61000 },
  { date: 'Week 5', value: 58000 },
  { date: 'Week 6', value: 67000 },
]

const mockModelData = [
  { name: 'GPT-4', requests: 35000, cost: 2800 },
  { name: 'GPT-3.5', requests: 52000, cost: 780 },
  { name: 'DALL-E 3', requests: 8500, cost: 2550 },
  { name: 'Claude', requests: 12000, cost: 960 },
]

export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Requests"
          value={154320}
          change={18.2}
          changeLabel="vs last month"
        />
        <StatCard
          title="Avg. Response Time"
          value={85}
          change={-12.3}
          changeLabel="vs last month"
        />
        <StatCard
          title="Error Rate"
          value={0.8}
          change={-0.3}
          changeLabel="vs last month"
        />
        <StatCard
          title="Total Cost"
          value={4825}
          isCurrency
          change={15.7}
          changeLabel="vs last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Chart
          title="API Usage Over Time"
          data={mockUsageData}
          color="#3b82f6"
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
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Model Usage Breakdown</h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Model</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Requests</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Cost</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Avg Cost/Request</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockModelData.map((model) => (
                  <tr key={model.name}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{model.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-right">{model.requests.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-right">${model.cost.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-right">
                      ${model.requests > 0 ? (model.cost / model.requests).toFixed(4) : '0.0000'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
