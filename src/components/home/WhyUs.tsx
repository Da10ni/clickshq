import React from 'react'
import Image from 'next/image'

const POINTS = [
  {
    title: 'Simple without feeling basic',
    description:
      'Clean enough for everyday users, powerful enough for teams managing real projects, deadlines, and cross-functional work.',
  },
  {
    title: 'AI that takes action',
    description:
      'Not just content generation. clicsHQ AI helps with tasks, updates, workflows, blockers, and team coordination.',
  },
  {
    title: 'Your tools stay connected',
    description:
      'Bring together Slack, Google Drive, Calendar, GitHub, Figma, Microsoft tools, and more without switching context all day.',
  },
]

export function WhyUs() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <div>
            <p className="text-sm font-medium text-gray-600">Why clicsHQ</p>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-ink leading-tight">
              Built for how modern
              <br />
              teams actually work.
            </h2>

            <div className="mt-10 space-y-8">
              {POINTS.map((p, i) => (
                <div key={p.title} className="flex gap-5">
                  <div className="flex-shrink-0 grid h-10 w-10 place-items-center rounded-lg bg-brand-ink text-white font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-ink">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — dashboard mockup */}
          <div className="relative">
            <Image
              src="/images/dashboards/ClicshqPage.svg"
              alt="clicsHQ dashboard"
              width={760}
              height={520}
              className="w-full h-auto rounded-2xl shadow-2xl ring-1 ring-black/5"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
