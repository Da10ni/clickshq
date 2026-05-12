import { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { LivePreviewBlocks } from '@/components/LivePreviewBlocks'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export const dynamic = 'force-dynamic'

async function getPrivacy() {
  const payload = await getPayloadClient()
  const page = await payload.find({ collection: 'pages', where: { slug: { equals: 'privacy' } }, limit: 1, depth: 2 })
  return page.docs[0] || null
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPrivacy()
  return {
    title: data?.meta?.title || 'Privacy Policy',
    description: data?.meta?.description || 'ClicksHQ Privacy Policy.',
  }
}

export default async function PrivacyPage() {
  const data = await getPrivacy()
  if (!data) return <PagePlaceholder title="Privacy Policy" slug="privacy" />
  return <LivePreviewBlocks initialData={data} />
}
