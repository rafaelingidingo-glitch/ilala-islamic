'use client'

import { FileText, HelpCircle } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { PageHero, SectionHeading } from '@/components/school/shared'
import { schoolConfig, type PageId } from '@/config/school-config'
import {
  admissionSteps,
  faqs,
  feeStructure,
  images,
  requirementsForm1,
  requirementsForm5,
} from '@/data/site-content'

interface AdmissionsPageProps {
  onNavigate: (page: PageId) => void
}

export function AdmissionsPage({ onNavigate }: AdmissionsPageProps) {
  const { theme, contact, identity } = schoolConfig

  return (
    <div>
      <PageHero
        page="admissions"
        onNavigate={onNavigate}
        title="Admissions"
        description={`Joining ${identity.shortName} is a simple four-step process. Places are offered on a rolling basis — early applications are encouraged.`}
        image={images.studentsAlt}
      />

      {/* STEPS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How To Apply"
            title="Four simple steps to enrolment"
            description="From application to the first day of school, our admissions office guides your family through every stage."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {admissionSteps.map((step) => (
              <div key={step.step} className="relative">
                <Card className="h-full border-0 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                  <CardContent className="p-6">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full text-base font-extrabold text-white"
                      style={{ backgroundColor: theme.primary }}
                      aria-hidden="true"
                    >
                      {step.step}
                    </span>
                    <h3 className="mt-4 font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                {step.step < admissionSteps.length && (
                  <span
                    className="absolute -right-4 top-1/2 hidden h-0.5 w-4 -translate-y-1/2 lg:block"
                    style={{ backgroundColor: theme.tintStrong }}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="py-20" style={{ backgroundColor: theme.tint }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Checklist"
            title="What you'll need to apply"
            description="Gather these documents before starting your application — it makes the process faster for everyone."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Card className="border-0 shadow-md">
              <CardContent className="p-8">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <FileText className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">Form 1 Entry</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {requirementsForm1.map((req) => (
                    <li key={req} className="flex items-start gap-3 text-sm text-slate-700">
                      <span
                        className="mt-1 h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: theme.primary }}
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-8">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
                    style={{ backgroundColor: theme.primaryDark }}
                  >
                    <FileText className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">Form 5 Entry</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {requirementsForm5.map((req) => (
                    <li key={req} className="flex items-start gap-3 text-sm text-slate-700">
                      <span
                        className="mt-1 h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: theme.primaryDark }}
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FEES */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Fees Structure"
            title="Transparent fees, per academic year"
            description="Fees cover tuition, internal examinations and core learning materials. Payment plans in up to three instalments are available."
          />
          <Card className="mt-12 overflow-hidden border shadow-md">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: theme.navy }}>
                    <TableHead className="rounded-tl-lg text-white">Level</TableHead>
                    <TableHead className="text-white">Tuition (per year)</TableHead>
                    <TableHead className="text-white">Boarding (optional)</TableHead>
                    <TableHead className="rounded-tr-lg text-white">Other charges</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feeStructure.map((row, i) => (
                    <TableRow
                      key={row.level}
                      className={i % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'}
                    >
                      <TableCell className="font-semibold text-slate-900">{row.level}</TableCell>
                      <TableCell>{row.tuition}</TableCell>
                      <TableCell>{row.boarding}</TableCell>
                      <TableCell>{row.other}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <p className="mt-4 text-center text-xs text-slate-500">
            * Other charges include uniforms, internal exams and activities. Scholarships and
            bursaries are available — see the FAQ below.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ backgroundColor: theme.tint }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Questions?"
            title="Frequently asked questions"
            description="Can't find your answer here? Our admissions office replies within one working day."
          />
          <div className="mt-10">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${i}`}
                  className="rounded-xl border bg-white px-5 shadow-sm"
                >
                  <AccordionTrigger className="py-4 text-left text-[15px] font-semibold text-slate-900 hover:no-underline">
                    <span className="flex items-center gap-2.5">
                      <HelpCircle
                        className="h-4.5 w-4.5 shrink-0"
                        style={{ color: theme.primary }}
                        aria-hidden="true"
                      />
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pl-7 leading-relaxed text-slate-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="mt-10 rounded-2xl p-8 text-center" style={{ backgroundColor: theme.navy }}>
            <h3 className="text-xl font-bold text-white">Still have questions?</h3>
            <p className="mt-2 text-sm text-white/75">
              Talk to our admissions officer, Mrs. Rehema Saleh — she&apos;ll be happy to help.
            </p>
            <p className="mt-1 text-sm font-semibold text-white">{contact.admissionsEmail}</p>
            <Button
              onClick={() => onNavigate('contact')}
              className="mt-5 font-semibold text-white"
              style={{ backgroundColor: theme.primary }}
            >
              Contact Admissions
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
