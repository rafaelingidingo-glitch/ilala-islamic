import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

/**
 * POST /api/contact — receives contact-form submissions from the website
 * and stores them in the database. Phase 2 will add an admin inbox view.
 */

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name is too short').max(100),
  email: z.string().trim().email('Invalid email address').max(150),
  phone: z.string().trim().max(30).optional().or(z.literal('')),
  subject: z.string().trim().max(120).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Message is too short').max(2000),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message ?? 'Invalid form data'
      return NextResponse.json({ ok: false, error: firstIssue }, { status: 400 })
    }

    const { name, email, phone, subject, message } = parsed.data

    await db.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: subject || 'General enquiry',
        message,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[api/contact] Failed to save contact message:', error)
    return NextResponse.json(
      { ok: false, error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
