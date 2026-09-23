import type { Metadata } from 'next'
import { PageShell, PageHeading } from '@/components/archive/PageShell'
import { PeopleDirectory } from '@/components/archive/Directories'
import { getPeople } from '@/lib/content'
import { isLocale, pageCopy } from '@/lib/i18n'

export const metadata: Metadata = { title: 'People | Patidar History', description: 'A biographical directory of the people who shaped Patidar history.' }

export default async function PeoplePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const people = await getPeople()
  return (
    <PageShell locale={locale}>
      <PageHeading {...pageCopy('people', isLocale(locale) ? locale : 'en')} />
      <PeopleDirectory locale={locale} people={people} />
    </PageShell>
  )
}
