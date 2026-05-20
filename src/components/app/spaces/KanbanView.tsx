import * as React from 'react'
import { Plus, MoreHorizontal, Clock } from 'lucide-react'
import type { Task, TaskStatus } from '@/data/mock'
import { MEMBERS } from '@/data/mock'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/cn'

type Column = {
  status: TaskStatus
  label: string
  bg: string
  fg: string
  tag: 'neutral' | 'ai' | 'warning' | 'success'
}

const COLUMNS: Column[] = [
  { status: 'todo',        label: 'To-Do',       bg: 'bg-gray-50',           fg: 'text-ink',          tag: 'neutral' },
  { status: 'in-progress', label: 'In Progress', bg: 'bg-kanban-progress/40', fg: 'text-ai-600',      tag: 'ai' },
  { status: 'review',      label: 'Review',      bg: 'bg-kanban-review/40',   fg: 'text-warning-fg',  tag: 'warning' },
  { status: 'completed',   label: 'Completed',   bg: 'bg-kanban-done/40',     fg: 'text-success-fg',  tag: 'success' },
]

const TAG_STYLE: Record<string, string> = {
  Design:        'text-rose-600',
  Update:        'text-ai-600',
  'Bugs Fixing': 'text-amber-600',
  Bug:           'text-amber-600',
}

export function KanbanView({ tasks }: { tasks: Task[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {COLUMNS.map((col) => {
        const items = tasks.filter((t) => t.status === col.status)
        return (
          <div key={col.status} className={cn('rounded-2xl ring-1 ring-gray-100 p-3', col.bg)}>
            <div className="flex items-center justify-between px-1.5 pb-2">
              <h3 className={cn('text-sm font-semibold', col.fg)}>
                {col.label} <span className="text-muted ml-1">({items.length})</span>
              </h3>
              <button className="h-7 w-7 grid place-items-center rounded-full bg-ink text-white hover:bg-black transition-colors">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="space-y-3">
              {items.map((t) => (
                <KanbanCard key={t.id} task={t} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function KanbanCard({ task }: { task: Task }) {
  const assignees = task.assignees.map((id) => MEMBERS.find((m) => m.id === id)).filter(Boolean) as typeof MEMBERS
  return (
    <article className="rounded-xl bg-white p-3.5 shadow-card ring-1 ring-gray-100/80">
      <header className="flex items-center justify-between">
        <span className={cn('inline-flex items-center gap-1.5 text-2xs font-medium', TAG_STYLE[task.tag || ''] || 'text-muted')}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {task.tag?.toUpperCase()}
        </span>
        <button className="h-6 w-6 grid place-items-center rounded hover:bg-gray-100">
          <MoreHorizontal className="h-3.5 w-3.5 text-muted" />
        </button>
      </header>
      <p className="mt-2 text-sm text-ink leading-snug">{task.title}</p>

      <footer className="mt-3 flex items-center justify-between">
        <div className="flex -space-x-1.5">
          {assignees.slice(0, 3).map((m) => (
            <span key={m.id} className="h-6 w-6 rounded-full bg-gray-200 ring-2 ring-white grid place-items-center text-2xs font-semibold text-ink">
              {m.initial}
            </span>
          ))}
        </div>
        <button className="h-7 w-7 grid place-items-center rounded-full bg-ink text-white">
          <Plus className="h-3.5 w-3.5" />
        </button>
      </footer>

      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-2xs text-muted">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-rose-400" />
          {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {task.estimatedHours}h
        </span>
      </div>
    </article>
  )
}
