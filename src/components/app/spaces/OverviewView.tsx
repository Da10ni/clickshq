import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import type { Space, Task } from '@/data/mock'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function OverviewView({ space, tasks }: { space: Space; tasks: Task[] }) {
  const done = tasks.filter((t) => t.status === 'completed').length
  const inP  = tasks.filter((t) => t.status === 'in-progress').length
  const overdue = tasks.filter((t) => new Date(t.dueDate) < new Date() && t.status !== 'completed').length

  return (
    <div className="space-y-6">
      {/* Description */}
      <Card className="p-5">
        <p className="label">Space Description</p>
        <p className="mt-2 text-sm text-ink leading-relaxed">{space.description}</p>
        <dl className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <Meta label="Owner"   value={space.owner} />
          <Meta label="Members" value="5" />
          <Meta label="Created" value={new Date(space.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} />
        </dl>
      </Card>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBig label="Total Tasks"   value={space.stats.total.toLocaleString()} delta="+8%" tone="default" />
        <StatBig label="Completed"     value={done.toLocaleString()}              delta="+5%" tone="success" />
        <StatBig label="In-Progress"   value={inP.toLocaleString()}                delta="+12%" tone="info" />
        <StatBig label="Overdue"       value={overdue.toLocaleString()}            delta="-2%" tone="danger" />
      </div>

      {/* Two-col panels */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="h-card">Task Completed over time</h3>
            <Button variant="ghost" size="sm">Last 7 days</Button>
          </div>
          {/* Mock chart placeholder */}
          <div className="mt-4 h-48 rounded-xl bg-gradient-to-t from-green-100/60 to-transparent ring-1 ring-gray-100" />
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="h-card">Status overview</h3>
            <Button variant="ghost" size="sm">View all task</Button>
          </div>
          <div className="mt-4 flex items-center gap-6">
            <div className="relative h-32 w-32">
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: 'conic-gradient(#7C3AED 0% 40%, #A3E635 40% 65%, #F59E0B 65% 85%, #EF4444 85% 100%)' }}
              />
              <div className="absolute inset-3 rounded-full bg-white grid place-items-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-ink">{space.stats.total.toLocaleString()}</p>
                  <p className="text-2xs uppercase tracking-wider text-muted">Total Task</p>
                </div>
              </div>
            </div>
            <ul className="text-sm space-y-2">
              {[
                { color: 'bg-ai-600',       label: 'In-Progress', value: '1,124' },
                { color: 'bg-brand-lime',   label: 'To-Do',       value: '986' },
                { color: 'bg-amber-500',    label: 'Review',      value: '510' },
                { color: 'bg-rose-500',     label: 'Completed',   value: '3,007' },
              ].map((r) => (
                <li key={r.label} className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${r.color}`} />
                  <span className="text-ink">{r.label}</span>
                  <span className="text-muted ml-auto">{r.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      {/* Member workload + priority distribution */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="h-card">Workload by Member</h3>
          <p className="mt-1 text-xs text-muted">Task distribution across team members</p>
          <ul className="mt-4 space-y-3">
            {[
              { name: 'Olivia',   value: 78 },
              { name: 'Marcus',   value: 65 },
              { name: 'Sarah',    value: 52 },
              { name: 'James Jr', value: 42 },
              { name: 'David',    value: 35 },
            ].map((r) => (
              <li key={r.name} className="flex items-center gap-3">
                <span className="w-20 text-sm text-ink">{r.name}</span>
                <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-ai-500" style={{ width: `${r.value}%` }} />
                </div>
                <span className="text-xs text-muted w-10 text-right">{r.value}%</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h3 className="h-card">Priority distribution</h3>
          <p className="mt-1 text-xs text-muted">Distribution of tasks by priority level</p>
          <ul className="mt-4 space-y-3">
            {[
              { label: 'Urgent', color: 'bg-rose-500',  value: 18 },
              { label: 'High',   color: 'bg-amber-500', value: 32 },
              { label: 'Normal', color: 'bg-ai-500',    value: 42 },
              { label: 'Low',    color: 'bg-gray-300',  value: 8  },
            ].map((r) => (
              <li key={r.label} className="flex items-center gap-3">
                <span className="w-20 text-sm text-ink flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${r.color}`} />
                  {r.label}
                </span>
                <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className={`h-full rounded-full ${r.color}`} style={{ width: `${r.value}%` }} />
                </div>
                <span className="text-xs text-muted w-10 text-right">{r.value}%</span>
              </li>
            ))}
          </ul>
          <button className="mt-4 inline-flex items-center gap-1 text-xs text-ink font-medium hover:underline">
            See details <ChevronRight className="h-3 w-3" />
          </button>
        </Card>
      </div>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="text-sm text-ink font-medium mt-0.5">{value}</dd>
    </div>
  )
}

function StatBig({
  label, value, delta, tone,
}: { label: string; value: string; delta: string; tone: 'default' | 'success' | 'info' | 'danger' }) {
  const toneCls = {
    default: 'bg-surface-alt text-ink',
    success: 'bg-success-soft text-success-fg',
    info:    'bg-info-soft    text-info-fg',
    danger:  'bg-danger-soft  text-danger-fg',
  }[tone]

  return (
    <Card className="p-5">
      <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${toneCls}`}>
        <div className="h-3 w-3 rounded-sm bg-current/40" />
      </div>
      <p className="mt-3 text-2xl font-bold text-ink leading-none">{value}</p>
      <div className="mt-1 flex items-center justify-between">
        <p className="text-sm text-muted">{label}</p>
        <p className="text-xs text-success-fg">{delta}</p>
      </div>
      <button className="mt-3 text-xs text-muted hover:text-ink inline-flex items-center gap-1">
        See details <ChevronRight className="h-3 w-3" />
      </button>
    </Card>
  )
}
