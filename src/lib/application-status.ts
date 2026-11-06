/**
 * Client-safe status metadata shared by the public application tracker and
 * the admin applications manager. Pure data — no server imports.
 */

import type { ApplicationStatus } from '@/lib/types'

export interface StatusMeta {
  label: string
  /** One-line explanation shown to parents in the tracker. */
  description: string
  /** Tailwind classes for badge-style chips. */
  badgeClass: string
}

export const STATUS_META: Record<ApplicationStatus, StatusMeta> = {
  PENDING: {
    label: 'Pending Review',
    description:
      'We have received the application. The admissions office will start reviewing it shortly.',
    badgeClass: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
  },
  UNDER_REVIEW: {
    label: 'Under Review',
    description:
      'Our admissions team is reviewing the application and verifying the submitted details.',
    badgeClass: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
  },
  INTERVIEW: {
    label: 'Interview Stage',
    description:
      'The family has been invited for the entrance assessment and interview. Please check your email for the date.',
    badgeClass: 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200',
  },
  ACCEPTED: {
    label: 'Accepted',
    description:
      'Congratulations! An admission letter has been issued. The admissions office will contact you about enrolment.',
    badgeClass: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  },
  WAITLISTED: {
    label: 'Waitlisted',
    description:
      'The application meets our requirements. A place will be offered as soon as one becomes available.',
    badgeClass: 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200',
  },
  REJECTED: {
    label: 'Not Accepted',
    description:
      'Unfortunately we are unable to offer a place for this intake. You are welcome to apply again next year.',
    badgeClass: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200',
  },
}

/** Ordered display labels for each status (used in selects / legends). */
export const STATUS_ORDER: ApplicationStatus[] = [
  'PENDING',
  'UNDER_REVIEW',
  'INTERVIEW',
  'ACCEPTED',
  'WAITLISTED',
  'REJECTED',
]
