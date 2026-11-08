'use client'

import { useState } from 'react'
import {
  Facebook,
  Instagram,
  Mail,
  Menu,
  Phone,
  Send,
  Twitter,
  Youtube,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { schoolConfig, type PageId } from '@/config/school-config'

interface HeaderProps {
  current: PageId
  onNavigate: (page: PageId) => void
}

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
}

export function Logo({
  variant = 'light',
  onClick,
}: {
  variant?: 'light' | 'footer'
  onClick?: () => void
}) {
  const { identity } = schoolConfig
  return (
    <button
      onClick={onClick}
      className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Go to home — ${identity.name}`}
    >
      {/* School crest only — swap `/logo.jpg` in `public/` to change it. */}
      <img
        src="/logo.jpg"
        alt={`${identity.name} logo`}
        width={44}
        height={44}
        className={cn(
          'h-11 w-11 object-cover shadow-sm',
          variant === 'footer' && 'ring-2 ring-white/30'
        )}
      />
    </button>
  )
}

export function Header({ current, onNavigate }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const { identity, contact, navigation, theme } = schoolConfig
  const socialEntries = Object.entries(contact.social)

  const go = (page: PageId) => {
    setOpen(false)
    onNavigate(page)
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar — contact info + socials */}
      <div
        className="hidden md:block"
        style={{ backgroundColor: theme.navy }}
      >
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5 text-xs text-white/85">
            <a
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Phone className="h-3 w-3" aria-hidden="true" />
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Mail className="h-3 w-3" aria-hidden="true" />
              {contact.email}
            </a>
            <a
              href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Send className="h-3 w-3" aria-hidden="true" />
              {contact.whatsapp}
            </a>
          </div>
          <div className="flex items-center gap-1">
            {socialEntries.map(([platform, url]) => {
              const Icon = socialIcons[platform]
              if (!Icon) return null
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${identity.shortName} on ${platform}`}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b bg-white/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Logo onClick={() => go('home')} />

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => {
                const active = current === item.id
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => go(item.id)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                        active
                          ? 'text-white'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      )}
                      style={active ? { backgroundColor: theme.primary } : undefined}
                    >
                      {item.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => go('admissions')}
              className="hidden text-white shadow-sm transition-transform hover:scale-[1.02] sm:inline-flex"
              style={{ backgroundColor: theme.primary }}
            >
              Enroll Now
            </Button>

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate between pages of {identity.name}
                </SheetDescription>
                <div className="mt-2 flex flex-col gap-6">
                  <Logo onClick={() => go('home')} />
                  <nav aria-label="Mobile navigation">
                    <ul className="flex flex-col gap-1">
                      {navigation.map((item) => {
                        const active = current === item.id
                        return (
                          <li key={item.id}>
                            <button
                              onClick={() => go(item.id)}
                              aria-current={active ? 'page' : undefined}
                              className={cn(
                                'w-full rounded-lg px-4 py-2.5 text-left text-[15px] font-medium transition-colors',
                                active ? 'text-white' : 'text-slate-700 hover:bg-slate-100'
                              )}
                              style={active ? { backgroundColor: theme.primary } : undefined}
                            >
                              {item.label}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </nav>
                  <Button
                    onClick={() => go('admissions')}
                    className="w-full text-white"
                    style={{ backgroundColor: theme.primary }}
                  >
                    Enroll Now
                  </Button>
                  <div className="rounded-xl bg-slate-50 p-4 text-sm">
                    <p className="font-semibold text-slate-900">Get in touch</p>
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      className="mt-1.5 flex items-center gap-2 text-slate-600 hover:text-slate-900"
                    >
                      <Phone className="h-3.5 w-3.5" /> {contact.phone}
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-1.5 flex items-center gap-2 text-slate-600 hover:text-slate-900"
                    >
                      <Mail className="h-3.5 w-3.5" /> {contact.email}
                    </a>
                    <a
                      href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1.5 flex items-center gap-2 text-slate-600 hover:text-slate-900"
                    >
                      <Send className="h-3.5 w-3.5" /> {contact.whatsapp}
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
