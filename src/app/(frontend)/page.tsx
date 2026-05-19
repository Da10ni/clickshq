import { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { LivePreviewBlocks } from '@/components/LivePreviewBlocks'
import { PagePlaceholder } from '@/components/PagePlaceholder'
import { PageSEO } from '@/components/PageSEO'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const dynamic = 'force-dynamic'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

async function getHomePage() {
  const payload = await getPayloadClient()
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    depth: 2,
  })
  return page.docs[0] || null
}

export async function generateMetadata(): Promise<Metadata> {
  const data: any = await getHomePage()
  if (!data) return {}
  const meta = data.meta || {}
  const ogImg = meta.image && typeof meta.image === 'object' ? meta.image.url : undefined
  return {
    title: meta.title || data.title,
    description: meta.description || undefined,
    alternates: { canonical: meta.canonicalURL || `${SITE}/` },
    robots: meta.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: meta.title || data.title,
      description: meta.description || undefined,
      url: `${SITE}/`,
      images: ogImg ? [ogImg] : undefined,
    },
  }
}

export default async function HomePage() {
  const data: any = await getHomePage()
  if (!data) return <PagePlaceholder title="Welcome to ClicksHQ" slug="home" />
  return (
    <>
      <PageSEO doc={data} path="/" />
      <Breadcrumbs doc={data} />
      <LivePreviewBlocks initialData={data} />
    </>
  )
}
