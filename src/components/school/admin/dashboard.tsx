'use client'

/**
 * Admin dashboard — content overview, unread-message summary and quick actions.
 */

import { useEffect, useState } from 'react'
import { CalendarCheck, Inbox, Loader2, Newspaper, Plus, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { schoolConfig } from '@/config/school-config'
import { formatDateTime } from '@/lib/format'
import type { AdminStats, MessageDto, NewsDto } from '@/lib/types'
import { AdminStatCard } from './admin-shared'

interface DashboardProps {
  onGoTab: (tab: 'news' | 'events' | 'staff' | 'messages') => void
  onUnread: (n: number) => void
}

export function Dashboard({ onGoTab, onUnread }: DashboardProps) {
  const { toast } = useToast()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [messages, setMessages] = useState<MessageDto[]>([])
  const [news, setNews] = useState<NewsDto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [msgRes, newsRes] = await Promise.all([
          fetch('/api/messages'),
          fetch('/api/news?all=1'),
        ])
        const msgJson = await msgRes.json()
        const newsJson = await newsRes.json()
        if (!msgJson.ok) throw new Error(msgJson.error || 'Failed to load stats')
        if (!cancelled) {
          setStats(msgJson.data.stats)
          setMessages(msgJson.data.messages)
          onUnread(msgJson.data.stats.messagesUnread)
          if (newsJson.ok) setNews(newsJson.data)
        }
      } catch (err) {
        if (!cancelled) {
          toast({
            title: 'Could not load dashboard',
            description: err instanceof Error ? err.message : 'Please refresh the page.',
            variant: 'destructive',
          })
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const unread = messages.filter((m) => !m.read).slice(0, 4)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          A quick overview of website content and visitor messages.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24 text-slate-400">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
          Loading stats…
        </div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <AdminStatCard
              icon={Newspaper}
              label="News Articles"
              value={stats ? `${stats.newsPublished} / ${stats.newsTotal}` : '—'}
              hint="published / total"
            />
            <AdminStatCard
              icon={CalendarCheck}
              label="Upcoming Events"
              value={stats?.eventsUpcoming ?? '—'}
              hint={`${stats?.eventsTotal ?? 0} in total`}
            />
            <AdminStatCard icon={Users} label="Staff Members" value={stats?.staffTotal ?? '—'} />
            <AdminStatCard
              icon={Inbox}
              label="Unread Messages"
              value={stats?.messagesUnread ?? '—'}
              hint={`${stats?.messagesTotal ?? 0} received in total`}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent messages */}
            <section aria-labelledby="dash-messages" className="rounded-2xl border bg-white shadow-sm">
              <div className="flex items-center justify-between border-b px-5 py-4">
                <h2 id="dash-messages" className="font-bold text-slate-900">
                  Latest messages
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-semibold"
                  onClick={() => onGoTab('messages')}
                >
                  Open inbox
                </Button>
              </div>
              <ul className="divide-y">
                {unread.length === 0 && (
                  <li className="px-5 py-8 text-center text-sm text-slate-400">
                    No unread messages — the inbox is all caught up.
                  </li>
                )}
                {unread.map((m) => (
                  <li key={m.id}>
                    <button
                      onClick={() => onGoTab('messages')}
                      className="flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-slate-50"
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-slate-900">
                          {m.subject}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-slate-500">
                          {m.name} · {formatDateTime(m.createdAt)}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {/* Recent news */}
            <section aria-labelledby="dash-news" className="rounded-2xl border bg-white shadow-sm">
              <div className="flex items-center justify-between border-b px-5 py-4">
                <h2 id="dash-news" className="font-bold text-slate-900">
                  Recently published news
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-semibold"
                  onClick={() => onGoTab('news')}
                >
                  Manage news
                </Button>
              </div>
              <ul className="divide-y">
                {news.slice(0, 5).map((n) => (
                  <li key={n.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-slate-800">
                        {n.title}
                      </span>
                      <span className="text-xs text-slate-400">{n.date}</span>
                    </span>
                    <span
                      className={
                        'shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ' +
                        (n.published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500')
                      }
                    >
                      {n.published ? 'Live' : 'Draft'}
                    </span>
                  </li>
                ))}
                {news.length === 0 && (
                  <li className="px-5 py-8 text-center text-sm text-slate-400">
                    No news yet — add the first article.
                  </li>
                )}
              </ul>
            </section>
          </div>

          {/* Quick actions */}
          <section aria-label="Quick actions" className="flex flex-wrap gap-3">
            <Button onClick={() => onGoTab('news')} className="text-white" style={{ backgroundColor: schoolConfig.theme.primary }}>
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" /> Add news article
            </Button>
            <Button onClick={() => onGoTab('events')} variant="outline" className="font-semibold">
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" /> Add event
            </Button>
            <Button onClick={() => onGoTab('staff')} variant="outline" className="font-semibold">
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" /> Add staff member
            </Button>
          </section>
        </>
      )}
    </div>
  )
}
