import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const TOOLS = [
  { src: '/images/tools/githubbgCircle.svg', alt: 'GitHub' },
  { src: '/images/tools/onedrivebgCircle.svg', alt: 'OneDrive' },
  { src: '/images/tools/gDrivebgCircle.svg', alt: 'Google Drive' },
  { src: '/images/tools/gCallendarbgCircle.svg', alt: 'Google Calendar' },
  { src: '/images/tools/jirabgCircle.svg', alt: 'Jira' },
  { src: '/images/tools/dropboxbgCircle.svg', alt: 'Dropbox' },
  { src: '/images/tools/slackbgCircle.svg', alt: 'Slack' },
  { src: '/images/tools/msteambgCircle.svg', alt: 'Microsoft Teams' },
  { src: '/images/tools/figmabgCircle.svg', alt: 'Figma' },
  { src: '/images/tools/outlookbgCircle.svg', alt: 'Outlook' },
]

type Props = {
  heading?: string | null
  cta?: { label?: string | null; url?: string | null } | null
}

export function ToolsGrid({
  heading = 'Works With 200+ Tools You Already Use',
  cta = { label: 'Learn More', url: '#' },
}: Props = {}) {
  return (
    <section className="bg-white py-20 sm:py-24 border-y border-blue-100">
      <div className="container-custom text-center">
        {heading && (
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink">{heading}</h2>
        )}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {TOOLS.map((t) => (
            <Image key={t.alt} src={t.src} alt={t.alt} width={64} height={64} className="h-12 w-12 sm:h-14 sm:w-14" />
          ))}
        </div>
        {cta?.label && (
          <div className="mt-10">
            <Link
              href={cta.url || '#'}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-brand-ink rounded-xl hover:bg-black transition-colors"
            >
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
