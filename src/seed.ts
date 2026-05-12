import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

/**
 * Idempotent seed: safe to run multiple times.
 * Populates globals, the Home/About/Contact pages, and one demo blog post.
 */
async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Seeding ClicksHQ...\n')

  // ── Admin user ────────────────────────────────────────────────────────────
  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { email: 'admin@clickshq.com', password: 'changeme123', name: 'Admin', role: 'admin' },
    })
    console.log('✓ Created admin user — admin@clickshq.com / changeme123')
  } else {
    console.log('• Admin user already exists, skipping')
  }

  const adminUser = (await payload.find({ collection: 'users', limit: 1 })).docs[0]

  // ── Globals ───────────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'header',
    data: {
      logoText: 'ClicksHQ',
      navLinks: [
        { label: 'Features', url: '/#features' },
        { label: 'Pricing', url: '/#pricing' },
        { label: 'About', url: '/about' },
        { label: 'Blog', url: '/blog' },
        { label: 'Contact', url: '/contact' },
      ],
      ctaButton: { label: 'Get Started', url: '/#pricing' },
    },
  })
  console.log('✓ Header global')

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      copyright: `© ${new Date().getFullYear()} ClicksHQ. All rights reserved.`,
      columns: [
        { heading: 'Product', links: [
          { label: 'Features', url: '/#features' },
          { label: 'Pricing', url: '/#pricing' },
          { label: 'Integrations', url: '#' },
          { label: 'Changelog', url: '#' },
        ]},
        { heading: 'Company', links: [
          { label: 'About', url: '/about' },
          { label: 'Blog', url: '/blog' },
          { label: 'Careers', url: '#' },
          { label: 'Contact', url: '/contact' },
        ]},
        { heading: 'Resources', links: [
          { label: 'Help Center', url: '#' },
          { label: 'API Docs', url: '#' },
          { label: 'Status', url: '#' },
        ]},
        { heading: 'Legal', links: [
          { label: 'Privacy Policy', url: '/privacy' },
          { label: 'Terms of Service', url: '/terms' },
        ]},
      ],
      socialLinks: [
        { platform: 'twitter', url: 'https://twitter.com/clickshq' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/clickshq' },
        { platform: 'github', url: 'https://github.com/clickshq' },
      ],
    },
  })
  console.log('✓ Footer global')

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteTitle: 'ClicksHQ — Project Management Platform',
      metaDescription: 'ClicksHQ helps teams plan, track, and deliver projects with ease. The all-in-one project management platform built for modern teams.',
    },
  })
  console.log('✓ Site settings global')

  // ── Pages (delete existing demo pages first → idempotent) ─────────────────
  for (const slug of ['home', 'about', 'contact', 'privacy', 'terms']) {
    const found = await payload.find({ collection: 'pages', where: { slug: { equals: slug } } })
    for (const doc of found.docs) {
      await payload.delete({ collection: 'pages', id: doc.id })
    }
  }

  // Home
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      slug: 'home',
      layout: [
        {
          blockType: 'hero',
          headline: 'Ship projects faster with your whole team',
          subheadline: 'ClicksHQ is the all-in-one project management platform that helps teams plan, track, and deliver work — from idea to launch.',
          primaryCTA: { label: 'Start free trial', url: '/#pricing' },
          secondaryCTA: { label: 'See how it works', url: '/about' },
          style: 'centered',
        },
        {
          blockType: 'features',
          heading: 'Everything you need to manage projects',
          subheading: 'Powerful features designed for modern teams who want to move fast without losing control.',
          features: [
            { icon: 'chart-bar', title: 'Real-time dashboards', description: 'Get a bird\'s-eye view of every project with customizable dashboards that update live.' },
            { icon: 'users', title: 'Team collaboration', description: 'Work together seamlessly with built-in messaging, file sharing, and @mentions.' },
            { icon: 'bolt', title: 'Workflow automation', description: 'Automate repetitive tasks and status updates so your team can focus on what matters.' },
            { icon: 'shield', title: 'Enterprise security', description: 'SOC 2 compliant with role-based access, SSO, and full audit logs.' },
            { icon: 'clock', title: 'Time tracking', description: 'Track time on tasks and projects with built-in timers and detailed reports.' },
            { icon: 'puzzle', title: '100+ integrations', description: 'Connect the tools you already use — Slack, GitHub, Figma, Google Drive, and more.' },
          ],
        },
        {
          blockType: 'pricing',
          heading: 'Simple, transparent pricing',
          subheading: 'Start free. Upgrade when you\'re ready. No hidden fees, ever.',
          plans: [
            {
              name: 'Starter', price: 'Free', period: '', description: 'For individuals and small projects.',
              features: [
                { feature: 'Up to 5 projects', included: true },
                { feature: '3 team members', included: true },
                { feature: 'Basic dashboards', included: true },
                { feature: 'Email support', included: true },
                { feature: 'Workflow automation', included: false },
                { feature: 'Custom integrations', included: false },
              ],
              highlighted: false, ctaLabel: 'Get started free', ctaUrl: '#',
            },
            {
              name: 'Pro', price: '$19', period: '/user/mo', description: 'For growing teams that need more power.',
              features: [
                { feature: 'Unlimited projects', included: true },
                { feature: 'Unlimited members', included: true },
                { feature: 'Advanced dashboards', included: true },
                { feature: 'Priority support', included: true },
                { feature: 'Workflow automation', included: true },
                { feature: 'Custom integrations', included: false },
              ],
              highlighted: true, ctaLabel: 'Start free trial', ctaUrl: '#',
            },
            {
              name: 'Enterprise', price: '$49', period: '/user/mo', description: 'For organizations that need full control.',
              features: [
                { feature: 'Everything in Pro', included: true },
                { feature: 'SSO & SAML', included: true },
                { feature: 'Audit logs', included: true },
                { feature: 'Dedicated support', included: true },
                { feature: 'Custom automation', included: true },
                { feature: 'API access & webhooks', included: true },
              ],
              highlighted: false, ctaLabel: 'Contact sales', ctaUrl: '/contact',
            },
          ],
        },
        {
          blockType: 'testimonials',
          heading: 'Loved by teams worldwide',
          testimonials: [
            { quote: 'ClicksHQ transformed how our engineering team plans sprints. We shipped 40% more features last quarter.', name: 'Sarah Chen', title: 'VP of Engineering, TechFlow' },
            { quote: 'The automation features alone saved us 10+ hours per week. It\'s like having an extra team member.', name: 'Marcus Johnson', title: 'Product Manager, ScaleUp' },
            { quote: 'We evaluated 12 project management tools. ClicksHQ was the only one that didn\'t require a PhD to set up.', name: 'Emily Rodriguez', title: 'COO, Launchpad Studios' },
          ],
        },
        {
          blockType: 'cta',
          heading: 'Ready to transform how your team works?',
          description: 'Join 10,000+ teams who ship faster with ClicksHQ. Start your free 14-day trial today.',
          buttonLabel: 'Start free trial', buttonUrl: '#', style: 'gradient',
        },
      ],
      meta: {
        title: 'ClicksHQ — Project Management Platform for Modern Teams',
        description: 'ClicksHQ helps teams plan, track, and deliver projects with ease. Start your free trial today.',
      },
    },
  })
  console.log('✓ Home page')

  // About
  await payload.create({
    collection: 'pages',
    data: {
      title: 'About',
      slug: 'about',
      layout: [
        {
          blockType: 'hero',
          headline: 'We\'re building the future of project management',
          subheadline: 'ClicksHQ was founded with a simple mission: make project management actually enjoyable. The best tools get out of your way and let you focus on doing great work.',
          style: 'centered',
          primaryCTA: { label: 'Join our team', url: '#' },
          secondaryCTA: { label: 'Contact us', url: '/contact' },
        },
        {
          blockType: 'team',
          heading: 'Meet the team',
          subheading: 'A passionate group of builders, designers, and problem-solvers.',
          members: [
            { name: 'Alex Rivera', role: 'CEO & Co-founder', bio: 'Former PM at Stripe. Passionate about building tools teams actually love.' },
            { name: 'Jordan Park', role: 'CTO & Co-founder', bio: '10+ years of engineering experience. Previously led infrastructure at Vercel.' },
            { name: 'Sam Nakamura', role: 'Head of Design', bio: 'Design leader with experience at Figma and Notion. Obsessed with simplicity.' },
            { name: 'Taylor Brooks', role: 'Head of Engineering', bio: 'Full-stack engineer and open-source contributor. Loves TypeScript.' },
            { name: 'Casey Morgan', role: 'Head of Marketing', bio: 'Growth expert who helped scale two startups from zero to Series B.' },
            { name: 'Riley Kim', role: 'Head of Customer Success', bio: 'Makes every customer feel like our most important one.' },
          ],
        },
        {
          blockType: 'cta',
          heading: 'Want to join our team?',
          description: 'We\'re always looking for talented people who share our mission.',
          buttonLabel: 'View open positions', buttonUrl: '#', style: 'dark',
        },
      ],
      meta: { title: 'About ClicksHQ', description: 'Learn about the team and mission behind ClicksHQ.' },
    },
  })
  console.log('✓ About page')

  // Contact
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Contact',
      slug: 'contact',
      layout: [
        {
          blockType: 'contactForm',
          heading: 'Get in touch',
          description: 'Have a question or want to learn more? We\'d love to hear from you.',
          showContactInfo: true,
          email: 'hello@clickshq.com',
          phone: '+1 (555) 123-4567',
          address: '123 Innovation Drive\nSan Francisco, CA 94105',
        },
      ],
      meta: { title: 'Contact Us', description: 'Get in touch with the ClicksHQ team.' },
    },
  })
  console.log('✓ Contact page')

  // Privacy & Terms (simple content pages)
  const policyContent = (heading: string) => ({
    root: {
      type: 'root', format: '', indent: 0, version: 1, direction: 'ltr' as const,
      children: [
        { type: 'heading', tag: 'h1', format: '', indent: 0, version: 1, direction: 'ltr' as const,
          children: [{ type: 'text', text: heading, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }] },
        { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr' as const,
          children: [{ type: 'text', text: 'Last updated: ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + '. This is placeholder content — replace it from the Payload admin panel.', format: 0, mode: 'normal', style: '', detail: 0, version: 1 }] },
        { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr' as const,
          children: [{ type: 'text', text: 'ClicksHQ ("we", "us") operates this website. By using our services you agree to the practices described on this page. We take your privacy and trust seriously.', format: 0, mode: 'normal', style: '', detail: 0, version: 1 }] },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Privacy Policy', slug: 'privacy',
      layout: [{ blockType: 'content', maxWidth: 'md', content: policyContent('Privacy Policy') }],
      meta: { title: 'Privacy Policy', description: 'ClicksHQ Privacy Policy.' },
    },
  })
  console.log('✓ Privacy page')

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Terms of Service', slug: 'terms',
      layout: [{ blockType: 'content', maxWidth: 'md', content: policyContent('Terms of Service') }],
      meta: { title: 'Terms of Service', description: 'ClicksHQ Terms of Service.' },
    },
  })
  console.log('✓ Terms page')

  // ── Demo blog post ────────────────────────────────────────────────────────
  const existingPost = await payload.find({ collection: 'posts', where: { slug: { equals: 'introducing-clickshq' } } })
  for (const doc of existingPost.docs) await payload.delete({ collection: 'posts', id: doc.id })

  await payload.create({
    collection: 'posts',
    data: {
      title: 'Introducing ClicksHQ: project management, reimagined',
      slug: 'introducing-clickshq',
      status: 'published',
      publishedAt: new Date().toISOString(),
      author: adminUser?.id,
      excerpt: 'Today we\'re excited to launch ClicksHQ — the all-in-one platform that helps modern teams plan, track, and ship work without the busywork.',
      content: {
        root: {
          type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
          children: [
            { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr',
              children: [{ type: 'text', text: 'Building software is hard. Coordinating the people who build it shouldn\'t be. That\'s why we built ClicksHQ — a project management platform that gets out of your way.', format: 0, mode: 'normal', style: '', detail: 0, version: 1 }] },
            { type: 'heading', tag: 'h2', format: '', indent: 0, version: 1, direction: 'ltr',
              children: [{ type: 'text', text: 'What\'s included', format: 0, mode: 'normal', style: '', detail: 0, version: 1 }] },
            { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr',
              children: [{ type: 'text', text: 'Real-time dashboards, workflow automation, time tracking, and 100+ integrations — all in one place. Start free, no credit card required.', format: 0, mode: 'normal', style: '', detail: 0, version: 1 }] },
          ],
        },
      },
      meta: { title: 'Introducing ClicksHQ', description: 'The all-in-one project management platform for modern teams.' },
    },
  })
  console.log('✓ Demo blog post')

  console.log('\n✅ Seeding complete!')
  console.log('   Admin: http://localhost:3000/admin')
  console.log('   Login: admin@clickshq.com / changeme123 (if newly created)')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
