import { cn } from '@/utils/cn'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'block w-full px-4 py-3 rounded-xl border bg-white/5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200 backdrop-blur-sm',
            error
              ? 'border-red-500/50 focus:border-red-400 focus:ring-red-500/30'
              : 'border-white/10 focus:border-primary-500/60 focus:ring-primary-500/30 hover:border-white/20',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
