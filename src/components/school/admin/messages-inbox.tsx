'use client'

/**
 * Messages inbox — contact-form submissions from the public site.
 * Opening a message marks it as read; messages can be deleted.
 */

import { useCallback, useEffect, useState } from 'react'
import { Inbox, Loader2, Mail, MailOpen, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import type { MessageDto } from '@/lib/types'

const { theme } = schoolConfig

export function MessagesInbox({ onUnread }: { onUnread: (n: number) => void }) {
  const { toast } = useToast()
  const [items, setItems] = useState<MessageDto[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [openMessage, setOpenMessage] = useState<MessageDto | null>(null)
  const [deleting, setDeleting] = useState<MessageDto | null>(null)
  const [deletingBusy, setDeletingBusy] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/messages')
      const json = await res.json()
      if (!json.ok) throw new Error(json.error || 'Failed to load messages')
      setItems(json.data.messages)
      onUnread(json.data.stats.messagesUnread)
    } catch (err) {
      toast({
        title: 'Could not load messages',
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

  /** Open a message and mark it read in the background. */
  const openAndMarkRead = async (message: MessageDto) => {
    setOpenMessage(message)
    if (!message.read) {
      setItems((prev) => prev.map((m) => (m.id === message.id ? { ...m, read: true } : m)))
      try {
        await fetch(`/api/messages/${message.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ read: true }),
        })
        const unread = items.filter((m) => !m.read && m.id !== message.id).length
        onUnread(unread)
      } catch {
        // Non-fatal — the message still opens.
      }
    }
  }

  const handleDelete = async () => {
    if (!deleting) return
    setDeletingBusy(true)
    try {
      const res = await fetch(`/api/messages/${deleting.id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || 'Delete failed')
      toast({ title: 'Message deleted' })
      setDeleting(null)
      setOpenMessage(null)
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

  const filtered = filter === 'unread' ? items.filter((m) => !m.read) : items
  const unreadCount = items.filter((m) => !m.read).length

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Messages</h1>
          <p className="mt-1 text-sm text-slate-500">
            Enquiries submitted through the website contact form.
          </p>
        </div>
        <div className="flex gap-2" role="group" aria-label="Filter messages">
          {(['all', 'unread'] as const).map((f) => (
            <Button
              key={f}
              size="sm"
              variant="outline"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={
                filter === f
                  ? 'border-transparent text-white'
                  : 'font-medium text-slate-600'
              }
              style={filter === f ? { backgroundColor: theme.primary } : undefined}
            >
              {f === 'all' ? `All (${items.length})` : `Unread (${unreadCount})`}
            </Button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" /> Loading messages…
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <Inbox className="mx-auto h-10 w-10 text-slate-300" aria-hidden="true" />
            <p className="mt-3 text-sm text-slate-500">
              {filter === 'unread' ? 'No unread messages — all caught up!' : 'No messages yet.'}
            </p>
          </div>
        ) : (
          <ul className="max-h-[34rem] divide-y overflow-y-auto">
            {filtered.map((m) => (
              <li key={m.id}>
                <button
                  onClick={() => openAndMarkRead(m)}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-slate-50 sm:px-5"
                >
                  {m.read ? (
                    <MailOpen className="h-4.5 w-4.5 shrink-0 text-slate-300" aria-hidden="true" />
                  ) : (
                    <Mail className="h-4.5 w-4.5 shrink-0" style={{ color: theme.primary }} aria-hidden="true" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span
                        className={
                          'truncate text-sm ' +
                          (m.read ? 'font-medium text-slate-700' : 'font-bold text-slate-900')
                        }
                      >
                        {m.subject}
                      </span>
                      {!m.read && (
                        <Badge
                          className="shrink-0 border-0 px-1.5 py-0 text-[10px] text-white"
                          style={{ backgroundColor: theme.primary }}
                        >
                          New
                        </Badge>
                      )}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-slate-500">
                      {m.name} · {m.email} · {formatDateTime(m.createdAt)}
                    </span>
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeleting(m)
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Delete message from ${m.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        e.stopPropagation()
                        setDeleting(m)
                      }
                    }}
                    className="rounded-md p-1.5 text-slate-300 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Read dialog */}
      <Dialog open={!!openMessage} onOpenChange={(open) => !open && setOpenMessage(null)}>
        <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
          {openMessage && (
            <>
              <DialogHeader>
                <DialogTitle className="text-left">{openMessage.subject}</DialogTitle>
                <DialogDescription className="text-left">
                  From <span className="font-semibold text-slate-600">{openMessage.name}</span> ·{' '}
                  {formatDateTime(openMessage.createdAt)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="rounded-xl bg-slate-50 p-4 text-sm">
                  <p>
                    <span className="font-medium text-slate-500">Email:</span>{' '}
                    <a
                      href={`mailto:${openMessage.email}`}
                      className="font-medium underline underline-offset-2"
                      style={{ color: theme.primary }}
                    >
                      {openMessage.email}
                    </a>
                  </p>
                  {openMessage.phone && (
                    <p className="mt-1">
                      <span className="font-medium text-slate-500">Phone:</span>{' '}
                      <a
                        href={`tel:${openMessage.phone.replace(/\s/g, '')}`}
                        className="font-medium underline underline-offset-2"
                        style={{ color: theme.primary }}
                      >
                        {openMessage.phone}
                      </a>
                    </p>
                  )}
                </div>
                <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
                  {openMessage.message}
                </p>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setDeleting(openMessage)}>
                  <Trash2 className="mr-2 h-4 w-4 text-red-500" aria-hidden="true" /> Delete
                </Button>
                <Button
                  asChild
                  className="text-white"
                  style={{ backgroundColor: theme.primary }}
                >
                  <a href={`mailto:${openMessage.email}?subject=Re: ${encodeURIComponent(openMessage.subject)}`}>
                    Reply by email
                  </a>
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
            <AlertDialogTitle>Delete this message?</AlertDialogTitle>
            <AlertDialogDescription>
              The message from {deleting?.name} will be permanently deleted. This cannot be undone.
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
