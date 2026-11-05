import { NextResponse } from 'next/server'
import { ADMIN_COOKIE } from '@/lib/auth'

/** POST /api/auth/logout — clears the admin session cookie. */
export async function POST() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 })
  return response
}
