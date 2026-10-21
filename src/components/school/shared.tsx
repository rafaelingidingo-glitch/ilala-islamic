'use client'

import { cn } from '@/lib/utils'
import { schoolConfig, type PageId } from '@/config/school-config'
import { ChevronRight, Home } from 'lucide-react'

/** Eyebrow + title + description used at the top of every section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  light?: boolean
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' ? 'mx-auto text-center' : 'text-left')}>
      {eyebrow && (
        <p
          className={cn(
            'text-xs font-bold uppercase tracking-[0.2em]',
            light ? 'text-white/70' : 'text-[color:var(--sch-primary)]'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl',
          light ? 'text-white' : 'text-slate-900'
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 text-base leading-relaxed', light ? 'text-white/75' : 'text-slate-600')}>
          {description}
        </p>
      )}
    </div>
  )
}

/** Navy hero banner used at the top of inner pages. */
export function PageHero({
  page,
  title,
  description,
  image,
  onNavigate,
}: {
  page: PageId
  title: string
  description: string
  image: string
  onNavigate?: (page: PageId) => void
}) {
  const { theme } = schoolConfig
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt="" className="h-full w-full object-cover" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(100deg, ${theme.navy}f2 0%, ${theme.navy}d9 45%, ${theme.primary}99 100%)`,
          }}
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-1.5 text-sm text-white/70">
            <li>
              <button
                type="button"
                onClick={() => onNavigate?.('home')}
                className="flex cursor-pointer items-center gap-1 transition-colors hover:text-white"
              >
                <Home className="h-3.5 w-3.5" aria-hidden="true" /> Home
              </button>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="font-medium text-white">
              {title}
            </li>
          </ol>
        </nav>
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  )
}
