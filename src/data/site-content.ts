/**
 * ============================================================================
 *  SITE CONTENT — MZINGA SECONDARY SCHOOL (MZINGA HIGH SCHOOL)
 * ============================================================================
 *  All page content lives here (news, events, staff, departments, streams,
 *  admission steps, fees, FAQs, clubs, facilities, testimonials, gallery).
 *  Replace these arrays with the school's own content — the pages render
 *  whatever is here, so no component code needs to change.
 *  Image URLs below are demo photos; point them at Mzinga's own photos.
 * ============================================================================
 */
import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  Briefcase,
  Calculator,
  FlaskConical,
  Globe2,
  Laptop,
  Music2,
  ScrollText,
  Shield,
  Users,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// IMAGES (demo photos — replace with Mzinga's own)
// ---------------------------------------------------------------------------
export const images = {
  hero: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/48a840a1ca9c.jpg',
  campusWide: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4f3dc0db4c29.jpg',
  campus: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b30c074c5585.jpg',
  classroom: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b9174167f2da.jpg',
  classroomAlt: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4cd56787c846.jpg',
  lab: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/21f2a9d29252.jpg',
  labAlt: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4a404b7b8027.webp',
  library: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/16711d9fbe33.jpg',
  libraryAlt: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/596926a758fb.jpg',
  sports: '/school-football.png',
  sportsAlt: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/30ef50260f95.jpg',
  students: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a8f39746c455.jpg',
  studentsAlt: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9ba5e03f8735.jpg',
  studentsGroup: '/school-graduation.png',
  assembly: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a5ac0a8a7d2f.jpg',
  building: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/fa0abd0a6ece.jpg',
  computerLab: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c673e3eb4b98.jpg',
}

// ---------------------------------------------------------------------------
// NEWS
// ---------------------------------------------------------------------------
export interface NewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  image: string
  featured?: boolean
}

export const news: NewsItem[] = [
  {
    id: 'n1',
    title: 'Mzinga Secondary School Posts Strong 2025 NECTA Results',
    excerpt:
      'Our Form Four candidates posted strong results in the 2025 Certificate of Secondary Education Examination at NECTA Centre S1383 — CSEE 2025 recorded a 100% pass rate, with 56 of 58 candidates passing. This reflects the commitment of our students, teachers and parents.',
    date: '2026-02-10',
    category: 'Academics',
    image: images.classroom,
    featured: true,
  },
  {
    id: 'n2',
    title: 'Form Four 2026 Candidates Sit National Examinations',
    excerpt:
      '\u201cMay success be upon you class four 2026 on your National Examinations.\u201d We wish all our Form Four candidates the very best as they sit the CSEE examinations.',
    date: '2026-10-04',
    category: 'Academics',
    image: images.classroomAlt,
  },
  {
    id: 'n3',
    title: 'Welcome to Mzinga Schools 2027',
    excerpt:
      '\u201cA strong foundation today, a brighter future tomorrow. Welcome to Mzinga Schools 2027 — where learning meets care, confidence and excellence.\u201d Applications are now open.',
    date: '2026-09-16',
    category: 'Announcement',
    image: images.campus,
  },
  {
    id: 'n4',
    title: 'Boarding Students Excel in Mid-Term Assessments',
    excerpt:
      'Our boarding (bweni) students recorded strong results in the mid-term assessments, with supervised evening prep supporting their success.',
    date: '2026-03-02',
    category: 'Boarding',
    image: images.students,
  },
  {
    id: 'n5',
    title: 'Open Day for Prospective Parents',
    excerpt:
      'Visit the Mzinga campus, meet the teachers and learn about our day and boarding options, O-Level subjects and A-Level Arts combinations (HGL, HKL, HGE, HGK).',
    date: '2026-04-10',
    category: 'Admissions',
    image: images.building,
  },
]

// ---------------------------------------------------------------------------
// EVENTS
// ---------------------------------------------------------------------------
export interface EventItem {
  id: string
  title: string
  description: string
  location: string
  time: string
  category: string
  published: boolean
  startDate: string
}

