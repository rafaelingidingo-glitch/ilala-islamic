import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { guardAdmin } from '@/lib/api'
import type { StaffDto } from '@/lib/types'

/**
 * GET  /api/staff       — public list (published, ordered).
 * GET  /api/staff?all=1 — full list (admin session required).
 * POST /api/staff       — create (admin).
 */

const staffSchema = z.object({
  name: z.string().trim().min(2, 'Name is too short').max(120),
  role: z.string().trim().min(2, 'Role is required').max(120),
  department: z.string().trim().min(2).max(60),
  initials: z.string().trim().max(4).optional().or(z.literal('')),
  order: z.number().int().min(0).max(999).optional().default(0),
  published: z.boolean().optional().default(true),
})

export async function GET(request: NextRequest) {
  try {
    const all = request.nextUrl.searchParams.get('all') === '1'
    if (all) {
      const denied = await guardAdmin(request)
      if (denied) return denied
    }

    const rows = await db.staff.findMany({
      where: all ? {} : { published: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    })
    return NextResponse.json({ ok: true, data: rows satisfies StaffDto[] })
  } catch (error) {
    console.error('[api/staff GET]', error)
    return NextResponse.json({ ok: false, error: 'Failed to load staff' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const denied = await guardAdmin(request)
  if (denied) return denied

  try {
    const parsed = staffSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid data' },
        { status: 400 }
      )
    }
    const { name, role, department, initials, order, published } = parsed.data

    const autoInitials = name
      .replace(/^(Dr|Mr|Mrs|Ms|Eng|Prof)\.?\s+/i, '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? '')
      .join('')

    const created = await db.staff.create({
      data: {
        name,
        role,
        department,
        initials: initials || autoInitials || name.slice(0, 2).toUpperCase(),
        order,
        published,
      },
    })
    return NextResponse.json({ ok: true, data: created }, { status: 201 })
  } catch (error) {
    console.error('[api/staff POST]', error)
    return NextResponse.json({ ok: false, error: 'Failed to add staff member' }, { status: 500 })
  }
}
