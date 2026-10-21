/**
 * ============================================================================
 *  SAMPLE SITE CONTENT — replace per school
 * ============================================================================
 *  All page content lives here (news, events, staff, fees, FAQs, clubs...).
 *  Schools replace these arrays with their own content — the pages render
 *  whatever is here, so no component code needs to change.
 *  Image URLs point to demo photos; swap them for the school's own photos.
 * ============================================================================
 */
import type { LucideIcon } from 'lucide-react'
import {
  Calculator,
  FlaskConical,
  Globe2,
  Landmark,
  Laptop,
  ScrollText,
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
    title: 'Form Four Students Achieve 96% Pass Rate in National Examinations',
    excerpt:
      'We are proud to announce that our Form Four class has achieved a 96% pass rate in the national examinations, with 41% of candidates earning Division One results. This outstanding performance reflects the dedication of our students, teachers and parents, and keeps Brightfield among the top-performing schools in the region.',
    date: '2026-01-15',
    category: 'Academics',
    image: images.classroom,
    featured: true,
  },
  {
    id: 'n2',
    title: 'New Science & Innovation Laboratory Officially Opened',
    excerpt:
      'Our brand-new, fully equipped science laboratory is now open, serving Physics, Chemistry and Biology practicals for all forms. The facility features modern workstations, fume hoods and digital sensors, and was funded jointly by the school board, parents and alumni partners.',
    date: '2025-12-02',
    category: 'Facilities',
    image: images.labAlt,
  },
  {
    id: 'n3',
    title: 'Brightfield Wins Regional Inter-School Football Championship',
    excerpt:
      'Our senior football team lifted the regional inter-school trophy after an unbeaten campaign, defeating 14 other schools along the way. Captain Emmanuel M. was named Player of the Tournament, and three players have been selected for the regional youth squad.',
    date: '2025-11-18',
    category: 'Sports',
    image: images.sports,
  },
  {
    id: 'n4',
    title: 'Annual Science Fair Showcases 40+ Student Projects',
    excerpt:
      'More than forty projects were presented at this year\u2019s science fair, ranging from low-cost water filtration models to a solar-powered classroom lighting prototype. The winning team will represent the school at the national science week in Dodoma.',
    date: '2025-10-09',
    category: 'Academics',
    image: images.lab,
  },
  {
    id: 'n5',
    title: 'Library Expansion Adds 2,000 New Books and a Digital Archive',
    excerpt:
      'The school library has doubled its reading space and added 2,000 new titles, alongside a digital archive that gives students access to past papers, e-books and research journals from any campus computer or personal device.',
    date: '2025-09-21',
    category: 'Facilities',
    image: images.library,
  },
  {
    id: 'n6',
    title: 'Form Five Scholarships Announced for 2026 Intake',
    excerpt:
      'Ten full scholarships and twenty partial bursaries are available for outstanding students joining Form Five in 2026. Applications open in January — see the admissions page for criteria, required documents and deadlines.',
    date: '2025-08-30',
    category: 'Admissions',
    image: images.students,
  },
]

// ---------------------------------------------------------------------------
// EVENTS
// ---------------------------------------------------------------------------
export interface EventItem {
  id: string
  title: string
  day: string
  month: string
  time: string
  location: string
  description: string
}

export const events: EventItem[] = [
  {
    id: 'e1',
    title: 'Open Day & Campus Tour',
    day: '14',
    month: 'MAR',
    time: '9:00 AM – 2:00 PM',
    location: 'Main Campus',
    description:
      'Prospective families are invited to tour our campus, meet teachers and see classes in session. No booking required — simply register at the front desk on arrival.',
  },
  {
    id: 'e2',
    title: 'Parent–Teacher Conference',
    day: '28',
    month: 'FEB',
    time: '8:30 AM – 3:00 PM',
    location: 'Main Hall',
    description:
      'One-on-one meetings between parents and subject teachers to review each student\u2019s progress, mock results and study plan ahead of national examinations.',
  },
  {
    id: 'e3',
    title: 'Mid-Term Examinations (Form 1 – Form 5)',
    day: '02',
    month: 'MAR',
    time: 'All Week',
    location: 'Exam Halls',
    description:
      'Mid-term assessments across all subjects. Students should confirm their personal timetable with their class teacher and arrive 20 minutes before each session.',
  },
  {
    id: 'e4',
    title: 'Inter-House Sports Gala',
    day: '10',
    month: 'APR',
    time: '8:00 AM – 4:00 PM',
    location: 'Sports Complex',
    description:
      'The four school houses compete in athletics, football, netball and volleyball. Parents and alumni are warmly invited — food stalls and live commentary all day.',
  },
  {
    id: 'e5',
    title: 'Form Six Graduation Ceremony',
    day: '22',
    month: 'MAY',
    time: '10:00 AM – 1:00 PM',
    location: 'Main Hall & Gardens',
    description:
      'A formal celebration of our Form Six graduates, their families and teachers. The ceremony includes awards for academic excellence, leadership and service.',
  },
]

