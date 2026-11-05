import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { guardAdmin, parseDateInput, slugify, toDateOnly } from '@/lib/api'
import type { NewsDto } from '@/lib/types'

/**
 * GET  /api/news        — public list (published only, newest first).
 * GET  /api/news?all=1  — full list incl. drafts (admin session required).
 * POST /api/news        — create (admin).
 */

const newsSchema = z.object({
  title: z.string().trim().min(3, 'Title is too short').max(200),
  excerpt: z.string().trim().min(10, 'Excerpt is too short').max(4000),
  category: z.string().trim().min(2).max(40),
  image: z.string().trim().max(500).optional().or(z.literal('')),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
  date: z.string().min(8, 'Date is required'),
})

function serialize(row: {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  image: string | null
  featured: boolean
  published: boolean
  date: Date
}): NewsDto {
  return { ...row, date: toDateOnly(row.date) }
}

export async function GET(request: NextRequest) {
  try {
    const all = request.nextUrl.searchParams.get('all') === '1'
    if (all) {
      const denied = await guardAdmin(request)
      if (denied) return denied
    }

    const rows = await db.news.findMany({
      where: all ? {} : { published: true },
      orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
    })
    return NextResponse.json({ ok: true, data: rows.map(serialize) })
  } catch (error) {
    console.error('[api/news GET]', error)
    return NextResponse.json({ ok: false, error: 'Failed to load news' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const denied = await guardAdmin(request)
  if (denied) return denied

  try {
    const parsed = newsSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid data' },
        { status: 400 }
      )
    }
    const { title, excerpt, category, image, featured, published, date } = parsed.data

    const created = await db.news.create({
      data: {
        title,
        slug: slugify(title),
        excerpt,
        category,
        image: image || null,
        featured,
        published,
        date: parseDateInput(date),
      },
    })
    return NextResponse.json({ ok: true, data: serialize(created) }, { status: 201 })
  } catch (error) {
    console.error('[api/news POST]', error)
    return NextResponse.json({ ok: false, error: 'Failed to create news item' }, { status: 500 })
  }
}
