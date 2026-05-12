import { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const page = await payload.find({ collection: 'pages', where: { slug: { equals: 'about' } }, limit: 1 })
  const data = page.docs[0]
  return {
    title: data?.meta?.title || 'About',
    description: data?.meta?.description || 'Learn about ClicksHQ and our mission.',
  }
}

export default async function AboutPage() {
  const payload = await getPayloadClient()
  const page = await payload.find({ collection: 'pages', where: { slug: { equals: 'about' } }, limit: 1 })
  const data = page.docs[0]

  if (!data) return <PagePlaceholder title="About ClicksHQ" slug="about" />

  return <RenderBlocks blocks={data.layout} />
}
