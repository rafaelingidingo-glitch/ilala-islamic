'use client'

/**
 * Application status tracker — parents enter the reference number issued at
 * submission plus the parent/guardian email to see where the application sits
 * in the admissions workflow.
 */

import { useState } from 'react'
import {
  ArrowLeft,
  Check,
  CircleDashed,
  FileSearch,
  Loader2,
  Search,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { schoolConfig } from '@/config/school-config'
import { STATUS_META } from '@/lib/application-status'
import { formatDateTime } from '@/lib/format'
import type { ApplicationTrackDto, ApplicationStatus } from '@/lib/types'

interface TrackStatusProps {
  onBack: () => void
  /** Reference number pre-filled after a successful submission. */
  initialApplicationNumber?: string
}

/** Horizontal workflow shown in the result card. */
const TIMELINE: { key: string; label: string }[] = [
  { key: 'SUBMITTED', label: 'Submitted' },
  { key: 'UNDER_REVIEW', label: 'Under Review' },
  { key: 'INTERVIEW', label: 'Interview' },
  { key: 'DECISION', label: 'Decision' },
]

function timelineProgress(status: ApplicationStatus): { reached: number; decision?: ApplicationStatus } {
  switch (status) {
    case 'PENDING':
      return { reached: 0 }
    case 'UNDER_REVIEW':
      return { reached: 1 }
    case 'INTERVIEW':
      return { reached: 2 }
    default:
      return { reached: 3, decision: status }
  }
}

export function TrackApplicationStatus({ onBack, initialApplicationNumber }: TrackStatusProps) {
  const { theme, contact } = schoolConfig
  const { toast } = useToast()

  const [number, setNumber] = useState(initialApplicationNumber ?? '')
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<ApplicationTrackDto | null>(null)

  const lookup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!number.trim() || !email.trim()) {
      setError('Please enter both the reference number and the parent email address.')
      return
    }
    setBusy(true)
    try {
      const res = await fetch('/api/applications/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationNumber: number.trim(), email: email.trim() }),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || 'Lookup failed')
      setResult(json.data)
    } catch (err) {
      setResult(null)
      setError(err instanceof Error ? err.message : 'Please try again.')
      toast({
        title: 'Status lookup failed',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setBusy(false)
    }
  }

  const meta = result ? STATUS_META[result.status] : null
  const progress = result ? timelineProgress(result.status) : null

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
        style={{ color: theme.primary }}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to admissions overview
      </button>

      <div className="mt-6 rounded-3xl border bg-white p-6 shadow-md sm:p-8">
        <div className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: theme.primary }}
          >
            <FileSearch className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              Track your application
            </h1>
            <p className="text-sm text-slate-500">
              Enter the reference number from your submission confirmation.
            </p>
          </div>
        </div>

        <form onSubmit={lookup} className="mt-6 space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="track-number" className="text-sm font-medium text-slate-700">
                Application reference number
              </Label>
              <Input
                id="track-number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="e.g. BS-2026-0001"
                autoCapitalize="characters"
                className="font-mono uppercase"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="track-email" className="text-sm font-medium text-slate-700">
                Parent / guardian email
              </Label>
              <Input
                id="track-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="The email used on the application"
                autoComplete="email"
              />
            </div>
          </div>
          {error && (
            <p className="text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          )}
          <Button
            type="submit"
            disabled={busy}
            className="w-full font-semibold text-white sm:w-auto"
            style={{ backgroundColor: theme.primary }}
          >
            {busy ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Search className="mr-1.5 h-4 w-4" aria-hidden="true" />
            )}
            Check status
          </Button>
        </form>

        {/* --- Result ------------------------------------------------------ */}
        {result && meta && progress && (
          <div className="mt-8 border-t pt-8" aria-live="polite">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-lg font-extrabold" style={{ color: theme.primaryDark }}>
                  {result.applicationNumber}
                </p>
                <p className="mt-0.5 text-sm text-slate-600">
                  {result.studentName} · {result.entryClass} · {result.boarding} ·{' '}
                  {result.academicYear} intake
                </p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${meta.badgeClass}`}
              >
                {meta.label}
              </span>
            </div>

            {/* Workflow timeline */}
            <ol className="mt-8 space-y-0">
              {TIMELINE.map((step, i) => {
                const done = i <= progress.reached && !(progress.decision === 'REJECTED' && i === 3)
                const isDecision = i === 3
                const decisionRejected = progress.decision === 'REJECTED'
                const decisionWaitlisted = progress.decision === 'WAITLISTED'
                const isCurrent =
                  i === progress.reached && (!isDecision || !progress.decision)
                const color = decisionRejected && isDecision
                  ? '#dc2626'
                  : decisionWaitlisted && isDecision
                    ? '#ea580c'
                    : theme.primary
                return (
                  <li key={step.key} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                        style={{ backgroundColor: done ? color : '#e2e8f0' }}
                        aria-hidden="true"
                      >
                        {done ? (
                          decisionRejected && isDecision ? (
                            <X className="h-4 w-4" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )
                        ) : (
                          <CircleDashed className="h-4 w-4 text-slate-400" />
                        )}
                      </span>
                      {i < TIMELINE.length - 1 && (
                        <span
                          className="w-0.5 flex-1"
                          style={{
                            minHeight: '2rem',
                            backgroundColor:
                              i < progress.reached ? color : '#e2e8f0',
                          }}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className={i < TIMELINE.length - 1 ? 'pb-6' : ''}>
                      <p
                        className={
                          'text-sm font-semibold ' +
                          (isCurrent ? 'text-slate-900' : done ? 'text-slate-800' : 'text-slate-400')
                        }
                      >
                        {isDecision && progress.decision
                          ? STATUS_META[progress.decision].label
                          : step.label}
                        {isCurrent && (
                          <span className="ml-2 text-xs font-bold" style={{ color }}>
                            Current stage
                          </span>
                        )}
                      </p>
                      {isDecision && progress.decision && (
                        <p className="mt-1 max-w-md text-sm leading-relaxed text-slate-600">
                          {STATUS_META[progress.decision].description}
                        </p>
                      )}
                      {!isDecision && isCurrent && (
                        <p className="mt-1 max-w-md text-sm leading-relaxed text-slate-600">
                          {meta.description}
                        </p>
                      )}
                    </div>
                  </li>
                )
              })}
            </ol>

            <div className="mt-6 rounded-xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500">
              Submitted on {result.submittedOn} · Last updated {formatDateTime(result.lastUpdated)}.
              Questions? Email{' '}
              <a
                href={`mailto:${contact.admissionsEmail}`}
                className="font-semibold underline underline-offset-2"
                style={{ color: theme.primary }}
              >
                {contact.admissionsEmail}
              </a>{' '}
              quoting your reference number.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
