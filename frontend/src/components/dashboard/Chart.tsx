import { useId } from 'react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import { Card, CardHeader, CardContent } from '@/components/common/Card'

interface ChartProps {
  title: string
  data: Array<{ date: string; value: number }>
  color?: string
  dataKey?: string
}

export function Chart({ title, data, color = '#6366f1', dataKey = 'value' }: ChartProps) {
  const uniqueId = useId()
  const gradientId = `color${dataKey}-${uniqueId.replace(/:/g, '')}`

  return (
    <Card>
      <CardHeader className="border-b border-white/8">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h3>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="date"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) =>
                  value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value
                }
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 15, 26, 0.95)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  color: '#e2e8f0',
                  fontSize: '13px',
                  backdropFilter: 'blur(12px)',
                }}
                labelStyle={{ color: '#9ca3af', fontSize: '11px', marginBottom: '4px' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2.5}
                fill={`url(#${gradientId})`}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2, stroke: color, fill: '#0f0f1a' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
