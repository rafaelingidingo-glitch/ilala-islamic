import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { guardAdmin, parseDateInput } from '@/lib/api'

/**
 * PUT    /api/events/[id] — update an event (admin).
 * DELETE /api/events/[id] — remove an event (admin).
 */

const eventUpdateSchema = z.object({
  title: z.string().trim().min(3, 'Title is too short').max(200),
  description: z.string().trim().min(5, 'Description is too short').max(2000),
  location: z.string().trim().min(2, 'Location is required').max(120),
  time: z.string().trim().max(80).optional().or(z.literal('')),
  category: z.string().trim().min(2).max(40),
  published: z.boolean().optional().default(true),
  startDate: z.string().min(8, 'Start date is required'),
})

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guardAdmin(request)
  if (denied) return denied

  try {
    const { id } = await params
    const parsed = eventUpdateSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid data' },
        { status: 400 }
      )
    }
    const { title, description, location, time, category, published, startDate } = parsed.data

    const existing = await db.event.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ ok: false, error: 'Event not found' }, { status: 404 })
    }

    await db.event.update({
      where: { id },
      data: {
        title,
        description,
        location,
        time: time || '',
        category,
        published,
        startDate: parseDateInput(startDate),
      },
    })
    return NextResponse.json({ ok: true, data: { id } })
  } catch (error) {
    console.error('[api/events PUT]', error)
    return NextResponse.json({ ok: false, error: 'Failed to update event' }, { status: 500 })
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
    await db.event.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[api/events DELETE]', error)
    return NextResponse.json({ ok: false, error: 'Failed to delete event' }, { status: 500 })
  }
}
