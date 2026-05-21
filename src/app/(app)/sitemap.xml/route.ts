import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const urlPathForPage = (slug?: string | null) => {
  if (!slug || slug === 'home') return '/'
  return `/${slug}`
}

const escapeXML = (s: string) =>
  s.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' } as any)[c] || c,
  )

export async function GET() {
  const payload = await getPayloadClient()

  const [pages, posts] = await Promise.all([
    payload.find({ collection: 'pages', limit: 500, depth: 0, where: { _status: { equals: 'published' } } }),
    payload.find({ collection: 'posts', limit: 500, depth: 0, where: { _status: { equals: 'published' } } }),
  ])

  type Entry = { loc: string; lastmod?: string; priority?: string; changefreq?: string }
  const entries: Entry[] = []

  for (const doc of pages.docs as any[]) {
    if (doc?.sitemap?.include === false) continue
    entries.push({
      loc: SITE + urlPathForPage(doc.slug),
      lastmod: doc.updatedAt || doc.createdAt,
      priority: doc?.sitemap?.priority || '0.7',
      changefreq: doc?.sitemap?.changefreq || 'weekly',
    })
  }

  for (const doc of posts.docs as any[]) {
    if (doc?.sitemap?.include === false) continue
    entries.push({
      loc: `${SITE}/blog/${doc.slug}`,
      lastmod: doc.updatedAt || doc.createdAt,
      priority: doc?.sitemap?.priority || '0.6',
      changefreq: doc?.sitemap?.changefreq || 'monthly',
    })
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${escapeXML(e.loc)}</loc>${
      e.lastmod ? `\n    <lastmod>${escapeXML(new Date(e.lastmod).toISOString())}</lastmod>` : ''
    }
    <changefreq>${escapeXML(e.changefreq || 'weekly')}</changefreq>
    <priority>${escapeXML(e.priority || '0.7')}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  })
}
