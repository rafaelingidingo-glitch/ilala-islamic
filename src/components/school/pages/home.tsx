'use client'

import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/school/shared'
import { schoolConfig, type PageId } from '@/config/school-config'
import { events, images, news, streams, testimonials } from '@/data/site-content'

interface HomePageProps {
  onNavigate: (page: PageId) => void
}

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { identity, theme, stats, contact } = schoolConfig
  const latestNews = news.slice(0, 3)
  const upcomingEvents = events.slice(0, 3)

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={images.hero}
            alt={`${identity.name} campus with students in the courtyard`}
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(100deg, ${theme.navy}f0 0%, ${theme.navy}c4 40%, ${theme.primary}66 100%)`,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-36">
          <div className="max-w-2xl">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white"
              style={{ backgroundColor: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(4px)' }}
            >
              <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
              {identity.type} · Est. {identity.established}
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Welcome to {identity.shortName} Secondary School
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/85 sm:text-xl">
              {identity.tagline}. We nurture Knowledge, Character and Excellence in every
              student — from Form 1 through Form 6 — on a modern, friendly campus.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => onNavigate('admissions')}
                className="h-12 px-7 text-[15px] font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
                style={{ backgroundColor: theme.primary }}
              >
                Apply for Admission
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('about')}
                className="h-12 bg-white/10 px-7 text-[15px] font-semibold text-white backdrop-blur hover:bg-white/20 hover:text-white"
              >
                Discover Our School
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Day & Boarding
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> 96% Pass Rate
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" aria-hidden="true" /> {contact.city.split(',')[0]}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS BAND ============ */}
      <section style={{ backgroundColor: theme.tint }} aria-label="School statistics">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold sm:text-4xl" style={{ color: theme.primary }}>
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ WELCOME ============ */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={images.students}
                alt="Students walking together on the school campus"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
            <div
              className="absolute -bottom-6 -right-2 hidden rounded-2xl p-5 text-white shadow-xl sm:block lg:-right-6"
              style={{ backgroundColor: theme.navy }}
            >
              <p className="text-3xl font-extrabold">{identity.established}</p>
              <p className="text-xs font-medium uppercase tracking-wider text-white/70">
                Founded & still growing
              </p>
            </div>
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why Brightfield"
              title="A school where every student is known, challenged and supported"
            />
            <p className="mt-5 leading-relaxed text-slate-600">
              For more than 25 years, {identity.name} has offered a warm, disciplined
              environment where strong academics go hand in hand with character formation. Our
              teachers know every student by name, track their progress monthly, and work in
              genuine partnership with parents.
            </p>
            <ul className="mt-6 space-y-3.5">
              {[
                'Proven results — 96% national exam pass rate, consistently top in the region',
                'Modern science labs, computer labs and a 10,000-book library',
                'Day and boarding options with supervised evening preps',
                'Over 15 clubs and 8 sports, so every talent finds a home',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2
                    className="mt-0.5 h-4.5 w-4.5 shrink-0"
                    style={{ color: theme.primary }}
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
            <Button
              onClick={() => onNavigate('about')}
              variant="outline"
              className="mt-8 border-2 font-semibold"
              style={{ borderColor: theme.primary, color: theme.primary }}
            >
              More About Us
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* ============ PROGRAMMES ============ */}
      <section className="py-20" style={{ backgroundColor: theme.tint }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Academic Programmes"
            title="Two clear pathways, one standard of excellence"
            description="From the four-year O-Level foundation to focused A-Level subject combinations, every programme is built around the national curriculum and university readiness."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {streams.map((stream) => (
              <Card
                key={stream.id}
                className="overflow-hidden border-0 pt-0 shadow-md transition-shadow hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={stream.image}
                    alt={stream.name}
                    className="aspect-[16/9] w-full object-cover"
                  />
                  <span
                    className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {stream.forms}
                  </span>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900">{stream.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{stream.summary}</p>
                  <Button
                    variant="link"
                    onClick={() => onNavigate('academics')}
                    className="mt-4 h-auto p-0 font-semibold"
                    style={{ color: theme.primary }}
                  >
                    Explore curriculum
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NEWS + EVENTS ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
            {/* News */}
            <div className="lg:col-span-2">
              <div className="flex items-end justify-between gap-4">
                <SectionHeading
                  align="left"
                  eyebrow="Latest News"
                  title="What's happening at school"
                />
                <Button
                  variant="ghost"
                  onClick={() => onNavigate('news')}
                  className="hidden shrink-0 font-semibold sm:inline-flex"
                  style={{ color: theme.primary }}
                >
                  All news
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {latestNews.map((item, idx) => (
                  <Card
                    key={item.id}
                    className={
                      idx === 0
                        ? 'overflow-hidden border-0 pt-0 shadow-md transition-shadow hover:shadow-xl sm:col-span-2'
                        : 'overflow-hidden border-0 pt-0 shadow-md transition-shadow hover:shadow-xl'
                    }
                  >
                    <div className={idx === 0 ? 'grid sm:grid-cols-2' : ''}>
                      <div className={idx === 0 ? 'relative h-full min-h-48' : 'relative'}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className={
                            idx === 0
                              ? 'absolute inset-0 h-full w-full object-cover'
                              : 'aspect-[16/9] w-full object-cover'
                          }
                        />
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2">
                          <Badge
                            className="border-0 text-white"
                            style={{ backgroundColor: theme.primary }}
                          >
                            {item.category}
                          </Badge>
                          <span className="text-xs text-slate-500">{formatDate(item.date)}</span>
                        </div>
                        <h3
                          className={
                            idx === 0
                              ? 'mt-3 text-lg font-bold leading-snug text-slate-900'
                              : 'mt-3 line-clamp-2 text-[15px] font-bold leading-snug text-slate-900'
                          }
                        >
                          {item.title}
                        </h3>
                        {idx === 0 && (
                          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                            {item.excerpt}
                          </p>
                        )}
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Events */}
            <div>
              <SectionHeading align="left" eyebrow="Upcoming Events" title="Mark your calendar" />
              <div className="mt-8 space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div
                      className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: theme.primary }}
                      aria-hidden="true"
                    >
                      <span className="text-lg font-extrabold leading-none">{event.day}</span>
                      <span className="text-[10px] font-bold tracking-wider">{event.month}</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold leading-snug text-slate-900">
                        {event.title}
                      </h3>
                      <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                        <CalendarDays className="h-3 w-3" aria-hidden="true" />
                        {event.time}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {event.location}
                      </p>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => onNavigate('news')}
                  className="w-full font-semibold"
                  style={{ borderColor: theme.primary, color: theme.primary }}
                >
                  View full calendar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIAL ============ */}
      <section className="py-20" style={{ backgroundColor: theme.tint }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Community"
            title="Trusted by students and parents"
            description="Real voices from the people who make our school what it is."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-0 shadow-md transition-shadow hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex gap-1" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4"
                        style={{ color: theme.primary }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.539 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.367 2.446c-.783.57-1.838-.196-1.538-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.285-3.958z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm leading-relaxed text-slate-700">
                    “{t.quote}”
                  </blockquote>
                  <div className="mt-5 flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ backgroundColor: theme.primaryDark }}
                      aria-hidden="true"
                    >
                      {t.initials}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: theme.navy }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(600px circle at 85% 30%, ${theme.accent}, transparent 55%)`,
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to join {identity.shortName}?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/75">
                Applications for the new academic year are open. Book a campus tour, meet our
                teachers, and see why families choose us year after year.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                onClick={() => onNavigate('admissions')}
                className="h-12 px-7 font-semibold text-white shadow-lg"
                style={{ backgroundColor: theme.primary }}
              >
                Start Your Application
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('contact')}
                className="h-12 bg-white/10 px-7 font-semibold text-white hover:bg-white/20 hover:text-white"
              >
                Book a Campus Tour
              </Button>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-8 text-sm text-white/70 lg:justify-between">
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" aria-hidden="true" /> O-Level & A-Level streams
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" aria-hidden="true" /> Day & boarding places available
            </span>
            <span className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" aria-hidden="true" /> Scholarships for top students
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
