import React from 'react'

const STEPS = [
  {
    title: 'Plan the work',
    description: 'Create tasks, write docs, organize spaces, and turn ideas into clear action plans.',
  },
  {
    title: 'Move work forward',
    description: 'Track progress across boards, lists, calendars, comments, and team updates without losing context.',
  },
  {
    title: 'Automate the repeat work',
    description: 'Track progress across boards, lists, calendars, comments, and team updates without losing context.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-medium text-gray-600">How clicsHQ works</p>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-ink leading-tight">
            From planning to execution, everything stays{' '}
            <span className="text-brand-lime italic">connected.</span>
          </h2>
          <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto">
            clicsHQ brings tasks, docs, workflows, AI agents, and integrations into one simple operating
            system for your team.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {STEPS.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl bg-gray-100/70 p-7 ring-1 ring-gray-100">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-ink text-white font-bold text-sm">
                {i + 1}
              </div>
              <h3 className="mt-8 text-xl font-bold text-brand-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
