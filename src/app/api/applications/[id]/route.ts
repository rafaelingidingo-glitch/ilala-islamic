import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { guardAdmin } from '@/lib/api'
import { toApplicationDto } from '@/lib/applications'
import { APPLICATION_STATUSES } from '@/lib/types'

/**
 * GET    /api/applications/[id] — fetch one application (admin).
 * PATCH  /api/applications/[id] — update status and/or admin notes (admin).
 * DELETE /api/applications/[id] — delete an application (admin).
 */

const updateSchema = z.object({
  status: z.enum(APPLICATION_STATUSES).optional(),
  adminNotes: z.string().trim().max(2000).optional(),
})

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guardAdmin(request)
  if (denied) return denied

  try {
    const { id } = await params
    const app = await db.application.findUnique({ where: { id } })
    if (!app) {
      return NextResponse.json({ ok: false, error: 'Application not found' }, { status: 404 })
    }
    return NextResponse.json({ ok: true, data: toApplicationDto(app) })
  } catch (error) {
    console.error('[api/applications/[id] GET]', error)
    return NextResponse.json({ ok: false, error: 'Failed to load application' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guardAdmin(request)
  if (denied) return denied

  try {
    const { id } = await params
    const parsed = updateSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid update data' },
        { status: 400 }
      )
    }

    const existing = await db.application.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ ok: false, error: 'Application not found' }, { status: 404 })
    }

    const { status, adminNotes } = parsed.data
    const statusChanged = status !== undefined && status !== existing.status

    const updated = await db.application.update({
      where: { id },
      data: {
        ...(status !== undefined ? { status } : {}),
        ...(adminNotes !== undefined ? { adminNotes } : {}),
        // Stamp the first review action; refresh it whenever the status moves.
        ...(statusChanged ? { reviewedAt: new Date() } : {}),
      },
    })

    return NextResponse.json({ ok: true, data: toApplicationDto(updated) })
  } catch (error) {
    console.error('[api/applications/[id] PATCH]', error)
    return NextResponse.json({ ok: false, error: 'Failed to update application' }, { status: 500 })
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
    await db.application.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[api/applications/[id] DELETE]', error)
    return NextResponse.json({ ok: false, error: 'Failed to delete application' }, { status: 500 })
  }
}
