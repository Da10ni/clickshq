import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'siteTitle',
              type: 'text',
              defaultValue: 'ClicksHQ — Project Management Platform',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              defaultValue:
                'ClicksHQ helps teams plan, track, and deliver projects with ease. The all-in-one project management platform built for modern teams.',
            },
            { name: 'ogImage', type: 'upload', relationTo: 'media' },
            { name: 'favicon', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'twitterHandle',
              type: 'text',
              admin: { description: 'e.g. @clickshq (used for Twitter card metadata)' },
            },
          ],
        },
        {
          label: 'Scripts',
          description: 'Custom HTML injected into every page (for analytics, tracking, etc.).',
          fields: [
            {
              name: 'headScripts',
              type: 'code',
              admin: {
                language: 'html',
                description: 'Injected at end of <head>. Use for Google Analytics, GTM, Plausible, etc.',
              },
            },
            {
              name: 'bodyStartScripts',
              type: 'code',
              admin: {
                language: 'html',
                description: 'Injected immediately after <body> opening tag. Use for GTM <noscript> fallback.',
              },
            },
            {
              name: 'bodyEndScripts',
              type: 'code',
              admin: {
                language: 'html',
                description: 'Injected before </body>. Use for chat widgets, late-loading scripts.',
              },
            },
          ],
        },
        {
          label: 'Robots',
          fields: [
            {
              name: 'robotsTxt',
              type: 'code',
              admin: {
                language: 'plaintext',
                description:
                  'Contents of /robots.txt. Leave blank for sensible defaults (allow all + sitemap).',
              },
            },
          ],
        },
      ],
    },
  ],
}
