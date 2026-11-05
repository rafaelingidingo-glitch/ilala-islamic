/**
 * ============================================================================
 *  SCHOOL WEBSITE TEMPLATE — CENTRAL CONFIGURATION
 * ============================================================================
 *  This is the ONLY file a school needs to edit to rebrand the website.
 *  Everything below (name, motto, colors, contact details, stats) is applied
 *  site-wide automatically — no need to touch any component code.
 *
 *  HOW TO CUSTOMIZE FOR A NEW SCHOOL:
 *    1. Update `identity`  → school name, motto, description
 *    2. Update `theme`     → brand colors (applied site-wide via CSS vars)
 *    3. Update `contact`   → address, phone, email, social links
 *    4. Update `stats`     → headline numbers shown on the home page
 *    5. Replace sample content in `src/data/site-content.ts`
 *    6. Swap image URLs    → point them at the school's own photos
 * ============================================================================
 */

/** Pages available in the site navigation (single-page app routing). */
export type PageId =
  | 'home'
  | 'about'
  | 'academics'
  | 'admissions'
  | 'news'
  | 'student-life'
  | 'contact'
  | 'admin'

export interface NavItem {
  id: PageId
  label: string
}

export interface StatItem {
  value: string
  label: string
}

export const schoolConfig = {
  // ---------------------------------------------------------------------------
  // 1. SCHOOL IDENTITY
  // ---------------------------------------------------------------------------
  identity: {
    name: 'Brightfield Secondary School',
    shortName: 'Brightfield',
    initials: 'BS',
    motto: 'Knowledge • Character • Excellence',
    tagline: 'A modern secondary school where every student thrives',
    established: 1998,
    type: 'O-Level & A-Level Secondary School',
    description:
      'Brightfield Secondary School is a leading co-educational day and boarding school offering O-Level and A-Level education. For over 25 years we have combined academic excellence, strong character formation and modern facilities to prepare students for university and beyond.',
  },

  // ---------------------------------------------------------------------------
  // 2. THEME — brand colors applied across the whole site (white & blue)
  //    Change these hex values and the entire site re-colors itself.
  // ---------------------------------------------------------------------------
  theme: {
    primary: '#2563eb', // main brand blue (buttons, links, highlights)
    primaryDark: '#1e40af', // darker blue (hover states, heading accents)
    navy: '#0f2557', // deep navy (top bar, footer, hero overlay)
    tint: '#eff6ff', // very light blue (section backgrounds)
    tintStrong: '#dbeafe', // light blue (badges, chips, borders)
    ring: '#93c5fd', // focus ring blue
    accent: '#38bdf8', // sky accent (gradient details)
  },

  // ---------------------------------------------------------------------------
  // 3. CONTACT INFORMATION
  // ---------------------------------------------------------------------------
  contact: {
    address: 'Plot 42, Education Road, Mikocheni',
    city: 'Dar es Salaam, Tanzania',
    postal: 'P.O. Box 12345',
    phone: '+255 712 345 678',
    phoneAlt: '+255 754 987 654',
    email: 'info@brightfield.ac.tz',
    admissionsEmail: 'admissions@brightfield.ac.tz',
    officeHours: 'Monday – Friday: 7:30 AM – 4:30 PM',
    officeHoursWeekend: 'Saturday: 8:00 AM – 12:00 PM (Closed Sunday)',
    mapUrl: 'https://maps.google.com/?q=Mikocheni+Dar+es+Salaam',
    social: {
      facebook: 'https://facebook.com/brightfield',
      instagram: 'https://instagram.com/brightfield',
      twitter: 'https://x.com/brightfield',
      youtube: 'https://youtube.com/@brightfield',
    } as Record<string, string>,
  },

  // ---------------------------------------------------------------------------
  // 4. HEADLINE STATS (home page stat band)
  // ---------------------------------------------------------------------------
  stats: [
    { value: '1,250+', label: 'Students Enrolled' },
    { value: '62', label: 'Qualified Teachers' },
    { value: '96%', label: 'National Exam Pass Rate' },
    { value: '28', label: 'Years of Excellence' },
  ] as StatItem[],

  // ---------------------------------------------------------------------------
  // 5. NAVIGATION (order shown in header & footer)
  // ---------------------------------------------------------------------------
  navigation: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'academics', label: 'Academics' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'news', label: 'News & Events' },
    { id: 'student-life', label: 'Student Life' },
    { id: 'contact', label: 'Contact' },
  ] as NavItem[],

  // ---------------------------------------------------------------------------
  // 6. ONLINE ADMISSIONS
  //    Controls the online application form on the Admissions page and the
  //    applicant status tracker. Turn `onlineApplicationsOpen` off to close
  //    intake (the form shows a "closed" notice) without touching code.
  // ---------------------------------------------------------------------------
  admissions: {
    /** Master switch for the online application form. */
    onlineApplicationsOpen: true,
    /** Academic year applicants are applying to join. */
    intakeYear: 2026,
    /** Application window (shown to parents as guidance). */
    opensOn: '2026-01-05',
    closesOn: '2026-09-30',
    /** Non-refundable application processing fee, shown before submission. */
    applicationFee: 'TZS 10,000',
    /** Classes open for online application (Select options in the form). */
    classesOffered: ['Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5', 'Form 6'],
    /** Reference-number prefix, e.g. `BS-2026-0001`. */
    referencePrefix: 'BS',
  },

  // ---------------------------------------------------------------------------
  // 7. ADMIN PANEL (Phase 2)
  //    Staff manage news, events, staff directory and contact messages at the
  //    `/admin` view (or via the "Staff Login" link in the footer).
  //    ⚠ CHANGE the password and secret before deploying for a real school!
  // ---------------------------------------------------------------------------
  admin: {
    /** Login password for the admin panel. */
    password: 'admin123',
    /** Secret used to sign session cookies — set a long random string. */
    secret: 'brightfield-template-secret-change-me-in-production',
    /** Display name shown in the admin top bar. */
    label: 'Website Administrator',
  },
}

export type SchoolConfig = typeof schoolConfig

/** Convenience: get a page label from its id. */
export function pageLabel(id: PageId): string {
  return schoolConfig.navigation.find((n) => n.id === id)?.label ?? 'Home'
}
