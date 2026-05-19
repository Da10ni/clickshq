import type { FieldHook } from 'payload'

const slugify = (val: string) =>
  val
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-/]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

/**
 * Field hook that:
 *  - Auto-fills `slug` from `title` (or another source field) if the slug is empty.
 *  - Normalises any user-typed slug to a URL-safe form.
 *  - Allows slashes so pages can sit at nested paths (e.g. `product/tasks`).
 */
export const slugHook =
  (sourceField = 'title'): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === 'string' && value.length > 0) return slugify(value)
    const source = (data?.[sourceField] ?? originalDoc?.[sourceField]) as string | undefined
    if (typeof source === 'string' && source.length > 0) return slugify(source)
    return value
  }
