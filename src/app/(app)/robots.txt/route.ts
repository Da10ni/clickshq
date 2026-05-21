import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const DEFAULT = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${SITE}/sitemap.xml
`

export async function GET() {
  const payload = await getPayloadClient()
  const settings = (await payload.findGlobal({ slug: 'site-settings' })) as any
  const custom = (settings?.robotsTxt || '').trim()
  const body = custom.length > 0 ? custom : DEFAULT

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  })
}
