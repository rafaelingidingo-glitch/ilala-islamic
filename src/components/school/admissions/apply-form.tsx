'use client'

/**
 * Online admission application — a four-step wizard rendered on the public
 * Admissions page. Each step validates before advancing; the server re-validates
 * everything with zod. On success the family receives a reference number
 * (e.g. `BS-2026-0001`) they can use in the status tracker.
 */

import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  Send,
  User,
  GraduationCap,
  Users,
  ClipboardCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { schoolConfig } from '@/config/school-config'
import { cn } from '@/lib/utils'

interface ApplyFormProps {
  onBack: () => void
  onTrack: (applicationNumber?: string) => void
}

interface FormState {
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: string
  gender: string
  entryClass: string
  boarding: string
  previousSchool: string
  examType: string
  examIndex: string
  examResults: string
  personalStatement: string
  parentName: string
  parentRelationship: string
  parentEmail: string
  parentPhone: string
  parentAddress: string
  notes: string
  declaration: boolean
}

const EMPTY_FORM: FormState = {
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  entryClass: '',
  boarding: 'Day',
  previousSchool: '',
  examType: '',
  examIndex: '',
  examResults: '',
  personalStatement: '',
  parentName: '',
  parentRelationship: '',
  parentEmail: '',
  parentPhone: '',
  parentAddress: '',
  notes: '',
  declaration: false,
}

const STEPS = [
  { title: 'Student', icon: User },
  { title: 'Academics', icon: GraduationCap },
  { title: 'Parent / Guardian', icon: Users },
  { title: 'Review & Submit', icon: ClipboardCheck },
] as const

/** National examination expected for each entry point. */
function examTypeFor(entryClass: string): string {
  if (entryClass === 'Form 1') return 'Standard Seven (PSLE)'
  if (entryClass === 'Form 5' || entryClass === 'Form 6') return 'CSEE'
  return 'CSEE / FTNA'
}

