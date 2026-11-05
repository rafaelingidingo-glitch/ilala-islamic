'use client'

/**
 * Events manager — create, edit, publish and delete calendar events.
 */

import { useCallback, useEffect, useState } from 'react'
import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { clearApiCache } from '@/hooks/use-api-data'
import { schoolConfig } from '@/config/school-config'
import { formatDate } from '@/lib/format'
import type { EventDto } from '@/lib/types'
import { PublishBadge } from './admin-shared'

const { theme } = schoolConfig

const CATEGORIES = ['Academic', 'Sports', 'Ceremony', 'Public', 'Holiday', 'Meeting', 'Other']

interface FormState {
  title: string
  startDate: string
  time: string
  location: string
  category: string
  description: string
  published: boolean
}

const emptyForm = (): FormState => ({
  title: '',
  startDate: new Date().toISOString().slice(0, 10),
  time: '',
  location: '',
  category: 'Academic',
  description: '',
  published: true,
})

export function EventsManager() {
  const { toast } = useToast()
  const [items, setItems] = useState<EventDto[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<EventDto | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<EventDto | null>(null)
  const [deletingBusy, setDeletingBusy] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/events?all=1')
      const json = await res.json()
      if (!json.ok) throw new Error(json.error || 'Failed to load events')
      setItems(json.data)
    } catch (err) {
      toast({
        title: 'Could not load events',
        description: err instanceof Error ? err.message : 'Please refresh.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm())
    setDialogOpen(true)
  }

  const openEdit = (item: EventDto) => {
    setEditing(item)
    setForm({
      title: item.title,
      startDate: item.startDate,
      time: item.time,
      location: item.location,
      category: item.category,
      description: item.description,
      published: item.published,
    })
    setDialogOpen(true)
  }

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSave = async () => {
    if (form.title.trim().length < 3 || !form.location.trim() || form.description.trim().length < 5) {
      toast({
        title: 'Please complete the form',
        description: 'Title, location and a short description are required.',
        variant: 'destructive',
      })
      return
    }
    setSaving(true)
    try {
      const res = await fetch(editing ? `/api/events/${editing.id}` : '/api/events', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || 'Save failed')
      toast({
        title: editing ? 'Event updated' : 'Event added',
        description: `“${form.title}” on ${formatDate(form.startDate)}.`,
      })
      setDialogOpen(false)
      clearApiCache('/api/events')
      await load()
    } catch (err) {
      toast({
        title: 'Save failed',
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
      const res = await fetch(`/api/events/${deleting.id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || 'Delete failed')
      toast({ title: 'Event deleted', description: `“${deleting.title}” has been removed.` })
      setDeleting(null)
      clearApiCache('/api/events')
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

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Events</h1>
          <p className="mt-1 text-sm text-slate-500">
            Upcoming events show on the home page and the News &amp; Events calendar.
          </p>
        </div>
        <Button onClick={openCreate} className="text-white" style={{ backgroundColor: theme.primary }}>
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" /> Add event
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" /> Loading events…
          </div>
        ) : items.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <p className="text-sm text-slate-500">No events yet.</p>
            <Button onClick={openCreate} variant="outline" className="mt-4 font-semibold">
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" /> Add the first event
            </Button>
          </div>
        ) : (
          <ul className="divide-y">
            {items.map((item) => {
              const past = item.startDate < new Date().toISOString().slice(0, 10)
              return (
                <li key={item.id} className="flex items-center gap-4 px-4 py-3.5 sm:px-5">
                  <div
                    className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl text-white"
                    style={{ backgroundColor: past ? '#94a3b8' : theme.primary }}
                    aria-hidden="true"
                  >
                    <span className="text-sm font-extrabold leading-none">{item.startDate.slice(8, 10)}</span>
                    <span className="text-[9px] font-bold tracking-wider">
                      {formatDate(item.startDate).split(' ')[1]?.toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span>{formatDate(item.startDate)}</span>
                      {item.time && <span>{item.time}</span>}
                      <span>{item.location}</span>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5">{item.category}</span>
                      <PublishBadge published={item.published} />
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(item)} aria-label={`Edit ${item.title}`}>
                      <Pencil className="h-4 w-4 text-slate-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleting(item)}
                      aria-label={`Delete ${item.title}`}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* Create / edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit event' : 'New event'}</DialogTitle>
            <DialogDescription>
              Published events appear on the public calendar automatically.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="event-title">Event title</Label>
              <Input
                id="event-title"
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                placeholder="e.g. Inter-House Football Finals"
                maxLength={200}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="event-date">Date</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={form.startDate}
                  onChange={(e) => update('startDate', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="event-time">Time</Label>
                <Input
                  id="event-time"
                  value={form.time}
                  onChange={(e) => update('time', e.target.value)}
                  placeholder="e.g. 9:00 AM – 2:00 PM or All Week"
                  maxLength={80}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="event-location">Location</Label>
                <Input
                  id="event-location"
                  value={form.location}
                  onChange={(e) => update('location', e.target.value)}
                  placeholder="e.g. Main Hall"
                  maxLength={120}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="event-category">Category</Label>
                <Select value={form.category} onValueChange={(v) => update('category', v)}>
                  <SelectTrigger id="event-category">
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="event-description">Description</Label>
              <Textarea
                id="event-description"
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                placeholder="What happens at the event, who should attend, what to bring…"
                rows={4}
                maxLength={2000}
              />
            </div>

            <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 p-4">
              <Switch
                id="event-published"
                checked={form.published}
                onCheckedChange={(v) => update('published', v)}
              />
              <Label htmlFor="event-published" className="cursor-pointer text-sm">
                Published
                <span className="block text-xs font-normal text-slate-400">
                  Unpublish to hide the event without deleting it
                </span>
              </Label>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving} className="text-white" style={{ backgroundColor: theme.primary }}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
              {editing ? 'Save changes' : 'Add event'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this event?</AlertDialogTitle>
            <AlertDialogDescription>
              “{deleting?.title}” will be permanently removed from the calendar. This cannot be
              undone.
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
