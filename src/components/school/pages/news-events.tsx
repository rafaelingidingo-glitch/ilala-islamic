'use client'

import { CalendarDays, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHero, SectionHeading } from '@/components/school/shared'
import { schoolConfig, type PageId } from '@/config/school-config'
import { events, gallery, images, news } from '@/data/site-content'

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function NewsPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  const { theme } = schoolConfig
  const [featured, ...restNews] = news

  return (
    <div>
      <PageHero
        page="news"
        onNavigate={onNavigate}
        title="News & Events"
        description="Celebrations, announcements and key dates — everything happening around our campus this term."
        image={images.studentsGroup}
      />

      {/* NEWS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading align="left" eyebrow="School News" title="Latest stories" />

          {/* Featured article */}
          <Card className="mt-10 overflow-hidden border-0 pt-0 shadow-lg">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-64 lg:min-h-80">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <CardContent className="flex flex-col justify-center p-8">
                <div className="flex items-center gap-2">
                  <Badge className="border-0 text-white" style={{ backgroundColor: theme.primary }}>
                    {featured.category}
                  </Badge>
                  <span className="text-xs text-slate-500">{formatDate(featured.date)}</span>
                </div>
                <h2 className="mt-4 text-2xl font-extrabold leading-snug tracking-tight text-slate-900">
                  {featured.title}
                </h2>
                <p className="mt-4 leading-relaxed text-slate-600">{featured.excerpt}</p>
              </CardContent>
            </div>
          </Card>

          {/* News grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restNews.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden border-0 pt-0 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative">
                  <img src={item.image} alt={item.title} className="aspect-[16/9] w-full object-cover" />
                  <Badge
                    className="absolute left-3 top-3 border-0 text-white"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {item.category}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <span className="text-xs text-slate-500">{formatDate(item.date)}</span>
                  <h3 className="mt-2 line-clamp-2 font-bold leading-snug text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {item.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="py-20" style={{ backgroundColor: theme.tint }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="School Calendar"
            title="Upcoming events"
            description="All events take place on the main campus unless stated otherwise. Parents and guardians are welcome at events marked public."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex gap-5 rounded-2xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl text-white"
                  style={{ backgroundColor: theme.primary }}
                  aria-hidden="true"
                >
                  <span className="text-xl font-extrabold leading-none">{event.day}</span>
                  <span className="text-[11px] font-bold tracking-wider">{event.month}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold leading-snug text-slate-900">{event.title}</h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {event.location}
                    </span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Photo Gallery"
            title="Life at our school, in pictures"
            description="A glimpse of lessons, sports, friendship and everyday moments on campus."
          />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {gallery.map((photo, i) => (
              <figure
                key={photo.src}
                className={`group relative overflow-hidden rounded-xl shadow-sm ${
                  i === 0 ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    i === 0 ? 'aspect-square h-full' : 'aspect-square'
                  }`}
                />
                <figcaption
                  className="absolute inset-x-0 bottom-0 translate-y-full p-3 text-xs font-medium text-white transition-transform duration-300 group-hover:translate-y-0"
                  style={{ background: `linear-gradient(to top, ${theme.navy}e6, transparent)` }}
                >
                  {photo.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
