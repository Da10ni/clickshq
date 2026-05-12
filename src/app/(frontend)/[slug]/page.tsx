import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const data = page.docs[0]
  if (!data) return {}

  return {
    title: data.meta?.title || data.title,
    description: data.meta?.description || undefined,
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const data = page.docs[0]
  if (!data) notFound()

  return <RenderBlocks blocks={data.layout} />
}
