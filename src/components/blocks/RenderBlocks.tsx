import React from 'react'
import { HeroBlock } from './HeroBlock'
import { FeaturesBlock } from './FeaturesBlock'
import { CTABlock } from './CTABlock'
import { PricingBlock } from './PricingBlock'
import { TestimonialsBlock } from './TestimonialsBlock'
import { ContentBlock } from './ContentBlock'
import { TeamBlock } from './TeamBlock'
import { ContactFormBlock } from './ContactFormBlock'

const blockComponents: Record<string, React.ComponentType<{ block: any }>> = {
  hero: HeroBlock,
  features: FeaturesBlock,
  cta: CTABlock,
  pricing: PricingBlock,
  testimonials: TestimonialsBlock,
  content: ContentBlock,
  team: TeamBlock,
  contactForm: ContactFormBlock,
}

export function RenderBlocks({ blocks }: { blocks: any[] | null | undefined }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null
        return <Component key={block.id || i} block={block} />
      })}
    </>
  )
}
