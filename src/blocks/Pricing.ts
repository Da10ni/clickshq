import type { Block } from 'payload'

export const pricingBlock: Block = {
  slug: 'pricing',
  labels: {
    singular: 'Pricing Section',
    plural: 'Pricing Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Simple, transparent pricing',
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'plans',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "$19" or "Free"' },
        },
        {
          name: 'period',
          type: 'text',
          defaultValue: '/month',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
            },
            {
              name: 'included',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
        {
          name: 'highlighted',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Highlight this plan as recommended' },
        },
        {
          name: 'ctaLabel',
          type: 'text',
          defaultValue: 'Get Started',
        },
        {
          name: 'ctaUrl',
          type: 'text',
          defaultValue: '#',
        },
      ],
    },
  ],
}
