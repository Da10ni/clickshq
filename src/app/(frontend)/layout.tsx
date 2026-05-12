import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import { HeaderComponent } from '@/components/Header'
import { FooterComponent } from '@/components/Footer'
import { getPayloadClient } from '@/lib/payload'

// Always render fresh so header/footer/CMS edits appear immediately.
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  return {
    title: {
      default: settings.siteTitle || 'ClicksHQ',
      template: `%s | ${settings.siteTitle || 'ClicksHQ'}`,
    },
    description: settings.metaDescription || '',
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient()

  const [header, footer] = await Promise.all([
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'footer' }),
  ])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <HeaderComponent data={header} />
        <main className="flex-1">{children}</main>
        <FooterComponent data={footer} />
      </body>
    </html>
  )
}
