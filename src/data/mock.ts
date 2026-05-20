/**
 * Mock data for the SaaS app while the backend isn't wired yet.
 * Swap each function for a Payload Local API call when collections exist.
 */

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed'
export type TaskPriority = 'urgent' | 'high' | 'normal' | 'low'

export interface Task {
  id: string
  title: string
  spaceSlug: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string        // ISO
  estimatedHours: number
  actualHours: number
  assignees: string[]    // member ids
  tag?: 'Design' | 'Update' | 'Bugs Fixing' | 'Bug'
  description?: string
}

export interface Member {
  id: string
  name: string
  email: string
  role: 'Member' | 'Admin'
  status: 'Active' | 'Pending'
  initial: string
}

export interface Space {
  id: string
  slug: string
  name: string
  description: string
  team: string
  category: 'Software project' | 'Marketing' | 'Operations'
  createdAt: string
  owner: string
  stats: { total: number; completed: number; inProgress: number; overdue: number }
}

export const MEMBERS: Member[] = [
  { id: 'm1', name: 'James Jr.',     email: 'james.jr@gmail.com', role: 'Member', status: 'Pending', initial: 'J' },
  { id: 'm2', name: 'David John',    email: 'david12@gmail.com',  role: 'Admin',  status: 'Active',  initial: 'D' },
  { id: 'm3', name: 'Olivia Johanna', email: 'olivia@gmail.com',  role: 'Member', status: 'Active',  initial: 'O' },
  { id: 'm4', name: 'Marcus Johnson', email: 'marcus@gmail.com',  role: 'Member', status: 'Active',  initial: 'M' },
  { id: 'm5', name: 'Sarah Chen',     email: 'sarah@gmail.com',   role: 'Admin',  status: 'Active',  initial: 'S' },
]

export const SPACES: Space[] = [
  {
    id: 's1', slug: 'product-backlog', name: 'Product Backlog',
    description: "Editable based on permissions. This space contains the product backlog for the next releases. It includes tasks related to UI/UX, platform stability, onboarding flows, and integrations.",
    team: 'Engineering', category: 'Software project',
    createdAt: '2026-01-20', owner: 'Shahryar',
    stats: { total: 5627, completed: 2459, inProgress: 2459, overdue: 2459 },
  },
  {
    id: 's2', slug: 'gtm-launch', name: 'GTM Launch',
    description: 'Go-to-market launch tasks across marketing, product, and sales.',
    team: 'Marketing', category: 'Marketing',
    createdAt: '2026-02-04', owner: 'Sarah Chen',
    stats: { total: 124, completed: 56, inProgress: 38, overdue: 12 },
  },
  {
    id: 's3', slug: 'design-system', name: 'Design System',
    description: 'Component library and Figma source of truth.',
    team: 'Design', category: 'Software project',
    createdAt: '2026-02-12', owner: 'David John',
    stats: { total: 88, completed: 42, inProgress: 30, overdue: 4 },
  },
  {
    id: 's4', slug: 'backend-api', name: 'Backend API',
    description: 'Core REST + GraphQL endpoints and infra.',
    team: 'Engineering', category: 'Software project',
    createdAt: '2026-01-30', owner: 'Marcus Johnson',
    stats: { total: 210, completed: 130, inProgress: 60, overdue: 8 },
  },
]

const today = new Date()
const days = (n: number) => new Date(today.getTime() + n * 86_400_000).toISOString()

export const TASKS: Task[] = [
  // To-Do
  { id: 't1',  title: 'Create more options for navbar', spaceSlug: 'product-backlog', status: 'todo',        priority: 'normal', dueDate: days(7),  estimatedHours: 2, actualHours: 3, assignees: ['m1','m2','m3'], tag: 'Design' },
  { id: 't2',  title: 'Update Sidebar',                  spaceSlug: 'product-backlog', status: 'todo',        priority: 'high',   dueDate: days(-2), estimatedHours: 2, actualHours: 3, assignees: ['m4','m5'],      tag: 'Update' },
  // In progress
  { id: 't3',  title: 'Create wireframe for landing page phase 1', spaceSlug: 'product-backlog', status: 'in-progress', priority: 'urgent', dueDate: days(3), estimatedHours: 6, actualHours: 4, assignees: ['m1','m2','m3'], tag: 'Design' },
  { id: 't4',  title: 'Update information in footer section',      spaceSlug: 'product-backlog', status: 'in-progress', priority: 'normal', dueDate: days(5), estimatedHours: 2, actualHours: 1, assignees: ['m3','m4'],      tag: 'Update' },
  // Review
  { id: 't5',  title: 'Button contact not working when clicked',   spaceSlug: 'product-backlog', status: 'review',      priority: 'high',   dueDate: days(2), estimatedHours: 3, actualHours: 2, assignees: ['m1','m5'],      tag: 'Bugs Fixing' },
  { id: 't6',  title: 'Fix tooltip render glitch on dark sidebar', spaceSlug: 'product-backlog', status: 'review',      priority: 'normal', dueDate: days(6), estimatedHours: 1, actualHours: 1, assignees: ['m2'],            tag: 'Bug' },
  // Completed
  { id: 't7',  title: 'Set up project repo + CI',                  spaceSlug: 'product-backlog', status: 'completed',   priority: 'high',   dueDate: days(-12), estimatedHours: 4, actualHours: 5, assignees: ['m4','m5'],     tag: 'Update' },
  { id: 't8',  title: 'Migrate auth to provider X',                spaceSlug: 'product-backlog', status: 'completed',   priority: 'normal', dueDate: days(-10), estimatedHours: 8, actualHours: 9, assignees: ['m3','m4','m5'],tag: 'Update' },
]

export function getSpace(slug: string) {
  return SPACES.find((s) => s.slug === slug)
}
export function getSpaceTasks(slug: string) {
  return TASKS.filter((t) => t.spaceSlug === slug)
}
