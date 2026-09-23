import type { Metadata } from 'next'
import { PageShell, PageHeading } from '@/components/archive/PageShell'
import { PlacesDirectory } from '@/components/archive/Directories'
import { getPlaces } from '@/lib/content'
import { isLocale, pageCopy } from '@/lib/i18n'

export const metadata: Metadata = { title: 'Places | Patidar History', description: 'Villages, cities and regions connected through the Patidar story.' }

export default async function PlacesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const places = await getPlaces()
  return (
    <PageShell locale={locale}>
      <PageHeading {...pageCopy('places', isLocale(locale) ? locale : 'en')} />
      <PlacesDirectory locale={locale} places={places} />
    </PageShell>
  )
}
