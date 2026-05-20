'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors ' +
    'disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-ink/40 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        // Figma primary CTA — black bg, white text
        primary: 'bg-ink text-white hover:bg-black active:bg-black shadow-sm',
        // Subtle outline button on white surfaces
        secondary:
          'bg-white text-ink border border-gray-200 hover:bg-gray-50 active:bg-gray-100 shadow-xs',
        // Ghost — no fill, used in nav rails and table actions
        ghost: 'bg-transparent text-ink hover:bg-gray-100 active:bg-gray-200',
        // Subtle filled — for "Custom", date toggles
        subtle: 'bg-gray-100 text-ink hover:bg-gray-200 active:bg-gray-300',
        // Destructive (delete actions)
        destructive: 'bg-danger-fg text-white hover:bg-danger-strong active:bg-danger-strong shadow-sm',
        // Link-style
        link: 'bg-transparent text-ink underline-offset-4 hover:underline',
        // AI accent button (used on Clics AI screens)
        ai: 'bg-ai-600 text-white hover:bg-ai-700 active:bg-ai-700 shadow-sm',
      },
      size: {
        sm: 'h-8  px-3 text-xs',
        md: 'h-9  px-4 text-sm',
        lg: 'h-11 px-6 text-sm',
        xl: 'h-12 px-7 text-base',
        icon: 'h-9 w-9',
        iconSm: 'h-8 w-8',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { buttonVariants }
