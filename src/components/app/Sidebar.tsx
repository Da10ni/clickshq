'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { WorkspaceSwitcher } from './WorkspaceSwitcher'
import { SIDEBAR_PRIMARY, SIDEBAR_SECONDARY, isNavActive, type NavItem } from '@/lib/nav'
import { cn } from '@/lib/cn'

const SIDEBAR_OPEN_WIDTH = 248
const SIDEBAR_COLLAPSED_WIDTH = 72

export function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(false)
  const pathname = usePathname()

  return (
    <aside
      style={{ width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_OPEN_WIDTH }}
      className={cn(
        'group/sidebar relative flex shrink-0 flex-col bg-sidebar text-sidebar-foreground',
        'transition-[width] duration-200 ease-in-out',
      )}
    >
      {/* Logo */}
      <div className="px-4 pt-5 pb-4 flex items-center gap-2">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white">
          <span className="h-3 w-3 rounded-full bg-sidebar" />
        </span>
        {!collapsed && (
          <span className="text-base font-semibold tracking-tight">clicsHQ</span>
        )}
      </div>

      {/* Workspace switcher */}
      <div className="px-3 pb-3">
        {collapsed ? (
          <div className="grid h-9 w-9 mx-auto place-items-center rounded-xl bg-white/[0.04] text-white text-sm font-semibold">
            M
          </div>
        ) : (
          <WorkspaceSwitcher />
        )}
      </div>

      {/* Collapse button — sits on the right edge */}
      <button
        type="button"
        onClick={() => setCollapsed((v) => !v)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className={cn(
          'absolute -right-3 top-20 z-10 grid h-6 w-6 place-items-center rounded-md',
          'bg-white text-ink shadow ring-1 ring-gray-200 hover:bg-gray-100 transition-colors',
          'opacity-0 group-hover/sidebar:opacity-100 focus-visible:opacity-100',
        )}
      >
        {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>

      {/* Primary nav */}
      <nav className="flex-1 px-2 overflow-y-auto">
        <ul className="space-y-0.5">
          {SIDEBAR_PRIMARY.map((item) => (
            <SidebarLink key={item.href} item={item} collapsed={collapsed} pathname={pathname} />
          ))}
        </ul>
      </nav>

      {/* Secondary nav (bottom) */}
      <div className="px-2 py-3 border-t border-sidebar-border">
        <ul className="space-y-0.5">
          {SIDEBAR_SECONDARY.map((item) => (
            <SidebarLink key={item.href} item={item} collapsed={collapsed} pathname={pathname} />
          ))}
        </ul>
      </div>
    </aside>
  )
}

function SidebarLink({
  item,
  collapsed,
  pathname,
}: {
  item: NavItem
  collapsed: boolean
  pathname: string
}) {
  const active = isNavActive(pathname, item)
  const Icon = item.icon

  return (
    <li>
      <Link
        href={item.href}
        title={collapsed ? item.label : undefined}
        className={cn(
          'flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors',
          'hover:bg-sidebar-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
          active ? 'bg-sidebar-active text-white' : 'text-sidebar-muted hover:text-white',
          collapsed && 'justify-center px-0',
        )}
      >
        <Icon className={cn('h-[18px] w-[18px] shrink-0', active && 'text-white')} />
        {!collapsed && <span className="truncate">{item.label}</span>}
      </Link>
    </li>
  )
}
