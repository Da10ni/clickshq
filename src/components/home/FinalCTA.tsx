import React from 'react'
import Link from 'next/link'

/**
 * Final hero CTA with a stylised mountain-range silhouette.
 * Rendered as inline SVG so we don't depend on a heavy bitmap asset.
 */
export function FinalCTA() {
  return (
    <section className="relative isolate bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden">
      {/* Mountain silhouettes */}
      <svg
        aria-hidden
        viewBox="0 0 1440 520"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 w-full h-[80%] -z-10"
      >
        <defs>
          <linearGradient id="back-mountains" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#9ca3af" stopOpacity="0.7" />
            <stop offset="1" stopColor="#6b7280" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="front-mountains" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#4b5563" />
            <stop offset="1" stopColor="#1f2937" />
          </linearGradient>
        </defs>

        {/* Back range */}
        <path
          fill="url(#back-mountains)"
          d="M0,360 L120,300 L240,340 L360,260 L500,340 L640,280 L780,350 L920,260 L1080,330 L1220,290 L1360,350 L1440,310 L1440,520 L0,520 Z"
        />
        {/* Front range */}
        <path
          fill="url(#front-mountains)"
          d="M0,430 L160,360 L320,410 L480,330 L640,420 L800,360 L960,420 L1120,330 L1280,400 L1440,360 L1440,520 L0,520 Z"
        />

        {/* Big tree (right) */}
        <g transform="translate(1180,180)">
          <rect x="-6" y="170" width="12" height="120" fill="#0f172a" />
          <path
            fill="#0f172a"
            d="M0,-20 C90,80 110,140 130,200 C 80,180 40,180 0,200 C -40,180 -80,180 -130,200 C -110,140 -90,80 0,-20 Z"
          />
        </g>
      </svg>

      <div className="container-custom relative py-24 sm:py-32 max-w-5xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-ink leading-tight max-w-2xl">
          Bring your team&apos;s work into one
          <br />
          connected place.
        </h2>
        <p className="mt-4 text-base text-gray-600 max-w-xl">
          Plan projects, manage tasks, collaborate with your team, and automate the busywork with
          AI-powered workflows.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-brand-ink rounded-xl hover:bg-black transition-colors shadow-sm"
          >
            Start for free
          </Link>
          <Link
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-brand-ink bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Get a demo
          </Link>
        </div>
      </div>
    </section>
  )
}