// ---------------------------------------------------------------------------
// STAFF DIRECTORY
// ---------------------------------------------------------------------------
export interface StaffMember {
  name: string
  role: string
  department: string
  initials: string
}

export const staff: StaffMember[] = [
  { name: 'Dr. Grace Mwakalinga', role: 'Head of School', department: 'Leadership', initials: 'GM' },
  { name: 'Mr. Daniel Komba', role: 'Deputy Head — Academics', department: 'Leadership', initials: 'DK' },
  { name: 'Mrs. Sarah Lyimo', role: 'Head of Sciences', department: 'Sciences', initials: 'SL' },
  { name: 'Mr. Joseph Mushi', role: 'Head of Mathematics', department: 'Mathematics', initials: 'JM' },
  { name: 'Ms. Anna Kimaro', role: 'Head of Languages', department: 'Languages', initials: 'AK' },
  { name: 'Mr. Peter Mwakasege', role: 'Head of Business Studies', department: 'Business', initials: 'PM' },
  { name: 'Eng. Neema Msigwa', role: 'Head of ICT & Computing', department: 'ICT', initials: 'NM' },
  { name: 'Mrs. Rehema Saleh', role: 'Admissions Officer', department: 'Administration', initials: 'RS' },
]

// ---------------------------------------------------------------------------
// ACADEMICS — departments & subjects
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
      'From core numeracy to advanced calculus, the department builds strong problem-solving skills through structured practice, math clinics and national exam preparation.',
    subjects: ['Basic Mathematics', 'Advanced Mathematics', 'Statistics (A-Level)'],
  },
  {
    id: 'sciences',
    name: 'Sciences',
    icon: FlaskConical,
    description:
      'Practical-first science teaching in modern laboratories. Students carry out weekly experiments and enter regional and national science competitions every year.',
    subjects: ['Physics', 'Chemistry', 'Biology', 'General Science'],
  },
  {
    id: 'languages',
    name: 'Languages & Literature',
    icon: ScrollText,
    description:
      'Fluent expression, critical reading and confident public speaking. The debate team and annual poetry slam give every student a stage for their voice.',
    subjects: ['English Language', 'Kiswahili', 'English Literature', 'French'],
  },
  {
    id: 'business',
    name: 'Business Studies',
    icon: Landmark,
    description:
      'Real-world commerce skills through the school\u2019s student-run kiosk project, bookkeeping simulations and mentorship from local business partners.',
    subjects: ['Bookkeeping', 'Commerce', 'Economics', 'Accountancy (A-Level)'],
  },
  {
    id: 'ict',
    name: 'ICT & Computing',
    icon: Laptop,
    description:
      'Two computer laboratories with high-speed internet. Students learn digital literacy, programming fundamentals and take part in the annual coding club hackathon.',
    subjects: ['Computer Studies', 'ICT (A-Level)', 'Digital Literacy (all forms)'],
  },
  {
    id: 'social',
    name: 'Social Studies',
    icon: Globe2,
    description:
      'History, geography and civics that connect classroom knowledge to current affairs, field visits and community service projects across the region.',
    subjects: ['History', 'Geography', 'Civics', 'General Studies (A-Level)'],
  },
]

// ---------------------------------------------------------------------------
// ACADEMICS — streams (O-Level / A-Level)
// ---------------------------------------------------------------------------
export interface AcademicStream {
  id: string
  name: string
  forms: string
  summary: string
  combinations: string[]
  image: string
}

