import { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { LivePreviewBlocks } from '@/components/LivePreviewBlocks'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export const dynamic = 'force-dynamic'

async function getAbout() {
  const payload = await getPayloadClient()
  const page = await payload.find({ collection: 'pages', where: { slug: { equals: 'about' } }, limit: 1, depth: 2 })
  return page.docs[0] || null
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAbout()
  return {
    title: data?.meta?.title || 'About',
    description: data?.meta?.description || 'Learn about ClicksHQ and our mission.',
  }
}

export default async function AboutPage() {
  const data = await getAbout()
  if (!data) return <PagePlaceholder title="About ClicksHQ" slug="about" />
  return <LivePreviewBlocks initialData={data} />
}
