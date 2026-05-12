import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

const maxWidthClasses: Record<string, string> = {
  sm: 'max-w-xl',
  md: 'max-w-3xl',
  lg: 'max-w-5xl',
  full: 'max-w-7xl',
}

export function ContentBlock({ block }: { block: any }) {
  return (
    <section className="section-padding bg-white">
      <div className={`container-custom ${maxWidthClasses[block.maxWidth || 'md']} mx-auto`}>
        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary-500">
          {block.content && <RichText data={block.content} />}
        </div>
      </div>
    </section>
  )
}
