import { cn } from '@/utils/cn'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md'
}

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-white/10 text-gray-300 border border-white/10',
    success: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    error: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
    info: 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30',
  }

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs font-semibold',
    md: 'px-3 py-1 text-sm font-semibold',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full backdrop-blur-sm capitalize',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
