import React from 'react'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

type Image = { url?: string | null } | number | null | undefined

type Meta = {
  title?: string | null
  description?: string | null
  image?: Image
  keywords?: string | null
  canonicalURL?: string | null
  noindex?: boolean | null
  /** plugin-seo "meta robots" field shape — depends on plugin version */
  ogImage?: Image
}

type Doc = {
  slug?: string | null
  meta?: Meta | null
  jsonLd?: any
}

type Props = {
  doc?: Doc | null
  path?: string
  twitterHandle?: string | null
  defaultOgImage?: Image
}

const imageURL = (img: Image): string | undefined => {
  if (img && typeof img === 'object' && 'url' in img && img.url) {
    const url = img.url
    return url.startsWith('http') ? url : `${SITE}${url}`
  }
  return undefined
}

/**
 * Renders <meta> tags + JSON-LD <script> for OG, Twitter, canonical, and
 * structured data. Drop this anywhere inside the <body>; Next.js will hoist
 * the metadata into <head>. (For tags that Next can't hoist we emit plain
 * <script> for JSON-LD inside the body, which is valid.)
 */
export function PageSEO({ doc, path, twitterHandle, defaultOgImage }: Props) {
  const meta = doc?.meta || {}
  const canonical = meta.canonicalURL || (path ? `${SITE}${path}` : undefined)
  const ogImg = imageURL(meta.image) || imageURL(meta.ogImage) || imageURL(defaultOgImage)
  const jsonLd = doc?.jsonLd

  return (
    <>
      {canonical && (
        // Emitted as a regular link tag inside body — browsers still parse it.
        // Prefer `metadata.alternates.canonical` in Next.js for proper hoisting (we set this in generateMetadata too).
        <link rel="canonical" href={canonical} />
      )}
      {ogImg && (
        <>
          <meta property="og:image" content={ogImg} />
          <meta name="twitter:image" content={ogImg} />
        </>
      )}
      <meta name="twitter:card" content={ogImg ? 'summary_large_image' : 'summary'} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {meta.noindex && <meta name="robots" content="noindex, nofollow" />}
      {jsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: typeof jsonLd === 'string' ? jsonLd : JSON.stringify(jsonLd),
          }}
        />
      )}
    </>
  )
}
