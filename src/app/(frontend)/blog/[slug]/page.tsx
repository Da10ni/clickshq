import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const posts = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1 })
  const post = posts.docs[0]
  if (!post) return {}
  return {
    title: post.meta?.title || post.title,
    description: post.meta?.description || post.excerpt || undefined,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const posts = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1, depth: 2 })
  const post = posts.docs[0]
  if (!post) notFound()

  const author = post.author && typeof post.author === 'object' ? post.author : null

  return (
    <article className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-primary-50/60 to-white" />
      <div className="container-custom pt-14 pb-20 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          All articles
        </Link>

        <header className="mt-8">
          {post.publishedAt && (
            <time className="text-sm font-medium uppercase tracking-wider text-primary-600">
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
          )}
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-gray-900 leading-tight text-balance">
            {post.title}
          </h1>
          {post.excerpt && <p className="mt-4 text-xl text-gray-600 text-balance">{post.excerpt}</p>}

          {author && (
            <div className="mt-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white font-semibold text-sm">
                {(author.name || author.email || '?').charAt(0).toUpperCase()}
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">{author.name || author.email}</div>
                <div className="text-gray-500">Author</div>
              </div>
            </div>
          )}
        </header>

        {post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage.url && (
          <div className="mt-10 aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-gray-900/5">
            <img src={post.featuredImage.url} alt={post.featuredImage.alt || post.title} className="h-full w-full object-cover" />
          </div>
        )}

        <div className="mt-10 prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-blockquote:border-l-primary-500">
          {post.content && <RichText data={post.content} />}
        </div>

        <div className="mt-14 pt-8 border-t border-gray-100 flex items-center justify-between">
          <Link href="/blog" className="btn-secondary">← Back to blog</Link>
          <Link href="/#pricing" className="btn-primary">Try ClicksHQ free</Link>
        </div>
      </div>
    </article>
  )
}