export const streams: AcademicStream[] = [
  {
    id: 'o-level',
    name: 'O-Level Programme',
    forms: 'Form 1 – Form 4',
    summary:
      'A four-year foundation following the national curriculum, with strong emphasis on English and Kiswahili fluency, mathematics, sciences and study skills. Weekly tests and monthly reports keep parents closely informed.',
    combinations: [
      'Core: Mathematics, Sciences, Languages, Social Studies',
      'Compulsory: Civics, Physical Education & Life Skills',
      'National exam: Certificate of Secondary Education (CSEE)',
    ],
    image: images.classroomAlt,
  },
  {
    id: 'a-level',
    name: 'A-Level Programme',
    forms: 'Form 5 – Form 6',
    summary:
      'Advanced two-year study in focused subject combinations, designed around each student\u2019s university and career goals. Small class sizes, dedicated study halls and university guidance from day one.',
    combinations: [
      'Science: PCB, PCM, PGM, CBG',
      'Business: ECA, EGM, HKL',
      'Arts: HGL, HGE, KML',
      'National exam: Advanced Certificate (ACSEE)',
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
      'Complete the application form (online or at the school office) and attach the required documents. A small, non-refundable application fee applies.',
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
      'A short interview with the student and parents/guardian. We look at attitude, interests and how the school can best support the student.',
  },
  {
    step: 4,
    title: 'Offer & Enrolment',
    description:
      'Successful applicants receive an admission letter within two weeks. Enrolment is confirmed by paying the first term\u2019s fees and collecting the joining pack.',
  },
]

export const requirementsForm1 = [
  'Completed application form',
  'Copy of birth certificate',
  'Standard Seven national examination results slip',
  'Two recent passport-size photographs',
  'Transfer letter (for students joining mid-year)',
  'Application fee payment receipt',
]

export const requirementsForm5 = [
  'Completed application form',
  'CSEE certificate / results slip',
  'School leaving certificate from previous school',
  'Two recent passport-size photographs',
  'Personal statement (half a page)',
  'Application fee payment receipt',
]

export interface FeeRow {
  level: string
  tuition: string
  boarding: string
  other: string
}

export const feeStructure: FeeRow[] = [
  { level: 'Form 1', tuition: 'TZS 1,200,000', boarding: 'TZS 800,000', other: 'TZS 150,000' },
  { level: 'Form 2', tuition: 'TZS 1,250,000', boarding: 'TZS 800,000', other: 'TZS 150,000' },
  { level: 'Form 3', tuition: 'TZS 1,300,000', boarding: 'TZS 850,000', other: 'TZS 175,000' },
  { level: 'Form 4', tuition: 'TZS 1,350,000', boarding: 'TZS 850,000', other: 'TZS 200,000' },
  { level: 'Form 5', tuition: 'TZS 1,600,000', boarding: 'TZS 900,000', other: 'TZS 225,000' },
  { level: 'Form 6', tuition: 'TZS 1,650,000', boarding: 'TZS 900,000', other: 'TZS 250,000' },
]

export interface FaqItem {
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    question: 'When do admissions open for the new academic year?',
    answer:
      'Applications open every January for the intake beginning that same year. Places are offered on a rolling basis, but we encourage families to apply before March as popular forms fill quickly. Mid-year transfers are accepted subject to space.',
  },
  {
    question: 'What are the minimum entry requirements?',
    answer:
      'For Form 1, applicants should have completed Standard Seven with pass results. For Form 5, applicants need a Division I – II in the CSEE with strong passes in the subjects they wish to pursue. All applicants must pass our entrance assessment.',
  },
  {
    question: 'Do you offer scholarships or financial aid?',
    answer:
      'Yes. Each year we award ten full scholarships and twenty partial bursaries to high-performing students with financial need. Applications for aid are reviewed by the scholarship committee in confidence.',
  },
  {
    question: 'Is boarding available, and what does it include?',
    answer:
      'We offer supervised boarding in modern dormitories with resident house parents, evening preps, three meals a day and weekend activities. Boarding places are limited to 400 students across all forms.',
  },
  {
    question: 'What extracurricular activities does the school offer?',
    answer:
      'Students can join over 15 clubs including debate, robotics, drama and environment, and take part in football, basketball, netball, volleyball and athletics. Every student joins one club and one sporting activity each term.',
  },
  {
    question: 'How do I arrange a campus visit?',
    answer:
      'Join our monthly Open Day (no booking needed) or contact the admissions office to schedule a private tour on a school day. Contact details are on the Contact page — we respond within one working day.',
  },
]

