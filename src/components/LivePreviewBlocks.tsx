'use client'

import React from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

const serverURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

/**
 * Renders a Pages document's block layout. When opened inside Payload's
 * Live Preview iframe, it subscribes to editor changes so the preview
 * updates as you type — no save required. Outside the iframe (normal
 * visitors) it simply renders the data passed from the server.
 */
export function LivePreviewBlocks({ initialData }: { initialData: any }) {
  const { data } = useLivePreview<any>({
    initialData,
    serverURL,
    depth: 2,
  })

  return <RenderBlocks blocks={data?.layout} />
}
