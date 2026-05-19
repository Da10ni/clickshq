'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type SolutionsTab = {
  label: string
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  cta?: { label?: string | null; url?: string | null } | null
}

const DEFAULT_TABS: SolutionsTab[] = [
  {
    label: 'PMO & Ops',
    eyebrow: 'Resource management',
    title: 'Comprehensive Resource Management and Optimization',
    description: 'Resource management is the process of pre-planning, scheduling, and allocating your resources to maximize efficiency.',
  },
  {
    label: 'Marketing',
    eyebrow: 'Campaigns',
    title: 'Run campaigns from brief to launch in one place',
    description: 'Coordinate briefs, assets, approvals, and performance across every channel without switching tabs.',
  },
  {
    label: 'Sales & Revenue',
    eyebrow: 'Pipeline',
    title: 'Close more deals with a connected pipeline',
    description: 'Track every opportunity, automate follow-ups, and forecast revenue from one shared workspace.',
  },
  {
    label: 'IT & Support',
    eyebrow: 'Tickets',
    title: 'Handle requests at scale without losing context',
    description: 'Triage incoming issues, route to the right team, and resolve them with a complete audit trail.',
  },
  {
    label: 'Product & Engineering',
    eyebrow: 'Roadmap',
    title: 'Ship product from idea to launch — together',
    description: 'Plan sprints, track epics, and tie engineering work back to customer outcomes and revenue.',
  },
]

type Props = {
  headingMain?: string | null
  headingAccent?: string | null
  description?: string | null
  tabs?: SolutionsTab[] | null
}

export function SolutionsTabs({
  headingMain = 'Solutions for every team, powered by',
  headingAccent = 'AI',
  description = 'Keep your teams aligned and work moving with purpose-built solutions for every function, connected on one intelligent platform.',
  tabs,
}: Props = {}) {
  const list = tabs?.length ? tabs : DEFAULT_TABS
  const [active, setActive] = useState(list[0].label)
  const c = list.find((t) => t.label === active) || list[0]

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-ink">
            {headingMain}{' '}
            <span className="text-brand-purple italic">{headingAccent}</span>
          </h2>
          {description && <p className="mt-4 text-base text-gray-600">{description}</p>}
        </div>

        <div className="mt-10 overflow-x-auto">
          <div className="mx-auto inline-flex items-center gap-1 sm:gap-2 border-b border-gray-200">
            {list.map((t) => {
              const isActive = active === t.label
              return (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => setActive(t.label)}
                  className={`relative px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive ? 'text-brand-ink' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {t.label}
                  {isActive && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-ink rounded-full" />}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-12 mx-auto max-w-6xl grid lg:grid-cols-2 rounded-3xl overflow-hidden ring-1 ring-gray-100">
          <div className="p-10 sm:p-12 bg-gray-50 flex flex-col justify-center">
            {c.eyebrow && <p className="text-sm text-gray-500">{c.eyebrow}</p>}
            {c.title && (
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-brand-ink">{c.title}</h3>
            )}
            {c.description && <p className="mt-4 text-base text-gray-600">{c.description}</p>}
            {c.cta?.label && (
              <div className="mt-6">
                <Link
                  href={c.cta.url || '#'}
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-brand-ink rounded-lg hover:bg-black transition-colors"
                >
                  {c.cta.label}
                </Link>
              </div>
            )}
          </div>

          <div className="relative bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-400 p-8 sm:p-12 flex items-center justify-center min-h-[320px]">
            <Image
              src="/images/dashboards/ClicshqPage.svg"
              alt={`${c.label} dashboard`}
              width={760}
              height={480}
              className="w-full h-auto rounded-xl shadow-2xl ring-1 ring-white/30"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
