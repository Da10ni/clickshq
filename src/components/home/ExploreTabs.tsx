'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const TABS = ['Analytics', 'Task', 'Docs', 'Calendar', 'Integrations', 'AI Chat', 'Workflow']

export function ExploreTabs() {
  const [active, setActive] = useState('Analytics')

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-custom text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-ink">
          What would you like to
          <br />
          <span className="text-brand-pink italic font-bold">explore?</span>
        </h2>

        {/* Tabs */}
        <div className="mt-10 overflow-x-auto">
          <div className="inline-flex items-center gap-1 sm:gap-2 border-b border-gray-200">
            {TABS.map((t) => {
              const isActive = active === t
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActive(t)}
                  className={`relative px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive ? 'text-brand-ink' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {t}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-ink rounded-full" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="mt-12 mx-auto max-w-4xl">
          <div className="relative rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden bg-white">
            <Image
              src="/images/dashboards/ClicshqPage.svg"
              alt={`${active} dashboard`}
              width={1200}
              height={760}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
