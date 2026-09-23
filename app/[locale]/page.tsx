import { redirect } from 'next/navigation'
import { Home } from '@/components/archive/Home'
import { getSections, getTimeline, getPeople, getPlaces, getDocuments } from '@/lib/content'
import { contentStats } from '@/data/archive'
import { isLocale } from '@/lib/i18n'

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale === 'en') redirect('/')
  const loc = isLocale(locale) ? locale : 'en'

  const [sections, timeline, people, places, documents] = await Promise.all([
    getSections(), getTimeline(), getPeople(), getPlaces(), getDocuments(),
  ])
  return (
    <Home
      locale={loc}
      sections={sections}
      timeline={timeline.slice(0, 6)}
      people={people.slice(0, 3)}
      places={places.slice(0, 4)}
      documents={documents.slice(0, 3)}
      stats={{ articles: contentStats.articles, people: contentStats.people, documents: contentStats.documents }}
    />
  )
}
