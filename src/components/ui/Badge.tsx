import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset whitespace-nowrap',
  {
    variants: {
      variant: {
        success: 'bg-success-soft text-success-fg ring-success-fg/15',
        warning: 'bg-warning-soft text-warning-fg ring-warning-fg/15',
        danger:  'bg-danger-soft  text-danger-fg  ring-danger-fg/15',
        info:    'bg-info-soft    text-info-fg    ring-info-fg/15',
        neutral: 'bg-gray-100     text-gray-700   ring-gray-200',
        outline: 'bg-transparent  text-ink        ring-gray-300',
        ai:      'bg-ai-100       text-ai-700     ring-ai-300/30',
      },
      size: {
        sm: 'h-5  px-2   text-2xs',
        md: 'h-6  px-2.5 text-xs',
        lg: 'h-7  px-3   text-xs',
      },
      dot: {
        true: 'before:content-[""] before:h-1.5 before:w-1.5 before:rounded-full before:bg-current',
        false: '',
      },
    },
    defaultVariants: { variant: 'neutral', size: 'md', dot: false },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, dot, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size, dot }), className)} {...props} />
}
