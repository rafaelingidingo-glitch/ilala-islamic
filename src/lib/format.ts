/**
 * Date helpers shared by the public pages and the admin panel.
 * All inputs are `YYYY-MM-DD` strings or full ISO datetimes — both are safe
 * to parse with `new Date()` and rendered in a fixed timezone-free way.
 */

function asDate(input: string): Date {
  // `YYYY-MM-DD` → parse as local midnight so the day never shifts.
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return new Date(input + 'T00:00:00')
  return new Date(input)
}

/** `15 Oct 2026` */
export function formatDate(input: string): string {
  return asDate(input).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/** `15 Oct 2026, 14:30` — for message timestamps. */
export function formatDateTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ', ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

/** Day-of-month number, e.g. `14` for the calendar chip. */
export function dayOfMonth(input: string): string {
  return String(asDate(input).getDate())
}

/** Short month, e.g. `MAR` for the calendar chip. */
export function monthShort(input: string): string {
  return asDate(input)
    .toLocaleDateString('en-GB', { month: 'short' })
    .toUpperCase()
}

/** Today at midnight (local) as `YYYY-MM-DD` — used for "upcoming" filters. */
export function todayISO(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
