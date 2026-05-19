import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { LivePreviewBlocks } from '@/components/LivePreviewBlocks'
import { PageSEO } from '@/components/PageSEO'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const dynamic = 'force-dynamic'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

type Props = { params: Promise<{ slug: string }> }

async function getPage(slug: string) {
  const payload = await getPayloadClient()
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 3,
  })
  return page.docs[0] || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data: any = await getPage(slug)
  if (!data) return {}
  const meta = data.meta || {}
  const path = `/${slug}`
  const ogImg = meta.image && typeof meta.image === 'object' ? meta.image.url : undefined
  return {
    title: meta.title || data.title,
    description: meta.description || undefined,
    alternates: { canonical: meta.canonicalURL || `${SITE}${path}` },
    robots: meta.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: meta.title || data.title,
      description: meta.description || undefined,
      url: `${SITE}${path}`,
      images: ogImg ? [ogImg] : undefined,
    },
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  const data: any = await getPage(slug)
  if (!data) notFound()
  return (
    <>
      <PageSEO doc={data} path={`/${slug}`} />
      <Breadcrumbs doc={data} />
      <LivePreviewBlocks initialData={data} />
    </>
  )
}
