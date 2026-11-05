'use client'

/**
 * Admin panel shell — session check, login gate, navigation and layout.
 * Rendered full-screen in place of the public site when `page === 'admin'`.
 */

import { useEffect, useState } from 'react'
import {
  CalendarDays,
  ExternalLink,
  GraduationCap,
  Inbox,
  LayoutDashboard,
  Loader2,
  LogOut,
  Newspaper,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { schoolConfig } from '@/config/school-config'
import { AdminLogin } from './admin-login'
import { Dashboard } from './dashboard'
import { NewsManager } from './news-manager'
import { EventsManager } from './events-manager'
import { StaffManager } from './staff-manager'
import { MessagesInbox } from './messages-inbox'

type AdminTab = 'dashboard' | 'news' | 'events' | 'staff' | 'messages'

const TABS: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'events', label: 'Events', icon: CalendarDays },
  { id: 'staff', label: 'Staff', icon: Users },
  { id: 'messages', label: 'Messages', icon: Inbox },
]

export function AdminApp({ onNavigate }: { onNavigate: (page: 'home') => void }) {
  const { theme, identity, admin } = schoolConfig
  const { toast } = useToast()
  const [authed, setAuthed] = useState<boolean | null>(null) // null = checking
  const [tab, setTab] = useState<AdminTab>('dashboard')
  const [unread, setUnread] = useState(0)
  const [loggingOut, setLoggingOut] = useState(false)

  // Check the session cookie on mount (e.g. returning within 7 days).
  useEffect(() => {
    let cancelled = false
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setAuthed(!!json.data?.authenticated)
      })
      .catch(() => {
        if (!cancelled) setAuthed(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } finally {
      setAuthed(false)
      setLoggingOut(false)
      toast({ title: 'Signed out', description: 'You have been logged out securely.' })
    }
  }

  // --- Session checking spinner ---
  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" aria-label="Checking session" />
      </div>
    )
  }

  // --- Login gate ---
  if (!authed) {
    return <AdminLogin onLogin={() => setAuthed(true)} />
  }

  // --- Authenticated panel ---
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
              }}
            >
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-bold text-slate-900">
                {identity.shortName} Admin Panel
              </p>
              <p className="truncate text-xs text-slate-400">{admin.label}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('home')}
              className="hidden font-medium sm:inline-flex"
            >
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              View site
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={loggingOut}
              className="font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              {loggingOut ? (
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <LogOut className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              )}
              Logout
            </Button>
          </div>
        </div>

        {/* Mobile tabs */}
        <nav aria-label="Admin sections" className="border-t px-2 md:hidden">
          <ul className="flex gap-1 overflow-x-auto py-2">
            {TABS.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => setTab(id)}
                  aria-current={tab === id ? 'page' : undefined}
                  className={cn(
                    'flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors',
                    tab === id ? 'text-white' : 'text-slate-600 hover:bg-slate-100'
                  )}
                  style={tab === id ? { backgroundColor: theme.primary } : undefined}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {label}
                  {id === 'messages' && unread > 0 && (
                    <span className="rounded-full bg-white px-1.5 text-[10px] font-bold text-slate-900">
                      {unread}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 py-6 sm:px-6">
        {/* Desktop sidebar */}
        <aside className="hidden w-56 shrink-0 md:block">
          <nav aria-label="Admin sections" className="sticky top-24">
            <ul className="space-y-1">
              {TABS.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <button
                    onClick={() => setTab(id)}
                    aria-current={tab === id ? 'page' : undefined}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                      tab === id
                        ? 'text-white shadow-sm'
                        : 'text-slate-600 hover:bg-white hover:text-slate-900'
                    )}
                    style={tab === id ? { backgroundColor: theme.primary } : undefined}
                  >
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    {label}
                    {id === 'messages' && unread > 0 && (
                      <span
                        className={cn(
                          'ml-auto rounded-full px-2 py-0.5 text-[11px] font-bold',
                          tab === id ? 'bg-white/25 text-white' : 'bg-red-100 text-red-600'
                        )}
                      >
                        {unread}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border bg-white p-4 text-xs leading-relaxed text-slate-500">
              <p className="font-semibold text-slate-700">Tip</p>
              <p className="mt-1">
                Everything you publish here appears on the public site immediately. Unpublish
                instead of deleting to prepare content in advance.
              </p>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1 pb-10">
          {tab === 'dashboard' && <Dashboard onGoTab={setTab} onUnread={setUnread} />}
          {tab === 'news' && <NewsManager />}
          {tab === 'events' && <EventsManager />}
          {tab === 'staff' && <StaffManager />}
          {tab === 'messages' && <MessagesInbox onUnread={setUnread} />}
        </main>
      </div>

      {/* Mobile "view site" floats at the bottom of the top bar actions */}
      <button
        onClick={() => onNavigate('home')}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-lg sm:hidden"
        style={{ backgroundColor: theme.primary }}
      >
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
        View site
      </button>
    </div>
  )
}
