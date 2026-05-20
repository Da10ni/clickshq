'use client'

import * as React from 'react'
import { ChevronDown, Check, Plus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu'
import { cn } from '@/lib/cn'

type Workspace = { id: string; name: string; initial?: string }

const WORKSPACES: Workspace[] = [
  { id: 'microsoft', name: 'Microsoft', initial: 'M' },
  { id: 'acme',      name: 'Acme Inc.', initial: 'A' },
  { id: 'apollo',    name: 'Apollo',    initial: 'A' },
]

export function WorkspaceSwitcher() {
  const [current, setCurrent] = React.useState<Workspace>(WORKSPACES[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'group flex w-full items-center justify-between gap-2 rounded-xl px-2.5 py-2',
          'bg-white/[0.04] hover:bg-white/[0.07] text-white transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-ink text-xs font-semibold">
            {current.initial || current.name.charAt(0)}
          </span>
          <span className="truncate text-sm font-medium">{current.name}</span>
        </div>
        <ChevronDown className="h-4 w-4 shrink-0 text-sidebar-muted group-data-[state=open]:rotate-180 transition-transform" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={6}
        className="w-[15rem] bg-white"
      >
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        {WORKSPACES.map((w) => (
          <DropdownMenuItem
            key={w.id}
            onSelect={() => setCurrent(w)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gray-100 text-ink text-xs font-semibold">
                {w.initial || w.name.charAt(0)}
              </span>
              <span>{w.name}</span>
            </div>
            {current.id === w.id && <Check className="h-3.5 w-3.5 text-ink" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-muted">
          <Plus className="h-3.5 w-3.5" />
          Add workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
