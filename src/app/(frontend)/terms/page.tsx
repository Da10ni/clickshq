import { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const page = await payload.find({ collection: 'pages', where: { slug: { equals: 'terms' } }, limit: 1 })
  const data = page.docs[0]
  return {
    title: data?.meta?.title || 'Terms of Service',
    description: data?.meta?.description || 'ClicksHQ Terms of Service.',
  }
}

export default async function TermsPage() {
  const payload = await getPayloadClient()
  const page = await payload.find({ collection: 'pages', where: { slug: { equals: 'terms' } }, limit: 1 })
  const data = page.docs[0]

  if (!data) return <PagePlaceholder title="Terms of Service" slug="terms" />

  return <RenderBlocks blocks={data.layout} />
}
