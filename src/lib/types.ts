/**
 * Shared DTO types — the JSON shapes exchanged between the API routes and the
 * UI. Dates are plain `YYYY-MM-DD` strings so the client can format them
 * without timezone surprises.
 */

export interface NewsDto {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  image: string | null
  featured: boolean
  published: boolean
  /** Display date, `YYYY-MM-DD`. */
  date: string
}

export interface EventDto {
  id: string
  title: string
  description: string
  location: string
  /** Free-text schedule line, e.g. `9:00 AM – 2:00 PM`. */
  time: string
  category: string
  published: boolean
  /** Start date, `YYYY-MM-DD`. */
  startDate: string
}

export interface StaffDto {
  id: string
  name: string
  role: string
  department: string
  initials: string
  order: number
  published: boolean
}

export interface MessageDto {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  read: boolean
  createdAt: string
}

// ---------------------------------------------------------------------------
// Online admissions
// ---------------------------------------------------------------------------

/** Application statuses, in workflow order. SQLite has no enums. */
export const APPLICATION_STATUSES = [
  'PENDING',
  'UNDER_REVIEW',
  'INTERVIEW',
  'ACCEPTED',
  'WAITLISTED',
  'REJECTED',
] as const

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number]

export interface ApplicationDto {
  id: string
  /** Public reference, e.g. `BS-2026-0001`. */
  applicationNumber: string
  academicYear: number
  firstName: string
  middleName: string
  lastName: string
  /** `YYYY-MM-DD`. */
  dateOfBirth: string
  gender: string
  entryClass: string
  boarding: string
  previousSchool: string
  examType: string
  examIndex: string
  examResults: string
  personalStatement: string
  parentName: string
  parentRelationship: string
  parentEmail: string
  parentPhone: string
  parentAddress: string
  notes: string
  status: ApplicationStatus
  adminNotes: string
  /** ISO datetime, null until first review action. */
  reviewedAt: string | null
  /** ISO datetime. */
  createdAt: string
  updatedAt: string
}

/** Limited public shape returned by the status tracker (no admin/private fields). */
export interface ApplicationTrackDto {
  applicationNumber: string
  studentName: string
  entryClass: string
  boarding: string
  academicYear: number
  status: ApplicationStatus
  /** `YYYY-MM-DD` the application was submitted. */
  submittedOn: string
  /** ISO datetime of the last status change. */
  lastUpdated: string
}

export interface ApplicationStats {
  total: number
  pending: number
  underReview: number
  interview: number
  accepted: number
  waitlisted: number
  rejected: number
}

export interface AdminStats {
  newsTotal: number
  newsPublished: number
  eventsUpcoming: number
  eventsTotal: number
  staffTotal: number
  messagesUnread: number
  messagesTotal: number
  applicationsPending: number
  applicationsTotal: number
}
