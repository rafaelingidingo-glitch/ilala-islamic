import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { guardAdmin } from '@/lib/api'
import type { AdminStats, MessageDto } from '@/lib/types'

/**
 * GET /api/messages — admin inbox: messages (unread first) plus dashboard
 * counts. Admin session required.
 */
export async function GET(request: NextRequest) {
  const denied = await guardAdmin(request)
  if (denied) return denied

  try {
    const [messages, unread, totalMessages, newsTotal, newsPublished, staffTotal, allEvents] =
      await Promise.all([
        db.contactMessage.findMany({ orderBy: [{ read: 'asc' }, { createdAt: 'desc' }] }),
        db.contactMessage.count({ where: { read: false } }),
        db.contactMessage.count(),
        db.news.count(),
        db.news.count({ where: { published: true } }),
        db.staff.count(),
        db.event.findMany({ where: { published: true }, select: { startDate: true } }),
      ])

    const today = new Date().toISOString().slice(0, 10)
    const eventsUpcoming = allEvents.filter(
      (e) => new Date(e.startDate).toISOString().slice(0, 10) >= today
    ).length

    const stats: AdminStats = {
      newsTotal,
      newsPublished,
      eventsUpcoming,
      eventsTotal: allEvents.length,
      staffTotal,
      messagesUnread: unread,
      messagesTotal: totalMessages,
    }

    const data: MessageDto[] = messages.map((m) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      phone: m.phone,
      subject: m.subject,
      message: m.message,
      read: m.read,
      createdAt: m.createdAt.toISOString(),
    }))

    return NextResponse.json({ ok: true, data: { messages: data, stats } })
  } catch (error) {
    console.error('[api/messages GET]', error)
    return NextResponse.json({ ok: false, error: 'Failed to load messages' }, { status: 500 })
  }
}
