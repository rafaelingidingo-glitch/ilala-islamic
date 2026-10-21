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
import { pageLabel, schoolConfig, type PageId } from '@/config/school-config'

/**
 * School Website Template — single-page application shell.
 * Navigation is state-based (no separate routes), so the whole site lives at `/`.
 * Colors are driven by `schoolConfig.theme` through CSS variables.
 */
export default function SchoolWebsite() {
  const [page, setPage] = useState<PageId>('home')
  const { theme, identity } = schoolConfig

  const navigate = (next: PageId) => {
    setPage(next)
    window.scrollTo(0, 0)
  }

  // Keep the browser tab title in sync with the active page.
  useEffect(() => {
    document.title = `${pageLabel(page)} — ${identity.name}`
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
