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
  { label: 'Home',         href: '/',              icon: Home,            match: ['/'] },
  { label: 'Spaces',       href: '/spaces',        icon: LayoutGrid,      match: ['/spaces'] },
  { label: 'Teams',        href: '/teams',         icon: Users,           match: ['/teams'] },
  { label: 'Docs',         href: '/docs',          icon: FileText,        match: ['/docs'] },
  { label: 'Clics AI',     href: '/clics-ai',      icon: Sparkles,        match: ['/clics-ai'] },
  { label: 'Dashboards',   href: '/dashboards',    icon: LayoutDashboard, match: ['/dashboards'] },
  { label: 'Workflows',    href: '/workflows',     icon: GitBranch,       match: ['/workflows'] },
  { label: 'Integrations', href: '/integrations',  icon: Plug,            match: ['/integrations'] },
]

export const SIDEBAR_SECONDARY: NavItem[] = [
  { label: 'Billing',  href: '/billing',  icon: CreditCard, match: ['/billing'] },
  { label: 'Invite',   href: '/invite',   icon: UserPlus,   match: ['/invite'] },
  { label: 'Settings', href: '/settings', icon: Settings,   match: ['/settings'] },
]

/** Returns true if the given pathname should highlight this nav item. */
export function isNavActive(pathname: string, item: NavItem): boolean {
  if (item.href === '/') return pathname === '/'
  if (!item.match) return pathname === item.href
  return item.match.some((m) => pathname === m || pathname.startsWith(m + '/'))
}
