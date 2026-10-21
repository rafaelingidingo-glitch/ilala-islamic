'use client'

import { BedDouble, Dumbbell, Trophy, Users2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { PageHero, SectionHeading } from '@/components/school/shared'
import { schoolConfig, type PageId } from '@/config/school-config'
import { clubs, images, sportsList, testimonials } from '@/data/site-content'

interface StudentLifePageProps {
  onNavigate: (page: PageId) => void
}

export function StudentLifePage({ onNavigate }: StudentLifePageProps) {
  const { theme, identity } = schoolConfig

  return (
    <div>
      <PageHero
        page="student-life"
        onNavigate={onNavigate}
        title="Student Life"
        description={`Lessons are only half the story. Clubs, sports, houses and boarding life make ${identity.shortName} a place students genuinely enjoy.`}
        image={images.students}
      />

      {/* CLUBS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Clubs & Societies"
            title="Every interest finds a home"
            description="Each student joins at least one club per term. Clubs meet every Wednesday afternoon and are led by teachers with real passion for the activity."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {clubs.map((club) => (
              <Card
                key={club.id}
                className="border-0 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="p-6">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: theme.tintStrong, color: theme.primaryDark }}
                  >
                    <club.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-bold text-slate-900">{club.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{club.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SPORTS */}
      <section className="py-20" style={{ backgroundColor: theme.tint }}>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="order-2 lg:order-1">
            <SectionHeading
              align="left"
              eyebrow="Sports & Athletics"
              title="Healthy bodies, competitive spirit"
            />
            <p className="mt-5 leading-relaxed text-slate-600">
              Sport is compulsory for one double-period each week because we believe discipline,
              teamwork and fitness are learned on the field as much as in class. Our teams train
              after school and compete in inter-house, inter-school and regional tournaments
              throughout the year — including our reigning regional football title.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {sportsList.map((sport) => (
                <span
                  key={sport}
                  className="rounded-full border bg-white px-3.5 py-1.5 text-sm font-medium shadow-sm"
                  style={{ borderColor: theme.tintStrong, color: theme.primaryDark }}
                >
                  {sport}
                </span>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <Trophy className="h-6 w-6" style={{ color: theme.primary }} aria-hidden="true" />
                <p className="mt-2.5 text-sm font-bold text-slate-900">Regional Champions</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Senior football — 2025 inter-school championship
                </p>
              </div>
              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <Users2 className="h-6 w-6" style={{ color: theme.primary }} aria-hidden="true" />
                <p className="mt-2.5 text-sm font-bold text-slate-900">4 School Houses</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Friendly rivalry in sports, debate and academics
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={images.sports}
                alt="Students competing on the school sports field"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BOARDING LIFE */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={images.studentsAlt}
                alt="Students spending time together in the boarding community"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Boarding Life"
              title="A second home with structure and care"
            />
            <p className="mt-5 leading-relaxed text-slate-600">
              Our boarding houses are led by resident house parents who look after students
              around the clock. Evenings follow a calm rhythm — supper, supervised prep, and
              time for clubs or games before lights out. Weekend activities include sports,
              film evenings and supervised town trips.
            </p>
            <ul className="mt-6 space-y-3.5">
              {[
                'Resident house parents and night security on every corridor',
                'Supervised evening prep, Sunday to Friday',
                'Three balanced meals a day with a weekly menu',
                'On-site clinic and sick bay with a school nurse',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-slate-700">
                  <BedDouble
                    className="mt-0.5 h-4.5 w-4.5 shrink-0"
                    style={{ color: theme.primary }}
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* VOICES */}
      <section className="py-20" style={{ backgroundColor: theme.navy }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            eyebrow="Student & Parent Voices"
            title="What our community says"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl p-6"
                style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
              >
                <blockquote className="text-sm leading-relaxed text-white/85">
                  “{t.quote}”
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: theme.primary }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-white/60">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 p-8 sm:flex-row">
            <div className="flex items-center gap-4">
              <Dumbbell className="h-8 w-8" style={{ color: theme.accent }} aria-hidden="true" />
              <p className="max-w-md text-sm leading-relaxed text-white/80">
                Want your child to experience this community? Book a visit and see a normal
                school day in action.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: theme.primary }}
            >
              Book a Campus Tour
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
