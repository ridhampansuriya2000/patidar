import type { Metadata } from 'next'
import { PageShell, PageHeading } from '@/components/archive/PageShell'
import { TimelineExplorer } from '@/components/archive/TimelineExplorer'
import { getTimeline } from '@/lib/content'

export const metadata: Metadata = { title: 'Timeline | Patidar History', description: 'An interactive chronology from pre-1800 Gujarat to the present day.' }

export default async function TimelinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const events = await getTimeline()
  return (
    <PageShell locale={locale}>
      <PageHeading
        eyebrow="A chronology of change"
        title="Timeline"
        intro="From pre-1800 agricultural settlement to the present day, filtered by theme. Each entry carries the evidence label used throughout this archive."
      />
      <TimelineExplorer events={events} />
    </PageShell>
  )
}
