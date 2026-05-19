import type { CollectionConfig } from 'payload'
import { heroBlock } from '../blocks/Hero'
import { featuresBlock } from '../blocks/Features'
import { ctaBlock } from '../blocks/CTA'
import { pricingBlock } from '../blocks/Pricing'
import { testimonialsBlock } from '../blocks/Testimonials'
import { contentBlock } from '../blocks/Content'
import { teamBlock } from '../blocks/Team'
import { contactFormBlock } from '../blocks/ContactForm'
import { slugHook } from '../lib/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
  },
  access: {
    read: ({ req }) => {
      // Drafts only visible to authenticated users; published is public.
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
  },
  // Drafts + version history (enables /admin draft preview, rollback, autosave).
  versions: {
    drafts: {
      autosave: { interval: 2000 },
      schedulePublish: true,
    },
    maxPerDoc: 30,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL path (auto-generated from title). Use "/" for nested e.g. product/tasks.',
      },
      hooks: { beforeValidate: [slugHook('title')] },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        position: 'sidebar',
        description: 'Optional. Used for breadcrumbs and nested navigation.',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        heroBlock,
        featuresBlock,
        ctaBlock,
        pricingBlock,
        testimonialsBlock,
        contentBlock,
        teamBlock,
        contactFormBlock,
      ],
    },
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
              admin: {
                description: 'Short page summary used for AI search results and rich snippets. Write 1–2 sentences.',
              },
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
                  admin: { description: 'Include this page in /sitemap.xml.' },
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
                  'Paste a JSON-LD object (e.g. SoftwareApplication, FAQPage). Will be injected as <script type="application/ld+json"> on this page.',
              },
            },
          ],
        },
      ],
    },
  ],
}
