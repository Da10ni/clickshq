import type { CollectionConfig } from 'payload'
import { slugHook } from '../lib/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', '_status', 'publishedAt'],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
  },
  versions: {
    drafts: {
      autosave: { interval: 2000 },
      schedulePublish: true,
    },
    maxPerDoc: 30,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
      hooks: { beforeValidate: [slugHook('title')] },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: { description: 'Brief summary for blog listing and SEO' },
    },
    { name: 'content', type: 'richText', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Summary',
          fields: [
            {
              name: 'aiSummary',
              type: 'textarea',
              label: 'AI / Editorial Summary',
              admin: { description: 'Short summary for AI search results and rich snippets.' },
            },
          ],
        },
        {
          label: 'Advanced SEO',
          fields: [
            {
              name: 'sitemap',
              type: 'group',
              fields: [
                {
                  name: 'include',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: { description: 'Include this post in /sitemap.xml.' },
                },
                {
                  name: 'priority',
                  type: 'select',
                  defaultValue: '0.7',
                  options: ['1.0', '0.9', '0.8', '0.7', '0.5', '0.3'].map((v) => ({ label: v, value: v })),
                },
                {
                  name: 'changefreq',
                  type: 'select',
                  defaultValue: 'weekly',
                  options: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].map((v) => ({
                    label: v, value: v,
                  })),
                },
              ],
            },
            {
              name: 'jsonLd',
              type: 'json',
              label: 'JSON-LD Schema (optional)',
              admin: {
                description:
                  'Paste a JSON-LD object (e.g. BlogPosting, FAQPage). Will be injected as <script type="application/ld+json">.',
              },
            },
          ],
        },
      ],
    },
  ],
}
