import React from 'react'
import Image from 'next/image'

const LOGOS = [
  { src: '/images/companies/TNN.svg', alt: 'TNN' },
  { src: '/images/companies/CyberBay.svg', alt: 'CyberBay' },
  { src: '/images/companies/nyxLab.svg', alt: 'NyxLab' },
  { src: '/images/companies/capexplan.svg', alt: 'Capexplan' },
]

export function LogosStrip({ heading = 'Delivering consistent, high-quality solutions.' }: { heading?: string | null } = {}) {
  return (
    <section className="bg-white py-14">
      <div className="container-custom">
        {heading && <p className="text-center text-sm text-gray-600">{heading}</p>}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 lg:gap-x-20">
          {LOGOS.map((l) => (
            <Image key={l.alt} src={l.src} alt={l.alt} width={160} height={48} className="h-7 sm:h-8 w-auto opacity-90" />
          ))}
        </div>
      </div>
    </section>
  )
}
