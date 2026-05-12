import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { LivePreviewBlocks } from '@/components/LivePreviewBlocks'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

async function getPage(slug: string) {
  const payload = await getPayloadClient()
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return page.docs[0] || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await getPage(slug)
  if (!data) return {}
  return {
    title: data.meta?.title || data.title,
    description: data.meta?.description || undefined,
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  const data = await getPage(slug)
  if (!data) notFound()
  return <LivePreviewBlocks initialData={data} />
}
