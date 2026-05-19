import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Media } from './collections/Media'
import { Contacts } from './collections/Contacts'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN)

const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// Build the public-facing URL for a given Pages/Posts document.
const previewPath = (collection: string, slug?: string | null) => {
  if (collection === 'posts') return slug ? `/blog/${slug}` : '/blog'
  if (!slug || slug === 'home') return '/'
  return `/${slug}`
}

// Reused by SEO plugin (Generate Preview button) and Live Preview.
const generateURL: any = ({ doc, collectionSlug }: any) =>
  `${siteURL}${previewPath(collectionSlug || 'pages', doc?.slug)}`

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— ClicksHQ Admin',
    },
    livePreview: {
      url: ({ data, collectionConfig }) =>
        `${siteURL}${previewPath(collectionConfig?.slug || 'pages', (data as any)?.slug)}`,
      collections: ['pages', 'posts'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Pages, Posts, Media, Contacts, Users],
  globals: [Header, Footer, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),

    // Adds canonical URL, meta robots, OG title/desc/image, Twitter card,
    // and a SEO preview snippet to Pages and Posts.
    seoPlugin({
      collections: ['pages', 'posts'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: any) => `${doc?.title || 'Untitled'} — ClicksHQ`,
      generateDescription: ({ doc }: any) => doc?.excerpt || '',
      generateURL,
      tabbedUI: true,
    }),

    // Manages redirects (e.g. old URL → new URL, 301/302).
    redirectsPlugin({
      collections: ['pages', 'posts'],
      overrides: {
        admin: {
          group: 'SEO',
        },
      },
    }),

    ...(hasBlobToken
      ? [
          vercelBlobStorage({
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN as string,
          }),
        ]
      : []),
  ],
  cors: process.env.NEXT_PUBLIC_SITE_URL ? [process.env.NEXT_PUBLIC_SITE_URL] : '*',
})
