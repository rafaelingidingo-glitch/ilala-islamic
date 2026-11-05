import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { guardAdmin, parseDateInput, toDateOnly } from '@/lib/api'
import type { EventDto } from '@/lib/types'

/**
 * GET  /api/events          — public list (published, upcoming first by date).
 *                            `?past=1` → past events instead.
 * GET  /api/events?all=1    — full list (admin session required).
 * POST /api/events          — create (admin).
 */

const eventSchema = z.object({
  title: z.string().trim().min(3, 'Title is too short').max(200),
  description: z.string().trim().min(5, 'Description is too short').max(2000),
  location: z.string().trim().min(2, 'Location is required').max(120),
  time: z.string().trim().max(80).optional().or(z.literal('')),
  category: z.string().trim().min(2).max(40),
  published: z.boolean().optional().default(true),
  startDate: z.string().min(8, 'Start date is required'),
})

function serialize(row: {
  id: string
  title: string
  description: string
  location: string
  time: string
  category: string
  published: boolean
  startDate: Date
}): EventDto {
  return { ...row, startDate: toDateOnly(row.startDate) }
}

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams
    const all = params.get('all') === '1'
    if (all) {
      const denied = await guardAdmin(request)
      if (denied) return denied
    }
    const past = params.get('past') === '1'
    const limit = Number(params.get('limit') ?? '0') || undefined

    const rows = await db.event.findMany({
      where: all ? {} : { published: true },
      orderBy: { startDate: past ? 'desc' : 'asc' },
      ...(limit ? { take: limit } : {}),
    })

    if (!all && !past) {
      // Public upcoming view hides events that already ended.
      const today = new Date().toISOString().slice(0, 10)
      const upcoming = rows.filter((r) => toDateOnly(r.startDate) >= today)
      return NextResponse.json({ ok: true, data: upcoming.map(serialize) })
    }

    return NextResponse.json({ ok: true, data: rows.map(serialize) })
  } catch (error) {
    console.error('[api/events GET]', error)
    return NextResponse.json({ ok: false, error: 'Failed to load events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const denied = await guardAdmin(request)
  if (denied) return denied

  try {
    const parsed = eventSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid data' },
        { status: 400 }
      )
    }
    const { title, description, location, time, category, published, startDate } = parsed.data

    const created = await db.event.create({
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
    return NextResponse.json({ ok: true, data: serialize(created) }, { status: 201 })
  } catch (error) {
    console.error('[api/events POST]', error)
    return NextResponse.json({ ok: false, error: 'Failed to create event' }, { status: 500 })
  }
}
