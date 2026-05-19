import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { LogosStrip } from '@/components/home/LogosStrip'
import { ToolsGrid } from '@/components/home/ToolsGrid'
import { ExploreTabs } from '@/components/home/ExploreTabs'
import { SolutionsTabs } from '@/components/home/SolutionsTabs'
import { HowItWorks } from '@/components/home/HowItWorks'
import { AISection } from '@/components/home/AISection'
import { WhyUs } from '@/components/home/WhyUs'
import { FinalCTA } from '@/components/home/FinalCTA'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'clicsHQ — Work Management Platform For Result-Driven Teams',
  description:
    'Plan projects, manage tasks, collaborate with your team, and automate the busywork with AI-powered workflows.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogosStrip />
      <ToolsGrid />
      <ExploreTabs />
      <SolutionsTabs />
      <HowItWorks />
      <AISection />
      <WhyUs />
      <FinalCTA />
    </>
  )
}
