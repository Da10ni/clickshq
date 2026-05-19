import React from 'react'
import Image from 'next/image'

const DEFAULT_FEATURES = [
  { title: 'Create project plans', description: 'Turn rough ideas into tasks, milestones, owners, and timelines.' },
  { title: 'Surface blockers early', description: 'Spot overdue tasks, missing owners, and stalled work before it becomes a problem.' },
  { title: 'Trigger workflows', description: 'Connect AI with workflows so the system can take action, not just give advice.' },
]

type Feature = { title: string; description?: string | null }

type Props = {
  heading?: string | null
  description?: string | null
  features?: Feature[] | null
}

export function AISection({
  heading = 'AI that does more than write summaries.',
  description = 'Let AI help create tasks, summarize project updates, detect blockers, and trigger workflows across the tools your team already uses.',
  features,
}: Props = {}) {
  const list = features?.length ? features : DEFAULT_FEATURES

  return (
    <section className="px-5 sm:px-6 lg:px-8 py-12">
      <div className="relative max-w-7xl mx-auto rounded-3xl bg-brand-ink overflow-hidden ring-1 ring-blue-500/20">
        <div className="absolute inset-0 ring-1 ring-blue-500/30 rounded-3xl pointer-events-none" />

        <div className="relative px-6 sm:px-12 lg:px-16 py-16 sm:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight whitespace-pre-line">
              {heading}
            </h2>
            {description && (
              <p className="mt-4 text-base text-white/70 max-w-2xl mx-auto">{description}</p>
            )}
          </div>

          <div className="mt-12 grid lg:grid-cols-2 gap-6 items-stretch">
            <div className="rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-purple-700 p-6 sm:p-8 flex items-center justify-center min-h-[340px]">
              <Image
                src="/images/dashboards/ClicshqPage.svg"
                alt="AI dashboard preview"
                width={760}
                height={480}
                className="w-full h-auto rounded-xl shadow-2xl ring-1 ring-white/30"
              />
            </div>

            <div className="grid grid-rows-3 gap-3">
              {list.map((f, i) => (
                <div key={f.title + i} className="rounded-2xl bg-white/[0.04] ring-1 ring-white/10 p-6 sm:p-7">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{f.title}</h3>
                  {f.description && <p className="mt-2 text-sm text-white/60">{f.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
