import React from 'react'

/**
 * Renders raw HTML/JS snippets stored in Site Settings (analytics, tracking, chat widgets).
 * Use `position` to choose where this should be placed in the document.
 */
export function SiteScripts({
  html,
  position,
}: {
  html?: string | null
  position: 'head' | 'body-start' | 'body-end'
}) {
  if (!html || !html.trim()) return null
  // The CMS admin has full control over this content; render verbatim.
  return (
    <div
      data-scripts={position}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
