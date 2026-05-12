'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

type HeaderData = {
  logoText?: string | null
  navLinks?: Array<{ label: string; url: string; newTab?: boolean | null }> | null
  ctaButton?: { label?: string | null; url?: string | null } | null
}

function Logo({ text }: { text: string }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-600 shadow-md shadow-primary-600/30 group-hover:scale-105 transition-transform">
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </span>
      <span className="text-xl font-bold tracking-tight text-gray-900">{text}</span>
    </Link>
  )
}

export function HeaderComponent({ data }: { data: HeaderData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const logoText = data.logoText || 'ClicksHQ'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200/80 shadow-sm' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="container-custom flex items-center justify-between h-16 lg:h-[72px]">
        <Logo text={logoText} />

        <div className="hidden md:flex items-center gap-1">
          {data.navLinks?.map((link, i) => (
            <Link
              key={i}
              href={link.url}
              target={link.newTab ? '_blank' : undefined}
              className="px-3.5 py-2 text-sm font-medium text-gray-600 rounded-lg hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/contact" className="px-3.5 py-2 text-sm font-medium text-gray-600 rounded-lg hover:text-gray-900 hover:bg-gray-100/80 transition-colors">
            Sign in
          </Link>
          {data.ctaButton?.label && (
            <Link href={data.ctaButton.url || '#'} className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm shadow-primary-600/20 transition-all hover:-translate-y-0.5">
              {data.ctaButton.label}
            </Link>
          )}
        </div>

        <button
          className="md:hidden grid h-10 w-10 place-items-center rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-5 py-4 space-y-1 shadow-lg">
          {data.navLinks?.map((link, i) => (
            <Link
              key={i}
              href={link.url}
              className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 mt-3 border-t border-gray-100 space-y-2">
            <Link href="/contact" className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>
              Sign in
            </Link>
            {data.ctaButton?.label && (
              <Link href={data.ctaButton.url || '#'} className="block text-center px-4 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700" onClick={() => setMobileMenuOpen(false)}>
                {data.ctaButton.label}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
