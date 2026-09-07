import { Card, CardContent } from '@/components/common/Card'
import { formatNumber, formatCurrency } from '@/utils/format'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number
  isCurrency?: boolean
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  accentColor?: string
}

export function StatCard({ title, value, isCurrency, change, changeLabel, icon, accentColor }: StatCardProps) {
  const formattedValue = isCurrency ? formatCurrency(value) : formatNumber(value)
  const isPositive = change !== undefined && change >= 0
  const isNeutral = change === undefined

  return (
    <Card className="relative overflow-hidden group hover:-translate-y-0.5 transition-all duration-300">
      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: accentColor
            ? `linear-gradient(90deg, transparent, ${accentColor}, transparent)`
            : 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)',
        }}
      />

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{title}</p>
          {icon && (
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 shrink-0"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              {icon}
            </div>
          )}
        </div>

        <p className="text-3xl font-extrabold text-white mb-3 tracking-tight">
          {formattedValue}
        </p>

        {!isNeutral && change !== undefined && (
          <div className="flex items-center gap-2">
            <span className={isPositive ? 'trend-up' : 'trend-down'}>
              {isPositive ? (
                <TrendingUp className="h-3 w-3 inline mr-0.5" />
              ) : (
                <TrendingDown className="h-3 w-3 inline mr-0.5" />
              )}
              {isPositive ? '+' : ''}{change}%
            </span>
            {changeLabel && (
              <span className="text-xs text-gray-600">{changeLabel}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
