import type { Block } from 'payload'

/**
 * "Home Page" block — exposes every piece of editable text on the home page in one place.
 * The visual design (layout, images, colours, animations) is fixed in the section components.
 * Any field left blank falls back to the default Figma copy.
 */
export const homePageBlock: Block = {
  slug: 'homePage',
  labels: {
    singular: 'Home Page Content',
    plural: 'Home Page Content',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ── HERO ───────────────────────────────────────────────────────────
        {
          label: 'Hero',
          fields: [
            { name: 'heroHeadlineStart', type: 'text', label: 'Headline — start', defaultValue: 'Manage Producti' },
            { name: 'heroHeadlineAccent', type: 'text', label: 'Headline — accent (overlapped by sticky note)', defaultValue: 'vity' },
            {
              name: 'heroDescription',
              type: 'textarea',
              label: 'Description',
              defaultValue:
                'This is software that protects all your data, including strong security access. Use data as needed and provide security of all data very easily.',
            },
            {
              name: 'heroPrimaryCTA',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'Get Started Now' },
                { name: 'url', type: 'text', defaultValue: '#' },
              ],
            },
            {
              name: 'heroSecondaryCTA',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'Try It Free' },
                { name: 'url', type: 'text', defaultValue: '#' },
              ],
            },
            { name: 'heroDemoText', type: 'text', defaultValue: 'Try Our Demo Of Dashboard Now!' },
            {
              name: 'heroDemoLink',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'Learn More' },
                { name: 'url', type: 'text', defaultValue: '#' },
              ],
            },
          ],
        },

        // ── LOGOS STRIP ────────────────────────────────────────────────────
        {
          label: 'Trust Logos',
          fields: [
            { name: 'logosHeading', type: 'text', defaultValue: 'Delivering consistent, high-quality solutions.' },
          ],
        },

        // ── TOOLS ──────────────────────────────────────────────────────────
        {
          label: 'Tools',
          fields: [
            { name: 'toolsHeading', type: 'text', defaultValue: 'Works With 200+ Tools You Already Use' },
            {
              name: 'toolsCTA',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'Learn More' },
                { name: 'url', type: 'text', defaultValue: '#' },
              ],
            },
          ],
        },

        // ── EXPLORE TABS ───────────────────────────────────────────────────
        {
          label: 'Explore',
          fields: [
            { name: 'exploreHeadingMain', type: 'text', defaultValue: 'What would you like to' },
            { name: 'exploreHeadingAccent', type: 'text', label: 'Headline accent (pink)', defaultValue: 'explore?' },
            {
              name: 'exploreTabs',
              type: 'array',
              minRows: 1,
              maxRows: 10,
              fields: [{ name: 'label', type: 'text', required: true }],
              defaultValue: [
                { label: 'Analytics' }, { label: 'Task' }, { label: 'Docs' },
                { label: 'Calendar' }, { label: 'Integrations' }, { label: 'AI Chat' }, { label: 'Workflow' },
              ],
            },
          ],
        },

        // ── SOLUTIONS TABS ────────────────────────────────────────────────
        {
          label: 'Solutions',
          fields: [
            { name: 'solutionsHeadingMain', type: 'text', defaultValue: 'Solutions for every team, powered by' },
            { name: 'solutionsHeadingAccent', type: 'text', label: 'Accent (purple)', defaultValue: 'AI' },
            {
              name: 'solutionsDescription',
              type: 'textarea',
              defaultValue:
                'Keep your teams aligned and work moving with purpose-built solutions for every function, connected on one intelligent platform.',
            },
            {
              name: 'solutionsTabs',
              type: 'array',
              minRows: 1,
              maxRows: 8,
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'eyebrow', type: 'text' },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                {
                  name: 'cta',
                  type: 'group',
                  fields: [
                    { name: 'label', type: 'text', defaultValue: 'Get started' },
                    { name: 'url', type: 'text', defaultValue: '#' },
                  ],
                },
              ],
            },
          ],
        },

        // ── HOW IT WORKS ───────────────────────────────────────────────────
        {
          label: 'How It Works',
          fields: [
            { name: 'howEyebrow', type: 'text', defaultValue: 'How clicsHQ works' },
            { name: 'howHeadingMain', type: 'text', defaultValue: 'From planning to execution, everything stays' },
            { name: 'howHeadingAccent', type: 'text', label: 'Accent (lime)', defaultValue: 'connected.' },
            {
              name: 'howDescription',
              type: 'textarea',
              defaultValue:
                'clicsHQ brings tasks, docs, workflows, AI agents, and integrations into one simple operating system for your team.',
            },
            {
              name: 'howSteps',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },

        // ── AI SECTION ─────────────────────────────────────────────────────
        {
          label: 'AI Section',
          fields: [
            { name: 'aiHeading', type: 'text', defaultValue: 'AI that does more than write summaries.' },
            {
              name: 'aiDescription',
              type: 'textarea',
              defaultValue:
                'Let AI help create tasks, summarize project updates, detect blockers, and trigger workflows across the tools your team already uses.',
            },
            {
              name: 'aiFeatures',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },

        // ── WHY US ─────────────────────────────────────────────────────────
        {
          label: 'Why Us',
          fields: [
            { name: 'whyEyebrow', type: 'text', defaultValue: 'Why clicsHQ' },
            { name: 'whyHeading', type: 'text', defaultValue: 'Built for how modern teams actually work.' },
            {
              name: 'whyPoints',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },

        // ── FINAL CTA ──────────────────────────────────────────────────────
        {
          label: 'Final CTA',
          fields: [
            { name: 'ctaHeading', type: 'text', defaultValue: "Bring your team's work into one connected place." },
            {
              name: 'ctaDescription',
              type: 'textarea',
              defaultValue:
                'Plan projects, manage tasks, collaborate with your team, and automate the busywork with AI-powered workflows.',
            },
            {
              name: 'ctaPrimary',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'Start for free' },
                { name: 'url', type: 'text', defaultValue: '#' },
              ],
            },
            {
              name: 'ctaSecondary',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'Get a demo' },
                { name: 'url', type: 'text', defaultValue: '#' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