export const events: EventItem[] = [
  {
    id: 'e1',
    title: 'CSEE Mock Examinations (Form 4)',
    description:
      'Form 4 candidates sit mock examinations in preparation for the NECTA Certificate of Secondary Education Examination.',
    location: 'Examination Hall, Mzinga Campus',
    time: '8:00 AM – 4:00 PM',
    category: 'Examinations',
    published: true,
    startDate: '2026-07-01',
  },
  {
    id: 'e2',
    title: 'Inter-House Sports Day',
    description:
      'Football, volleyball and athletics competitions between the school houses.',
    location: 'School Sports Ground',
    time: '8:00 AM – 4:00 PM',
    category: 'Sports',
    published: true,
    startDate: '2026-02-28',
  },
  {
    id: 'e3',
    title: 'Form Six Graduation Ceremony',
    description:
      'Celebration of the Form Six graduating class with awards and speeches.',
    location: 'Main Hall & Gardens',
    time: '10:00 AM – 2:00 PM',
    category: 'Ceremony',
    published: true,
    startDate: '2026-03-20',
  },
  {
    id: 'e4',
    title: 'Open Day for Prospective Parents',
    description:
      'Visit the campus, meet the teachers and learn about day and boarding options.',
    location: 'Admissions Office, Mzinga Ward',
    time: '9:00 AM – 3:00 PM',
    category: 'Admissions',
    published: true,
    startDate: '2026-04-10',
  },
  {
    id: 'e5',
    title: 'A-Level Arts Combination Orientation',
    description:
      'Guidance for Form 4 leavers on the Arts combinations HGL, HKL, HGE and HGK for Form 5.',
    location: 'Multipurpose Hall',
    time: '9:00 AM – 12:00 PM',
    category: 'Academics',
    published: true,
    startDate: '2026-01-15',
  },
]
// ---------------------------------------------------------------------------
// STAFF
// ---------------------------------------------------------------------------
export interface StaffMember {
  name: string
  role: string
  department: string
  initials: string
}

export const staff: StaffMember[] = [
  { name: 'Mr. Juma Mzinga', role: 'Head of School', department: 'Administration', initials: 'JM' },
  { name: 'Ms. Rehema Omari', role: 'Deputy Head Academics', department: 'Administration', initials: 'RO' },
  { name: 'Mr. Salim Nassor', role: 'Head of Languages', department: 'Languages', initials: 'SN' },
  { name: 'Ms. Zainab Ali', role: 'Head of Humanities', department: 'Humanities', initials: 'ZA' },
  { name: 'Mr. Daudi Thomas', role: 'Head of Sciences', department: 'Sciences', initials: 'DT' },
  { name: 'Mrs. Amina Salim', role: 'Head of Commerce & ICT', department: 'Commerce & Business', initials: 'AS' },
  { name: 'Mr. Kelvin Peter', role: 'Admissions & Boarding Officer', department: 'Administration', initials: 'KP' },
]

// ---------------------------------------------------------------------------
// DEPARTMENTS & SUBJECTS
// ---------------------------------------------------------------------------
export interface Department {
  id: string
  name: string
  icon: LucideIcon
  description: string
  subjects: string[]
}

export const departments: Department[] = [
  {
    id: 'languages',
    name: 'Languages',
    icon: Globe2,
    description:
      'Fluency in English and Kiswahili — the medium of instruction and the national language.',
    subjects: ['English Language', 'Kiswahili'],
  },
  {
    id: 'humanities',
    name: 'Humanities',
    icon: ScrollText,
    description:
      'Civics, History and Geography — building informed and responsible citizens.',
    subjects: ['Civics', 'History', 'Geography'],
  },
  {
    id: 'sciences',
    name: 'Sciences',
    icon: FlaskConical,
    description:
      'Practical, laboratory-based science: Physics, Chemistry, Biology and Basic Mathematics.',
    subjects: ['Physics', 'Chemistry', 'Biology', 'Basic Mathematics'],
  },
  {
    id: 'commerce',
    name: 'Commerce & Business',
    icon: Briefcase,
    description:
      'Practical trade, book-keeping and business skills for future entrepreneurs.',
    subjects: ['Commerce', 'Book-Keeping'],
  },
  {
    id: 'ict',
    name: 'ICT & Computer Studies',
    icon: Laptop,
    description:
      'Digital literacy and computing skills for the modern world.',
    subjects: ['Computer Studies'],
  },
  {
    id: 'a-level-arts',
    name: 'Advanced Level (Arts)',
    icon: BookOpen,
    description:
      'Form 5–6 Arts combinations — HGL, HKL, HGE and HGK — preparing students for university.',
    subjects: ['History', 'Geography', 'Kiswahili', 'English Language'],
  },
]

// ---------------------------------------------------------------------------
// STREAMS / PROGRAMMES
// ---------------------------------------------------------------------------
export interface Stream {
  id: string
  name: string
  forms: string
  summary: string
  combinations: string[]
  image: string
}

