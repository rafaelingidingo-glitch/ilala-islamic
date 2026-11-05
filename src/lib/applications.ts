/**
 * Server-side helpers for the online admissions feature.
 */

import { schoolConfig } from '@/config/school-config'
import type { Application } from '@prisma/client'
import type { ApplicationDto, ApplicationStatus } from '@/lib/types'
import { db } from '@/lib/db'

/** Map a Prisma `Application` row to the JSON shape used by the UI. */
export function toApplicationDto(a: Application): ApplicationDto {
  return {
    id: a.id,
    applicationNumber: a.applicationNumber,
    academicYear: a.academicYear,
    firstName: a.firstName,
    middleName: a.middleName,
    lastName: a.lastName,
    dateOfBirth: new Date(a.dateOfBirth).toISOString().slice(0, 10),
    gender: a.gender,
    entryClass: a.entryClass,
    boarding: a.boarding,
    previousSchool: a.previousSchool,
    examType: a.examType,
    examIndex: a.examIndex,
    examResults: a.examResults,
    personalStatement: a.personalStatement,
    parentName: a.parentName,
    parentRelationship: a.parentRelationship,
    parentEmail: a.parentEmail,
    parentPhone: a.parentPhone,
    parentAddress: a.parentAddress,
    notes: a.notes,
    status: a.status as ApplicationStatus,
    adminNotes: a.adminNotes,
    reviewedAt: a.reviewedAt ? a.reviewedAt.toISOString() : null,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  }
}

/** Student name in `First Middle Last` form. */
export function fullName(a: Pick<Application, 'firstName' | 'middleName' | 'lastName'>): string {
  return [a.firstName, a.middleName, a.lastName].filter(Boolean).join(' ')
}

/**
 * Generate the next sequential reference number, e.g. `BS-2026-0001`.
 * Count-based with an existence check loop; falls back to a random suffix
 * after repeated collisions so submission never fails on numbering.
 */
export async function nextApplicationNumber(): Promise<string> {
  const { referencePrefix } = schoolConfig.admissions
  const year = new Date().getFullYear()
  const base = (await db.application.count()) + 1

  for (let attempt = 0; attempt < 10; attempt++) {
    const candidate = `${referencePrefix}-${year}-${String(base + attempt).padStart(4, '0')}`
    const exists = await db.application.findUnique({
      where: { applicationNumber: candidate },
      select: { id: true },
    })
    if (!exists) return candidate
  }

  const random = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6)
  return `${referencePrefix}-${year}-${random}`
}
