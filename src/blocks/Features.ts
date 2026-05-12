import type { Block } from 'payload'

export const featuresBlock: Block = {
  slug: 'features',
  labels: {
    singular: 'Features Grid',
    plural: 'Features Grids',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Everything you need to manage projects',
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'features',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Chart Bar', value: 'chart-bar' },
            { label: 'Users', value: 'users' },
            { label: 'Bolt', value: 'bolt' },
            { label: 'Shield', value: 'shield' },
            { label: 'Clock', value: 'clock' },
            { label: 'Puzzle', value: 'puzzle' },
            { label: 'Globe', value: 'globe' },
            { label: 'Cog', value: 'cog' },
            { label: 'Chat', value: 'chat' },
            { label: 'Document', value: 'document' },
            { label: 'Calendar', value: 'calendar' },
            { label: 'Rocket', value: 'rocket' },
          ],
          defaultValue: 'bolt',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
