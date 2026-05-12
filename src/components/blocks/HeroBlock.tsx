import React from 'react'
import Link from 'next/link'

export function HeroBlock({ block }: { block: any }) {
  const style = block.style || 'centered'
  const isSplit = style === 'split'

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 via-white to-white" />
        <div className="absolute inset-x-0 top-0 h-[500px] bg-grid [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-primary-200/30 blur-3xl" />
        <div className="absolute top-40 -right-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      </div>

      <div className="container-custom">
        <div className={`py-24 sm:py-28 lg:py-36 ${isSplit ? 'grid lg:grid-cols-2 gap-16 items-center' : 'text-center max-w-3xl mx-auto'}`}>
          <div className={isSplit ? '' : 'flex flex-col items-center'}>
            <div className="animate-fade-up">
              <span className="eyebrow">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-600" />
                </span>
                New: AI-powered task suggestions
              </span>
            </div>

            <h1 className="heading-xl text-balance mt-7 animate-fade-up" style={{ animationDelay: '0.05s' }}>
              {block.headline}
            </h1>

            {block.subheadline && (
              <p className={`text-lead text-balance mt-6 animate-fade-up ${isSplit ? '' : 'max-w-2xl'}`} style={{ animationDelay: '0.1s' }}>
                {block.subheadline}
              </p>
            )}

            <div className={`mt-10 flex flex-wrap gap-3 animate-fade-up ${isSplit ? '' : 'justify-center'}`} style={{ animationDelay: '0.15s' }}>
              {block.primaryCTA?.label && (
                <Link href={block.primaryCTA.url || '#'} className="btn-primary group">
                  {block.primaryCTA.label}
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              )}
              {block.secondaryCTA?.label && (
                <Link href={block.secondaryCTA.url || '#'} className="btn-secondary">
                  {block.secondaryCTA.label}
                </Link>
              )}
            </div>

            {/* Trust row */}
            <div className={`mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500 animate-fade-up ${isSplit ? '' : 'justify-center'}`} style={{ animationDelay: '0.2s' }}>
              {['Free 14-day trial', 'No credit card required', 'Cancel anytime'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Visual / app mockup */}
          <div className={`${isSplit ? 'block' : 'hidden'} lg:block`}>
            {!isSplit ? null : (
              <div className="relative animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <AppMockup />
              </div>
            )}
          </div>
        </div>

        {/* Full-width app preview for non-split layouts */}
        {!isSplit && (
          <div className="relative -mb-24 sm:-mb-28 lg:-mb-32 max-w-5xl mx-auto animate-fade-up" style={{ animationDelay: '0.25s' }}>
            <div className="absolute -inset-x-8 -top-8 -bottom-8 bg-gradient-to-b from-primary-100/40 to-transparent rounded-3xl blur-2xl" />
            <AppMockup />
          </div>
        )}
      </div>
    </section>
  )
}

function AppMockup() {
  return (
    <div className="relative rounded-2xl bg-white shadow-2xl ring-1 ring-gray-900/10 overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="ml-2 flex-1 max-w-xs h-6 rounded-md bg-white border border-gray-200" />
      </div>
      {/* Fake dashboard */}
      <div className="p-6 grid grid-cols-12 gap-4 bg-gray-50/50">
        <div className="col-span-3 space-y-3">
          <div className="h-8 rounded-lg bg-primary-600/90" />
          <div className="h-5 rounded bg-gray-200" />
          <div className="h-5 rounded bg-gray-200 w-4/5" />
          <div className="h-5 rounded bg-gray-200 w-3/5" />
          <div className="h-5 rounded bg-gray-200 w-4/5" />
        </div>
        <div className="col-span-9 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-20 rounded-xl bg-white shadow-sm border border-gray-100 p-3">
              <div className="h-3 w-12 rounded bg-gray-200" />
              <div className="mt-2 h-6 w-16 rounded bg-primary-100" />
            </div>
            <div className="h-20 rounded-xl bg-white shadow-sm border border-gray-100 p-3">
              <div className="h-3 w-12 rounded bg-gray-200" />
              <div className="mt-2 h-6 w-16 rounded bg-emerald-100" />
            </div>
            <div className="h-20 rounded-xl bg-white shadow-sm border border-gray-100 p-3">
              <div className="h-3 w-12 rounded bg-gray-200" />
              <div className="mt-2 h-6 w-16 rounded bg-amber-100" />
            </div>
          </div>
          <div className="h-44 rounded-xl bg-white shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-7 w-20 rounded-lg bg-primary-50" />
            </div>
            <div className="mt-4 flex items-end gap-3 h-24">
              {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-primary-200" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
