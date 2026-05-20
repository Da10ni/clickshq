import * as React from 'react'
import type { Task } from '@/data/mock'
import { MEMBERS } from '@/data/mock'
import { cn } from '@/lib/cn'

/**
 * Lightweight Gantt: left columns (task / due / assignees / estimate) +
 * a 14-day timeline on the right where each task gets a colour-coded bar.
 */
export function GanttView({ tasks }: { tasks: Task[] }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(today)
  start.setDate(today.getDate() - 2)            // show 2 days before
  const days = Array.from({ length: 14 }, (_, i) => new Date(start.getTime() + i * 86_400_000))

  return (
    <div className="rounded-2xl ring-1 ring-gray-200 overflow-hidden bg-white">
      <div className="grid grid-cols-[2fr_120px_120px_120px_1.5fr] sticky top-0 bg-surface-alt border-b border-gray-200 text-2xs uppercase tracking-wider text-muted">
        <div className="px-4 py-2.5">Name</div>
        <div className="px-2 py-2.5">Due Date</div>
        <div className="px-2 py-2.5">Assignees</div>
        <div className="px-2 py-2.5">Time Estimate</div>
        <div className="grid grid-cols-14 border-l border-gray-200">
          {days.map((d, i) => (
            <div key={i} className={cn(
              'px-1 py-2.5 text-center border-r border-gray-100 last:border-0',
              d.getTime() === today.getTime() && 'bg-rose-50 text-rose-700',
            )}>
              <div className="text-2xs">{d.toLocaleDateString('en-US', { month: 'short' })}</div>
              <div className="text-xs font-medium text-ink">{String(d.getDate()).padStart(2, '0')}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        {tasks.map((t) => {
          const due = new Date(t.dueDate)
          due.setHours(0, 0, 0, 0)
          const offset = Math.round((due.getTime() - start.getTime()) / 86_400_000)
          const inRange = offset >= 0 && offset < 14
          const assignees = t.assignees.map((id) => MEMBERS.find((m) => m.id === id)).filter(Boolean) as typeof MEMBERS
          const colour =
            t.status === 'completed' ? 'bg-success-soft text-success-fg ring-success-fg/20' :
            t.status === 'in-progress' ? 'bg-ai-100 text-ai-700 ring-ai-300/30' :
            t.status === 'review' ? 'bg-warning-soft text-warning-fg ring-warning-fg/20' :
            'bg-gray-100 text-ink ring-gray-200'

          return (
            <div key={t.id} className="grid grid-cols-[2fr_120px_120px_120px_1.5fr] border-b border-gray-100 last:border-0 items-center text-sm">
              <div className="px-4 py-2.5 truncate text-ink">{t.title}</div>
              <div className="px-2 py-2.5 text-ink">{due.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}</div>
              <div className="px-2 py-2.5">
                <div className="flex -space-x-1.5">
                  {assignees.slice(0, 3).map((m) => (
                    <span key={m.id} className="h-6 w-6 rounded-full bg-gray-200 ring-2 ring-white grid place-items-center text-2xs font-semibold text-ink">{m.initial}</span>
                  ))}
                </div>
              </div>
              <div className="px-2 py-2.5 text-muted">{t.estimatedHours}h</div>
              <div className="relative h-10 border-l border-gray-200 grid grid-cols-14">
                {days.map((d, i) => (
                  <div key={i} className={cn(
                    'border-r border-gray-50 last:border-0',
                    d.getTime() === today.getTime() && 'bg-rose-50/40',
                  )} />
                ))}
                {inRange && (
                  <div
                    className={cn('absolute top-1/2 -translate-y-1/2 h-6 rounded-md ring-1 px-2 text-xs flex items-center font-medium', colour)}
                    style={{ left: `${(offset / 14) * 100}%`, width: `${Math.max(1, 2) * (100 / 14)}%` }}
                  >
                    {t.title.length > 18 ? t.title.slice(0, 16) + '…' : t.title}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
