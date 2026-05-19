import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import { HeaderV2 } from '@/components/home/HeaderV2'
import { FooterV2 } from '@/components/home/FooterV2'
import { RefreshOnSave } from '@/components/RefreshOnSave'
import { SiteScripts } from '@/components/SiteScripts'
import { getPayloadClient } from '@/lib/payload'

// Always render fresh so CMS edits appear immediately.
export const dynamic = 'force-dynamic'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const settings = (await payload.findGlobal({ slug: 'site-settings' })) as any

  const ogImage =
    settings?.ogImage && typeof settings.ogImage === 'object' && settings.ogImage.url
      ? settings.ogImage.url.startsWith('http')
        ? settings.ogImage.url
        : `${SITE}${settings.ogImage.url}`
      : undefined

  return {
    metadataBase: new URL(SITE),
    title: {
      default: settings?.siteTitle || 'clicsHQ',
      template: `%s | ${settings?.siteTitle || 'clicsHQ'}`,
    },
    description: settings?.metaDescription || '',
    openGraph: {
      type: 'website',
      siteName: settings?.siteTitle || 'clicsHQ',
      title: settings?.siteTitle || 'clicsHQ',
      description: settings?.metaDescription || '',
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      site: settings?.twitterHandle || undefined,
      title: settings?.siteTitle || 'clicsHQ',
      description: settings?.metaDescription || '',
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient()
  const settings = (await payload.findGlobal({ slug: 'site-settings' })) as any

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SiteScripts html={settings?.headScripts} position="head" />
      </head>
      <body className="min-h-screen flex flex-col bg-white" suppressHydrationWarning>
        <SiteScripts html={settings?.bodyStartScripts} position="body-start" />
        <RefreshOnSave />
        <HeaderV2 />
        <main className="flex-1">{children}</main>
        <FooterV2 />
        <SiteScripts html={settings?.bodyEndScripts} position="body-end" />
      </body>
    </html>
  )
}
