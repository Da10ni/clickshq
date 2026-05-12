import type { Block } from 'payload'

export const contactFormBlock: Block = {
  slug: 'contactForm',
  labels: {
    singular: 'Contact Form',
    plural: 'Contact Forms',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Get in touch',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'showContactInfo',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        condition: (_, siblingData) => siblingData?.showContactInfo,
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.showContactInfo,
      },
    },
    {
      name: 'address',
      type: 'textarea',
      admin: {
        condition: (_, siblingData) => siblingData?.showContactInfo,
      },
    },
  ],
}
