'use client'

import * as React from 'react'
import Link from 'next/link'
import { Plus, MoreHorizontal, UserPlus } from 'lucide-react'
import type { Space } from '@/data/mock'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

const RANGES = [
  { id: '7d',     label: '7d' },
  { id: '14d',    label: '14d' },
  { id: '30d',    label: '30d' },
  { id: 'custom', label: 'Custom' },
] as const

type Range = (typeof RANGES)[number]['id']

export function SpaceHeader({ space }: { space: Space }) {
  const [range, setRange] = React.useState<Range>('14d')

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted">
        <Link href="/app/spaces" className="hover:text-ink transition-colors">Spaces</Link>
        <span>/</span>
        <span className="text-ink">{space.name}</span>
      </nav>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-ink">{space.name}</h1>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg ring-1 ring-gray-200 bg-white p-1">
            <span className="px-1.5 flex -space-x-1.5">
              <span className="h-5 w-5 rounded-full bg-gray-300 ring-2 ring-white" />
              <span className="h-5 w-5 rounded-full bg-gray-400 ring-2 ring-white" />
              <span className="h-5 w-5 rounded-full bg-gray-500 ring-2 ring-white" />
            </span>
            <span className="text-xs text-muted px-1">+3</span>
            {RANGES.map((r) => (
              <button
                key={r.id}
                onClick={() => setRange(r.id)}
                className={cn(
                  'h-7 px-2.5 rounded-md text-xs font-medium transition-colors',
                  range === r.id ? 'bg-ink text-white' : 'text-muted hover:bg-gray-100',
                )}
              >
                {r.label}
              </button>
            ))}
          </div>

          <Button variant="secondary" size="md" className="gap-2">
            <UserPlus className="h-4 w-4" />Invite
          </Button>
          <Button size="md" className="gap-2">
            <Plus className="h-4 w-4" />Add Task
          </Button>
          <button className="h-9 w-9 grid place-items-center rounded-lg ring-1 ring-gray-200 hover:bg-gray-50">
            <MoreHorizontal className="h-4 w-4 text-muted" />
          </button>
        </div>
      </div>
    </div>
  )
}
