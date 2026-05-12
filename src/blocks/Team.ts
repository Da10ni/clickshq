import type { Block } from 'payload'

export const teamBlock: Block = {
  slug: 'team',
  labels: {
    singular: 'Team Section',
    plural: 'Team Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Meet our team',
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'members',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          required: true,
        },
        {
          name: 'bio',
          type: 'textarea',
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
