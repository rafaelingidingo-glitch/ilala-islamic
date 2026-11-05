/**
 * Lightweight admin authentication for the school website template.
 *
 * A login exchanges the admin password (from `schoolConfig.admin`) for an
 * HMAC-SHA256-signed cookie. Every admin API route verifies the cookie
 * server-side via `isAdminRequest()` — the browser hiding the admin UI is
 * only cosmetic; the API is the real gate.
 *
 * Uses the Web Crypto API, so it works in any Next.js runtime.
 */

import { schoolConfig } from '@/config/school-config'

export const ADMIN_COOKIE = 'school_admin_session'

/** Session lifetime in seconds — 7 days. */
const SESSION_TTL = 7 * 24 * 60 * 60

const encoder = new TextEncoder()

async function hmacHex(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/** Create a signed session token: `admin.<expiry>.<hmac>`. */
export async function createSessionToken(): Promise<string> {
  const expiry = Date.now() + SESSION_TTL * 1000
  const payload = `admin.${expiry}`
  const signature = await hmacHex(payload, schoolConfig.admin.secret)
  return `${payload}.${signature}`
}

/** Verify a session token's signature and expiry. */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false
  const lastDot = token.lastIndexOf('.')
  if (lastDot <= 0) return false
  const payload = token.slice(0, lastDot)
  const signature = token.slice(lastDot + 1)
  const expected = await hmacHex(payload, schoolConfig.admin.secret)
  // Constant-time-ish comparison.
  if (signature.length !== expected.length) return false
  let mismatch = 0
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i)
  }
  if (mismatch !== 0) return false
  const expiry = Number(payload.split('.')[1])
  return Number.isFinite(expiry) && Date.now() < expiry
}

/** Check the admin session cookie on an incoming API request. */
export function isAdminRequest(request: Request): Promise<boolean> {
  const cookieHeader = request.headers.get('cookie') ?? ''
  const match = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_COOKIE}=`))
  const token = match ? decodeURIComponent(match.slice(ADMIN_COOKIE.length + 1)) : undefined
  return verifySessionToken(token)
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  path: '/',
  maxAge: SESSION_TTL,
}
