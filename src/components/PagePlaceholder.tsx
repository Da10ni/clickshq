import React from 'react'
import Link from 'next/link'

export function PagePlaceholder({ title, slug }: { title: string; slug: string }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50/60 to-white" />
      <div className="container-custom py-28 sm:py-36 text-center max-w-xl mx-auto">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-100 text-primary-600">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <h1 className="mt-6 heading-lg">{title}</h1>
        <p className="mt-3 text-gray-600">
          This page has no content yet. Create a page with the slug{' '}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-gray-800">{slug}</code>{' '}
          in the admin panel to publish it.
        </p>
        <Link href="/admin" className="btn-primary mt-8">Open Admin Panel</Link>
      </div>
    </section>
  )
}
