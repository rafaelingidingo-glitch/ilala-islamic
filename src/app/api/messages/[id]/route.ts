import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { guardAdmin } from '@/lib/api'

/**
 * PATCH  /api/messages/[id] — mark a message read/unread (admin).
 * DELETE /api/messages/[id] — delete a message (admin).
 */

const patchSchema = z.object({ read: z.boolean() })

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guardAdmin(request)
  if (denied) return denied

  try {
    const { id } = await params
    const parsed = patchSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'Invalid data' }, { status: 400 })
    }

    await db.contactMessage.update({ where: { id }, data: { read: parsed.data.read } })
    return NextResponse.json({ ok: true, data: { id, read: parsed.data.read } })
  } catch (error) {
    console.error('[api/messages PATCH]', error)
    return NextResponse.json({ ok: false, error: 'Failed to update message' }, { status: 500 })
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
    await db.contactMessage.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[api/messages DELETE]', error)
    return NextResponse.json({ ok: false, error: 'Failed to delete message' }, { status: 500 })
  }
}
