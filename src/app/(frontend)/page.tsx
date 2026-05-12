import { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { PagePlaceholder } from '@/components/PagePlaceholder'

// Always fetch fresh content from the CMS so admin edits appear immediately.
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  const data = page.docs[0]
  if (!data) return {}

  return {
    title: data.meta?.title || data.title,
    description: data.meta?.description || undefined,
  }
}

export default async function HomePage() {
  const payload = await getPayloadClient()
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  const data = page.docs[0]

  if (!data) return <PagePlaceholder title="Welcome to ClicksHQ" slug="home" />

  return <RenderBlocks blocks={data.layout} />
}
