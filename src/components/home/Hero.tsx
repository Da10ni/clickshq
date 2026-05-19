import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container-custom relative pt-12 pb-20 sm:pt-16 sm:pb-24">
        {/* Headline + body */}
        <div className="relative text-center max-w-5xl mx-auto pt-8">
          <h1 className="font-bold tracking-tight text-brand-ink leading-[1.05] text-5xl sm:text-6xl lg:text-7xl">
            Manage Producti
            <span className="relative inline-block">
              vity
              {/* Decorative floating sticky note positioned over the headline */}
              <Image
                src="/images/hero/phase.svg"
                alt=""
                width={180}
                height={120}
                aria-hidden
                className="hidden sm:block absolute -top-10 -right-32 lg:-right-44 select-none pointer-events-none"
              />
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            This is software that protects all your data, including strong security access.
            <br className="hidden sm:block" />
            Use data as needed and provide security of all data very easily.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#"
              className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-brand-ink rounded-xl shadow-sm hover:bg-black transition-colors"
            >
              Get Started Now
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-brand-ink bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Try It Free
            </Link>
          </div>

          {/* Curved arrow + "Try Our Demo" link */}
          <div className="mt-7 flex items-center justify-center">
            <Image
              src="/images/hero/arrow.svg"
              alt=""
              width={120}
              height={70}
              aria-hidden
              className="mr-2 -mt-4 hidden sm:block pointer-events-none select-none"
            />
            <p className="text-sm text-gray-600">
              Try Our Demo Of Dashboard Now!{' '}
              <Link href="#" className="font-medium text-violet-600 hover:underline">
                Learn More
              </Link>
            </p>
          </div>

          {/* Floating "Task" card */}
          <Image
            src="/images/hero/task.svg"
            alt=""
            width={200}
            height={120}
            aria-hidden
            className="hidden md:block absolute -left-2 lg:-left-6 top-44 lg:top-56 select-none pointer-events-none"
          />
        </div>

        {/* Big dashboard mockup */}
        <div className="relative mt-12 sm:mt-16">
          {/* subtle backdrop */}
          <div className="absolute inset-x-0 -inset-y-6 -z-10 bg-gradient-to-b from-gray-50 via-gray-100/60 to-gray-200/40 rounded-3xl" />
          <Image
            src="/images/dashboards/ClicshqPage.svg"
            alt="clicsHQ dashboard preview"
            width={1400}
            height={820}
            priority
            className="w-full h-auto rounded-2xl shadow-2xl ring-1 ring-black/5"
          />
        </div>
      </div>
    </section>
  )
}
