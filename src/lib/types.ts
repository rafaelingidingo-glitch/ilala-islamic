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

export interface AdminStats {
  newsTotal: number
  newsPublished: number
  eventsUpcoming: number
  eventsTotal: number
  staffTotal: number
  messagesUnread: number
  messagesTotal: number
}
