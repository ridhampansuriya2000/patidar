import type { Metadata } from 'next'
import { PageShell, PageHeading } from '@/components/archive/PageShell'
import { TimelineExplorer } from '@/components/archive/TimelineExplorer'
import { getTimeline } from '@/lib/content'
import { isLocale, pageCopy } from '@/lib/i18n'

export const metadata: Metadata = { title: 'Timeline | Patidar History', description: 'An interactive chronology from pre-1800 Gujarat to the present day.' }

export default async function TimelinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const events = await getTimeline()
  return (
    <PageShell locale={locale}>
      <PageHeading {...pageCopy('timeline', isLocale(locale) ? locale : 'en')} />
      <TimelineExplorer events={events} />
    </PageShell>
  )
}
