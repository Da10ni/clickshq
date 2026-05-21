import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50/60 to-white" />
      <div className="container-custom min-h-[70vh] flex items-center justify-center text-center">
        <div className="max-w-md">
          <p className="text-7xl font-bold tracking-tight text-primary-600/20">404</p>
          <h1 className="mt-2 heading-lg">Page not found</h1>
          <p className="mt-3 text-gray-600">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or deleted.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/" className="btn-primary">Back home</Link>
            <Link href="/blog" className="btn-secondary">Read the blog</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
