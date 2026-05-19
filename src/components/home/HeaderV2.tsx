'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type MenuItem = { label: string; description?: string; href: string }

const PRODUCT_ITEMS: MenuItem[] = [
  { label: 'Integrations', description: 'Connect with 200+ tools you already use', href: '/product/integrations' },
  { label: 'Kanban Board', description: 'Workflows with smart automations', href: '/product/kanban' },
  { label: 'Gantt Chart', description: 'Workflows with smart automations', href: '/product/gantt' },
  { label: 'Tasks', description: 'Track performance and insights in real time', href: '/product/tasks' },
  { label: 'AI assists', description: 'Leverage AI to put progress in your pipeline', href: '/product/ai-chat' },
  { label: 'Docs', description: 'Workflows with smart automations', href: '/product/docs' },
  { label: 'Calendar', description: 'Track performance and insights in real time', href: '/product/calendar' },
  { label: 'Workflows', description: 'Leverage AI to put progress in your pipeline', href: '/product/workflows' },
]

const SOLUTIONS_ITEMS: MenuItem[] = [
  { label: 'Operations', href: '/solutions/operations' },
  { label: 'Marketing', href: '/solutions/marketing' },
  { label: 'Product', href: '/solutions/product' },
  { label: 'Engineering', href: '/solutions/engineering' },
  { label: 'HR', href: '/solutions/hr' },
  { label: 'Sales', href: '/solutions/sales' },
]

const RESOURCES_ITEMS: MenuItem[] = [
  { label: 'Blog', href: '/blog' },
  { label: 'Help Center', href: '/resources/help-center' },
  { label: 'Guides', href: '/resources/guides' },
  { label: 'Changelog', href: '/resources/changelog' },
]

export function HeaderV2() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMenus = () => setOpenMenu(null)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <nav className="container-custom flex items-center justify-between h-16 lg:h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center" onClick={closeMenus}>
          <Image src="/images/logo/ClicsHQ_logo.svg" alt="clicsHQ" width={120} height={32} priority className="h-7 w-auto" />
        </Link>

        {/* Center nav */}
        <div
          className="hidden lg:flex items-center gap-1 rounded-full ring-1 ring-gray-200 px-2 py-1 bg-white"
          onMouseLeave={closeMenus}
        >
          <NavTrigger label="Product" active={openMenu === 'product'} onHover={() => setOpenMenu('product')} />
          <NavTrigger label="Solutions" active={openMenu === 'solutions'} onHover={() => setOpenMenu('solutions')} />
          <NavTrigger label="Resources" active={openMenu === 'resources'} onHover={() => setOpenMenu('resources')} />
          <Link
            href="/pricing"
            onMouseEnter={closeMenus}
            className="px-4 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            Pricing
          </Link>
        </div>

        {/* Right cluster */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/demo" className="text-sm font-medium text-gray-700 hover:text-brand-ink">
            Demo
          </Link>
          <Link
            href="#"
            className="px-4 py-2 text-sm font-medium text-brand-ink border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="#"
            className="px-4 py-2 text-sm font-semibold text-white bg-brand-ink rounded-lg hover:bg-black transition-colors"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden grid h-10 w-10 place-items-center rounded-lg hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mega-menu panels */}
      {openMenu === 'product' && <MegaPanel items={PRODUCT_ITEMS} columns={2} onLeave={closeMenus} />}
      {openMenu === 'solutions' && <MegaPanel items={SOLUTIONS_ITEMS} columns={2} onLeave={closeMenus} />}
      {openMenu === 'resources' && <MegaPanel items={RESOURCES_ITEMS} columns={2} onLeave={closeMenus} />}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-5 py-4 space-y-1">
          {[...PRODUCT_ITEMS, ...SOLUTIONS_ITEMS, ...RESOURCES_ITEMS].map((i) => (
            <Link
              key={i.href}
              href={i.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
            >
              {i.label}
            </Link>
          ))}
          <Link href="/pricing" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100">
            Pricing
          </Link>
          <div className="pt-3 mt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
            <Link href="#" className="text-center px-4 py-2 text-sm font-medium text-brand-ink border border-gray-300 rounded-lg">
              Log in
            </Link>
            <Link href="#" className="text-center px-4 py-2 text-sm font-semibold text-white bg-brand-ink rounded-lg">
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

function NavTrigger({
  label,
  active,
  onHover,
}: {
  label: string
  active: boolean
  onHover: () => void
}) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
        active ? 'bg-gray-100 text-brand-ink' : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {label}
      <svg className="h-3.5 w-3.5 mt-0.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}

function MegaPanel({
  items,
  columns,
  onLeave,
}: {
  items: MenuItem[]
  columns: 1 | 2 | 3
  onLeave: () => void
}) {
  return (
    <div className="absolute left-1/2 top-full -translate-x-1/2 mt-2 w-[min(640px,calc(100vw-2rem))] z-50" onMouseLeave={onLeave}>
      <div className="rounded-2xl bg-white shadow-xl ring-1 ring-gray-100 p-4">
        <p className="px-2 pt-2 pb-3 text-xs font-medium uppercase tracking-wider text-gray-500">
          Features
        </p>
        <div className={`grid gap-1 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}>
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="flex items-start gap-3 rounded-xl p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-gray-100 text-gray-700">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6h16.5v12H3.75z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-brand-ink">{i.label}</p>
                {i.description && (
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{i.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
