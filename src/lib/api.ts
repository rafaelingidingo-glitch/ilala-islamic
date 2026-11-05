/**
 * Shared helpers for the admin/content API routes.
 */

import { NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/auth'

/** Return a 401 response when the admin session cookie is missing/invalid. */
export async function guardAdmin(request: Request): Promise<NextResponse | null> {
  if (await isAdminRequest(request)) return null
  return NextResponse.json(
    { ok: false, error: 'Unauthorized. Please sign in to the admin panel.' },
    { status: 401 }
  )
}

/** `Date | string → 'YYYY-MM-DD'` (UTC-safe, matches SQLite storage). */
export function toDateOnly(value: Date | string): string {
  return new Date(value).toISOString().slice(0, 10)
}

/** URL-safe slug from a title, with a short random suffix for uniqueness. */
export function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  const suffix = Math.random().toString(36).slice(2, 6)
  return `${base || 'news'}-${suffix}`
}

/** Parse a `YYYY-MM-DD` (or ISO) string into a Date at noon UTC. */
export function parseDateInput(value: string): Date {
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value)
  return new Date(dateOnly ? value + 'T12:00:00Z' : value)
}
