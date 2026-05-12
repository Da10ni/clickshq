import { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const page = await payload.find({ collection: 'pages', where: { slug: { equals: 'contact' } }, limit: 1 })
  const data = page.docs[0]
  return {
    title: data?.meta?.title || 'Contact',
    description: data?.meta?.description || 'Get in touch with the ClicksHQ team.',
  }
}

export default async function ContactPage() {
  const payload = await getPayloadClient()
  const page = await payload.find({ collection: 'pages', where: { slug: { equals: 'contact' } }, limit: 1 })
  const data = page.docs[0]

  if (!data) return <PagePlaceholder title="Contact Us" slug="contact" />

  return <RenderBlocks blocks={data.layout} />
}
