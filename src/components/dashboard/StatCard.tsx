import { Card, CardContent } from '@/components/common/Card'
import { formatNumber, formatCurrency } from '@/utils/format'

interface StatCardProps {
  title: string
  value: number
  isCurrency?: boolean
  change?: number
  changeLabel?: string
}

export function StatCard({ title, value, isCurrency, change, changeLabel }: StatCardProps) {
  const formattedValue = isCurrency ? formatCurrency(value) : formatNumber(value)

  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="mt-2 text-3xl font-bold text-gray-900">{formattedValue}</p>
        {change !== undefined && (
          <div className="mt-2 flex items-center text-sm">
            <span
              className={
                change >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'
              }
            >
              {change >= 0 ? '+' : ''}{change}%
            </span>
            {changeLabel && (
              <span className="ml-2 text-gray-500">{changeLabel}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
