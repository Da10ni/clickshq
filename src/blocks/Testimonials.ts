import type { Block } from 'payload'

export const testimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Loved by teams worldwide',
    },
    {
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          admin: { description: 'e.g. "CEO at Acme Corp"' },
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
