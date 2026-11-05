import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { guardAdmin } from '@/lib/api'

/**
 * PUT    /api/staff/[id] — update a staff member (admin).
 * DELETE /api/staff/[id] — remove a staff member (admin).
 */

const staffUpdateSchema = z.object({
  name: z.string().trim().min(2, 'Name is too short').max(120),
  role: z.string().trim().min(2, 'Role is required').max(120),
  department: z.string().trim().min(2).max(60),
  initials: z.string().trim().max(4).optional().or(z.literal('')),
  order: z.number().int().min(0).max(999).optional().default(0),
  published: z.boolean().optional().default(true),
})

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guardAdmin(request)
  if (denied) return denied

  try {
    const { id } = await params
    const parsed = staffUpdateSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid data' },
        { status: 400 }
      )
    }
    const { name, role, department, initials, order, published } = parsed.data

    const existing = await db.staff.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ ok: false, error: 'Staff member not found' }, { status: 404 })
    }

    await db.staff.update({
      where: { id },
      data: { name, role, department, initials: initials || existing.initials, order, published },
    })
    return NextResponse.json({ ok: true, data: { id } })
  } catch (error) {
    console.error('[api/staff PUT]', error)
    return NextResponse.json({ ok: false, error: 'Failed to update staff member' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await guardAdmin(request)
  if (denied) return denied

  try {
    const { id } = await params
    await db.staff.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[api/staff DELETE]', error)
    return NextResponse.json({ ok: false, error: 'Failed to delete staff member' }, { status: 500 })
  }
}
