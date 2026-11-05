'use client'

/**
 * News manager — create, edit, publish and delete news articles.
 */

import { useCallback, useEffect, useState } from 'react'
import { Loader2, Pencil, Plus, Star, Trash2 } from 'lucide-react'
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
import { images } from '@/data/site-content'
import type { NewsDto } from '@/lib/types'
import { PublishBadge } from './admin-shared'

const { theme } = schoolConfig

const CATEGORIES = ['Academics', 'Sports', 'Facilities', 'Admissions', 'Announcement', 'Events', 'Other']

const IMAGE_PRESETS: { label: string; url: string }[] = [
  { label: 'Classroom lesson', url: images.classroom },
  { label: 'Classroom (alt)', url: images.classroomAlt },
  { label: 'Science lab', url: images.lab },
  { label: 'Science lab (alt)', url: images.labAlt },
  { label: 'Library', url: images.library },
  { label: 'Library (alt)', url: images.libraryAlt },
  { label: 'Football field', url: images.sports },
  { label: 'Sports day', url: images.sportsAlt },
  { label: 'Students on campus', url: images.students },
  { label: 'Graduation', url: images.studentsGroup },
  { label: 'School building', url: images.building },
  { label: 'Computer lab', url: images.computerLab },
]

interface FormState {
  title: string
  category: string
  date: string
  image: string
  excerpt: string
  featured: boolean
  published: boolean
}

const emptyForm = (): FormState => ({
  title: '',
  category: 'Announcement',
  date: new Date().toISOString().slice(0, 10),
  image: IMAGE_PRESETS[0].url,
  excerpt: '',
  featured: false,
  published: true,
})

export function NewsManager() {
  const { toast } = useToast()
  const [items, setItems] = useState<NewsDto[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<NewsDto | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<NewsDto | null>(null)
  const [deletingBusy, setDeletingBusy] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/news?all=1')
      const json = await res.json()
      if (!json.ok) throw new Error(json.error || 'Failed to load news')
      setItems(json.data)
    } catch (err) {
      toast({
        title: 'Could not load news',
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

  const openEdit = (item: NewsDto) => {
    setEditing(item)
    setForm({
      title: item.title,
      category: item.category,
      date: item.date,
      image: item.image || '',
      excerpt: item.excerpt,
      featured: item.featured,
      published: item.published,
    })
    setDialogOpen(true)
  }

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSave = async () => {
    if (form.title.trim().length < 3 || form.excerpt.trim().length < 10) {
      toast({
        title: 'Please complete the form',
        description: 'The title needs at least 3 characters and the story text at least 10.',
        variant: 'destructive',
      })
      return
    }
    setSaving(true)
    try {
      const res = await fetch(editing ? `/api/news/${editing.id}` : '/api/news', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || 'Save failed')
      toast({
        title: editing ? 'Article updated' : 'Article published',
        description: `“${form.title}” is now ${form.published ? 'live on the website' : 'saved as a draft'}.`,
      })
      setDialogOpen(false)
      clearApiCache('/api/news')
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
      const res = await fetch(`/api/news/${deleting.id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || 'Delete failed')
      toast({ title: 'Article deleted', description: `“${deleting.title}” has been removed.` })
      setDeleting(null)
      clearApiCache('/api/news')
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
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">News</h1>
          <p className="mt-1 text-sm text-slate-500">
            Articles appear on the home page and the News &amp; Events page — newest first.
          </p>
        </div>
        <Button onClick={openCreate} className="text-white" style={{ backgroundColor: theme.primary }}>
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" /> Add article
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" /> Loading articles…
          </div>
        ) : items.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <p className="text-sm text-slate-500">No articles yet.</p>
            <Button onClick={openCreate} variant="outline" className="mt-4 font-semibold">
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" /> Add the first article
            </Button>
          </div>
        ) : (
          <ul className="divide-y">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 px-4 py-3.5 sm:px-5">
                <img
                  src={item.image || images.classroom}
                  alt=""
                  className="hidden h-12 w-20 shrink-0 rounded-lg object-cover sm:block"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 truncate text-sm font-semibold text-slate-900">
                    {item.title}
                    {item.featured && (
                      <Star
                        className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400"
                        aria-label="Featured"
                      />
                    )}
                  </p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                    <span>{item.category}</span>
                    <span>{item.date}</span>
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
            ))}
          </ul>
        )}
      </div>

      {/* Create / edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit article' : 'New article'}</DialogTitle>
            <DialogDescription>
              {editing
                ? 'Update the details below — changes go live immediately when published.'
                : 'Fill in the article details. Published articles appear on the website right away.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="news-title">Title</Label>
              <Input
                id="news-title"
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                placeholder="e.g. Form Two Students Win National Debate Trophy"
                maxLength={200}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="news-category">Category</Label>
                <Select value={form.category} onValueChange={(v) => update('category', v)}>
                  <SelectTrigger id="news-category">
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
              <div className="space-y-1.5">
                <Label htmlFor="news-date">Display date</Label>
                <Input
                  id="news-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => update('date', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="news-image">Cover image</Label>
              <div className="flex gap-3">
                {form.image ? (
                  <img
                    src={form.image}
                    alt="Cover preview"
                    className="h-16 w-24 shrink-0 rounded-lg border object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg border border-dashed text-[10px] text-slate-400">
                    No image
                  </div>
                )}
                <Select value={form.image} onValueChange={(v) => update('image', v)}>
                  <SelectTrigger id="news-image" className="w-full">
                    <SelectValue placeholder="Choose a demo image or paste a URL below" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {IMAGE_PRESETS.map((preset) => (
                      <SelectItem key={preset.url} value={preset.url}>
                        {preset.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                value={form.image}
                onChange={(e) => update('image', e.target.value)}
                placeholder="…or paste your school's own image URL"
                className="mt-1"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="news-excerpt">Story text</Label>
              <Textarea
                id="news-excerpt"
                value={form.excerpt}
                onChange={(e) => update('excerpt', e.target.value)}
                placeholder="Write the story — two to four sentences works best."
                rows={5}
                maxLength={4000}
              />
            </div>

            <div className="flex flex-wrap items-center gap-6 rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2.5">
                <Switch
                  id="news-published"
                  checked={form.published}
                  onCheckedChange={(v) => update('published', v)}
                />
                <Label htmlFor="news-published" className="cursor-pointer text-sm">
                  Published
                </Label>
              </div>
              <div className="flex items-center gap-2.5">
                <Switch
                  id="news-featured"
                  checked={form.featured}
                  onCheckedChange={(v) => update('featured', v)}
                />
                <Label htmlFor="news-featured" className="cursor-pointer text-sm">
                  Featured
                  <span className="block text-xs font-normal text-slate-400">
                    Shows first on the news page
                  </span>
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
              {editing ? 'Save changes' : 'Publish article'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this article?</AlertDialogTitle>
            <AlertDialogDescription>
              “{deleting?.title}” will be permanently removed from the website. This cannot be
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
