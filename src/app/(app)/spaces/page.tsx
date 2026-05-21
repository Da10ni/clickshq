import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus, Filter, ArrowUpRight, MoreHorizontal } from 'lucide-react'
import { SPACES } from '@/data/mock'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'

export const metadata: Metadata = { title: 'Spaces' }

export default function SpacesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">Spaces</h1>
          <p className="mt-1 text-sm text-muted">All the spaces you and your team have access to.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="md" className="gap-2"><Filter className="h-4 w-4" />Filter</Button>
          <Button size="md" className="gap-2"><Plus className="h-4 w-4" />Create space</Button>
        </div>
      </div>

      <div className="max-w-sm">
        <Input placeholder="Search spaces" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SPACES.map((s) => (
          <Card key={s.id} className="p-5 group hover:ring-gray-300/70 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <Badge variant="ai" size="sm" className="rounded-md">{s.name}</Badge>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 grid place-items-center rounded-md hover:bg-gray-100">
                <MoreHorizontal className="h-4 w-4 text-muted" />
              </button>
            </div>
            <p className="mt-3 text-xs text-muted">{s.category}</p>
            <p className="text-sm text-ink mt-0.5">{s.description.slice(0, 80)}{s.description.length > 80 && '…'}</p>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <Stat label="Total"   value={s.stats.total.toLocaleString()} />
              <Stat label="Done"    value={s.stats.completed.toLocaleString()} />
              <Stat label="Overdue" value={s.stats.overdue.toLocaleString()} accent="warning" />
            </div>

            <div className="mt-5 flex items-center justify-between text-xs text-muted">
              <span>{s.team}</span>
              <Link
                href={`/spaces/${s.slug}`}
                className="inline-flex items-center gap-1 font-medium text-ink hover:underline"
              >
                Open <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: 'warning' }) {
  return (
    <div className="rounded-xl bg-surface-alt py-2.5">
      <p className={`text-base font-semibold ${accent === 'warning' ? 'text-warning-fg' : 'text-ink'}`}>{value}</p>
      <p className="text-2xs uppercase tracking-wider text-muted mt-0.5">{label}</p>
    </div>
  )
}
