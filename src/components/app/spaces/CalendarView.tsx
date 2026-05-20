'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import type { Task } from '@/data/mock'
import { Button } from '@/components/ui/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { cn } from '@/lib/cn'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function CalendarView({ tasks }: { tasks: Task[] }) {
  const [cursor, setCursor] = React.useState(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })

  const days = monthGrid(cursor)
  const today = new Date()

  const tasksByDate = React.useMemo(() => {
    const map = new Map<string, Task[]>()
    for (const t of tasks) {
      const k = new Date(t.dueDate).toDateString()
      const list = map.get(k) || []
      list.push(t)
      map.set(k, list)
    }
    return map
  }, [tasks])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={() => setCursor(new Date(today.getFullYear(), today.getMonth(), 1))}>
          Today
        </Button>
        <Select defaultValue="month">
          <SelectTrigger className="w-28 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="day">Day</SelectItem>
          </SelectContent>
        </Select>
        <div className="px-3 h-9 rounded-lg ring-1 ring-gray-200 inline-flex items-center text-sm text-ink">
          {cursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
        <button onClick={() => setCursor(addMonths(cursor, -1))} className="h-9 w-9 grid place-items-center rounded-lg ring-1 ring-gray-200 hover:bg-gray-50"><ChevronLeft className="h-4 w-4" /></button>
        <button onClick={() => setCursor(addMonths(cursor, 1))} className="h-9 w-9 grid place-items-center rounded-lg ring-1 ring-gray-200 hover:bg-gray-50"><ChevronRight className="h-4 w-4" /></button>
      </div>

      <div className="rounded-2xl ring-1 ring-gray-200 overflow-hidden">
        <div className="grid grid-cols-7 bg-surface-alt border-b border-gray-200">
          {DAYS.map((d) => (
            <div key={d} className="px-3 py-2.5 text-sm font-medium text-ink">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map((day, i) => {
            const inMonth = day.getMonth() === cursor.getMonth()
            const isToday = day.toDateString() === today.toDateString()
            const dayTasks = tasksByDate.get(day.toDateString()) || []
            return (
              <div
                key={i}
                className={cn(
                  'min-h-[96px] border-b border-r border-gray-100 px-2 py-2 relative group transition-colors',
                  !inMonth && 'bg-surface-alt/40',
                  isToday && 'ring-2 ring-inset ring-ink/80',
                )}
              >
                <p className={cn('text-sm', inMonth ? 'text-ink' : 'text-gray-300')}>{day.getDate()}</p>
                <div className="mt-1 space-y-1">
                  {dayTasks.slice(0, 2).map((t) => (
                    <p key={t.id} className="truncate rounded-md bg-ai-100 text-ai-700 text-xs px-1.5 py-0.5">
                      {t.title}
                    </p>
                  ))}
                  {dayTasks.length > 2 && <p className="text-2xs text-muted">+{dayTasks.length - 2}</p>}
                </div>
                <button className="absolute bottom-2 left-2 h-5 w-5 grid place-items-center rounded bg-white shadow ring-1 ring-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="h-3 w-3 text-muted" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function monthGrid(monthStart: Date) {
  // Build a 6-week grid starting on Sunday.
  const start = new Date(monthStart)
  start.setDate(1 - monthStart.getDay())
  return Array.from({ length: 42 }, (_, i) => new Date(start.getTime() + i * 86_400_000))
}

function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1)
}
