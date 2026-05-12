import React from 'react'

const AVATAR_COLORS = [
  'from-primary-400 to-primary-600',
  'from-emerald-400 to-emerald-600',
  'from-amber-400 to-orange-500',
  'from-rose-400 to-pink-600',
  'from-violet-400 to-purple-600',
  'from-cyan-400 to-blue-600',
]

export function TestimonialsBlock({ block }: { block: any }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow">Testimonials</span>
          {block.heading && (
            <h2 className="heading-lg text-balance mt-5">{block.heading}</h2>
          )}
        </div>

        {/* Logos strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-14 opacity-60">
          {['TechFlow', 'ScaleUp', 'Launchpad', 'Acme Corp', 'Northwind'].map((name) => (
            <span key={name} className="text-lg font-bold tracking-tight text-gray-400">{name}</span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {block.testimonials?.map((t: any, i: number) => (
            <figure key={i} className="flex flex-col rounded-2xl bg-gray-50 p-7 ring-1 ring-gray-100 card-hover">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="flex-1 text-[15px] leading-relaxed text-gray-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${AVATAR_COLORS[i % AVATAR_COLORS.length]} text-white font-semibold text-sm ring-2 ring-white shadow`}>
                  {t.name?.charAt(0) || '?'}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  {t.title && <div className="text-gray-500 text-xs">{t.title}</div>}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
