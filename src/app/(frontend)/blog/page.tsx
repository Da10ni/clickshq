import { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest news, updates, and insights from the ClicksHQ team.',
}

const GRADIENTS = [
  'from-primary-100 to-blue-200',
  'from-emerald-100 to-teal-200',
  'from-amber-100 to-orange-200',
  'from-rose-100 to-pink-200',
  'from-violet-100 to-purple-200',
  'from-cyan-100 to-sky-200',
]

export default async function BlogPage() {
  const payload = await getPayloadClient()
  const posts = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 24,
  })

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary-50/60 to-white" />
      <div className="container-custom section-padding">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow">Blog</span>
          <h1 className="heading-xl text-balance mt-5">Insights & updates</h1>
          <p className="text-lead text-balance mt-4">
            Product news, productivity tips, and behind-the-scenes stories from the ClicksHQ team.
          </p>
        </div>

        {posts.docs.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl bg-gray-50 p-10 text-center ring-1 ring-gray-100">
            <p className="text-gray-500">No posts published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.docs.map((post: any, i: number) => (
              <article key={post.id} className="group flex flex-col">
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  <div className={`relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} ring-1 ring-gray-900/5`}>
                    {post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage.url ? (
                      <img src={post.featuredImage.url} alt={post.featuredImage.alt || post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="h-10 w-10 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="mt-5 flex flex-col flex-1">
                    {post.publishedAt && (
                      <time className="text-xs font-medium uppercase tracking-wider text-primary-600">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </time>
                    )}
                    <h2 className="mt-1.5 text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{post.title}</h2>
                    {post.excerpt && (
                      <p className="mt-2 text-[15px] leading-relaxed text-gray-600 line-clamp-3">{post.excerpt}</p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600">
                      Read article
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
