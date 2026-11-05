import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { guardAdmin, parseDateInput } from '@/lib/api'

/**
 * PUT    /api/news/[id] — update a news item (admin).
 * DELETE /api/news/[id] — remove a news item (admin).
 */

const newsUpdateSchema = z.object({
  title: z.string().trim().min(3, 'Title is too short').max(200),
  excerpt: z.string().trim().min(10, 'Excerpt is too short').max(4000),
  category: z.string().trim().min(2).max(40),
  image: z.string().trim().max(500).optional().or(z.literal('')),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
  date: z.string().min(8, 'Date is required'),
})

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guardAdmin(request)
  if (denied) return denied

  try {
    const { id } = await params
    const parsed = newsUpdateSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid data' },
        { status: 400 }
      )
    }
    const { title, excerpt, category, image, featured, published, date } = parsed.data

    const existing = await db.news.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ ok: false, error: 'News item not found' }, { status: 404 })
    }

    const updated = await db.news.update({
      where: { id },
      data: {
        title,
        slug: existing.slug, // keep the original slug so links stay stable
        excerpt,
        category,
        image: image || null,
        featured,
        published,
        date: parseDateInput(date),
      },
    })
    return NextResponse.json({ ok: true, data: { id: updated.id } })
  } catch (error) {
    console.error('[api/news PUT]', error)
    return NextResponse.json({ ok: false, error: 'Failed to update news item' }, { status: 500 })
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
    await db.news.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[api/news DELETE]', error)
    return NextResponse.json({ ok: false, error: 'Failed to delete news item' }, { status: 500 })
  }
}
