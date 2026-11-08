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
    name: 'Mzinga Secondary School',
    shortName: 'Mzinga High',
    initials: 'MHS',
    motto: 'Knowledge • Care • Excellence',
    tagline:
      'A strong foundation today, a brighter future tomorrow — quality O-Level (Form 1–4) and A-Level (Form 5–6, Arts) education in Mzinga Ward, Ilala, Dar es Salaam.',
    established: 2004,
    type:
      'Private Co-Educational Day & Boarding School — Ordinary Level (Forms 1–4) and Advanced Level (Forms 5–6)',
    description:
      'Mzinga Secondary School (also known as Mzinga High School) is a private, non-government co-educational school in the Mzinga ward of Ilala Municipal Council, Dar es Salaam, Tanzania. It welcomes both boys and girls as day and boarding students. The school has offered O-Level studies since 2004 and A-Level Arts combinations — HGL, HKL, HGE and HGK — since 2009. Fully registered with NECTA under Centre Number S1383 (school registration S.1339). O-Level subjects include Civics, History, English, Kiswahili, Geography, Physics, Chemistry, Biology, Basic Mathematics, Bookkeeping, Commerce and Computer Studies.',
  },

  // ---------------------------------------------------------------------------
  // 2. THEME — colours taken from the school logo (public/logo.jpg): gold,
  //  charcoal and silver. Change these hex values and the entire site re-colors.
  // ---------------------------------------------------------------------------
  theme: {
    primary: '#bd7a36', // main brand gold (buttons, links, highlights)
    primaryDark: '#9a5f26', // darker gold (hover states, heading accents)
    navy: '#3b3b3b', // charcoal (top bar, footer, hero overlay)
    tint: '#fdf9f1', // very light cream (section backgrounds)
    tintStrong: '#f7e8c9', // light gold (badges, chips, borders)
    ring: '#e2c58e', // focus ring gold
    accent: '#bd7a36', // gold accent (gradient details)
  },

  // ---------------------------------------------------------------------------
  // 3. CONTACT INFORMATION
  // ---------------------------------------------------------------------------
  contact: {
    address: 'Mwanagati Street, Mzinga Ward',
    city: 'Ilala Municipal Council, Dar es Salaam, Tanzania',
    postal: 'P.O. Box 25274, Dar es Salaam',
    phone: '+255 787 044 423',
    phoneAlt: '+255 766 795 190 / +255 713 329 683',
    whatsapp: '+255 787 044 423',
    email: 'admissions@mzingahighschool.ac.tz', // TODO: confirm the school's published email address before deploy
    admissionsEmail: 'admissions@mzingahighschool.ac.tz', // TODO: confirm before deploy
    officeHours: 'Monday – Friday: 7:30 AM – 4:30 PM',
    officeHoursWeekend: 'Saturday: 8:00 AM – 12:00 PM (Closed Sunday)',
    mapUrl:
      'https://maps.google.com/?q=Mzinga+Ward+Mwanagati+Kitunda+Ilala+Dar+es+Salaam+Tanzania',
    social: {
      instagram: 'https://www.instagram.com/mzingaschools',
    } as Record<string, string>,
  },

  // ---------------------------------------------------------------------------
  // 4. HEADLINE STATS (home page stat band)
  // ---------------------------------------------------------------------------
  stats: [
    { value: 'S1383', label: 'NECTA Centre Number' },
    { value: 'Form 1 → Form 6', label: 'O-Level & A-Level' },
    { value: 'HGL • HKL • HGE • HGK', label: 'A-Level Arts Combinations' },
    { value: 'Day & Boarding', label: 'Study Options' },
    { value: 'Co-Education', label: 'Boys & Girls' },
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
    classesOffered: ['Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5', 'Form 6'],
    /** Reference-number prefix, e.g. `MHS-2026-0001`. */
    referencePrefix: 'MHS',
  },

  // ---------------------------------------------------------------------------
  // 7. ADMIN PANEL (Phase 2)
  //    Staff manage news, events, staff directory and contact messages at the
  //    `/admin` view (or via the "Staff Login" link in the footer).
  //    CHANGE the password and secret before deploying for a real school!
  // ---------------------------------------------------------------------------
  admin: {
    /** Login password for the admin panel. */
    password: 'admin123', // TODO: change before deploying for a real school
    /** Secret used to sign session cookies — set a long random string. */
    secret: 'mzinga-secondary-template-secret-change-me-in-production',
    /** Display name shown in the admin top bar. */
    label: 'Mzinga Schools Website Administrator',
  },
}

export type SchoolConfig = typeof schoolConfig

/** Convenience: get a page label from its id. */
export function pageLabel(id: PageId): string {
  return schoolConfig.navigation.find((n) => n.id === id)?.label ?? 'Home'
}
