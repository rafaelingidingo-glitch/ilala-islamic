import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { fullName } from '@/lib/applications'
import type { ApplicationTrackDto } from '@/lib/types'

/**
 * POST /api/applications/track — public application status lookup.
 * Requires BOTH the reference number and the parent/guardian email, so a
 * reference number alone never reveals an application's existence or status.
 */
const trackSchema = z.object({
  applicationNumber: z.string().trim().min(4, 'Reference number is required').max(30),
  email: z.string().trim().email('Parent/guardian email is required').max(150),
})

export async function POST(request: NextRequest) {
  try {
    const parsed = trackSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid request' },
        { status: 400 }
      )
    }

    const applicationNumber = parsed.data.applicationNumber.toUpperCase()
    const email = parsed.data.email.toLowerCase()

    const app = await db.application.findUnique({ where: { applicationNumber } })

    // Same 404 for "not found" and "email mismatch" — no information leakage.
    if (!app || app.parentEmail.toLowerCase() !== email) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'No application matches that reference number and email address. Please double-check both and try again.',
        },
        { status: 404 }
      )
    }

    const data: ApplicationTrackDto = {
      applicationNumber: app.applicationNumber,
      studentName: fullName(app),
      entryClass: app.entryClass,
      boarding: app.boarding,
      academicYear: app.academicYear,
      status: app.status as ApplicationTrackDto['status'],
      submittedOn: app.createdAt.toISOString().slice(0, 10),
      lastUpdated: app.updatedAt.toISOString(),
    }

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    console.error('[api/applications/track POST]', error)
    return NextResponse.json(
      { ok: false, error: 'Status lookup failed. Please try again.' },
      { status: 500 }
    )
  }
}
