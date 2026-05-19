import React from 'react'

const DEFAULT_STEPS = [
  { title: 'Plan the work', description: 'Create tasks, write docs, organize spaces, and turn ideas into clear action plans.' },
  { title: 'Move work forward', description: 'Track progress across boards, lists, calendars, comments, and team updates without losing context.' },
  { title: 'Automate the repeat work', description: 'Track progress across boards, lists, calendars, comments, and team updates without losing context.' },
]

type Step = { title: string; description?: string | null }

type Props = {
  eyebrow?: string | null
  headingMain?: string | null
  headingAccent?: string | null
  description?: string | null
  steps?: Step[] | null
}

export function HowItWorks({
  eyebrow = 'How clicsHQ works',
  headingMain = 'From planning to execution, everything stays',
  headingAccent = 'connected.',
  description = 'clicsHQ brings tasks, docs, workflows, AI agents, and integrations into one simple operating system for your team.',
  steps,
}: Props = {}) {
  const list = steps?.length ? steps : DEFAULT_STEPS

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          {eyebrow && <p className="text-sm font-medium text-gray-600">{eyebrow}</p>}
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-ink leading-tight">
            {headingMain}{' '}
            <span className="text-brand-lime italic">{headingAccent}</span>
          </h2>
          {description && <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto">{description}</p>}
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {list.map((s, i) => (
            <div key={s.title + i} className="relative rounded-2xl bg-gray-100/70 p-7 ring-1 ring-gray-100">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-ink text-white font-bold text-sm">
                {i + 1}
              </div>
              <h3 className="mt-8 text-xl font-bold text-brand-ink">{s.title}</h3>
              {s.description && (
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{s.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
