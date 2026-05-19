import { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { LivePreviewBlocks } from '@/components/LivePreviewBlocks'
import { HomePageBlock } from '@/components/blocks/HomePageBlock'

export const dynamic = 'force-dynamic'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

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
  const data: any = await getHomePage()
  if (!data) {
    return {
      title: 'clicsHQ — Work Management Platform For Result-Driven Teams',
      description:
        'Plan projects, manage tasks, collaborate with your team, and automate the busywork with AI-powered workflows.',
    }
  }
  const meta = data.meta || {}
  return {
    title: meta.title || data.title || 'clicsHQ',
    description: meta.description || undefined,
    alternates: { canonical: meta.canonicalURL || `${SITE}/` },
    robots: meta.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: meta.title || data.title,
      description: meta.description || undefined,
      url: `${SITE}/`,
    },
  }
}

export default async function HomePage() {
  const data: any = await getHomePage()

  // We render the new Figma design no matter what.
  // If the CMS "Home" page has a `homePage` block, its text overrides the
  // defaults (with Live Preview). Otherwise the Figma defaults are shown.
  const homeBlock =
    Array.isArray(data?.layout) && data.layout.find((b: any) => b?.blockType === 'homePage')

  if (homeBlock && data) {
    // Pass a doc with only the homePage block so old blocks are ignored.
    const filtered = { ...data, layout: [homeBlock] }
    return <LivePreviewBlocks initialData={filtered} />
  }

  return <HomePageBlock block={{}} />
}
