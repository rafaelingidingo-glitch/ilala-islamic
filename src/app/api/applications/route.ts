import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { guardAdmin, parseDateInput } from '@/lib/api'
import { schoolConfig } from '@/config/school-config'
import { fullName, nextApplicationNumber, toApplicationDto } from '@/lib/applications'
import { APPLICATION_STATUSES } from '@/lib/types'
import type { ApplicationStats } from '@/lib/types'

/**
 * POST /api/applications — public: submit an online admission application.
 * GET  /api/applications — admin: list applications (filter + search) with stats.
 */

const applicationSchema = z.object({
  // --- Student ---
  firstName: z.string().trim().min(2, 'First name is required').max(60),
  middleName: z.string().trim().max(60).optional().or(z.literal('')),
  lastName: z.string().trim().min(2, 'Last name is required').max(60),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth is required')
    .refine((v) => {
      const d = new Date(v + 'T00:00:00')
      if (Number.isNaN(d.getTime())) return false
      const now = new Date()
      const age = (now.getTime() - d.getTime()) / (365.25 * 24 * 3600 * 1000)
      return age >= 5 && age <= 30
    }, 'Date of birth must belong to a school-aged applicant'),
  gender: z.enum(['Male', 'Female'], { message: 'Please select a gender' }),
  entryClass: z.string().trim().min(2, 'Please choose an entry class').max(20),
  boarding: z.enum(['Day', 'Boarding']).default('Day'),
  previousSchool: z.string().trim().min(2, 'Previous school is required').max(150),
  // --- Academic background ---
  examType: z.string().trim().max(60).optional().or(z.literal('')),
  examIndex: z.string().trim().min(3, 'Examination index number is required').max(40),
  examResults: z.string().trim().min(2, 'Exam results summary is required').max(200),
  personalStatement: z.string().trim().max(2000).optional().or(z.literal('')),
  // --- Parent / guardian ---
  parentName: z.string().trim().min(3, 'Parent/guardian name is required').max(100),
  parentRelationship: z.enum(['Mother', 'Father', 'Guardian', 'Other'], {
    message: 'Please choose the relationship to the student',
  }),
  parentEmail: z.string().trim().email('A valid parent/guardian email is required').max(150),
  parentPhone: z.string().trim().min(7, 'Phone number is required').max(30),
  parentAddress: z.string().trim().max(250).optional().or(z.literal('')),
  notes: z.string().trim().max(1000).optional().or(z.literal('')),
})

export async function POST(request: NextRequest) {
  const { admissions } = schoolConfig
  if (!admissions.onlineApplicationsOpen) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Online applications are currently closed. Please contact the admissions office for guidance.',
      },
      { status: 403 }
    )
  }

  try {
    const parsed = applicationSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid application data' },
        { status: 400 }
      )
    }

    const data = parsed.data
    if (!admissions.classesOffered.includes(data.entryClass)) {
      return NextResponse.json(
        { ok: false, error: 'Applications for the selected class are not open.' },
        { status: 400 }
      )
    }

    const applicationNumber = await nextApplicationNumber()

    const created = await db.application.create({
      data: {
        applicationNumber,
        academicYear: admissions.intakeYear,
        firstName: data.firstName,
        middleName: data.middleName || '',
        lastName: data.lastName,
        dateOfBirth: parseDateInput(data.dateOfBirth),
        gender: data.gender,
        entryClass: data.entryClass,
        boarding: data.boarding,
        previousSchool: data.previousSchool,
        examType: data.examType || '',
        examIndex: data.examIndex,
        examResults: data.examResults,
        personalStatement: data.personalStatement || '',
        parentName: data.parentName,
        parentRelationship: data.parentRelationship,
        parentEmail: data.parentEmail.toLowerCase(),
        parentPhone: data.parentPhone,
        parentAddress: data.parentAddress || '',
        notes: data.notes || '',
        status: 'PENDING',
      },
    })

    return NextResponse.json(
      {
        ok: true,
        data: {
          applicationNumber: created.applicationNumber,
          studentName: fullName(created),
          submittedAt: created.createdAt.toISOString(),
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[api/applications POST]', error)
    return NextResponse.json(
      { ok: false, error: 'Failed to submit the application. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const denied = await guardAdmin(request)
  if (denied) return denied

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') ?? ''
    const q = (searchParams.get('q') ?? '').trim()

    const where: Record<string, unknown> = {}
    if (APPLICATION_STATUSES.includes(status as never)) where.status = status
    if (q) {
      where.OR = [
        { applicationNumber: { contains: q } },
        { firstName: { contains: q } },
        { middleName: { contains: q } },
        { lastName: { contains: q } },
        { parentName: { contains: q } },
        { parentEmail: { contains: q } },
        { previousSchool: { contains: q } },
      ]
    }

    const [apps, total, pending, underReview, interview, accepted, waitlisted, rejected] =
      await Promise.all([
        db.application.findMany({ where, orderBy: { createdAt: 'desc' } }),
        db.application.count(),
        db.application.count({ where: { status: 'PENDING' } }),
        db.application.count({ where: { status: 'UNDER_REVIEW' } }),
        db.application.count({ where: { status: 'INTERVIEW' } }),
        db.application.count({ where: { status: 'ACCEPTED' } }),
        db.application.count({ where: { status: 'WAITLISTED' } }),
        db.application.count({ where: { status: 'REJECTED' } }),
      ])

    const stats: ApplicationStats = {
      total,
      pending,
      underReview,
      interview,
      accepted,
      waitlisted,
      rejected,
    }

    return NextResponse.json({ ok: true, data: { applications: apps.map(toApplicationDto), stats } })
  } catch (error) {
    console.error('[api/applications GET]', error)
    return NextResponse.json({ ok: false, error: 'Failed to load applications' }, { status: 500 })
  }
}
