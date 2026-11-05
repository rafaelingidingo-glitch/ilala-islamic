import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/auth'

/** GET /api/auth/session — tells the SPA whether an admin session is active. */
export async function GET(request: NextRequest) {
  const authenticated = await isAdminRequest(request)
  return NextResponse.json({ ok: true, data: { authenticated } })
}
