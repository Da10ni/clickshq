import type { CollectionConfig } from 'payload'
import { heroBlock } from '../blocks/Hero'
import { featuresBlock } from '../blocks/Features'
import { ctaBlock } from '../blocks/CTA'
import { pricingBlock } from '../blocks/Pricing'
import { testimonialsBlock } from '../blocks/Testimonials'
import { contentBlock } from '../blocks/Content'
import { teamBlock } from '../blocks/Team'
import { contactFormBlock } from '../blocks/ContactForm'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
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
      admin: {
        position: 'sidebar',
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
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'SEO title — defaults to page title if empty',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'SEO meta description',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Open Graph image',
          },
        },
      ],
    },
  ],
}
