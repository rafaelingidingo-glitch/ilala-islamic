/**
 * Seed the database with the template's sample content.
 * Run: bun scripts/seed.ts
 *
 * Matches the fallback content in `src/data/site-content.ts` so the site
 * looks identical with or without the database.
 */
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const news = [
  {
    title: 'Form Four Students Achieve 96% Pass Rate in National Examinations',
    slug: 'form-four-96-percent-pass-rate',
    excerpt:
      'We are proud to announce that our Form Four class has achieved a 96% pass rate in the national examinations, with 41% of candidates earning Division One results. This outstanding performance reflects the dedication of our students, teachers and parents, and keeps Ilala Islamic among the top-performing schools in the region.',
    category: 'Academics',
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b9174167f2da.jpg',
    featured: true,
    date: new Date('2026-10-27T09:00:00Z'),
  },
  {
    title: 'New Science & Innovation Laboratory Officially Opened',
    slug: 'new-science-innovation-laboratory',
    excerpt:
      'Our brand-new, fully equipped science laboratory is now open, serving Physics, Chemistry and Biology practicals for all forms. The facility features modern workstations, fume hoods and digital sensors, and was funded jointly by the school board, parents and alumni partners.',
    category: 'Facilities',
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4a404b7b8027.webp',
    featured: false,
    date: new Date('2026-10-14T09:00:00Z'),
  },
  {
    title: 'Ilala Islamic Wins Regional Inter-School Football Championship',
    slug: 'regional-football-champions',
    excerpt:
      'Our senior football team lifted the regional inter-school trophy after an unbeaten campaign, defeating 14 other schools along the way. Captain Emmanuel M. was named Player of the Tournament, and three players have been selected for the regional youth squad.',
    category: 'Sports',
    image: '/school-football.png',
    featured: false,
    date: new Date('2026-09-30T09:00:00Z'),
  },
  {
    title: 'Annual Science Fair Showcases 40+ Student Projects',
    slug: 'annual-science-fair-projects',
    excerpt:
      'More than forty projects were presented at this year’s science fair, ranging from low-cost water filtration models to a solar-powered classroom lighting prototype. The winning team will represent the school at the national science week in Dodoma.',
    category: 'Academics',
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/21f2a9d29252.jpg',
    featured: false,
    date: new Date('2026-09-12T09:00:00Z'),
  },
  {
    title: 'Library Expansion Adds 2,000 New Books and a Digital Archive',
    slug: 'library-expansion-digital-archive',
    excerpt:
      'The school library has doubled its reading space and added 2,000 new titles, alongside a digital archive that gives students access to past papers, e-books and research journals from any campus computer or personal device.',
    category: 'Facilities',
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/16711d9fbe33.jpg',
    featured: false,
    date: new Date('2026-08-25T09:00:00Z'),
  },
  {
    title: 'Form Five Scholarships Announced for 2027 Intake',
    slug: 'form-five-scholarships-2027',
    excerpt:
      'Ten full scholarships and twenty partial bursaries are available for outstanding students joining Form Five in 2027. Applications open in January — see the admissions page for criteria, required documents and deadlines.',
    category: 'Admissions',
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a8f39746c455.jpg',
    featured: false,
    date: new Date('2026-08-05T09:00:00Z'),
  },
]

const events = [
  {
    title: 'Parent–Teacher Conference',
    description:
      'One-on-one meetings between parents and subject teachers to review each student’s progress, mock results and study plan ahead of national examinations.',
    location: 'Main Hall',
    time: '8:30 AM – 3:00 PM',
    category: 'Academic',
    startDate: new Date('2026-11-28T08:30:00Z'),
  },
  {
    title: 'Mid-Term Examinations (Form 1 – Form 5)',
    description:
      'Mid-term assessments across all subjects. Students should confirm their personal timetable with their class teacher and arrive 20 minutes before each session.',
    location: 'Exam Halls',
    time: 'All Week',
    category: 'Academic',
    startDate: new Date('2026-11-16T07:30:00Z'),
  },
  {
    title: 'Open Day & Campus Tour',
    description:
      'Prospective families are invited to tour our campus, meet teachers and see classes in session. No booking required — simply register at the front desk on arrival.',
    location: 'Main Campus',
    time: '9:00 AM – 2:00 PM',
    category: 'Public',
    startDate: new Date('2026-12-12T09:00:00Z'),
  },
  {
    title: 'Inter-House Sports Gala',
    description:
      'The four school houses compete in athletics, football, netball and volleyball. Parents and alumni are warmly invited — food stalls and live commentary all day.',
    location: 'Sports Complex',
    time: '8:00 AM – 4:00 PM',
    category: 'Sports',
    startDate: new Date('2027-01-23T08:00:00Z'),
  },
  {
    title: 'Form Six Graduation Ceremony',
    description:
      'A formal celebration of our Form Six graduates, their families and teachers. The ceremony includes awards for academic excellence, leadership and service.',
    location: 'Main Hall & Gardens',
    time: '10:00 AM – 1:00 PM',
    category: 'Ceremony',
    startDate: new Date('2027-03-20T10:00:00Z'),
  },
]

const staff = [
  { name: 'Dr. Grace Mwakalinga', role: 'Head of School', department: 'Leadership', initials: 'GM', order: 1 },
  { name: 'Mr. Daniel Komba', role: 'Deputy Head — Academics', department: 'Leadership', initials: 'DK', order: 2 },
  { name: 'Mrs. Sarah Lyimo', role: 'Head of Sciences', department: 'Sciences', initials: 'SL', order: 3 },
  { name: 'Mr. Joseph Mushi', role: 'Head of Mathematics', department: 'Mathematics', initials: 'JM', order: 4 },
  { name: 'Ms. Anna Kimaro', role: 'Head of Languages', department: 'Languages', initials: 'AK', order: 5 },
  { name: 'Mr. Peter Mwakasege', role: 'Head of Business Studies', department: 'Business', initials: 'PM', order: 6 },
  { name: 'Eng. Neema Msigwa', role: 'Head of ICT & Computing', department: 'ICT', initials: 'NM', order: 7 },
  { name: 'Mrs. Rehema Saleh', role: 'Admissions Officer', department: 'Administration', initials: 'RS', order: 8 },
]

const messages = [
  {
    name: 'James Mtei',
    email: 'james.mtei@example.com',
    phone: '+255 715 222 333',
    subject: 'Admissions enquiry',
    message:
      'Hello, my daughter completed Standard Seven last year and we would like to visit the school during the next Open Day. Could you also send us the Form 1 application requirements and the current fee structure? Thank you.',
    read: false,
  },
  {
    name: 'Halima Juma',
    email: 'halima.juma@example.com',
    phone: null,
    subject: 'Fees & payments',
    message:
      'Good morning. I would like to confirm whether school fees can be paid in two instalments per term, and which bank accounts are currently used for payments. Karibu.',
    read: true,
  },
]

async function main() {
  console.log('Seeding database…')
  await db.contactMessage.deleteMany()
  await db.staff.deleteMany()
  await db.event.deleteMany()
  await db.news.deleteMany()

  for (const item of news) await db.news.create({ data: item })
  for (const item of events) await db.event.create({ data: item })
  for (const item of staff) await db.staff.create({ data: item })
  for (const item of messages) await db.contactMessage.create({ data: item })

  console.log(
    `Done: ${news.length} news, ${events.length} events, ${staff.length} staff, ${messages.length} messages.`
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
