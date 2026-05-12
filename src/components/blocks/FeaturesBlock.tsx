import React from 'react'
import { Icon } from '@/components/Icon'

export function FeaturesBlock({ block }: { block: any }) {
  return (
    <section id="features" className="section-padding bg-white scroll-mt-20">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow">Features</span>
          {block.heading && (
            <h2 className="heading-lg text-balance mt-5">{block.heading}</h2>
          )}
          {block.subheading && (
            <p className="text-lead text-balance mt-4">{block.subheading}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {block.features?.map((feature: any, i: number) => (
            <div
              key={i}
              className="group relative p-7 bg-white rounded-2xl ring-1 ring-gray-100 card-hover hover:ring-primary-200"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 ring-1 ring-inset ring-primary-100 group-hover:from-primary-100 group-hover:to-primary-200 transition-colors">
                <Icon name={feature.icon || 'bolt'} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-gray-600">
                {feature.description}
              </p>
              <div className="absolute inset-x-7 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
