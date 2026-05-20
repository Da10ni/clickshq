import * as React from 'react'
import { ChevronDown, Flag } from 'lucide-react'
import type { Task, TaskStatus } from '@/data/mock'
import { MEMBERS } from '@/data/mock'
import { cn } from '@/lib/cn'

const STATUS_LABEL: Record<TaskStatus, string> = {
  todo:           'To-Do',
  'in-progress':  'In-progress',
  review:         'Review',
  completed:      'Completed',
}

const STATUS_TINT: Record<TaskStatus, string> = {
  todo:           'bg-gray-100 ring-gray-200',
  'in-progress':  'bg-kanban-progress/60 ring-ai-300/40',
  review:         'bg-kanban-review/60 ring-amber-300/40',
  completed:      'bg-kanban-done/50 ring-emerald-300/40',
}

const STATUS_DOT: Record<TaskStatus, string> = {
  todo:           'bg-gray-400',
  'in-progress':  'bg-ai-500',
  review:         'bg-amber-500',
  completed:      'bg-emerald-500',
}

const STATUS_ORDER: TaskStatus[] = ['todo', 'in-progress', 'review', 'completed']

export function ListView({ tasks }: { tasks: Task[] }) {
  const grouped = STATUS_ORDER.map((s) => ({ status: s, items: tasks.filter((t) => t.status === s) }))

  return (
    <div className="space-y-3">
      {grouped.map(({ status, items }) => (
        <StatusGroup key={status} status={status} items={items} />
      ))}
    </div>
  )
}

function StatusGroup({ status, items }: { status: TaskStatus; items: Task[] }) {
  const [open, setOpen] = React.useState(true)

  return (
    <div className="rounded-xl ring-1 ring-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ring-1 ring-inset',
          STATUS_TINT[status],
        )}
      >
        <ChevronDown className={cn('h-3.5 w-3.5 text-muted transition-transform', !open && '-rotate-90')} />
        <span className={cn('h-2 w-2 rounded-full', STATUS_DOT[status])} />
        <span className="text-sm font-medium text-ink">{STATUS_LABEL[status]}</span>
        <span className="text-xs text-muted">{items.length}</span>
      </button>

      {open && items.length > 0 && (
        <div className="bg-white">
          <div className="grid grid-cols-[1fr_120px_140px_140px_120px_120px] gap-4 px-4 py-2 text-2xs font-medium uppercase tracking-wider text-muted border-b border-gray-100">
            <span>Name</span>
            <span>Due Date</span>
            <span>Priority</span>
            <span>Assignee</span>
            <span>Estimated</span>
            <span>Actual</span>
          </div>
          {items.map((t) => (
            <TaskRow key={t.id} task={t} />
          ))}
        </div>
      )}
    </div>
  )
}

function TaskRow({ task }: { task: Task }) {
  const assignees = task.assignees.map((id) => MEMBERS.find((m) => m.id === id)).filter(Boolean) as typeof MEMBERS
  const overdue = new Date(task.dueDate) < new Date() && task.status !== 'completed'
  const dueLabel = new Date(task.dueDate).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })

  return (
    <div className="grid grid-cols-[1fr_120px_140px_140px_120px_120px] gap-4 px-4 py-2.5 items-center text-sm border-b border-gray-50 last:border-0 hover:bg-surface-alt transition-colors">
      <div className="flex items-center gap-2 min-w-0">
        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
        <span className="truncate text-ink">{task.title}</span>
      </div>
      <span className={cn(overdue ? 'text-danger-fg' : 'text-ink')}>{dueLabel}</span>
      <span className="flex items-center gap-1.5 text-ink"><Flag className="h-3.5 w-3.5 text-gray-400" />{task.priority[0].toUpperCase() + task.priority.slice(1)}</span>
      <div className="flex -space-x-1.5">
        {assignees.slice(0, 3).map((m) => (
          <span key={m.id} className="h-6 w-6 rounded-full bg-gray-200 ring-2 ring-white grid place-items-center text-2xs font-semibold text-ink">
            {m.initial}
          </span>
        ))}
        {assignees.length > 3 && <span className="h-6 w-6 rounded-full bg-gray-100 ring-2 ring-white grid place-items-center text-2xs text-muted">+{assignees.length - 3}</span>}
      </div>
      <span className="text-muted">{task.estimatedHours} hours</span>
      <span className="text-muted">{task.actualHours} hours</span>
    </div>
  )
}
