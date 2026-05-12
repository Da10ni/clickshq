import React from 'react'
import Link from 'next/link'

export function PricingBlock({ block }: { block: any }) {
  const count = block.plans?.length || 3
  const gridCols =
    count === 2 ? 'lg:grid-cols-2 max-w-3xl' :
    count === 4 ? 'lg:grid-cols-4 max-w-6xl' :
    'lg:grid-cols-3 max-w-5xl'

  return (
    <section id="pricing" className="section-padding bg-gradient-to-b from-gray-50 to-white scroll-mt-20">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow">Pricing</span>
          {block.heading && (
            <h2 className="heading-lg text-balance mt-5">{block.heading}</h2>
          )}
          {block.subheading && (
            <p className="text-lead text-balance mt-4">{block.subheading}</p>
          )}
        </div>

        <div className={`grid gap-6 lg:gap-8 mx-auto ${gridCols}`}>
          {block.plans?.map((plan: any, i: number) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-gray-900 text-white shadow-2xl ring-1 ring-gray-900 lg:scale-[1.03]'
                  : 'bg-white text-gray-900 ring-1 ring-gray-200 shadow-sm'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-primary-600 text-white text-xs font-bold rounded-full uppercase tracking-wide shadow-lg">
                  Most Popular
                </span>
              )}

              <h3 className={`text-lg font-semibold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              {plan.description && (
                <p className={`mt-1.5 text-sm ${plan.highlighted ? 'text-gray-300' : 'text-gray-500'}`}>
                  {plan.description}
                </p>
              )}

              <div className="mt-6 flex items-baseline gap-1">
                <span className={`text-5xl font-bold tracking-tight ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={`text-sm font-medium ${plan.highlighted ? 'text-gray-400' : 'text-gray-500'}`}>
                    {plan.period}
                  </span>
                )}
              </div>

              <Link
                href={plan.ctaUrl || '#'}
                className={`mt-8 block text-center py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  plan.highlighted
                    ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:-translate-y-0.5'
                    : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md shadow-primary-600/20 hover:-translate-y-0.5'
                }`}
              >
                {plan.ctaLabel || 'Get Started'}
              </Link>

              <ul className={`mt-8 space-y-3.5 flex-1 pt-6 border-t ${plan.highlighted ? 'border-gray-700' : 'border-gray-100'}`}>
                {plan.features?.map((f: any, j: number) => (
                  <li key={j} className="flex items-start gap-3">
                    {f.included ? (
                      <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-primary-400' : 'text-primary-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-gray-600' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className={`text-sm ${
                      f.included
                        ? (plan.highlighted ? 'text-gray-200' : 'text-gray-700')
                        : (plan.highlighted ? 'text-gray-500' : 'text-gray-400')
                    }`}>
                      {f.feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          All plans include unlimited tasks, 99.9% uptime SLA, and SSL encryption.
        </p>
      </div>
    </section>
  )
}
