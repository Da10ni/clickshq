import {
  Home,
  LayoutGrid,
  Users,
  FileText,
  Sparkles,
  LayoutDashboard,
  GitBranch,
  Plug,
  CreditCard,
  UserPlus,
  Settings,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  /** When the current path startsWith one of these, the item is "active". */
  match?: string[]
}

export const SIDEBAR_PRIMARY: NavItem[] = [
  { label: 'Home',         href: '/app',              icon: Home,            match: ['/app'] },
  { label: 'Spaces',       href: '/app/spaces',       icon: LayoutGrid,      match: ['/app/spaces'] },
  { label: 'Teams',        href: '/app/teams',        icon: Users,           match: ['/app/teams'] },
  { label: 'Docs',         href: '/app/docs',         icon: FileText,        match: ['/app/docs'] },
  { label: 'Clics AI',     href: '/app/clics-ai',     icon: Sparkles,        match: ['/app/clics-ai'] },
  { label: 'Dashboards',   href: '/app/dashboards',   icon: LayoutDashboard, match: ['/app/dashboards'] },
  { label: 'Workflows',    href: '/app/workflows',    icon: GitBranch,       match: ['/app/workflows'] },
  { label: 'Integrations', href: '/app/integrations', icon: Plug,            match: ['/app/integrations'] },
]

export const SIDEBAR_SECONDARY: NavItem[] = [
  { label: 'Billing',  href: '/app/billing',  icon: CreditCard, match: ['/app/billing'] },
  { label: 'Invite',   href: '/app/invite',   icon: UserPlus,   match: ['/app/invite'] },
  { label: 'Settings', href: '/app/settings', icon: Settings,   match: ['/app/settings'] },
]

/** Returns true if the given pathname should highlight this nav item. */
export function isNavActive(pathname: string, item: NavItem): boolean {
  if (!item.match) return pathname === item.href
  // "/app" must only match exactly to avoid matching every /app/* route.
  if (item.href === '/app') return pathname === '/app'
  return item.match.some((m) => pathname === m || pathname.startsWith(m + '/'))
}
