'use client'

import React, { useState } from 'react'

const contactItems = (block: any) => [
  block.email && {
    label: 'Email us',
    value: block.email,
    href: `mailto:${block.email}`,
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    ),
  },
  block.phone && {
    label: 'Call us',
    value: block.phone,
    href: `tel:${block.phone}`,
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    ),
  },
  block.address && {
    label: 'Visit us',
    value: block.address,
    href: undefined,
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </>
    ),
  },
].filter(Boolean)

export function ContactFormBlock({ block }: { block: any }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const items = contactItems(block)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 ' +
    'focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none transition-all'

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="eyebrow">Contact</span>
          {block.heading && <h2 className="heading-lg text-balance mt-5">{block.heading}</h2>}
          {block.description && <p className="text-lead text-balance mt-4">{block.description}</p>}
        </div>

        <div className={`mx-auto ${block.showContactInfo ? 'max-w-5xl grid lg:grid-cols-5 gap-10' : 'max-w-2xl'}`}>
          {block.showContactInfo && items.length > 0 && (
            <div className="lg:col-span-2 space-y-4">
              {items.map((item: any, i: number) => (
                <div key={i} className="flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-gray-100 shadow-sm">
                  <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-inset ring-primary-100">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>{item.icon}</svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-primary-600 hover:underline break-words">{item.value}</a>
                    ) : (
                      <p className="text-sm text-gray-600 whitespace-pre-line">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={`${block.showContactInfo ? 'lg:col-span-3' : ''} rounded-2xl bg-white p-6 sm:p-8 ring-1 ring-gray-100 shadow-sm`}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                  <input id="name" type="text" required value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} className={inputClass} placeholder="Jane Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input id="email" type="email" required value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} className={inputClass} placeholder="jane@company.com" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                <input id="subject" type="text" required value={formData.subject} onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))} className={inputClass} placeholder="How can we help?" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea id="message" required rows={5} value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} className={`${inputClass} resize-none`} placeholder="Tell us more about your needs…" />
              </div>

              <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0">
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>

              {status === 'success' && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                  Thanks! We&apos;ll get back to you within 24 hours.
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" /></svg>
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
