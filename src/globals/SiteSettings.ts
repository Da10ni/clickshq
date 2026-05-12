import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      defaultValue: 'ClicksHQ — Project Management Platform',
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      defaultValue: 'ClicksHQ helps teams plan, track, and deliver projects with ease. The all-in-one project management platform built for modern teams.',
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
