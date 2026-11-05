'use client'

/**
 * Small shared building blocks for the admin panel.
 */

import { cn } from '@/lib/utils'
import { schoolConfig } from '@/config/school-config'
import type { LucideIcon } from 'lucide-react'

const { theme } = schoolConfig

export function AdminStatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon
  label: string
  value: string | number
  hint?: string
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">{value}</p>
          {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
        </div>
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: theme.tint, color: theme.primary }}
        >
          <Icon className="h-5.5 w-5.5" aria-hidden="true" />
        </span>
      </div>
    </div>
  )
}

export function PublishBadge({ published }: { published: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
      )}
    >
      <span
        aria-hidden="true"
        className={cn('h-1.5 w-1.5 rounded-full', published ? 'bg-emerald-500' : 'bg-slate-400')}
      />
      {published ? 'Published' : 'Draft'}
    </span>
  )
}

export function AdminField({
  label,
  htmlFor,
  children,
  hint,
  className,
}: {
  label: string
  htmlFor?: string
  children: React.ReactNode
  hint?: string
  className?: string
}) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  )
}
