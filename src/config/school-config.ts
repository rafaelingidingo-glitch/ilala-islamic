/**
 * ============================================================================
 *  SCHOOL WEBSITE TEMPLATE — CENTRAL CONFIGURATION
 * ============================================================================
 *  This is the ONLY file a school needs to edit to rebrand the website.
 *  Everything below (name, motto, colors, contact details, stats) is applied
 *  site-wide automatically — no need to touch any component code.
 *
 *  HOW TO CUSTOMIZE FOR A NEW SCHOOL:
 *    1. Update `identity`  -> school name, motto, description
 *    2. Update `theme`     -> brand colors (applied site-wide via CSS vars)
 *    3. Update `contact`   -> address, phone, email, social links
 *    4. Update `stats`     -> headline numbers shown on the home page
 *    5. Replace sample content in `src/data/site-content.ts`
 *    6. Swap image URLs    -> point them at the school's own photos
 *    7. VERIFY BEFORE DEPLOY: founding year, application fee, admin password
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
    name: 'Ilala Islamic Secondary School',
    shortName: 'Ilala Islamic',
    initials: 'IIS',
    motto: 'Elimu Bora • Malezi ya Kiislamu',
    tagline:
      'Quality education and excellent Islamic upbringing — from Nursery to Form 6.',
    established: 2000, // TODO: confirm the school's founding year
    type:
      'Private Islamic Day & Boarding School — Mixed Secondary Wing (Boys & Girls, Forms 1–6)',
    description:
      'Ilala Islamic Secondary School is a private, non-government Islamic institution in the Amana area of Ilala Ward, Dar es Salaam. Fully registered with NECTA under Centre Number S2348, we offer day (kutwa) and boarding (bweni) options from Nursery through Form 6, combining the Tanzanian national curriculum with specialised Islamic studies.',
  },

  // ---------------------------------------------------------------------------
  // 2. THEME — Islamic green & gold, applied across the whole site
  //    Change these hex values and the entire site re-colors itself.
  // ---------------------------------------------------------------------------
  theme: {
    primary: '#065f46', // main brand green (buttons, links, highlights)
    primaryDark: '#064e3b', // darker green (hover states, heading accents)
    navy: '#022c22', // deep green-black (top bar, footer, hero overlay)
    tint: '#f0fdf4', // very light green (section backgrounds)
    tintStrong: '#dcfce7', // light green (badges, chips, borders)
    ring: '#86efac', // focus ring green
    accent: '#d97706', // amber/gold accent (gradient details)
  },

  // ---------------------------------------------------------------------------
  // 3. CONTACT INFORMATION
  // ---------------------------------------------------------------------------
  contact: {
    address: 'Amana area, Ilala Ward',
    city: 'Dar es Salaam City Council, Tanzania',
    postal: 'P.O. Box, Ilala',
    phone: '+255 676 332 703',
    phoneAlt: '+255 713 007 586 / +255 714 687 203',
    whatsapp: '+255 745 000 006',
    email: 'ilalaislamic@gmail.com',
    admissionsEmail: 'ilalaislamic@gmail.com',
    officeHours: 'Monday – Friday: 7:30 AM – 4:30 PM',
    officeHoursWeekend: 'Saturday: 8:00 AM – 12:00 PM (Closed Sunday)',
    mapUrl: 'https://maps.google.com/?q=Amana+Ilala+Dar+es+Salaam',
    social: {
      facebook: 'https://www.facebook.com/IlalaIslamicSecondarySchool',
      instagram: 'https://www.instagram.com/ilala_islamic_secondary',
    } as Record<string, string>,
  },

  // ---------------------------------------------------------------------------
  // 4. HEADLINE STATS (home page stat band)
  // ---------------------------------------------------------------------------
  stats: [
    { value: 'Nursery → Form 6', label: 'Full Education Tier' },
    { value: 'S2348', label: 'NECTA Centre Number' },
    { value: 'Mixed', label: 'Secondary Wing (Boys & Girls, Forms 1–6)' },
    { value: 'Day & Boarding', label: 'Study Options' },
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
    applicationFee: 'TZS 10,000', // TODO: confirm actual application fee
    /** Classes open for online application (Select options in the form). */
    classesOffered: [
      'Nursery',
      'Primary',
      'Form 1',
      'Form 2',
      'Form 3',
      'Form 4',
      'Form 5',
      'Form 6',
    ],
    /** Reference-number prefix, e.g. `IIS-2026-0001`. */
    referencePrefix: 'IIS',
  },

  // ---------------------------------------------------------------------------
  // 7. ADMIN PANEL (Phase 2)
  //    Staff manage news, events, staff directory and contact messages at the
  //    `/admin` view (or via the "Staff Login" link in the footer).
  //    CHANGE the password and secret before deploying for a real school!
  // ---------------------------------------------------------------------------
  admin: {
    /** Login password for the admin panel. */
    password: 'admin123',
    /** Secret used to sign session cookies — set a long random string. */
    secret: 'ilala-islamic-template-secret-change-me-in-production',
    /** Display name shown in the admin top bar. */
    label: 'Website Administrator',
  },
}

export type SchoolConfig = typeof schoolConfig

/** Convenience: get a page label from its id. */
export function pageLabel(id: PageId): string {
  return schoolConfig.navigation.find((n) => n.id === id)?.label ?? 'Home'
}
