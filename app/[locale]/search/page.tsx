import type { Metadata } from 'next'
import { PageShell, PageHeading } from '@/components/archive/PageShell'
import { SearchExplorer } from '@/components/archive/SearchExplorer'
import { getSections, getArticles, getPeople, getPlaces, getDocuments, getTimeline, getRegions, getDiaspora } from '@/lib/content'
import { isLocale, pageCopy } from '@/lib/i18n'

export const metadata: Metadata = { title: 'Search | Patidar History', description: 'Search articles, people, places, documents, timeline events, regions and diaspora destinations.' }

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [sections, articles, people, places, documents, timeline, regions, diaspora] = await Promise.all([
    getSections(), getArticles(), getPeople(), getPlaces(), getDocuments(), getTimeline(), getRegions(), getDiaspora(),
  ])
  return (
    <PageShell locale={locale}>
      <PageHeading {...pageCopy('search', isLocale(locale) ? locale : 'en')} />
      <SearchExplorer
        locale={locale} sections={sections} articles={articles} people={people} places={places}
        documents={documents} timeline={timeline} regions={regions} diaspora={diaspora}
      />
    </PageShell>
  )
}
