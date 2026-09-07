import { cn } from '@/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden'

  const variants = {
    primary:
      'text-white focus:ring-primary-500 shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5',
    secondary:
      'bg-accent-600/20 text-accent-300 border border-accent-500/30 hover:bg-accent-500/30 hover:border-accent-400/50 hover:text-white focus:ring-accent-500',
    outline:
      'border border-white/20 text-gray-300 hover:border-primary-500/60 hover:text-white hover:bg-white/5 focus:ring-primary-500 backdrop-blur-sm',
    ghost:
      'text-gray-400 hover:text-white hover:bg-white/8 focus:ring-gray-500',
    danger:
      'bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 hover:border-red-400/50 hover:text-red-300 focus:ring-red-500',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2',
  }

  // Primary variant needs special gradient background
  const primaryBg =
    variant === 'primary'
      ? { background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 60%, #a855f7 100%)' }
      : {}

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      style={primaryBg}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Shimmer effect for primary */}
      {variant === 'primary' && (
        <span className="absolute inset-0 overflow-hidden rounded-xl">
          <span
            className="absolute top-0 left-[-100%] h-full w-[60%] rotate-12 opacity-0 group-hover:opacity-30 transition-all duration-700"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
          />
        </span>
      )}
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}
      {children}
    </button>
  )
}