export const streams: Stream[] = [
  {
    id: 'o-level',
    name: 'Ordinary Level (Form 1 – 4)',
    forms: 'Form 1 – 4',
    summary:
      'Students follow the Tanzanian national curriculum. Subjects include Civics, History, English, Kiswahili, Geography, Physics, Chemistry, Biology, Basic Mathematics, Bookkeeping, Commerce and Computer Studies, leading to the Certificate of Secondary Education Examination (CSEE) at NECTA Centre S1383.',
    combinations: [
      'Core: Civics, History, English, Kiswahili, Geography, Physics, Chemistry, Biology, Basic Mathematics, Bookkeeping, Commerce, Computer Studies',
      'National examination: CSEE — NECTA Centre S1383',
    ],
    image: images.classroom,
  },
  {
    id: 'a-level',
    name: 'Advanced Level (Form 5 – 6)',
    forms: 'Form 5 – 6',
    summary:
      'Two years of focused Arts study in a chosen combination, preparing students for university and their chosen careers.',
    combinations: [
      'Arts combinations: HGL (History, Geography, Kiswahili Language), HKL (History, Kiswahili, English Language), HGE (History, Geography, Economics), HGK (History, Geography, Kiswahili)',
      'National examination: ACSEE — NECTA Centre S1383',
    ],
    image: images.lab,
  },
]

// ---------------------------------------------------------------------------
// ADMISSIONS
// ---------------------------------------------------------------------------
export interface AdmissionStep {
  step: number
  title: string
  description: string
}

export const admissionSteps: AdmissionStep[] = [
  {
    step: 1,
    title: 'Submit Application',
    description:
      'Apply online in about ten minutes or collect a paper form at the school office. You will instantly receive a reference number to track your application.',
  },
  {
    step: 2,
    title: 'Entrance Assessment',
    description:
      'Applicants sit a written assessment in English and Mathematics. Form 5 applicants are also assessed on their O-Level subject results.',
  },
  {
    step: 3,
    title: 'Family Interview',
    description:
      'A short interview with the student and parents/guardians to discuss attitude, interests and how the school can support the student.',
  },
  {
    step: 4,
    title: 'Offer & Enrolment',
    description:
      'Successful applicants receive an admission letter within two weeks. Enrolment is confirmed by paying the first-term fees and collecting the joining pack.',
  },
]

export const requirementsForm1: string[] = [
  'Completed application form',
  'Copy of birth certificate',
  'Standard Seven (PSLE) results slip',
  'Two recent passport-size photographs',
  'Transfer letter (for students joining mid-year or from another school)',
  'Application fee payment receipt',
]

export const requirementsForm5: string[] = [
  'Completed application form',
  'Copy of birth certificate',
  'CSEE certificate / results slip',
  'School leaving certificate from previous school',
  'Two recent passport-size photographs',
  'Personal statement (half a page)',
  'Application fee payment receipt',
]
// ---------------------------------------------------------------------------
// FEES (indicative — confirm exact amounts with the accounts office)
// ---------------------------------------------------------------------------
export interface FeeRow {
  level: string
  tuition: string
  boarding: string
  other: string
}

export const feeStructure: FeeRow[] = [
  { level: 'Form 1 – 4', tuition: 'TZS 150,000', boarding: 'TZS 400,000', other: 'TZS 100,000' },
  { level: 'Form 5 – 6', tuition: 'TZS 200,000', boarding: 'TZS 450,000', other: 'TZS 150,000' },
]

// ---------------------------------------------------------------------------
// FAQS
// ---------------------------------------------------------------------------
export interface Faq {
  question: string
  answer: string
}

export const faqs: Faq[] = [
  {
    question: 'Is Mzinga Secondary School a boarding or day school?',
    answer: 'Both. Parents may choose boarding (bweni) or day (kutwa) for their children.',
  },
  {
    question: 'Is the school mixed (boys and girls)?',
    answer: 'Yes. Mzinga Secondary School is co-educational — boys and girls study together from Form 1 to Form 6.',
  },
  {
    question: 'What curriculum does the school teach?',
    answer: 'The Tanzanian national curriculum for Ordinary Level (Form 1–4) and Advanced Level (Form 5–6).',
  },
  {
    question: 'Is the school registered with NECTA?',
    answer: 'Yes. Mzinga Secondary School is fully registered with NECTA under Centre Number S1383 (school registration S.1339).',
  },
  {
    question: 'What A-Level combinations are offered?',
    answer: 'Arts combinations: HGL, HKL, HGE and HGK.',
  },
  {
    question: 'What O-Level subjects are offered?',
    answer: 'Civics, History, English, Kiswahili, Geography, Physics, Chemistry, Biology, Basic Mathematics, Bookkeeping, Commerce and Computer Studies.',
  },
  {
    question: 'Where is the school located?',
    answer: 'Mwanagati Street, Mzinga Ward, Ilala Municipal Council, Dar es Salaam, Tanzania (P.O. Box 25274).',
  },
  {
    question: 'How can I apply for admission?',
    answer: 'Apply online through the Admissions page or visit the school office with the required documents.',
  },
]

