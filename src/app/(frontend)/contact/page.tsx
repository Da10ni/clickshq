import { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { LivePreviewBlocks } from '@/components/LivePreviewBlocks'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export const dynamic = 'force-dynamic'

async function getContact() {
  const payload = await getPayloadClient()
  const page = await payload.find({ collection: 'pages', where: { slug: { equals: 'contact' } }, limit: 1, depth: 2 })
  return page.docs[0] || null
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContact()
  return {
    title: data?.meta?.title || 'Contact',
    description: data?.meta?.description || 'Get in touch with the ClicksHQ team.',
  }
}

export default async function ContactPage() {
  const data = await getContact()
  if (!data) return <PagePlaceholder title="Contact Us" slug="contact" />
  return <LivePreviewBlocks initialData={data} />
}
