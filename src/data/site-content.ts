/**
 * ============================================================================
 *  SITE CONTENT — ILALA ISLAMIC SECONDARY SCHOOL
 * ============================================================================
 *  All page content lives here (news, events, staff, departments, streams,
 *  admission steps, fees, FAQs, clubs, facilities, testimonials, gallery).
 *  Replace these arrays with the school's own content — the pages render
 *  whatever is here, so no component code needs to change.
 *  Image URLs below are demo photos; point them at the school's own photos.
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
// IMAGES (demo photos — replace with the school's own)
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
    title: 'Ilala Islamic Shines in 2025 NECTA Examinations',
    excerpt:
      'Our Form Four candidates posted strong results in the 2025 Certificate of Secondary Education Examination, with several students earning Division One at NECTA Centre S2348. Alhamdulillah, this reflects the commitment of our students, teachers and parents to Elimu Bora and Malezi ya Kiislamu.',
    date: '2026-02-10',
    category: 'Academics',
    image: images.classroom,
    featured: true,
  },
  {
    id: 'n2',
    title: 'Annual Holy Qur\'an Memorisation Competition',
    excerpt:
      'Students from Nursery to Form 6 took part in the school\'s annual Qur\'an memorisation (hifz) and tajwid competition at the Amana campus. Prizes were awarded to the best reciters in each level.',
    date: '2026-01-19',
    category: 'Religious',
    image: images.assembly,
  },
  {
    id: 'n3',
    title: 'Arabic Language Programme Expanded to All Forms',
    excerpt:
      'Arabic Language is now taught from Primary through Form 6, supporting Qur\'an understanding and preparing students for NECTA Arabic examinations.',
    date: '2026-01-05',
    category: 'Academics',
    image: images.classroomAlt,
  },
  {
    id: 'n4',
    title: 'Form Six Graduation Ceremony — Class of 2026',
    excerpt:
      'Families, teachers and guests joined our Form Six graduates at the Main Hall for the annual graduation ceremony, celebrating academic achievement and Islamic character.',
    date: '2026-03-20',
    category: 'Ceremony',
    image: images.studentsGroup,
  },
  {
    id: 'n5',
    title: 'Boarding Students Excel in Mid-Term Assessments',
    excerpt:
      'Our bweni (boarding) students recorded strong results in the mid-term assessments, with supervised evening prep and Qur\'an programmes supporting their success.',
    date: '2026-03-02',
    category: 'Boarding',
    image: images.students,
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
    title: 'Friday Congregational Prayer (Jumu\'ah)',
    description:
      'Weekly Jumu\'ah prayer and khutbah at the school mosque. All students and staff attend.',
    location: 'School Mosque, Amana Campus',
    time: '12:30 PM – 1:30 PM',
    category: 'Religious',
    published: true,
    startDate: '2026-02-06',
  },
  {
    id: 'e2',
    title: 'Inter-Class Islamic Quiz Competition',
    description:
      'Classes compete on Qur\'an, Hadith, Fiqh and Islamic history in the termly Islamic quiz.',
    location: 'Main Hall',
    time: '9:00 AM – 12:00 PM',
    category: 'Religious',
    published: true,
    startDate: '2026-02-14',
  },
  {
    id: 'e3',
    title: 'Annual Sports Day',
    description:
      'Football, volleyball and athletics competitions between the school houses.',
    location: 'Sports Complex',
    time: '8:00 AM – 4:00 PM',
    category: 'Sports',
    published: true,
    startDate: '2026-02-28',
  },
  {
    id: 'e4',
    title: 'Form Six Graduation Ceremony',
    description:
      'Celebration of the Form Six graduating class with awards, speeches and du\'a.',
    location: 'Main Hall & Gardens',
    time: '10:00 AM – 2:00 PM',
    category: 'Ceremony',
    published: true,
    startDate: '2026-03-20',
  },
  {
    id: 'e5',
    title: 'Open Day for Prospective Parents',
    description:
      'Visit the campus, meet the teachers and learn about day and boarding options.',
    location: 'Admissions Office, Amana',
    time: '9:00 AM – 3:00 PM',
    category: 'Admissions',
    published: true,
    startDate: '2026-04-10',
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
  { name: 'Mr. Hussein Juma', role: 'Head of School', department: 'Administration', initials: 'HJ' },
  { name: 'Ms. Aisha Omar', role: 'Deputy Head Academics', department: 'Administration', initials: 'AO' },
  { name: 'Sheikh Ibrahim Juma', role: 'Head of Islamic Studies & Arabic', department: 'Religious Studies', initials: 'IJ' },
  { name: 'Mr. Salim Nassor', role: 'Head of Sciences', department: 'Sciences', initials: 'SN' },
  { name: 'Ms. Zainab Ali', role: 'Head of Languages', department: 'Languages', initials: 'ZA' },
  { name: 'Mrs. Rehema Saleh', role: 'Admissions Officer', department: 'Administration', initials: 'RS' },
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
    id: 'mathematics',
    name: 'Mathematics',
    icon: Calculator,
    description:
      'Core numeracy and problem-solving from Nursery through Advanced Level.',
    subjects: ['Basic Mathematics', 'Advanced Mathematics', 'Statistics'],
  },
  {
    id: 'sciences',
    name: 'Sciences',
    icon: FlaskConical,
    description: 'Practical, laboratory-based science for every form.',
    subjects: ['Physics', 'Chemistry', 'Biology', 'General Science'],
  },
  {
    id: 'languages',
    name: 'Languages',
    icon: Globe2,
    description: 'Fluency in English, Kiswahili and Arabic — including Qur\'anic Arabic.',
    subjects: ['English Language', 'Kiswahili', 'Arabic Language', 'English Literature'],
  },
  {
    id: 'islamic-studies',
    name: 'Islamic Studies',
    icon: Shield,
    description: 'Elimu ya Dini ya Kiislamu, Qur\'an, Hadith, Fiqh and Islamic history.',
    subjects: ['Elimu ya Dini ya Kiislamu', 'Qur\'an Studies', 'Hadith', 'Fiqh', 'Islamic History'],
  },
  {
    id: 'commerce',
    name: 'Commerce & Business',
    icon: Briefcase,
    description: 'Practical trade, book-keeping and business skills.',
    subjects: ['Commerce', 'Book-Keeping', 'Economics', 'Entrepreneurship'],
  },
  {
    id: 'ict',
    name: 'ICT & Computer Studies',
    icon: Laptop,
    description: 'Digital literacy and computing for the modern world.',
    subjects: ['Computer Studies', 'ICT'],
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
      'Students follow the Tanzanian national curriculum alongside specialised religious studies. Subjects include Basic Mathematics, Civics, History, Geography, Kiswahili, English Language, Biology, Chemistry, Physics, Commerce, Book-Keeping, Arabic Language and Elimu ya Dini ya Kiislamu.',
    combinations: [
      'Core: Basic Mathematics, Civics, History, Geography, Kiswahili, English Language, Biology, Chemistry, Physics, Commerce, Book-Keeping, Arabic Language, Elimu ya Dini ya Kiislamu',
      'National examination: Certificate of Secondary Education Examination (CSEE) — NECTA Centre S2348',
    ],
    image: images.classroom,
  },
  {
    id: 'a-level',
    name: 'Advanced Level (Form 5 – 6)',
    forms: 'Form 5 – 6',
    summary:
      'Two years of focused study in a chosen subject combination, preparing students for university and their chosen careers.',
    combinations: [
      'Science combinations: PCB, PCM, PGM, CBG',
      'Arts combinations: HGL, HGK, HKL',
      'National examination: Advanced Certificate of Secondary Education Examination (ACSEE) — NECTA Centre S2348',
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
    question: 'Is Ilala Islamic a boarding or day school?',
    answer: 'Both. Parents may choose bweni (boarding) or kutwa (day) for their children.',
  },
  {
    question: 'Is the secondary school mixed (boys and girls)?',
    answer: 'Yes. The secondary wing (Forms 1–6) admits both boys and girls, in line with the school\'s Islamic principles.',
  },
  {
    question: 'What curriculum does the school teach?',
    answer: 'The Tanzanian national curriculum, plus specialised Islamic studies: Qur\'an, Arabic Language and Elimu ya Dini ya Kiislamu.',
  },
  {
    question: 'Is the school registered with NECTA?',
    answer: 'Yes. Ilala Islamic Secondary School is fully registered with NECTA under Centre Number S2348.',
  },
  {
    question: 'What A-Level combinations are offered?',
    answer: 'PCB, PCM, PGM and CBG (science), and HGL, HGK and HKL (arts).',
  },
  {
    question: 'Where is the school located?',
    answer: 'In the Amana area of Ilala Ward, Dar es Salaam City Council — easily reached by central Dar es Salaam transport.',
  },
  {
    question: 'Are prayers part of the daily routine?',
    answer: 'Yes. Daily congregational prayers and spiritual routines are mandatory for all students.',
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
    id: 'quran',
    name: 'Qur\'an Club',
    icon: BookOpen,
    description: 'Qur\'an memorisation (hifz), tajwid circles and recitation practice.',
  },
  {
    id: 'debate',
    name: 'Islamic Debate Club',
    icon: ScrollText,
    description: 'Debates on Islamic topics, current affairs and public speaking in English and Kiswahili.',
  },
  {
    id: 'nasheed',
    name: 'Nasheed Group',
    icon: Music2,
    description: 'Islamic nasheed and poetry for school programmes and ceremonies.',
  },
  {
    id: 'science',
    name: 'Science Club',
    icon: FlaskConical,
    description: 'Weekly experiments, projects and preparation for science fairs.',
  },
  {
    id: 'environment',
    name: 'Environment Club',
    icon: Globe2,
    description: 'Tree planting, campus recycling and community clean-up drives.',
  },
  {
    id: 'ict',
    name: 'ICT Club',
    icon: Laptop,
    description: 'Coding, digital skills and preparation for the annual hackathon.',
  },
]

export const sportsList: string[] = ['Football', 'Volleyball', 'Athletics', 'Table Tennis']

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
    name: 'Hussein A.',
    role: 'Form Six, Science (PCB)',
    quote: 'Daily prayers, Qur\'an classes and strong academics prepared me for university — and for life as a practising Muslim. Alhamdulillah.',
    initials: 'HA',
  },
  {
    name: 'Fatima S.',
    role: 'Parent, Form 2 & Form 4 sons',
    quote: 'I trust the school with my children because of its Islamic values, disciplined boarding life and the monthly progress reports.',
    initials: 'FS',
  },
  {
    name: 'Sheikh Ibrahim J.',
    role: 'Head of Islamic Studies',
    quote: 'We combine Elimu Bora with Malezi ya Kiislamu so that every student leaves with knowledge, character and taqwa.',
    initials: 'IJ',
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
    id: 'mosque',
    name: 'Mosque & Prayer Halls',
    description: 'A campus mosque for daily congregational prayers, Friday Jumu\'ah and Qur\'an programmes.',
    image: images.building,
  },
  {
    id: 'labs',
    name: 'Science Laboratories',
    description: 'Physics, Chemistry and Biology laboratories equipped for full practical coursework and weekly experiments.',
    image: images.lab,
  },
  {
    id: 'library',
    name: 'Library & Resource Centre',
    description: 'Qur\'an and Islamic books, textbooks, past-paper archive and a quiet digital study zone.',
    image: images.library,
  },
  {
    id: 'computer',
    name: 'Computer Laboratory',
    description: 'ICT workstations with internet access for digital literacy and computer studies.',
    image: images.computerLab,
  },
  {
    id: 'boarding',
    name: 'Boarding Dormitories (Bweni)',
    description: 'Supervised dorms with resident house parents, study halls and recreational space.',
    image: images.students,
  },
  {
    id: 'sports',
    name: 'Sports Complex',
    description: 'Football pitch, volleyball and athletics facilities for inter-house and inter-school competitions.',
    image: images.sports,
  },
  {
    id: 'clinic',
    name: 'School Clinic',
    description: 'On-site nurse and sick bay, with partnerships with nearby hospitals for immediate care.',
    image: images.labAlt,
  },
]

// ---------------------------------------------------------------------------
// PHOTO GALLERY
// ---------------------------------------------------------------------------
export const gallery = [
  { src: images.campus, alt: 'Ilala Islamic campus in Amana' },
  { src: images.students, alt: 'Students on campus' },
  { src: images.assembly, alt: 'Qur\'an class and assembly' },
  { src: images.labAlt, alt: 'Science practical lesson' },
  { src: images.libraryAlt, alt: 'Library reading hall' },
  { src: images.sportsAlt, alt: 'Sports day on the field' },
  { src: images.classroom, alt: 'Classroom lesson' },
  { src: images.studentsGroup, alt: 'Graduation day' },
]
