'use client'

/**
 * Admin login — exchanges the shared staff password (set in the `admin`
 * section of school-config.ts) for a signed session cookie.
 */

import { useState } from 'react'
import { GraduationCap, Loader2, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { schoolConfig } from '@/config/school-config'

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const { theme, identity, admin } = schoolConfig
  const { toast } = useToast()
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) return
    setBusy(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || 'Login failed')
      toast({ title: 'Welcome back', description: 'Signed in to the admin panel.' })
      onLogin()
    } catch (err) {
      toast({
        title: 'Sign-in failed',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-10"
      style={{ background: `linear-gradient(160deg, ${theme.tint} 0%, #ffffff 55%, ${theme.tint} 100%)` }}
    >
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            <span
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
              }}
            >
              <GraduationCap className="h-7 w-7" aria-hidden="true" />
            </span>
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">
              {identity.shortName} Admin Panel
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Manage news, events, staff and messages for {identity.name}.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-password">Staff password</Label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter the admin password"
                  autoComplete="current-password"
                  className="pl-9"
                  required
                  autoFocus
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={busy}
              className="w-full text-white"
              style={{ backgroundColor: theme.primary }}
            >
              {busy ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <p className="mt-6 rounded-lg bg-slate-50 p-3 text-center text-xs leading-relaxed text-slate-500">
            Demo password: <span className="font-semibold text-slate-700">{admin.password}</span> —
            change it in <span className="font-mono text-[11px]">school-config.ts</span> before
            deploying for a real school.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
