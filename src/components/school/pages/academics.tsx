'use client'

import { Award, BookOpenCheck, CalendarCheck2, CheckCircle2, GraduationCap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageHero, SectionHeading } from '@/components/school/shared'
import { schoolConfig, type PageId } from '@/config/school-config'
import { departments, images, streams } from '@/data/site-content'

interface AcademicsPageProps {
  onNavigate: (page: PageId) => void
}

export function AcademicsPage({ onNavigate }: AcademicsPageProps) {
  const { theme, identity } = schoolConfig

  return (
    <div>
      <PageHero
        page="academics"
        onNavigate={onNavigate}
        title="Academics"
        description={`A rigorous national-curriculum programme from Form 1 to Form 6, taught by ${identity.shortName}'s team of 62 qualified and experienced teachers.`}
        image={images.classroom}
      />

      {/* STREAMS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Programmes"
            title="Two pathways to university & beyond"
            description="Whether starting Form 1 or joining Form 5, students follow a structured programme with clear goals, regular assessment and dedicated support."
          />
          {streams.map((stream, i) => (
            <div
              key={stream.id}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={stream.image}
                    alt={stream.name}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <span
                  className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: theme.primary }}
                >
                  {stream.forms}
                </span>
                <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  {stream.name}
                </h3>
                <p className="mt-4 leading-relaxed text-slate-600">{stream.summary}</p>
                <ul className="mt-6 space-y-3">
                  {stream.combinations.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2
                        className="mt-0.5 h-4.5 w-4.5 shrink-0"
                        style={{ color: theme.primary }}
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="py-20" style={{ backgroundColor: theme.tint }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Departments"
            title="Six strong departments, one team"
            description="Each department is led by a specialist head of department who monitors teaching quality, exam readiness and student progress."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => (
              <Card
                key={dept.id}
                className="border-0 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="p-6">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: theme.tintStrong, color: theme.primaryDark }}
                  >
                    <dept.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-bold text-slate-900">{dept.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{dept.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {dept.subjects.map((s) => (
                      <span
                        key={s}
                        className="rounded-full px-2.5 py-1 text-xs font-medium"
                        style={{ backgroundColor: theme.tint, color: theme.primaryDark }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Academic Results"
                title="Results that open doors"
              />
              <p className="mt-5 leading-relaxed text-slate-600">
                Our students consistently perform among the region&apos;s best in national
                examinations. Beyond the headline numbers, monthly assessments and detailed
                progress reports mean no student falls behind unnoticed — and extra clinics
                start the moment they do.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                {[
                  { value: '96%', label: 'CSEE pass rate (2025)' },
                  { value: '41%', label: 'Division One at CSEE' },
                  { value: '89%', label: 'ACSEE pass rate (2025)' },
                  { value: '312', label: 'University admissions since 2020' },
                ].map((r) => (
                  <div
                    key={r.label}
                    className="rounded-2xl border bg-white p-5 shadow-sm"
                  >
                    <p className="text-2xl font-extrabold sm:text-3xl" style={{ color: theme.primary }}>
                      {r.value}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">{r.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={images.labAlt}
                alt="Students during a science practical lesson"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STUDENT SUPPORT */}
      <section className="py-20" style={{ backgroundColor: theme.tint }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Beyond The Classroom"
            title="Support that keeps every student on track"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: BookOpenCheck,
                title: 'Study Clinics',
                description:
                  'Free after-school clinics in Mathematics, Sciences and English every week, led by subject teachers and senior students.',
              },
              {
                icon: CalendarCheck2,
                title: 'Monthly Progress Reports',
                description:
                  'Detailed reports on attendance, test scores and conduct — shared with parents through meetings and the school office.',
              },
              {
                icon: GraduationCap,
                title: 'University Guidance',
                description:
                  'Form 5–6 students receive one-on-one guidance on subject combinations, university applications and career paths.',
              },
            ].map((s) => (
              <Card key={s.title} className="border-0 shadow-md transition-shadow hover:shadow-xl">
                <CardContent className="p-6">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <s.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button
              size="lg"
              onClick={() => onNavigate('admissions')}
              className="h-12 px-7 font-semibold text-white shadow-lg"
              style={{ backgroundColor: theme.primary }}
            >
              <Award className="mr-2 h-5 w-5" aria-hidden="true" />
              Join Our Academic Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
