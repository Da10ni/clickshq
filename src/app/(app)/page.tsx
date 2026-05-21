import type { Metadata } from 'next'
import Image from 'next/image'
import { Plus, Sparkles, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'

export const metadata: Metadata = { title: 'Home' }

const SPACES = [
  { id: 's1', name: 'GTM Launch',     category: 'Software project', tagline: 'Popular with marketing team' },
  { id: 's2', name: 'Product Roadmap', category: 'Product board',    tagline: 'Popular with marketing team' },
  { id: 's3', name: 'Design System',  category: 'Design project',    tagline: 'Popular with marketing team' },
  { id: 's4', name: 'Backend API',    category: 'Software project',  tagline: 'Popular with marketing team' },
  { id: 's5', name: 'GTM Launch',     category: 'Software project',  tagline: 'Popular with marketing team' },
]

type TaskTab = 'assigned' | 'due' | 'overdue' | 'completed'

const TASKS = {
  assigned: [
    { id: 't1', title: 'Jackie Kun mentioned you at', project: 'Kleon Projects', date: 'Monday, June 21 2020', badge: 'IN PROGRESS', tone: 'progress' as const },
    { id: 't2', title: '[REMINDER] Due date of', project: 'Highspeed Studios Projects', suffix: ' te task will be coming', date: 'Monday, June 21 2020', badge: 'REVIEW', tone: 'review' as const },
    { id: 't3', title: 'Olivia Johanna has created new task at', project: 'Kleon Projects', date: 'Monday, June 21 2020', badge: 'TO DO', tone: 'todo' as const },
    { id: 't4', title: 'Jackie Kun mentioned you at', project: 'Kleon Projects', date: 'Monday, June 21 2020', badge: 'IN PROGRESS', tone: 'progress' as const },
    { id: 't5', title: '[REMINDER] Due date of', project: 'Highspeed Studios Projects', suffix: ' te task will be coming', date: 'Monday, June 21 2020', badge: 'REVIEW', tone: 'review' as const },
  ],
  due: [],
  overdue: [],
  completed: [],
}

const PEOPLE = [
  { id: 'p1', name: 'Bilal Ahmed',    initial: 'B', circle: '/images/hero/greenCircle.svg'  },
  { id: 'p2', name: 'Sarah Chen',     initial: 'S', circle: '/images/hero/redCircle.svg'    },
  { id: 'p3', name: 'Marcus Johnson', initial: 'M', circle: '/images/hero/yellowCircle.svg' },
]

const BADGE_TONE: Record<string, string> = {
  progress: 'bg-rose-100 text-rose-700 ring-rose-200/60',
  review:   'bg-amber-100 text-amber-700 ring-amber-200/60',
  todo:     'bg-yellow-50 text-amber-700 ring-amber-200/40',
}

export default function HomePage() {
  return (
    <div className="relative">
      {/* Decorative leaves — left side near greeting */}
      <Image
        src="/images/hero/leaves.svg"
        alt=""
        aria-hidden
        width={220}
        height={220}
        className="pointer-events-none select-none absolute -top-2 left-2 opacity-90 hidden md:block"
      />
      {/* Decorative stars cluster — right side near greeting */}
      <Image
        src="/images/hero/stars.svg"
        alt=""
        aria-hidden
        width={160}
        height={160}
        className="pointer-events-none select-none absolute -top-2 right-4 opacity-90 hidden md:block"
      />

      {/* Greeting */}
      <div className="relative text-center pt-8 pb-10">
        <h1 className="text-3xl sm:text-[34px] font-bold tracking-tight text-ink">Good evening, Bilal!</h1>
        <p className="mt-1 text-sm text-muted">Welcome back to clicsHQ</p>
      </div>

      {/* Recommended spaces */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-medium text-ink">Recommended spaces:</h2>
          <div className="flex items-center gap-2">
            <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" />Create member</Button>
            <Button size="sm" className="gap-1.5">Recent <ChevronDown className="h-3.5 w-3.5" /></Button>
            <button className="text-sm font-medium text-ink hover:underline">View all spaces</button>
          </div>
        </div>

        <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {SPACES.map((s) => (
            <Card key={s.id} className="p-4 group hover:shadow-md transition-shadow cursor-pointer">
              <Image
                src="/images/hero/recommendedSpacesblackBgBox.svg"
                alt=""
                aria-hidden
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <p className="mt-3 text-sm font-semibold text-ink">{s.name}</p>
              <p className="mt-0.5 text-2xs text-muted uppercase tracking-wide">{s.category}</p>
              <p className="mt-1.5 text-xs text-muted">{s.tagline}</p>
            </Card>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={i === 0 ? 'h-1.5 w-4 rounded-full bg-ink' : 'h-1.5 w-1.5 rounded-full bg-gray-300'} />
          ))}
        </div>
      </section>

      {/* My Task + People */}
      <section className="mt-8 grid lg:grid-cols-[1fr_320px] gap-4">
        {/* My Task */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink">My Task</h2>
            <button className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
              Show more
              <Image src="/images/hero/showMore.svg" alt="" aria-hidden width={14} height={14} />
            </button>
          </div>

          <Tabs defaultValue="assigned" className="mt-4">
            <TabsList>
              <TabsTrigger value="assigned">Assigned to me</TabsTrigger>
              <TabsTrigger value="due">Due soon</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            {(['assigned', 'due', 'overdue', 'completed'] as TaskTab[]).map((tab) => (
              <TabsContent key={tab} value={tab}>
                {TASKS[tab].length === 0 ? (
                  <p className="text-sm text-muted py-8 text-center">Nothing here yet.</p>
                ) : (
                  <div className="space-y-2">
                    {TASKS[tab].map((t) => (
                      <div key={t.id} className="flex items-center justify-between gap-4 rounded-xl px-4 py-3 hover:bg-surface-alt transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <input type="checkbox" className="h-4 w-4 rounded-full border-gray-300" />
                          <div className="min-w-0">
                            <p className="text-sm text-ink truncate">
                              {t.title} <span className="font-medium text-ink">{t.project}</span>{(t as any).suffix || ''}
                            </p>
                            <p className="text-xs text-muted mt-0.5">{t.date}</p>
                          </div>
                        </div>
                        <span className={`shrink-0 inline-flex items-center px-3 py-1 rounded-full text-2xs font-semibold ring-1 ring-inset ${BADGE_TONE[t.tone]}`}>
                          {t.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </Card>

        {/* People */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink">People</h2>
            <button className="text-sm font-medium text-muted hover:text-ink">View All</button>
          </div>
          <ul className="mt-5 space-y-4">
            {PEOPLE.map((p) => (
              <li key={p.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gray-200 text-ink text-xs font-semibold">
                    {p.initial}
                  </span>
                  <p className="text-sm text-ink">{p.name}</p>
                </div>
                <Image src={p.circle} alt="" aria-hidden width={12} height={12} className="h-3 w-3" />
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Floating Clics AI suggestion — keeps the AI nudge visible */}
      <Card className="mt-8 p-4 flex items-start gap-3 bg-ai-50 ring-ai-200/50">
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
