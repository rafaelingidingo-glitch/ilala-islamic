'use client'

/**
 * Applications manager — online admission applications submitted from the
 * public site. Staff can filter, search, review full details, move the
 * application through the workflow (Pending → Under Review → Interview →
 * Accepted / Waitlisted / Rejected), keep private notes and delete entries.
 */

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  CalendarDays,
  ClipboardList,
  ExternalLink,
  Loader2,
  Search,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import { formatDateTime } from '@/lib/format'
import { schoolConfig } from '@/config/school-config'
import { STATUS_META, STATUS_ORDER } from '@/lib/application-status'
import { AdminStatCard } from './admin-shared'
import type { ApplicationDto, ApplicationStats } from '@/lib/types'

const { theme } = schoolConfig

interface ApplicationsManagerProps {
  /** Reports the PENDING count so the sidebar badge stays accurate. */
  onPending?: (n: number) => void
}

type FilterKey = 'ALL' | (typeof STATUS_ORDER)[number]

export function ApplicationsManager({ onPending }: ApplicationsManagerProps) {
  const { toast } = useToast()
  const [items, setItems] = useState<ApplicationDto[]>([])
  const [stats, setStats] = useState<ApplicationStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterKey>('ALL')
  const [query, setQuery] = useState('')

  const [selected, setSelected] = useState<ApplicationDto | null>(null)
  const [editStatus, setEditStatus] = useState<string>('PENDING')
  const [editNotes, setEditNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<ApplicationDto | null>(null)
  const [deletingBusy, setDeletingBusy] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/applications')
      const json = await res.json()
      if (!json.ok) throw new Error(json.error || 'Failed to load applications')
      setItems(json.data.applications)
      setStats(json.data.stats)
      onPending?.(json.data.stats.pending)
    } catch (err) {
      toast({
        title: 'Could not load applications',
        description: err instanceof Error ? err.message : 'Please refresh.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [onPending])

  useEffect(() => {
    load()
  }, [load])

  const openApplication = (app: ApplicationDto) => {
    setSelected(app)
    setEditStatus(app.status)
    setEditNotes(app.adminNotes)
  }

  const saveChanges = async () => {
    if (!selected) return
    setSaving(true)
    try {
      const res = await fetch(`/api/applications/${selected.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus as ApplicationDto['status'],
          adminNotes: editNotes,
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || 'Save failed')

      toast({ title: 'Application updated', description: `Status set to ${STATUS_META[editStatus as ApplicationDto['status']].label}.` })
      setSelected(null)
      await load()
    } catch (err) {
      toast({
        title: 'Could not save changes',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleting) return
    setDeletingBusy(true)
    try {
      const res = await fetch(`/api/applications/${deleting.id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || 'Delete failed')
      toast({ title: 'Application deleted' })
      setDeleting(null)
      setSelected(null)
      await load()
    } catch (err) {
      toast({
        title: 'Delete failed',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setDeletingBusy(false)
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((a) => {
      if (filter !== 'ALL' && a.status !== filter) return false
      if (!q) return true
      const haystack = [
        a.applicationNumber,
        a.firstName,
        a.middleName,
        a.lastName,
        a.parentName,
        a.parentEmail,
        a.previousSchool,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [items, filter, query])

  const statusChanged = selected !== null && (editStatus !== selected.status || editNotes !== selected.adminNotes)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Admission Applications
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Online applications from the Admissions page. Update the status as you review — parents
          see it instantly in the public tracker.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          icon={ClipboardList}
          label="Awaiting Review"
          value={stats?.pending ?? '—'}
          hint="status: pending"
        />
        <AdminStatCard
          icon={Loader2}
          label="In Progress"
          value={stats ? stats.underReview + stats.interview : '—'}
          hint="under review + interview"
        />
        <AdminStatCard
          icon={CalendarDays}
          label="Accepted"
          value={stats?.accepted ?? '—'}
          hint={`${stats?.waitlisted ?? 0} waitlisted`}
        />
        <AdminStatCard
          icon={ClipboardList}
          label="Total Applications"
          value={stats?.total ?? '—'}
          hint="all time"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter applications by status">
          {(['ALL', ...STATUS_ORDER] as FilterKey[]).map((f) => (
            <Button
              key={f}
              size="sm"
              variant="outline"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={
                filter === f ? 'border-transparent text-white' : 'font-medium text-slate-600'
              }
              style={filter === f ? { backgroundColor: theme.primary } : undefined}
            >
              {f === 'ALL' ? 'All' : STATUS_META[f].label}
            </Button>
          ))}
        </div>
        <div className="relative sm:w-72">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, reference, email…"
            className="pl-9"
            aria-label="Search applications"
          />
        </div>
      </div>

      {/* List */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" /> Loading
            applications…
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <ClipboardList className="mx-auto h-10 w-10 text-slate-300" aria-hidden="true" />
            <p className="mt-3 text-sm text-slate-500">
              {items.length === 0
                ? 'No applications yet — they will appear here as families apply online.'
                : 'No applications match the current filter or search.'}
            </p>
          </div>
        ) : (
          <ul className="max-h-[34rem] divide-y overflow-y-auto">
            {filtered.map((a) => (
              <li key={a.id}>
                <button
                  onClick={() => openApplication(a)}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-slate-50 sm:px-5"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
                    }}
                    aria-hidden="true"
                  >
                    {(a.firstName[0] ?? '') + (a.lastName[0] ?? '')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="truncate text-sm font-bold text-slate-900">
                        {[a.firstName, a.middleName, a.lastName].filter(Boolean).join(' ')}
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        {a.applicationNumber}
                      </span>
                      <StatusBadge status={a.status} />
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-slate-500">
                      {a.entryClass} · {a.boarding} · {a.parentName} ·{' '}
                      {formatDateTime(a.createdAt)}
                    </span>
                  </span>
                  <ExternalLink
                    className="h-4 w-4 shrink-0 text-slate-300"
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex flex-wrap items-center gap-3 text-left">
                  <span className="font-mono">{selected.applicationNumber}</span>
                  <StatusBadge status={selected.status} />
                </DialogTitle>
                <DialogDescription className="text-left">
                  Submitted {formatDateTime(selected.createdAt)}
                  {selected.reviewedAt && ` · Last review action ${formatDateTime(selected.reviewedAt)}`}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Update status */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="app-status" className="text-sm font-medium text-slate-700">
                      Application status
                    </Label>
                    <Select value={editStatus} onValueChange={setEditStatus}>
                      <SelectTrigger id="app-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_ORDER.map((s) => (
                          <SelectItem key={s} value={s}>
                            {STATUS_META[s].label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <p className="text-xs leading-relaxed text-slate-500">
                      {STATUS_META[editStatus as keyof typeof STATUS_META]?.description}
                    </p>
                  </div>
                </div>

                {/* Student */}
                <InfoSection title="Student">
                  <InfoGrid
                    rows={[
                      ['Name', [selected.firstName, selected.middleName, selected.lastName].filter(Boolean).join(' ')],
                      ['Date of birth', selected.dateOfBirth],
                      ['Gender', selected.gender],
                      ['Entry class', `${selected.entryClass} · ${selected.boarding}`],
                      ['Previous school', selected.previousSchool],
                      ['Academic year', String(selected.academicYear)],
                    ]}
                  />
                </InfoSection>

                {/* Academics */}
                <InfoSection title="Academic background">
                  <InfoGrid
                    rows={[
                      ['Examination', selected.examType],
                      ['Index number', selected.examIndex],
                      ['Results', selected.examResults],
                    ]}
                  />
                  {selected.personalStatement && (
                    <p className="mt-3 whitespace-pre-line rounded-lg bg-slate-50 p-3 text-sm leading-relaxed text-slate-700">
                      <span className="font-semibold">Personal statement: </span>
                      {selected.personalStatement}
                    </p>
                  )}
                </InfoSection>

                {/* Parent */}
                <InfoSection title="Parent / Guardian">
                  <InfoGrid
                    rows={[
                      ['Name', `${selected.parentName} (${selected.parentRelationship})`],
                      ['Email', selected.parentEmail],
                      ['Phone', selected.parentPhone],
                      ...(selected.parentAddress ? [['Address', selected.parentAddress] as [string, string]] : []),
                    ]}
                    linkify={['Email', 'Phone']}
                  />
                </InfoSection>

                {selected.notes && (
                  <InfoSection title="Applicant notes">
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
                      {selected.notes}
                    </p>
                  </InfoSection>
                )}

                {/* Private admin notes */}
                <div className="space-y-1.5">
                  <Label htmlFor="app-notes" className="text-sm font-medium text-slate-700">
                    Internal notes (never shown to parents)
                  </Label>
                  <Textarea
                    id="app-notes"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    rows={3}
                    maxLength={2000}
                    placeholder="e.g. Called parent on 12 Jan — promised to bring birth certificate copy."
                  />
                </div>
              </div>

              <DialogFooter className="gap-2 sm:justify-between">
                <Button variant="outline" onClick={() => setDeleting(selected)}>
                  <Trash2 className="mr-2 h-4 w-4 text-red-500" aria-hidden="true" /> Delete
                </Button>
                <Button
                  onClick={saveChanges}
                  disabled={saving || !statusChanged}
                  className="text-white"
                  style={{ backgroundColor: theme.primary }}
                >
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
                  Save changes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this application?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleting &&
                `The application ${deleting.applicationNumber} from ${deleting.firstName} ${deleting.lastName} will be permanently deleted. The family will no longer be able to track it. This cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletingBusy}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleDelete()
              }}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {deletingBusy && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Small building blocks                                                      */
/* -------------------------------------------------------------------------- */

export function StatusBadge({ status }: { status: ApplicationDto['status'] }) {
  const meta = STATUS_META[status]
  if (!meta) return <Badge variant="outline">{status}</Badge>
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${meta.badgeClass}`}
    >
      {meta.label}
    </span>
  )
}

function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border p-4">
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.primary }}>
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  )
}

function InfoGrid({
  rows,
  linkify = [],
}: {
  rows: [string, string][]
  linkify?: string[]
}) {
  return (
    <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div key={label} className="text-sm">
          <dt className="inline text-slate-500">{label}: </dt>
          <dd className="inline font-medium text-slate-900">
            {linkify.includes(label) && label === 'Email' ? (
              <a
                href={`mailto:${value}`}
                className="underline underline-offset-2"
                style={{ color: theme.primary }}
              >
                {value}
              </a>
            ) : linkify.includes(label) && label === 'Phone' ? (
              <a
                href={`tel:${value.replace(/\s/g, '')}`}
                className="underline underline-offset-2"
                style={{ color: theme.primary }}
              >
                {value}
              </a>
            ) : (
              value || '—'
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}
