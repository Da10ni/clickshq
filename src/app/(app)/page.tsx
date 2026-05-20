import type { Metadata } from 'next'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = { title: 'Home' }

export default function AppHome() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Good evening, Bilal!</h1>
        <p className="mt-1 text-sm text-muted">Welcome back to clicsHQ.</p>
      </div>

      <section>
        <div className="flex items-end justify-between">
          <h2 className="text-base font-semibold text-ink">Recommended spaces</h2>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">Create member</Button>
            <Button variant="ghost" size="sm">Recent</Button>
            <Button variant="ghost" size="sm">View all spaces</Button>
          </div>
        </div>

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {['GTM Launch', 'Product Roadmap', 'Design System', 'Backend API', 'GTM Launch'].map((name, i) => (
            <Card key={i} className="p-4">
              <Badge variant="ai" size="sm" className="rounded-md">{name}</Badge>
              <p className="mt-3 text-xs text-muted">Software project</p>
              <p className="text-sm text-ink mt-0.5">Popular with marketing team</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-[1fr_320px] gap-6">
        <Card>
          <div className="p-5 flex items-center justify-between">
            <h2 className="h-card">My Task</h2>
            <Button variant="ghost" size="sm">Show more</Button>
          </div>
          <div className="px-5 pb-5 space-y-2.5">
            {[
              { txt: 'Jackie Kun mentioned you at Kleen Projects', badge: 'In Progress', variant: 'info' as const },
              { txt: '[REMINDER] Due date of Highspeed Studios Projects is coming…', badge: 'On Hold', variant: 'warning' as const },
              { txt: 'Olivia Johanna has created a new task at Kleen Projects', badge: 'To-Do', variant: 'neutral' as const },
              { txt: 'Jackie Kun mentioned you at Kleen Projects', badge: 'In Progress', variant: 'info' as const },
              { txt: '[REMINDER] Due date of Highspeed Studios Projects is coming…', badge: 'On Hold', variant: 'warning' as const },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between gap-4 rounded-xl bg-surface-alt px-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  <div className="min-w-0">
                    <p className="text-sm text-ink truncate">{t.txt}</p>
                    <p className="text-xs text-muted">Monday, June 21 2025</p>
                  </div>
                </div>
                <Badge variant={t.variant} size="sm">{t.badge}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="p-5 flex items-center justify-between">
            <h2 className="h-card">People</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="px-5 pb-5 space-y-3">
            {[
              { name: 'Mai Sasaki',     dot: 'bg-emerald-500' },
              { name: 'Sarah Chen',     dot: 'bg-amber-500' },
              { name: 'Marcus Johnson', dot: 'bg-rose-500' },
            ].map((p) => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-gray-200 text-xs font-semibold text-ink">
                    {p.name.charAt(0)}
                  </div>
                  <p className="text-sm text-ink">{p.name}</p>
                </div>
                <span className={`h-2 w-2 rounded-full ${p.dot}`} />
              </div>
            ))}
          </div>
        </Card>
      </section>

      <Card className="p-5 flex items-start gap-3 bg-ai-50 ring-ai-200/50">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-white shadow-xs text-ai-600">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-ink">Ask Clics AI</p>
          <p className="text-xs text-muted">Generate a status report, summarise a project, or trigger a workflow.</p>
        </div>
        <Button variant="ai" size="sm">Open</Button>
      </Card>
    </div>
  )
}
