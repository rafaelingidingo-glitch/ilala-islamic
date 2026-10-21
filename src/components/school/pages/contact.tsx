'use client'

import { useState } from 'react'
import { Clock, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { PageHero, SectionHeading } from '@/components/school/shared'
import { schoolConfig, type PageId } from '@/config/school-config'
import { images } from '@/data/site-content'

const subjects = [
  'Admissions enquiry',
  'Fees & payments',
  'Academics / student progress',
  'Boarding',
  'Other',
]

export function ContactPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  const { theme, contact, identity } = schoolConfig
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: subjects[0],
    message: '',
  })

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({
        title: 'Please complete the form',
        description: 'Name, email and message are required.',
        variant: 'destructive',
      })
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      toast({
        title: 'Message sent successfully',
        description: `Thank you, ${form.name.split(' ')[0]}! ${identity.shortName} will reply within one working day.`,
      })
      setForm({ name: '', email: '', phone: '', subject: subjects[0], message: '' })
    } catch {
      toast({
        title: 'Something went wrong',
        description: 'Your message could not be sent. Please try again or call us directly.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const infoCards = [
    {
      icon: MapPin,
      title: 'Visit Us',
      lines: [contact.address, contact.city, contact.postal],
    },
    {
      icon: Phone,
      title: 'Call Us',
      lines: [contact.phone, contact.phoneAlt],
    },
    {
      icon: Mail,
      title: 'Email Us',
      lines: [contact.email, contact.admissionsEmail],
    },
    {
      icon: Clock,
      title: 'Office Hours',
      lines: [contact.officeHours, contact.officeHoursWeekend],
    },
  ]

  return (
    <div>
      <PageHero
        page="contact"
        onNavigate={onNavigate}
        title="Contact Us"
        description="Questions about admissions, fees or student progress? Send us a message or pay us a visit — we're happy to help."
        image={images.building}
      />

      {/* INFO CARDS */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {infoCards.map((card) => (
              <Card
                key={card.title}
                className="border-0 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="p-6">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <card.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-bold text-slate-900">{card.title}</h3>
                  {card.lines.map((line) => (
                    <p key={line} className="mt-1 text-sm leading-relaxed text-slate-600">
                      {line}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <SectionHeading
                align="left"
                eyebrow="Send a Message"
                title="We'd love to hear from you"
                description="Fill in the form and the relevant office will get back to you within one working day."
              />
              <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate={false}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">
                      Full name <span aria-hidden="true" style={{ color: theme.primary }}>*</span>
                    </Label>
                    <Input
                      id="contact-name"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="e.g. Amina Juma"
                      required
                      maxLength={100}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">
                      Email <span aria-hidden="true" style={{ color: theme.primary }}>*</span>
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="you@example.com"
                      required
                      maxLength={150}
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone (optional)</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="+255 7xx xxx xxx"
                      maxLength={30}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-subject">Subject</Label>
                    <select
                      id="contact-subject"
                      value={form.subject}
                      onChange={(e) => update('subject', e.target.value)}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">
                    Message <span aria-hidden="true" style={{ color: theme.primary }}>*</span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    placeholder="Tell us how we can help…"
                    rows={5}
                    required
                    maxLength={2000}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-11 px-7 font-semibold text-white shadow-lg"
                  style={{ backgroundColor: theme.primary }}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Map / directions */}
            <div className="lg:col-span-2">
              <SectionHeading
                align="left"
                eyebrow="Find Us"
                title="Getting to campus"
                description="We are located a short drive from the city centre, with visitor parking at the main gate."
              />
              <div
                className="relative mt-8 overflow-hidden rounded-2xl shadow-lg"
                style={{ background: `linear-gradient(135deg, ${theme.tint}, ${theme.tintStrong})` }}
              >
                {/* Decorative map-like grid */}
                <svg
                  className="absolute inset-0 h-full w-full opacity-40"
                  aria-hidden="true"
                  viewBox="0 0 400 300"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#93c5fd" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="400" height="300" fill="url(#grid)" />
                  <path d="M0 190 C 90 170, 150 230, 400 200" stroke="#60a5fa" strokeWidth="10" fill="none" opacity="0.55" />
                  <path d="M120 0 C 140 90, 90 180, 160 300" stroke="#60a5fa" strokeWidth="7" fill="none" opacity="0.45" />
                </svg>
                <div className="relative flex aspect-[4/3] flex-col items-center justify-center p-8 text-center">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <MapPin className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-bold text-slate-900">{identity.name}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {contact.address}
                    <br />
                    {contact.city}
                  </p>
                  <a
                    href={contact.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow transition-transform hover:scale-[1.03]"
                    style={{ backgroundColor: theme.primary }}
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
              <div className="mt-6 rounded-2xl p-5" style={{ backgroundColor: theme.tint }}>
                <p className="text-sm font-bold text-slate-900">School transport</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  School buses cover the main residential routes each morning and afternoon. Ask
                  the front office for the current route list and termly transport fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