// ---------------------------------------------------------------------------
// STUDENT LIFE — clubs, sports, houses
// ---------------------------------------------------------------------------
export interface Club {
  id: string
  name: string
  icon: LucideIcon
  description: string
}

export const clubs: Club[] = [
  {
    id: 'science',
    name: 'Science Club',
    icon: FlaskConical,
    description: 'Weekly experiments, science fair projects and regional competition teams.',
  },
  {
    id: 'debate',
    name: 'Debate & Public Speaking',
    icon: ScrollText,
    description: 'Inter-house debates, mock parliament and speech competitions in English and Kiswahili.',
  },
  {
    id: 'robotics',
    name: 'Robotics & Coding',
    icon: Laptop,
    description: 'Build robots, learn Python and JavaScript, and compete in the annual hackathon.',
  },
  {
    id: 'drama',
    name: 'Drama Club',
    icon: Landmark,
    description: 'Two stage productions a year, from classic plays to student-written sketches.',
  },
  {
    id: 'environment',
    name: 'Environment Club',
    icon: Globe2,
    description: 'Tree planting, campus recycling programme and community clean-up drives.',
  },
  {
    id: 'journalism',
    name: 'Journalism Club',
    icon: ScrollText,
    description: 'Publish the termly school magazine and run the assemblies\u2019 news bulletin.',
  },
  {
    id: 'music',
    name: 'Music & Band',
    icon: Landmark,
    description: 'School choir, instrumental training and performances at every major event.',
  },
  {
    id: 'entrepreneurship',
    name: 'Entrepreneurship Club',
    icon: Calculator,
    description: 'Student-run kiosk, mini business plans and mentorship from local entrepreneurs.',
  },
]

export const sportsList = [
  'Football',
  'Basketball',
  'Volleyball',
  'Netball',
  'Athletics',
  'Table Tennis',
  'Swimming',
  'Cricket',
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
    description:
      'Three modern laboratories for Physics, Chemistry and Biology, equipped for full practical coursework and weekly experiments.',
    image: images.lab,
  },
  {
    id: 'library',
    name: 'Library & Resource Centre',
    description:
      'Over 10,000 titles, past-paper archive and a quiet digital study zone with research computers.',
    image: images.library,
  },
  {
    id: 'computer',
    name: 'Computer Laboratories',
    description:
      'Two ICT labs with 80 workstations, high-speed internet and smart screens for digital learning.',
    image: images.computerLab,
  },
  {
    id: 'sports',
    name: 'Sports Complex',
    description:
      'Football pitch, basketball and volleyball courts, netball grounds and athletics track all on campus.',
    image: images.sports,
  },
  {
    id: 'boarding',
    name: 'Boarding Dormitories',
    description:
      'Comfortable supervised dorms with resident house parents, study halls and recreational space.',
    image: images.students,
  },
  {
    id: 'clinic',
    name: 'School Clinic',
    description:
      'On-site nurse, sick bay and partnerships with nearby hospitals for immediate student care.',
    image: images.building,
  },
]

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
    name: 'Ashura H.',
    role: 'Form Six, Science (PCB)',
    quote:
      'The teachers here genuinely want you to succeed. Morning preps, practical labs and the science club pushed me to aim for medicine — and my results made it possible.',
    initials: 'AH',
  },
  {
    name: 'Emmanuel M.',
    role: 'Form Four & Football Captain',
    quote:
      'Brightfield balances books and sports perfectly. I improved my maths while captaining the team to the regional trophy. The school believes in the whole person.',
    initials: 'EM',
  },
  {
    name: 'Mrs. Halima J.',
    role: 'Parent, Form 2 & Form 5 students',
    quote:
      'Monthly reports, open communication and caring teachers. As a parent, I always know where my children stand and what comes next in their studies.',
    initials: 'HJ',
  },
]

// ---------------------------------------------------------------------------
// PHOTO GALLERY
// ---------------------------------------------------------------------------
export const gallery = [
  { src: images.campus, alt: 'School main building' },
  { src: images.students, alt: 'Students on campus' },
  { src: images.labAlt, alt: 'Science practical lesson' },
  { src: images.sportsAlt, alt: 'Sports day on the field' },
  { src: images.libraryAlt, alt: 'Library reading hall' },
  { src: images.assembly, alt: 'Reading time in the library' },
  { src: images.classroom, alt: 'Classroom lesson' },
  { src: images.studentsGroup, alt: 'Graduation day' },
]
