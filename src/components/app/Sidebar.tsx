'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Shield,
  ChevronDown,
  ChevronRight,
  Trash2,
  Menu,
  Sparkles,
  Users,
  Workflow,
  Plug,
} from 'lucide-react'
import { cn } from '@/lib/cn'

// ── Icon filters (white when active, dim grey when not) ─────────────────────
const ICON_STYLE_ACTIVE   = { filter: 'brightness(0) invert(1)', opacity: 1   } as const
const ICON_STYLE_INACTIVE = { filter: 'brightness(0) invert(1)', opacity: 0.5 } as const

type NavItem = { id: string; name: string; path: string; icon: string }

const NAV_ITEMS: NavItem[] = [
  { id: 'home',         name: 'Home',         path: '/',              icon: '/icons/home.svg'       },
  { id: 'spaces',       name: 'Spaces',       path: '/spaces',        icon: '/icons/spaces.svg'     },
  { id: 'teams',        name: 'Teams',        path: '/teams',         icon: ''                      },
  { id: 'docs',         name: 'Docs',         path: '/docs',          icon: '/icons/docs.svg'       },
  { id: 'clicsai',      name: 'Clics AI',     path: '/ask-ai',        icon: ''                      },
  { id: 'dashboards',   name: 'Dashboards',   path: '/leaderboard',   icon: '/icons/dashboards.svg' },
  { id: 'workflows',    name: 'Workflows',    path: '/workflows',     icon: ''                      },
  { id: 'integrations', name: 'Integrations', path: '/integrations',  icon: ''                      },
]

const BOTTOM_ITEMS: { id: string; name: string; icon: string; path: string | null }[] = [
  { id: 'billing',  name: 'Billing',  icon: '/icons/billing.svg',  path: '/billing'  },
  { id: 'invite',   name: 'Invite',   icon: '/icons/invite.svg',   path: null        },
  { id: 'settings', name: 'Settings', icon: '/icons/settings.svg', path: '/settings' },
]

// ── Reusable nav icon (SVG, brightness-inverted to render white) ────────────
function SidebarIcon({ src, alt, active }: { src: string; alt: string; active: boolean }) {
  return (
    // Plain <img> is intentional — next/image would re-encode the SVG and break filter transforms
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-[20px] h-[20px] flex-shrink-0 transition-all duration-150"
      style={active ? ICON_STYLE_ACTIVE : ICON_STYLE_INACTIVE}
      draggable={false}
    />
  )
}

