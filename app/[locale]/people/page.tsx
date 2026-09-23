import type { Metadata } from 'next'
import { PageShell, PageHeading } from '@/components/archive/PageShell'
import { PeopleDirectory } from '@/components/archive/Directories'
import { getPeople } from '@/lib/content'

export const metadata: Metadata = { title: 'People | Patidar History', description: 'A biographical directory of the people who shaped Patidar history.' }

export default async function PeoplePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const people = await getPeople()
  return (
    <PageShell locale={locale}>
      <PageHeading
        eyebrow="People & memory"
        title="Lives that made history"
        intro="Freedom-movement organisers, cooperative leaders, scholars and diaspora entrepreneurs — profiles of the people whose work, lives and choices shaped this archive. Illustrative profiles are clearly marked where a verified individual biography is not yet available."
      />
      <PeopleDirectory locale={locale} people={people} />
    </PageShell>
  )
}
