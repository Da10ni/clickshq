import type { Block } from 'payload'

export const ctaBlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      defaultValue: 'Start Free Trial',
    },
    {
      name: 'buttonUrl',
      type: 'text',
      defaultValue: '#',
    },
    {
      name: 'style',
      type: 'select',
      options: [
        { label: 'Primary (Blue)', value: 'primary' },
        { label: 'Dark', value: 'dark' },
        { label: 'Gradient', value: 'gradient' },
      ],
      defaultValue: 'primary',
    },
  ],
}
