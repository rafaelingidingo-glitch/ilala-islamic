import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { schoolConfig } from '@/config/school-config'
import { ADMIN_COOKIE, createSessionToken, sessionCookieOptions } from '@/lib/auth'

/**
 * POST /api/auth/login — exchanges the admin password (from the `admin`
 * section of the central school config) for a signed session cookie.
 */

const loginSchema = z.object({
  password: z.string().min(1, 'Password is required').max(200),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'Password is required' }, { status: 400 })
    }

    if (parsed.data.password !== schoolConfig.admin.password) {
      return NextResponse.json({ ok: false, error: 'Incorrect password' }, { status: 401 })
    }

    const token = await createSessionToken()
    const response = NextResponse.json({ ok: true, data: { label: schoolConfig.admin.label } })
    response.cookies.set(ADMIN_COOKIE, token, sessionCookieOptions)
    return response
  } catch {
    return NextResponse.json({ ok: false, error: 'Login failed' }, { status: 500 })
  }
}
