'use client'

/**
 * Staff manager — maintain the staff directory shown on the About page.
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
import type { StaffDto } from '@/lib/types'
import { PublishBadge } from './admin-shared'

const { theme } = schoolConfig

const DEPARTMENTS = [
  'Leadership',
  'Sciences',
  'Mathematics',
  'Languages',
  'Business',
  'ICT',
  'Social Studies',
  'Administration',
  'Teaching',
  'Support',
]

interface FormState {
  name: string
  role: string
  department: string
  initials: string
  order: string
  published: boolean
}

const emptyForm = (): FormState => ({
  name: '',
  role: '',
  department: 'Teaching',
  initials: '',
  order: '99',
  published: true,
})

function suggestInitials(name: string): string {
  return name
    .replace(/^(Dr|Mr|Mrs|Ms|Eng|Prof)\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

export function StaffManager() {
  const { toast } = useToast()
  const [items, setItems] = useState<StaffDto[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<StaffDto | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<StaffDto | null>(null)
  const [deletingBusy, setDeletingBusy] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/staff?all=1')
      const json = await res.json()
      if (!json.ok) throw new Error(json.error || 'Failed to load staff')
      setItems(json.data)
    } catch (err) {
      toast({
        title: 'Could not load staff',
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

  const openEdit = (item: StaffDto) => {
    setEditing(item)
    setForm({
      name: item.name,
      role: item.role,
      department: item.department,
      initials: item.initials,
      order: String(item.order),
      published: item.published,
    })
    setDialogOpen(true)
  }

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSave = async () => {
    if (form.name.trim().length < 2 || form.role.trim().length < 2) {
      toast({
        title: 'Please complete the form',
        description: 'Name and role are required.',
        variant: 'destructive',
      })
      return
    }
    setSaving(true)
    try {
      const body = {
        name: form.name.trim(),
        role: form.role.trim(),
        department: form.department,
        initials: form.initials.trim().toUpperCase(),
        order: Number(form.order) || 0,
        published: form.published,
      }
      const res = await fetch(editing ? `/api/staff/${editing.id}` : '/api/staff', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || 'Save failed')
      toast({
        title: editing ? 'Staff member updated' : 'Staff member added',
        description: `${body.name} — ${body.role}.`,
      })
      setDialogOpen(false)
      clearApiCache('/api/staff')
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
      const res = await fetch(`/api/staff/${deleting.id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || 'Delete failed')
      toast({ title: 'Staff member removed', description: `${deleting.name} has been removed.` })
      setDeleting(null)
      clearApiCache('/api/staff')
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
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Staff</h1>
          <p className="mt-1 text-sm text-slate-500">
            The directory shown on the About Us page — lower “Order” numbers appear first.
          </p>
        </div>
        <Button onClick={openCreate} className="text-white" style={{ backgroundColor: theme.primary }}>
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" /> Add staff member
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" /> Loading staff…
          </div>
        ) : items.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <p className="text-sm text-slate-500">No staff members yet.</p>
            <Button onClick={openCreate} variant="outline" className="mt-4 font-semibold">
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" /> Add the first member
            </Button>
          </div>
        ) : (
          <ul className="divide-y">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 px-4 py-3.5 sm:px-5">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
                  }}
                  aria-hidden="true"
                >
                  {item.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                    <span>{item.role}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5">{item.department}</span>
                    <span>#{item.order}</span>
                    <PublishBadge published={item.published} />
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(item)} aria-label={`Edit ${item.name}`}>
                    <Pencil className="h-4 w-4 text-slate-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleting(item)}
                    aria-label={`Delete ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Create / edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit staff member' : 'New staff member'}</DialogTitle>
            <DialogDescription>
              Directory cards on the About page update as soon as a member is published.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="staff-name">Full name</Label>
              <Input
                id="staff-name"
                value={form.name}
                onChange={(e) => {
                  update('name', e.target.value)
                  if (!editing) update('initials', suggestInitials(e.target.value))
                }}
                placeholder="e.g. Dr. Grace Mwakalinga"
                maxLength={120}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="staff-role">Role / title</Label>
              <Input
                id="staff-role"
                value={form.role}
                onChange={(e) => update('role', e.target.value)}
                placeholder="e.g. Head of Sciences"
                maxLength={120}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="staff-department">Department</Label>
                <Select value={form.department} onValueChange={(v) => update('department', v)}>
                  <SelectTrigger id="staff-department">
                    <SelectValue placeholder="Choose a department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="staff-order">Order</Label>
                <Input
                  id="staff-order"
                  type="number"
                  min={0}
                  max={999}
                  value={form.order}
                  onChange={(e) => update('order', e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="staff-initials">Initials (avatar)</Label>
                <Input
                  id="staff-initials"
                  value={form.initials}
                  onChange={(e) => update('initials', e.target.value)}
                  placeholder="GM"
                  maxLength={4}
                />
              </div>
              <div className="flex items-end gap-2.5 pb-1.5">
                <Switch
                  id="staff-published"
                  checked={form.published}
                  onCheckedChange={(v) => update('published', v)}
                />
                <Label htmlFor="staff-published" className="cursor-pointer text-sm">
                  Published
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving} className="text-white" style={{ backgroundColor: theme.primary }}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
              {editing ? 'Save changes' : 'Add member'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this staff member?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleting?.name} will be removed from the public staff directory. This cannot be
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
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