export function OnlineApplyForm({ onBack, onTrack }: ApplyFormProps) {
  const { theme, admissions, contact, identity } = schoolConfig
  const { toast } = useToast()

  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ applicationNumber: string; studentName: string } | null>(
    null
  )
  const [copied, setCopied] = useState(false)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      // Keep the expected national exam in sync with the chosen entry class.
      if (key === 'entryClass') next.examType = examTypeFor(String(value))
      return next
    })
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const examType = useMemo(
    () => form.examType || examTypeFor(form.entryClass),
    [form.examType, form.entryClass]
  )

  const validateStep = (index: number): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (index === 0) {
      if (form.firstName.trim().length < 2) e.firstName = 'First name is required'
      if (form.lastName.trim().length < 2) e.lastName = 'Last name is required'
      if (!form.dateOfBirth) e.dateOfBirth = 'Date of birth is required'
      if (!form.gender) e.gender = 'Please select a gender'
      if (!form.entryClass) e.entryClass = 'Please choose an entry class'
      if (form.previousSchool.trim().length < 2) e.previousSchool = 'Previous school is required'
    }
    if (index === 1) {
      if (form.examIndex.trim().length < 3) e.examIndex = 'Examination index number is required'
      if (form.examResults.trim().length < 2) e.examResults = 'Results summary is required'
    }
    if (index === 2) {
      if (form.parentName.trim().length < 3) e.parentName = 'Parent/guardian name is required'
      if (!form.parentRelationship) e.parentRelationship = 'Please choose the relationship'
      if (!/^\S+@\S+\.\S+$/.test(form.parentEmail.trim()))
        e.parentEmail = 'A valid email address is required'
      if (form.parentPhone.trim().length < 7) e.parentPhone = 'Phone number is required'
    }
    if (index === 3) {
      if (!form.declaration) e.declaration = 'Please confirm the declaration to submit'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const goNext = () => {
    if (!validateStep(step)) return
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    setErrors({})
    setStep((s) => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = async () => {
    if (!validateStep(3)) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          middleName: form.middleName.trim(),
          lastName: form.lastName.trim(),
          dateOfBirth: form.dateOfBirth,
          gender: form.gender,
          entryClass: form.entryClass,
          boarding: form.boarding,
          previousSchool: form.previousSchool.trim(),
          examType,
          examIndex: form.examIndex.trim(),
          examResults: form.examResults.trim(),
          personalStatement: form.personalStatement.trim(),
          parentName: form.parentName.trim(),
          parentRelationship: form.parentRelationship,
          parentEmail: form.parentEmail.trim(),
          parentPhone: form.parentPhone.trim(),
          parentAddress: form.parentAddress.trim(),
          notes: form.notes.trim(),
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || 'Submission failed')
      setResult(json.data)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      toast({
        title: 'Could not submit application',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const copyNumber = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result.applicationNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast({ description: 'Copy failed — please write the number down.' })
    }
  }

  // ---------------------------------------------------------------------------
  // Success screen
  // ---------------------------------------------------------------------------
  if (result) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border bg-white p-8 text-center shadow-lg sm:p-12">
          <span
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: theme.tint }}
          >
            <CheckCircle2 className="h-9 w-9" style={{ color: theme.primary }} aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Application submitted!
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Thank you, {result.studentName.split(' ')[0]}&apos;s application to join{' '}
            {identity.shortName} in <strong>{form.entryClass}</strong> for the{' '}
            {admissions.intakeYear} academic year has been received.
          </p>

          <div
            className="mt-8 rounded-2xl border-2 border-dashed p-5"
            style={{ borderColor: theme.tintStrong, backgroundColor: theme.tint }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Application reference number
            </p>
            <p
              className="mt-2 font-mono text-2xl font-extrabold tracking-wide sm:text-3xl"
              style={{ color: theme.primaryDark }}
            >
              {result.applicationNumber}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={copyNumber}
              className="mt-3 font-semibold"
            >
              {copied ? (
                <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
              ) : (
                <Copy className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              )}
              {copied ? 'Copied' : 'Copy number'}
            </Button>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Keep this number safe — you will need it (together with the parent email{' '}
              {form.parentEmail}) to track the application status.
            </p>
          </div>

          <div className="mt-8 text-left">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">
              What happens next?
            </h2>
            <ol className="mt-4 space-y-3">
              {[
                `Our admissions office reviews the application within 5 working days (a ${admissions.applicationFee} application fee is payable — we will send payment details to ${form.parentEmail}).`,
                'Shortlisted applicants are invited for an entrance assessment in English and Mathematics.',
                'Successful families attend a short interview, then receive an admission letter.',
                `Questions? Call us on ${contact.phone} or email ${contact.admissionsEmail}.`,
              ].map((line, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                    style={{ backgroundColor: theme.primary }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              onClick={() => onTrack(result.applicationNumber)}
              className="font-semibold text-white"
              style={{ backgroundColor: theme.primary }}
            >
              Track this application
            </Button>
            <Button variant="outline" onClick={onBack} className="font-semibold">
              Back to admissions info
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Wizard
  // ---------------------------------------------------------------------------
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
        style={{ color: theme.primary }}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to admissions overview
      </button>

      <div className="mt-6 rounded-3xl border bg-white shadow-md">
        {/* Stepper header */}
        <div className="border-b px-6 py-5 sm:px-8">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              Online Application — {admissions.intakeYear} Intake
            </h1>
            <span className="shrink-0 text-xs font-semibold text-slate-400">
              Step {step + 1} of {STEPS.length}
            </span>
          </div>
          <div className="mt-4 flex items-center" aria-hidden="true">
            {STEPS.map(({ title, icon: Icon }, i) => (
              <div key={title} className={cn('flex items-center', i > 0 && 'flex-1')}>
                {i > 0 && (
                  <span
                    className="mx-1 h-0.5 flex-1 rounded"
                    style={{ backgroundColor: i <= step ? theme.primary : theme.tintStrong }}
                  />
                )}
                <button
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  disabled={i > step}
                  aria-label={`Step ${i + 1}: ${title}`}
                  aria-current={i === step ? 'step' : undefined}
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors',
                    i < step && 'cursor-pointer',
                    i > step ? 'opacity-50' : ''
                  )}
                  style={{
                    backgroundColor: i <= step ? theme.primary : theme.tint,
                    color: i <= step ? '#fff' : theme.primaryDark,
                  }}
                >
                  {i < step ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </button>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs font-semibold text-slate-500" aria-live="polite">
            {STEPS[step].title}
          </p>
        </div>

        <div className="px-6 py-7 sm:px-8">
          {/* --- STEP 1: Student ------------------------------------------ */}
          {step === 0 && (
            <fieldset className="space-y-5">
              <legend className="sr-only">Student details</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="First name" required error={errors.firstName} htmlFor="firstName">
                  <Input
                    id="firstName"
                    value={form.firstName}
                    onChange={(e) => set('firstName', e.target.value)}
                    placeholder="e.g. Amina"
                    autoComplete="given-name"
                    aria-invalid={!!errors.firstName}
                  />
                </Field>
                <Field label="Middle name" error={errors.middleName} htmlFor="middleName">
                  <Input
                    id="middleName"
                    value={form.middleName}
                    onChange={(e) => set('middleName', e.target.value)}
                    placeholder="Optional"
                    autoComplete="additional-name"
                  />
                </Field>
                <Field label="Last name" required error={errors.lastName} htmlFor="lastName">
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={(e) => set('lastName', e.target.value)}
                    placeholder="e.g. Juma"
                    autoComplete="family-name"
                    aria-invalid={!!errors.lastName}
                  />
                </Field>
                <Field label="Date of birth" required error={errors.dateOfBirth} htmlFor="dateOfBirth">
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={form.dateOfBirth}
                    max={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => set('dateOfBirth', e.target.value)}
                    aria-invalid={!!errors.dateOfBirth}
                  />
                </Field>
                <Field label="Gender" required error={errors.gender} htmlFor="gender">
                  <Select value={form.gender} onValueChange={(v) => set('gender', v)}>
                    <SelectTrigger id="gender" aria-invalid={!!errors.gender}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Entry class" required error={errors.entryClass} htmlFor="entryClass">
                  <Select value={form.entryClass} onValueChange={(v) => set('entryClass', v)}>
                    <SelectTrigger id="entryClass" aria-invalid={!!errors.entryClass}>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {admissions.classesOffered.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Day or boarding" htmlFor="boarding">
                  <Select value={form.boarding} onValueChange={(v) => set('boarding', v)}>
                    <SelectTrigger id="boarding">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Day">Day student</SelectItem>
                      <SelectItem value="Boarding">Boarding student</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field
                  label="Previous / current school"
                  required
                  error={errors.previousSchool}
                  htmlFor="previousSchool"
                  className="sm:col-span-2"
                >
                  <Input
                    id="previousSchool"
                    value={form.previousSchool}
                    onChange={(e) => set('previousSchool', e.target.value)}
                    placeholder="Name of the school the student attends / last attended"
                    aria-invalid={!!errors.previousSchool}
                  />
                </Field>
              </div>
            </fieldset>
          )}

          {/* --- STEP 2: Academics ---------------------------------------- */}
          {step === 1 && (
            <fieldset className="space-y-5">
              <legend className="sr-only">Academic background</legend>
              <div
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{ backgroundColor: theme.tint }}
              >
                <GraduationCap
                  className="h-5 w-5 shrink-0"
                  style={{ color: theme.primary }}
                  aria-hidden="true"
                />
                <p className="text-sm text-slate-600">
                  National examination:{' '}
                  <strong className="text-slate-900">{examType || '—'}</strong>
                  <span className="block text-xs text-slate-500">
                    Based on the selected entry class ({form.entryClass || 'n/a'})
                  </span>
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Examination index number"
                  required
                  error={errors.examIndex}
                  htmlFor="examIndex"
                >
                  <Input
                    id="examIndex"
                    value={form.examIndex}
                    onChange={(e) => set('examIndex', e.target.value)}
                    placeholder="e.g. S0104/0056"
                    aria-invalid={!!errors.examIndex}
                  />
                </Field>
                <Field
                  label="Results summary"
                  required
                  error={errors.examResults}
                  htmlFor="examResults"
                >
                  <Input
                    id="examResults"
                    value={form.examResults}
                    onChange={(e) => set('examResults', e.target.value)}
                    placeholder="e.g. Division I, 17 points"
                    aria-invalid={!!errors.examResults}
                  />
                </Field>
              </div>
              <Field
                label="Personal statement"
                hint="Optional — half a page about the student's interests, strengths and goals."
                htmlFor="personalStatement"
              >
                <Textarea
                  id="personalStatement"
                  value={form.personalStatement}
                  onChange={(e) => set('personalStatement', e.target.value)}
                  rows={5}
                  maxLength={2000}
                  placeholder="Tell us about the student…"
                />
              </Field>
            </fieldset>
          )}

          {/* --- STEP 3: Parent / guardian --------------------------------- */}
          {step === 2 && (
            <fieldset className="space-y-5">
              <legend className="sr-only">Parent or guardian details</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Parent / guardian full name"
                  required
                  error={errors.parentName}
                  htmlFor="parentName"
                >
                  <Input
                    id="parentName"
                    value={form.parentName}
                    onChange={(e) => set('parentName', e.target.value)}
                    placeholder="e.g. Salma Juma"
                    autoComplete="name"
                    aria-invalid={!!errors.parentName}
                  />
                </Field>
                <Field
                  label="Relationship to student"
                  required
                  error={errors.parentRelationship}
                  htmlFor="parentRelationship"
                >
                  <Select
                    value={form.parentRelationship}
                    onValueChange={(v) => set('parentRelationship', v)}
                  >
                    <SelectTrigger id="parentRelationship" aria-invalid={!!errors.parentRelationship}>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mother">Mother</SelectItem>
                      <SelectItem value="Father">Father</SelectItem>
                      <SelectItem value="Guardian">Guardian</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field
                  label="Email address"
                  required
                  error={errors.parentEmail}
                  htmlFor="parentEmail"
                  hint="Status updates are sent here."
                >
                  <Input
                    id="parentEmail"
                    type="email"
                    value={form.parentEmail}
                    onChange={(e) => set('parentEmail', e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={!!errors.parentEmail}
                  />
                </Field>
                <Field label="Phone number" required error={errors.parentPhone} htmlFor="parentPhone">
                  <Input
                    id="parentPhone"
                    type="tel"
                    value={form.parentPhone}
                    onChange={(e) => set('parentPhone', e.target.value)}
                    placeholder="e.g. +255 712 345 678"
                    autoComplete="tel"
                    aria-invalid={!!errors.parentPhone}
                  />
                </Field>
                <Field label="Home address" htmlFor="parentAddress" className="sm:col-span-2">
                  <Input
                    id="parentAddress"
                    value={form.parentAddress}
                    onChange={(e) => set('parentAddress', e.target.value)}
                    placeholder="Street / area, city"
                    autoComplete="street-address"
                  />
                </Field>
                <Field
                  label="Anything else we should know?"
                  hint="Optional — how you heard about us, questions, or special needs."
                  htmlFor="notes"
                  className="sm:col-span-2"
                >
                  <Textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => set('notes', e.target.value)}
                    rows={3}
                    maxLength={1000}
                  />
                </Field>
              </div>
            </fieldset>
          )}

          {/* --- STEP 4: Review & submit ----------------------------------- */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <ReviewBlock title="Student">
                  <ReviewRow label="Name" value={[form.firstName, form.middleName, form.lastName].filter(Boolean).join(' ')} />
                  <ReviewRow label="Date of birth" value={form.dateOfBirth} />
                  <ReviewRow label="Gender" value={form.gender} />
                  <ReviewRow label="Entry class" value={`${form.entryClass} · ${form.boarding}`} />
                  <ReviewRow label="Previous school" value={form.previousSchool} />
                </ReviewBlock>
                <ReviewBlock title="Academics">
                  <ReviewRow label="Examination" value={examType} />
                  <ReviewRow label="Index number" value={form.examIndex} />
                  <ReviewRow label="Results" value={form.examResults} />
                  {form.personalStatement && (
                    <ReviewRow
                      label="Personal statement"
                      value={
                        form.personalStatement.length > 120
                          ? form.personalStatement.slice(0, 120) + '…'
                          : form.personalStatement
                      }
                    />
                  )}
                </ReviewBlock>
                <ReviewBlock title="Parent / Guardian" className="sm:col-span-2">
                  <div className="grid gap-x-6 sm:grid-cols-2">
                    <ReviewRow label="Name" value={`${form.parentName} (${form.parentRelationship})`} />
                    <ReviewRow label="Email" value={form.parentEmail} />
                    <ReviewRow label="Phone" value={form.parentPhone} />
                    {form.parentAddress && <ReviewRow label="Address" value={form.parentAddress} />}
                  </div>
                </ReviewBlock>
              </div>

              <div
                className="rounded-xl px-4 py-3 text-sm leading-relaxed text-slate-600"
                style={{ backgroundColor: theme.tint }}
              >
                A non-refundable application fee of{' '}
                <strong className="text-slate-900">{admissions.applicationFee}</strong> applies. Our
                admissions office will email payment and assessment details to{' '}
                <strong className="text-slate-900">{form.parentEmail}</strong> after this submission.
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="declaration"
                  className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-700"
                >
                  <Checkbox
                    id="declaration"
                    checked={form.declaration}
                    onCheckedChange={(v) => set('declaration', v === true)}
                    aria-invalid={!!errors.declaration}
                    className="mt-0.5"
                  />
                  <span>
                    I confirm that the information provided is true and accurate, and I agree to{' '}
                    {identity.shortName}&apos;s admissions terms, including the{' '}
                    {admissions.applicationFee} application fee.
                  </span>
                </label>
                {errors.declaration && (
                  <p className="text-sm font-medium text-red-600" role="alert">
                    {errors.declaration}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer navigation */}
        <div className="flex items-center justify-between gap-3 border-t bg-slate-50/60 px-6 py-4 sm:px-8">
          <Button
            variant="ghost"
            onClick={goBack}
            disabled={step === 0 || submitting}
            className="font-semibold"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" />
            {step === 0 ? 'Cancel' : 'Back'}
          </Button>
          {step < STEPS.length - 1 ? (
            <Button
              onClick={goNext}
              className="font-semibold text-white"
              style={{ backgroundColor: theme.primary }}
            >
              Continue <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </Button>
          ) : (
            <Button
              onClick={submit}
              disabled={submitting}
              className="font-semibold text-white"
              style={{ backgroundColor: theme.primary }}
            >
              {submitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="mr-1.5 h-4 w-4" aria-hidden="true" />
              )}
              Submit application
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Small building blocks                                                      */
/* -------------------------------------------------------------------------- */

function Field({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
  className,
}: {
  label: string
  htmlFor?: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={htmlFor} className="text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
      {error && (
        <p className="text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

function ReviewBlock({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  const { theme } = schoolConfig
  return (
    <div className={cn('rounded-xl border bg-slate-50/60 p-4', className)}>
      <p
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: theme.primary }}
      >
        {title}
      </p>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-sm">
      <span className="text-slate-500">{label}: </span>
      <span className="font-medium text-slate-900">{value || '—'}</span>
    </div>
  )
}
