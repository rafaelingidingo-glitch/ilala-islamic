'use client'

import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react'
import { Logo } from '@/components/school/header'
import { schoolConfig, type PageId } from '@/config/school-config'

interface FooterProps {
  onNavigate: (page: PageId) => void
}

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
}

export function Footer({ onNavigate }: FooterProps) {
  const { identity, contact, navigation, theme } = schoolConfig
  const year = new Date().getFullYear()
  const socialEntries = Object.entries(contact.social)

  return (
    <footer className="mt-auto text-white" style={{ backgroundColor: theme.navy }}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* School info */}
          <div className="space-y-4">
            <Logo variant="footer" onClick={() => onNavigate('home')} />
            <p className="text-sm leading-relaxed text-white/70">
              {identity.description.split('. ').slice(0, 1).join('. ')}.
            </p>
            <div className="flex gap-2">
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
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {contact.address}
                  <br />
                  {contact.city}
                  <br />
                  {contact.postal}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="flex gap-2.5 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex gap-2.5 transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Office hours */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Office Hours
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{contact.officeHours}</span>
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{contact.officeHoursWeekend}</span>
              </li>
            </ul>
            <div
              className="mt-5 rounded-xl p-4"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                School Motto
              </p>
              <p className="mt-1 text-sm font-semibold text-white">{identity.motto}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {year} {identity.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p>
              Established {identity.established} · {identity.type}
            </p>
            <button
              onClick={() => onNavigate('admin')}
              className="rounded-md px-2 py-1 font-medium text-white/60 underline-offset-2 transition-colors hover:text-white hover:underline"
            >
              Staff Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
