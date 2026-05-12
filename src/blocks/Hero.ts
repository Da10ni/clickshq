import type { Block } from 'payload'

export const heroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'subheadline',
      type: 'textarea',
    },
    {
      name: 'primaryCTA',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Get Started Free' },
        { name: 'url', type: 'text', defaultValue: '#pricing' },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Learn More' },
        { name: 'url', type: 'text', defaultValue: '/about' },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'style',
      type: 'select',
      options: [
        { label: 'Centered', value: 'centered' },
        { label: 'Left Aligned', value: 'left' },
        { label: 'With Image Right', value: 'split' },
      ],
      defaultValue: 'centered',
    },
  ],
}
