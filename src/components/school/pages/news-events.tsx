'use client'

import { useMemo, useState } from 'react'
import { CalendarDays, MapPin, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { PageHero, SectionHeading } from '@/components/school/shared'
import { schoolConfig, type PageId } from '@/config/school-config'
import { events, gallery, images, news } from '@/data/site-content'
import { useApiData } from '@/hooks/use-api-data'
import { dayOfMonth, formatDate, monthShort } from '@/lib/format'
import type { EventDto, NewsDto } from '@/lib/types'

/** Article view model — DB rows with the image default filled in. */
type NewsView = NewsDto & { image: string }

export function NewsPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  const { theme } = schoolConfig
  const [category, setCategory] = useState('All')
  const [openArticle, setOpenArticle] = useState<NewsView | null>(null)

  const { data: newsData } = useApiData<NewsDto[]>('/api/news', news as unknown as NewsDto[])
  const { data: eventsData } = useApiData<EventDto[]>('/api/events',
    [...events].sort((a, b) => a.startDate.localeCompare(b.startDate)) as unknown as EventDto[]
  )

  const allNews: NewsView[] = newsData.map((n) => ({ ...n, image: n.image || images.classroom }))
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(allNews.map((n) => n.category)))],
    [allNews]
  )
  const filtered = category === 'All' ? allNews : allNews.filter((n) => n.category === category)
  const [featured, ...restNews] = filtered

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

          {/* Category filter */}
          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter news by category">
            {categories.map((cat) => {
              const active = category === cat
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  aria-pressed={active}
                  className={
                    'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ' +
                    (active
                      ? 'border-transparent text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900')
                  }
                  style={active ? { backgroundColor: theme.primary } : undefined}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-slate-500">No stories in this category yet.</p>
          )}

          {/* Featured article */}
          {featured && (
            <button
              type="button"
              onClick={() => setOpenArticle(featured)}
              className="mt-8 block w-full cursor-pointer text-left focus-visible:outline-none"
              aria-label={`Read article: ${featured.title}`}
            >
              <Card className="overflow-hidden border-0 pt-0 shadow-lg transition-shadow hover:shadow-xl">
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
                    <span
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold"
                      style={{ color: theme.primary }}
                    >
                      Read full story →
                    </span>
                  </CardContent>
                </div>
              </Card>
            </button>
          )}

          {/* News grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restNews.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setOpenArticle(item)}
                className="block cursor-pointer text-left focus-visible:outline-none"
                aria-label={`Read article: ${item.title}`}
              >
                <Card className="h-full overflow-hidden border-0 pt-0 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
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
              </button>
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
            {eventsData.map((event) => (
              <div
                key={event.id}
                className="flex gap-5 rounded-2xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl text-white"
                  style={{ backgroundColor: theme.primary }}
                  aria-hidden="true"
                >
                  <span className="text-xl font-extrabold leading-none">{dayOfMonth(event.startDate)}</span>
                  <span className="text-[11px] font-bold tracking-wider">{monthShort(event.startDate)}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold leading-snug text-slate-900">{event.title}</h3>
                    {event.category && (
                      <Badge variant="outline" className="border-slate-200 text-slate-600">
                        {event.category}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatDate(event.startDate)} · {event.time}
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
            {eventsData.length === 0 && (
              <p className="text-slate-500">No upcoming events at the moment — check back soon.</p>
            )}
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

      {/* ARTICLE DIALOG */}
      <Dialog open={!!openArticle} onOpenChange={(open) => !open && setOpenArticle(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto p-0">
          {openArticle && (
            <article>
              <div className="relative">
                <img
                  src={openArticle.image}
                  alt={openArticle.title}
                  className="aspect-[16/8] w-full rounded-t-xl object-cover"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute right-3 top-3 rounded-full shadow"
                  onClick={() => setOpenArticle(null)}
                  aria-label="Close article"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <DialogHeader className="px-6 pt-6 text-left sm:px-8">
                <div className="flex items-center gap-2">
                  <Badge className="border-0 text-white" style={{ backgroundColor: theme.primary }}>
                    {openArticle.category}
                  </Badge>
                  <span className="text-xs text-slate-500">{formatDate(openArticle.date)}</span>
                </div>
                <DialogTitle className="mt-2 text-2xl font-extrabold leading-snug tracking-tight text-slate-900">
                  {openArticle.title}
                </DialogTitle>
                <DialogDescription asChild>
                  <p className="mt-4 leading-relaxed text-slate-600">{openArticle.excerpt}</p>
                </DialogDescription>
              </DialogHeader>
              <div className="px-6 pb-8 sm:px-8">
                <p className="border-t pt-6 text-sm leading-relaxed text-slate-600">
                  For more information about this story, contact the school office at{' '}
                  <a
                    href={`mailto:${schoolConfig.contact.email}`}
                    className="font-medium underline underline-offset-2"
                    style={{ color: theme.primary }}
                  >
                    {schoolConfig.contact.email}
                  </a>{' '}
                  or call {schoolConfig.contact.phone}.
                </p>
              </div>
            </article>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
