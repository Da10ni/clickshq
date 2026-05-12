import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
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

// Vercel Blob storage activates only when the token is present (i.e. on Vercel).
// Locally, uploads fall back to the filesystem.
const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— ClicksHQ Admin',
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
    // Safe no-op when not deployed on Payload Cloud.
    payloadCloudPlugin(),
    // Cloud media storage on Vercel (filesystem fallback locally).
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
