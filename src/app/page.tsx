'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/school/header'
import { Footer } from '@/components/school/footer'
import { HomePage } from '@/components/school/pages/home'
import { AboutPage } from '@/components/school/pages/about'
import { AcademicsPage } from '@/components/school/pages/academics'
import { AdmissionsPage } from '@/components/school/pages/admissions'
import { NewsPage } from '@/components/school/pages/news-events'
import { StudentLifePage } from '@/components/school/pages/student-life'
import { ContactPage } from '@/components/school/pages/contact'
import { AdminApp } from '@/components/school/admin/admin-app'
import { pageLabel, schoolConfig, type PageId } from '@/config/school-config'

/**
 * School Website Template — single-page application shell.
 * Navigation is state-based (no separate routes), so the whole site lives at
 * `/`. The admin panel opens with the `#admin` hash or via "Staff Login" in
 * the footer. Colors are driven by `schoolConfig.theme` through CSS variables.
 */
export default function SchoolWebsite() {
  const [page, setPage] = useState<PageId>('home')
  const { theme, identity } = schoolConfig

  const navigate = (next: PageId) => {
    setPage(next)
    // Keep the URL hash in sync so #admin can be shared/bookmarked.
    window.history.replaceState(null, '', next === 'home' ? '#' : '#admin')
    window.scrollTo(0, 0)
  }

  // Open the admin panel when visited with #admin, and keep the browser's
  // back/forward buttons working between the site and the admin panel.
  useEffect(() => {
    const applyHash = () =>
      setPage(window.location.hash === '#admin' ? 'admin' : 'home')
    const timer = setTimeout(applyHash, 0)
    window.addEventListener('hashchange', applyHash)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('hashchange', applyHash)
    }
  }, [])

  // Keep the browser tab title in sync with the active page.
  useEffect(() => {
    document.title =
      page === 'admin'
        ? `Admin Panel — ${identity.name}`
        : `${pageLabel(page)} — ${identity.name}`
  }, [page, identity.name])

  // Theme CSS variables — changing schoolConfig.theme re-colors the whole site.
  const themeVars = {
    '--sch-primary': theme.primary,
    '--sch-primary-dark': theme.primaryDark,
    '--sch-navy': theme.navy,
    '--primary': theme.primary,
    '--primary-foreground': '#ffffff',
    '--secondary': theme.tint,
    '--secondary-foreground': theme.primaryDark,
    '--accent': theme.tint,
    '--accent-foreground': theme.primaryDark,
    '--ring': theme.ring,
  } as React.CSSProperties

  if (page === 'admin') {
    return (
      <div style={themeVars}>
        <AdminApp onNavigate={navigate} />
      </div>
    )
  }

  return (
    <div
      style={themeVars}
      className="flex min-h-screen flex-col bg-white text-slate-900"
    >
      <Header current={page} onNavigate={navigate} />
      <main className="flex-1">
        {page === 'home' && <HomePage onNavigate={navigate} />}
        {page === 'about' && <AboutPage onNavigate={navigate} />}
        {page === 'academics' && <AcademicsPage onNavigate={navigate} />}
        {page === 'admissions' && <AdmissionsPage onNavigate={navigate} />}
        {page === 'news' && <NewsPage onNavigate={navigate} />}
        {page === 'student-life' && <StudentLifePage onNavigate={navigate} />}
        {page === 'contact' && <ContactPage onNavigate={navigate} />}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  )
}
