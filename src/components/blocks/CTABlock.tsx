import React from 'react'
import Link from 'next/link'

export function CTABlock({ block }: { block: any }) {
  const style = block.style || 'primary'

  const bgClasses: Record<string, string> = {
    primary: 'bg-primary-600',
    dark: 'bg-gray-900',
    gradient: 'bg-gradient-to-br from-primary-600 via-primary-700 to-blue-700',
  }

  return (
    <section className="px-5 sm:px-6 lg:px-8 py-16">
      <div className={`relative max-w-6xl mx-auto rounded-3xl overflow-hidden ${bgClasses[style] || bgClasses.primary}`}>
        {/* Decorative */}
        <div className="absolute inset-0">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute inset-0 bg-grid opacity-[0.07]" />
        </div>

        <div className="relative px-6 py-16 sm:px-16 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance max-w-2xl mx-auto">
            {block.heading}
          </h2>
          {block.description && (
            <p className="mt-4 text-lg text-white/80 text-balance max-w-xl mx-auto">
              {block.description}
            </p>
          )}
          {block.buttonLabel && (
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href={block.buttonUrl || '#'} className="btn-white group">
                {block.buttonLabel}
                <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white rounded-xl ring-1 ring-inset ring-white/30 hover:bg-white/10 transition-colors">
                Talk to sales
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
