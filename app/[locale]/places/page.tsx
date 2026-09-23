import type { Metadata } from 'next'
import { PageShell, PageHeading } from '@/components/archive/PageShell'
import { PlacesDirectory } from '@/components/archive/Directories'
import { getPlaces } from '@/lib/content'

export const metadata: Metadata = { title: 'Places | Patidar History', description: 'Villages, cities and regions connected through the Patidar story.' }

export default async function PlacesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const places = await getPlaces()
  return (
    <PageShell locale={locale}>
      <PageHeading
        eyebrow="A geography of belonging"
        title="Places in the Patidar story"
        intro="From Charotar villages to East African trading towns and British resettlement cities — the places that carry this history, each labelled by its documented significance."
      />
      <PlacesDirectory locale={locale} places={places} />
    </PageShell>
  )
}
