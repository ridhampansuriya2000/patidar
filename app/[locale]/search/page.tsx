import type { Metadata } from 'next'
import { PageShell, PageHeading } from '@/components/archive/PageShell'
import { SearchExplorer } from '@/components/archive/SearchExplorer'
import { getSections, getArticles, getPeople, getPlaces, getDocuments, getTimeline, getRegions, getDiaspora } from '@/lib/content'

export const metadata: Metadata = { title: 'Search | Patidar History', description: 'Search articles, people, places, documents, timeline events, regions and diaspora destinations.' }

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [sections, articles, people, places, documents, timeline, regions, diaspora] = await Promise.all([
    getSections(), getArticles(), getPeople(), getPlaces(), getDocuments(), getTimeline(), getRegions(), getDiaspora(),
  ])
  return (
    <PageShell locale={locale}>
      <PageHeading eyebrow="Research interface" title="Search the archive" intro="Find articles, people, places, documents, timeline events and regions across the whole collection." />
      <SearchExplorer
        locale={locale} sections={sections} articles={articles} people={people} places={places}
        documents={documents} timeline={timeline} regions={regions} diaspora={diaspora}
      />
    </PageShell>
  )
}
