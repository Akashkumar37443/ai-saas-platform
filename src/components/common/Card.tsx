import { cn } from '@/utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  glow?: boolean
}

export function Card({ children, className, glow, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'glass-card transition-all duration-300 overflow-hidden',
        glow && 'border-primary-500/30 shadow-glow',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn('px-6 py-4 border-b border-white/8', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardContent({ children, className, ...props }: CardProps) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn('px-6 py-4 border-t border-white/8 bg-white/[0.02]', className)}
      {...props}
    >
      {children}
    </div>
  )
}