// ---------------------------------------------------------------------------
// CLUBS & SOCIETIES
// ---------------------------------------------------------------------------
export interface Club {
  id: string
  name: string
  icon: LucideIcon
  description: string
}

export const clubs: Club[] = [
  {
    id: 'debate',
    name: 'Debate Club',
    icon: ScrollText,
    description: 'Debates and public speaking in English and Kiswahili.',
  },
  {
    id: 'science',
    name: 'Science Club',
    icon: FlaskConical,
    description: 'Weekly experiments, projects and preparation for science fairs.',
  },
  {
    id: 'ict',
    name: 'ICT Club',
    icon: Laptop,
    description: 'Coding, digital skills and preparation for the annual hackathon.',
  },
  {
    id: 'environment',
    name: 'Environment Club',
    icon: Globe2,
    description: 'Tree planting, campus recycling and community clean-up drives.',
  },
  {
    id: 'sports',
    name: 'Sports & Games Club',
    icon: Users,
    description: 'Football, volleyball, athletics and inter-house competitions.',
  },
  {
    id: 'writers',
    name: 'Writers & Journalism Club',
    icon: BookOpen,
    description: 'School magazine, newsletters and creative writing.',
  },
]

export const sportsList: string[] = ['Football', 'Volleyball', 'Athletics', 'Netball', 'Table Tennis']

// ---------------------------------------------------------------------------
// TESTIMONIALS
// ---------------------------------------------------------------------------
export interface Testimonial {
  name: string
  role: string
  quote: string
  initials: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Baraka J.',
    role: 'Form Six, Arts (HGL)',
    quote: 'The HGL combination opened my eyes to history and geography, and the teachers prepared us well for the ACSEE. I am confident about university.',
    initials: 'BJ',
  },
  {
    name: 'Asha S.',
    role: 'Parent, Form 2 & Form 4 sons',
    quote: 'I trust Mzinga with my children because of its disciplined boarding life, caring teachers and the termly progress reports.',
    initials: 'AS',
  },
  {
    name: 'Neema K.',
    role: 'Teacher, Languages Department',
    quote: 'Seeing students grow in confidence as they master English and Kiswahili is the most rewarding part of my work here.',
    initials: 'NK',
  },
]

// ---------------------------------------------------------------------------
// FACILITIES
// ---------------------------------------------------------------------------
export interface Facility {
  id: string
  name: string
  description: string
  image: string
}

export const facilities: Facility[] = [
  {
    id: 'labs',
    name: 'Science Laboratories',
    description: 'Physics, Chemistry and Biology laboratories equipped for full practical coursework and weekly experiments.',
    image: images.lab,
  },
  {
    id: 'computer',
    name: 'Computer Laboratory',
    description: 'ICT workstations with internet access for digital literacy and Computer Studies.',
    image: images.computerLab,
  },
  {
    id: 'library',
    name: 'Library & Resource Centre',
    description: 'Textbooks, past-paper archive and a quiet digital study zone for all forms.',
    image: images.library,
  },
  {
    id: 'boarding',
    name: 'Boarding Dormitories',
    description: 'Supervised dorms with resident house parents, study halls and recreational space.',
    image: images.students,
  },
  {
    id: 'sports',
    name: 'Sports Ground',
    description: 'Football, volleyball and athletics facilities for inter-house and inter-school competitions.',
    image: images.sports,
  },
  {
    id: 'clinic',
    name: 'School Clinic',
    description: 'On-site nurse and sick bay, with partnerships with nearby hospitals for immediate care.',
    image: images.labAlt,
  },
  {
    id: 'classrooms',
    name: 'Modern Classrooms',
    description: 'Conducive, well-ventilated classrooms for Forms 1 through 6.',
    image: images.classroom,
  },
]

// ---------------------------------------------------------------------------
// PHOTO GALLERY
// ---------------------------------------------------------------------------
export const gallery = [
  { src: images.campus, alt: 'Mzinga Secondary School campus in Mzinga Ward' },
  { src: images.students, alt: 'Students on campus' },
  { src: images.assembly, alt: 'School assembly' },
  { src: images.labAlt, alt: 'Science practical lesson' },
  { src: images.libraryAlt, alt: 'Library reading hall' },
  { src: images.sportsAlt, alt: 'Sports day on the field' },
  { src: images.classroom, alt: 'Classroom lesson' },
  { src: images.studentsGroup, alt: 'Graduation day' },
]
