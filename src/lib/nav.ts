/**
 * Legacy nav config — the Sidebar in src/components/app/Sidebar.tsx now owns its
 * own NAV_ITEMS / BOTTOM_ITEMS (matched to the reference Nexus sidebar).
 * Kept here only so any other importer doesn't break.
 */
import {
  Home, LayoutGrid, Users, FileText, Sparkles, LayoutDashboard,
  GitBranch, Plug, CreditCard, UserPlus, Settings,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = { label: string; href: string; icon: LucideIcon; match?: string[] }

export const SIDEBAR_PRIMARY: NavItem[] = [
  { label: 'Home',         href: '/',             icon: Home,            match: ['/'] },
  { label: 'Spaces',       href: '/spaces',       icon: LayoutGrid,      match: ['/spaces'] },
  { label: 'Teams',        href: '/teams',        icon: Users,           match: ['/teams'] },
  { label: 'Docs',         href: '/docs',         icon: FileText,        match: ['/docs'] },
  { label: 'Clics AI',     href: '/ask-ai',       icon: Sparkles,        match: ['/ask-ai'] },
  { label: 'Dashboards',   href: '/leaderboard',  icon: LayoutDashboard, match: ['/leaderboard'] },
  { label: 'Workflows',    href: '/workflows',    icon: GitBranch,       match: ['/workflows'] },
  { label: 'Integrations', href: '/integrations', icon: Plug,            match: ['/integrations'] },
]

export const SIDEBAR_SECONDARY: NavItem[] = [
  { label: 'Billing',  href: '/billing',  icon: CreditCard, match: ['/billing'] },
  { label: 'Invite',   href: '/invite',   icon: UserPlus,   match: ['/invite'] },
  { label: 'Settings', href: '/settings', icon: Settings,   match: ['/settings'] },
]

export function isNavActive(pathname: string, item: NavItem): boolean {
  if (item.href === '/') return pathname === '/'
  if (!item.match) return pathname === item.href
  return item.match.some((m) => pathname === m || pathname.startsWith(m + '/'))
}
