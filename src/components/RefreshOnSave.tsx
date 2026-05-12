'use client'

import { RefreshRouteOnSave as PayloadRefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import React from 'react'

/**
 * When viewing a page inside Payload's Live Preview iframe, this listens for
 * "document saved" messages and refreshes the route so the preview reflects
 * the latest saved content automatically.
 */
export function RefreshOnSave() {
  const router = useRouter()
  const serverURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return <PayloadRefreshRouteOnSave refresh={() => router.refresh()} serverURL={serverURL} />
}
