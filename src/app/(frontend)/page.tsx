import { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { LivePreviewBlocks } from '@/components/LivePreviewBlocks'
import { PagePlaceholder } from '@/components/PagePlaceholder'

// Always fetch fresh content from the CMS so admin edits appear immediately.
export const dynamic = 'force-dynamic'

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
  const data = await getHomePage()
  if (!data) return {}
  return {
    title: data.meta?.title || data.title,
    description: data.meta?.description || undefined,
  }
}

export default async function HomePage() {
  const data = await getHomePage()
  if (!data) return <PagePlaceholder title="Welcome to ClicksHQ" slug="home" />
  return <LivePreviewBlocks initialData={data} />
}
