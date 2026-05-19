import React from 'react'
import { Hero } from '@/components/home/Hero'
import { LogosStrip } from '@/components/home/LogosStrip'
import { ToolsGrid } from '@/components/home/ToolsGrid'
import { ExploreTabs } from '@/components/home/ExploreTabs'
import { SolutionsTabs } from '@/components/home/SolutionsTabs'
import { HowItWorks } from '@/components/home/HowItWorks'
import { AISection } from '@/components/home/AISection'
import { WhyUs } from '@/components/home/WhyUs'
import { FinalCTA } from '@/components/home/FinalCTA'

/**
 * Renders the full home page from a single `homePage` CMS block.
 * Every section reads its content from the block data; missing fields fall
 * back to the section's hard-coded Figma defaults.
 */
export function HomePageBlock({ block }: { block: any }) {
  const b = block || {}

  return (
    <>
      <Hero
        headlineStart={b.heroHeadlineStart}
        headlineAccent={b.heroHeadlineAccent}
        description={b.heroDescription}
        primaryCTA={b.heroPrimaryCTA}
        secondaryCTA={b.heroSecondaryCTA}
        demoText={b.heroDemoText}
        demoLink={b.heroDemoLink}
      />
      <LogosStrip heading={b.logosHeading} />
      <ToolsGrid heading={b.toolsHeading} cta={b.toolsCTA} />
      <ExploreTabs
        headingMain={b.exploreHeadingMain}
        headingAccent={b.exploreHeadingAccent}
        tabs={b.exploreTabs}
      />
      <SolutionsTabs
        headingMain={b.solutionsHeadingMain}
        headingAccent={b.solutionsHeadingAccent}
        description={b.solutionsDescription}
        tabs={b.solutionsTabs}
      />
      <HowItWorks
        eyebrow={b.howEyebrow}
        headingMain={b.howHeadingMain}
        headingAccent={b.howHeadingAccent}
        description={b.howDescription}
        steps={b.howSteps}
      />
      <AISection
        heading={b.aiHeading}
        description={b.aiDescription}
        features={b.aiFeatures}
      />
      <WhyUs
        eyebrow={b.whyEyebrow}
        heading={b.whyHeading}
        points={b.whyPoints}
      />
      <FinalCTA
        heading={b.ctaHeading}
        description={b.ctaDescription}
        primary={b.ctaPrimary}
        secondary={b.ctaSecondary}
      />
    </>
  )
}