// ── Clics AI sparkle icon (always purple → pink gradient) ───────────────────
function ClicsAiIcon() {
  return (
    <div className="w-[20px] h-[20px] flex-shrink-0 flex items-center justify-center">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sparkle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <path
          d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
          fill="url(#sparkle-gradient)"
        />
        <path d="M20 3v4M22 5h-4" stroke="url(#sparkle-gradient)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function LucideNavIcon({ icon: Icon, active }: { icon: any; active: boolean }) {
  return (
    <Icon
      className="w-[20px] h-[20px] flex-shrink-0"
      style={{ color: active ? '#ffffff' : '#717579' }}
      strokeWidth={active ? 2 : 1.7}
    />
  )
}

export function Sidebar() {
  const pathname = usePathname() || '/'
  const router = useRouter()
  const [isExpanded, setIsExpanded] = React.useState(true)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [spacesExpanded, setSpacesExpanded] = React.useState(false)
  const [docsExpanded, setDocsExpanded] = React.useState(false)

  // Auto-close mobile drawer on navigation
  React.useEffect(() => { setMobileOpen(false) }, [pathname])

  // Placeholder workspace name until auth/backend wiring exists.
  const workspaceName = 'Workspace'

  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname.startsWith(path))
  const navigate = (path: string) => { router.push(path); setMobileOpen(false) }

  function renderIcon(itemId: string, icon: string, active: boolean) {
    if (itemId === 'clicsai')      return <ClicsAiIcon />
    if (itemId === 'teams')        return <LucideNavIcon icon={Users}    active={active} />
    if (itemId === 'workflows')    return <LucideNavIcon icon={Workflow} active={active} />
    if (itemId === 'integrations') return <LucideNavIcon icon={Plug}     active={active} />
    return <SidebarIcon src={icon} alt={itemId} active={active} />
  }

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-3 left-3 z-50 flex md:hidden items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black border border-white/10 shadow-lg outline-none focus:outline-none"
        aria-label="Open menu"
      >
        <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-[#717579]" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      <div
        className={cn(
          'bg-black flex flex-col h-screen select-none',
          'transition-all duration-300 ease-in-out',
          'hidden md:flex md:relative',
          isExpanded ? 'md:w-[240px]' : 'md:w-[60px]',
          mobileOpen && '!flex fixed inset-y-0 left-0 z-50 w-[260px] sm:w-[270px]',
        )}
      >
        {/* Logo */}
        <div className={cn('flex items-center shrink-0', isExpanded ? 'px-5 pt-6 pb-4' : 'justify-center px-0 pt-6 pb-4')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {isExpanded ? (
            <img src="/icons/logo_1.svg" alt="ClicsHQ" className="h-[54px] object-contain" draggable={false} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/icons/logo_2.svg" alt="ClicsHQ" className="w-8 h-8 object-contain brightness-0 invert" draggable={false} />
          )}
        </div>

        {/* Workspace selector */}
        <div className={cn('mb-6', isExpanded ? 'px-4' : 'px-2')}>
          <button
            className={cn(
              'flex items-center rounded-xl hover:bg-white/5 transition-colors outline-none focus:outline-none',
              isExpanded ? 'w-full gap-3.5 h-[56px] px-3' : 'w-full h-12 justify-center',
            )}
            title={!isExpanded ? workspaceName : undefined}
          >
            <div className="w-11 h-11 rounded-full border-[2.5px] border-purple-400/70 flex items-center justify-center flex-shrink-0 p-[2px]">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span className="text-[16px] text-black font-bold leading-none">
                  {workspaceName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            {isExpanded && (
              <>
                <span className="text-[15px] text-white font-medium truncate flex-1 text-left">{workspaceName}</span>
                <ChevronDown className="h-4 w-4 text-[#717579] flex-shrink-0" />
              </>
            )}
          </button>
        </div>

        {/* Collapse toggle */}
        <div className="relative h-0 mb-3">
          <button
            onClick={() => setIsExpanded((v) => !v)}
            className="absolute right-[-14px] top-1/2 -translate-y-1/2 z-20 outline-none focus:outline-none"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/arrow.svg"
              alt=""
              className={cn('w-[29px] h-[57px] drop-shadow-md transition-transform duration-200', !isExpanded && 'rotate-180')}
              draggable={false}
            />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-visible px-3 pb-2 mt-1">
          <div className="space-y-[2px]">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path)

              // Spaces (expandable; submenu stays empty until backend wires real spaces)
              if (item.id === 'spaces') {
                return (
                  <div key={item.id}>
                    <div
                      className={cn(
                        'relative group flex items-center rounded-lg cursor-pointer transition-all duration-150',
                        isExpanded ? 'h-[40px] px-3 gap-3' : 'h-[40px] justify-center',
                        active ? 'bg-white/[0.10]' : 'hover:bg-white/[0.05]',
                      )}
                    >
                      {active && <span className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-[3px] h-[55%] rounded-r-full bg-purple-500" />}
                      <button
                        onClick={() => { if (pathname !== '/spaces') navigate('/spaces') }}
                        className={cn('flex items-center gap-3 min-w-0 outline-none focus:outline-none', isExpanded ? 'flex-1' : 'justify-center w-full')}
                      >
                        {renderIcon(item.id, item.icon, active)}
                        {isExpanded && (
                          <span className={cn('text-[14px] truncate transition-colors', active ? 'font-semibold text-white' : 'font-normal text-[#8b8d91]')}>
                            {item.name}
                          </span>
                        )}
                      </button>
                      {isExpanded && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setSpacesExpanded((v) => !v) }}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-[#717579] opacity-0 group-hover:opacity-100 transition-opacity outline-none focus:outline-none"
                        >
                          {spacesExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                        </button>
                      )}
                    </div>
                    {spacesExpanded && isExpanded && (
                      <div className="mt-1">
                        {/* Backend not wired yet — show a single "View all spaces" link until /api/spaces/favourites + /api/spaces/recent exist */}
                        <button
                          onClick={() => navigate('/spaces')}
                          className="w-full flex items-center gap-2 h-8 pl-8 pr-2 text-[12px] text-[#717579] hover:text-gray-300 hover:bg-white/5 rounded-lg transition-colors outline-none focus:outline-none"
                        >
                          <Menu className="h-3 w-3" />
                          View all spaces
                        </button>
                      </div>
                    )}
                  </div>
                )
              }

              // Docs (expandable)
              if (item.id === 'docs') {
                return (
                  <div key={item.id}>
                    <div
                      className={cn(
                        'relative group flex items-center rounded-lg cursor-pointer transition-all duration-150',
                        isExpanded ? 'h-[40px] px-3 gap-3' : 'h-[40px] justify-center',
                        active ? 'bg-white/[0.10]' : 'hover:bg-white/[0.05]',
                      )}
                    >
                      {active && <span className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-[3px] h-[55%] rounded-r-full bg-purple-500" />}
                      <button
                        onClick={() => navigate(item.path)}
                        className={cn('flex items-center gap-3 min-w-0 outline-none focus:outline-none', isExpanded ? 'flex-1' : 'justify-center w-full')}
                      >
                        {renderIcon(item.id, item.icon, active)}
                        {isExpanded && (
                          <span className={cn('text-[14px] truncate transition-colors', active ? 'font-semibold text-white' : 'font-normal text-[#8b8d91]')}>
                            {item.name}
                          </span>
                        )}
                      </button>
                      {isExpanded && (
                        <button
                          onClick={() => setDocsExpanded((v) => !v)}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 text-[#717579] opacity-0 group-hover:opacity-100 transition-opacity outline-none focus:outline-none"
                        >
                          {docsExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                        </button>
                      )}
                    </div>
                    {docsExpanded && isExpanded && (
                      <div className="mt-0.5 space-y-0.5">
                        {[
                          { label: 'All Docs',       path: '/docs' },
                          { label: 'Created by me',  path: '/docs/my' },
                          { label: 'Meeting Notes',  path: '/docs/meeting-notes' },
                          { label: 'Trash',          path: '/docs/trash' },
                        ].map((d) => (
                          <button
                            key={d.path}
                            onClick={() => navigate(d.path)}
                            className={cn(
                              'w-full flex items-center h-8 rounded-lg pl-10 text-[13px] transition-colors hover:bg-white/5 outline-none focus:outline-none',
                              pathname === d.path ? 'font-semibold text-white' : 'font-normal text-[#717579]',
                              d.path === '/docs/trash' && pathname === d.path && 'text-red-400 font-semibold',
                            )}
                          >
                            {d.path === '/docs/trash' && <Trash2 className="h-4 w-4 mr-2 text-[#717579]" />}
                            {d.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              // All other nav items
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    'relative w-full flex items-center rounded-lg transition-all duration-150 outline-none focus:outline-none',
                    isExpanded ? 'h-[40px] px-3 gap-3 justify-start' : 'h-[40px] justify-center',
                    active ? 'bg-white/[0.10]' : 'hover:bg-white/[0.05]',
                  )}
                >
                  {active && <span className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-[3px] h-[55%] rounded-r-full bg-purple-500" />}
                  {renderIcon(item.id, item.icon, active)}
                  {isExpanded && (
                    <span className={cn('text-[14px] truncate transition-colors', active ? 'font-semibold text-white' : 'font-normal text-[#8b8d91]')}>
                      {item.name}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </nav>

        {/* Bottom bar */}
        <div className={cn('shrink-0 border-t border-white/[0.06] py-3', isExpanded ? 'px-3 space-y-[2px]' : 'flex flex-col items-center gap-[2px] px-1')}>
          {BOTTOM_ITEMS.map((item) => {
            const active = item.path ? isActive(item.path) : false
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'invite') {
                    // Invite modal not implemented yet — placeholder so the click is harmless
                    alert('Invite modal coming soon')
                  } else if (item.path) {
                    navigate(item.path)
                  }
                }}
                className={cn(
                  'relative flex items-center rounded-lg transition-all duration-150 outline-none focus:outline-none',
                  isExpanded ? 'w-full h-[40px] px-3 gap-3 justify-start' : 'w-9 h-9 justify-center',
                  active ? 'bg-white/[0.10]' : 'hover:bg-white/[0.05]',
                )}
                title={!isExpanded ? item.name : undefined}
              >
                {active && <span className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-[3px] h-[55%] rounded-r-full bg-purple-500" />}
                <SidebarIcon src={item.icon} alt={item.name} active={active} />
                {isExpanded && (
                  <span className={cn('text-[14px] truncate transition-colors', active ? 'font-semibold text-white' : 'font-normal text-[#8b8d91]')}>
                    {item.name}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
