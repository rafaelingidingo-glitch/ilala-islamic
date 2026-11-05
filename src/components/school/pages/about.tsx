'use client'

import { Eye, HeartHandshake, Sparkles, Target } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { PageHero, SectionHeading } from '@/components/school/shared'
import { schoolConfig, type PageId } from '@/config/school-config'
import { facilities, images, staff } from '@/data/site-content'
import { useApiData } from '@/hooks/use-api-data'
import type { StaffDto } from '@/lib/types'

const values = [
  {
    icon: Sparkles,
    title: 'Excellence',
    description:
      'We set high academic standards and give every student the tools, coaching and encouragement to reach them.',
  },
  {
    icon: HeartHandshake,
    title: 'Integrity',
    description:
      'Honesty, respect and responsibility are practised daily — in class, on the sports field and in the community.',
  },
  {
    icon: Target,
    title: 'Discipline',
    description:
      'Clear routines and fair expectations create the calm, focused environment in which learning thrives.',
  },
  {
    icon: Eye,
    title: 'Service',
    description:
      'Students learn leadership by serving others — through community projects, peer tutoring and school duties.',
  },
]

export function AboutPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  const { identity, theme } = schoolConfig

  // Staff directory is managed from the admin panel; sample content is the
  // fallback while loading or when the database has no entries yet.
  const { data: staffList } = useApiData<StaffDto[]>('/api/staff', staff as unknown as StaffDto[])

  return (
    <div>
      <PageHero
        page="about"
        onNavigate={onNavigate}
        title="About Our School"
        description={`Since ${identity.established}, ${identity.name} has grown into one of the region's most trusted secondary schools — ${identity.type.toLowerCase()}.`}
        image={images.campusWide}
      />

      {/* OUR STORY */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Built on 28 years of steady excellence"
            />
            <div className="mt-5 space-y-4 leading-relaxed text-slate-600">
              <p>
                {identity.name} opened its gates in {identity.established} with just three
                classrooms, twelve teachers and 96 students. The founders — a group of educators
                and community leaders — shared one conviction: that disciplined, caring teaching
                transforms lives.
              </p>
              <p>
                Today the school serves over 1,250 students across O-Level and A-Level streams,
                with day and boarding options, modern laboratories and a teaching team of 62.
                Yet our founding conviction has not changed. Classes remain small enough for
                every student to be known, and progress is reported to parents every single
                month.
              </p>
              <p>
                Our alumni now study at universities across Tanzania and beyond, and work in
                medicine, engineering, law, education and business — a living proof of what a
                focused school community can achieve together.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src={images.campus}
              alt="The school's main building and courtyard"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
        </div>
      </section>

      {/* MISSION / VISION / MOTTO */}
      <section className="py-20" style={{ backgroundColor: theme.tint }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What Guides Us"
            title="Mission, vision & core values"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-md">
              <CardContent className="p-8">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: theme.primary }}
                >
                  <Target className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">Our Mission</h3>
                <p className="mt-2.5 leading-relaxed text-slate-600">
                  To provide quality secondary education that develops knowledgeable,
                  disciplined and compassionate young people, prepared to serve their
                  communities and compete globally.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-8">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: theme.primaryDark }}
                >
                  <Eye className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">Our Vision</h3>
                <p className="mt-2.5 leading-relaxed text-slate-600">
                  To be the region&apos;s most trusted secondary school — the first choice for
                  families who value academic excellence anchored in strong character.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Card
                key={v.title}
                className="border-0 shadow-md transition-transform hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <v.icon
                    className="h-7 w-7"
                    style={{ color: theme.primary }}
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-bold text-slate-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HEAD OF SCHOOL WELCOME */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="grid gap-8 p-8 sm:p-10 md:grid-cols-[auto_1fr] md:items-start">
              <div className="flex flex-col items-center gap-3">
                <span
                  className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-extrabold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
                  }}
                  aria-hidden="true"
                >
                  GM
                </span>
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-900">Dr. Grace Mwakalinga</p>
                  <p className="text-xs text-slate-500">Head of School</p>
                </div>
              </div>
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: theme.primary }}
                >
                  A Welcome From Our Head of School
                </p>
                <blockquote className="mt-3 space-y-3 leading-relaxed text-slate-600">
                  <p>
                    “Choosing a secondary school is one of the most important decisions a family
                    makes. At {identity.shortName}, we take that trust seriously. Our teachers
                    combine subject mastery with genuine care, and our results — a 96% national
                    exam pass rate — reflect a culture where effort is honoured and support is
                    always near.”
                  </p>
                  <p>
                    “Whether your child joins us as a day student or in boarding, they will be
                    known, challenged and celebrated here. I warmly invite you to visit our
                    campus and see this for yourself.”
                  </p>
                </blockquote>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* STAFF DIRECTORY */}
      <section className="py-20" style={{ backgroundColor: theme.tint }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Team"
            title="Meet the leadership & department heads"
            description="Qualified, experienced and genuinely invested in every student's success."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {staffList.map((member) => (
              <Card
                key={member.name}
                className="border-0 text-center shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="p-6">
                  <span
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-lg font-extrabold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
                    }}
                    aria-hidden="true"
                  >
                    {member.initials}
                  </span>
                  <h3 className="mt-4 font-bold text-slate-900">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium" style={{ color: theme.primary }}>
                    {member.role}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{member.department}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Campus & Facilities"
            title="Everything students need to learn and grow"
            description="A green, secure campus purpose-built for learning, sports and boarding life."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => (
              <Card key={f.id} className="overflow-hidden border-0 pt-0 shadow-md transition-shadow hover:shadow-xl">
                <div className="relative">
                  <img src={f.image} alt={f.name} className="aspect-[16/10] w-full object-cover" />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-slate-900">{f.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
