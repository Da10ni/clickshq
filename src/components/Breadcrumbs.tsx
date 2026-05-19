import React from 'react'
import Link from 'next/link'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

type Crumb = { label: string; href: string }

const pathFor = (slug?: string | null) => (!slug || slug === 'home' ? '/' : `/${slug}`)

/**
 * Walks the `parent` relationship chain to build a breadcrumb trail.
 * Also emits BreadcrumbList JSON-LD so search engines can render rich crumbs.
 */
export function Breadcrumbs({ doc }: { doc: any }) {
  const crumbs: Crumb[] = []
  let current = doc?.parent
  // Walk up to 6 levels (safety cap).
  for (let i = 0; i < 6 && current && typeof current === 'object'; i++) {
    crumbs.unshift({ label: current.title || 'Untitled', href: pathFor(current.slug) })
    current = current.parent
  }
  // Always start with Home.
  crumbs.unshift({ label: 'Home', href: '/' })

  if (crumbs.length <= 1) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      ...crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.label,
        item: SITE + c.href,
      })),
      doc?.title && {
        '@type': 'ListItem',
        position: crumbs.length + 1,
        name: doc.title,
        item: SITE + pathFor(doc.slug),
      },
    ].filter(Boolean),
  }

  return (
    <nav aria-label="Breadcrumb" className="container-custom pt-6 text-sm text-gray-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <Link href={c.href} className="hover:text-primary-600 transition-colors">
              {c.label}
            </Link>
            <span className="text-gray-300">/</span>
          </li>
        ))}
        <li className="text-gray-700 font-medium">{doc?.title}</li>
      </ol>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  )
}
