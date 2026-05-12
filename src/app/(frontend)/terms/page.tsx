import { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { LivePreviewBlocks } from '@/components/LivePreviewBlocks'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export const dynamic = 'force-dynamic'

async function getTerms() {
  const payload = await getPayloadClient()
  const page = await payload.find({ collection: 'pages', where: { slug: { equals: 'terms' } }, limit: 1, depth: 2 })
  return page.docs[0] || null
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getTerms()
  return {
    title: data?.meta?.title || 'Terms of Service',
    description: data?.meta?.description || 'ClicksHQ Terms of Service.',
  }
}

export default async function TermsPage() {
  const data = await getTerms()
  if (!data) return <PagePlaceholder title="Terms of Service" slug="terms" />
  return <LivePreviewBlocks initialData={data} />
}
