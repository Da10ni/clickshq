import React from 'react'

const AVATAR_COLORS = [
  'from-primary-400 to-primary-600',
  'from-emerald-400 to-emerald-600',
  'from-amber-400 to-orange-500',
  'from-rose-400 to-pink-600',
  'from-violet-400 to-purple-600',
  'from-cyan-400 to-blue-600',
]

export function TeamBlock({ block }: { block: any }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow">Our Team</span>
          {block.heading && (
            <h2 className="heading-lg text-balance mt-5">{block.heading}</h2>
          )}
          {block.subheading && (
            <p className="text-lead text-balance mt-4">{block.subheading}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {block.members?.map((member: any, i: number) => (
            <div key={i} className="group text-center">
              <div className={`mx-auto h-28 w-28 rounded-2xl bg-gradient-to-br ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center shadow-lg ring-4 ring-white group-hover:scale-105 transition-transform`}>
                <span className="text-3xl font-bold text-white">{member.name?.charAt(0) || '?'}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-primary-600 text-sm font-medium">{member.role}</p>
              {member.bio && (
                <p className="mt-2 text-sm leading-relaxed text-gray-600 max-w-xs mx-auto">{member.bio}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
