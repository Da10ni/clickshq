import { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const page = await payload.find({ collection: 'pages', where: { slug: { equals: 'privacy' } }, limit: 1 })
  const data = page.docs[0]
  return {
    title: data?.meta?.title || 'Privacy Policy',
    description: data?.meta?.description || 'ClicksHQ Privacy Policy.',
  }
}

export default async function PrivacyPage() {
  const payload = await getPayloadClient()
  const page = await payload.find({ collection: 'pages', where: { slug: { equals: 'privacy' } }, limit: 1 })
  const data = page.docs[0]

  if (!data) return <PagePlaceholder title="Privacy Policy" slug="privacy" />

  return <RenderBlocks blocks={data.layout} />
}
