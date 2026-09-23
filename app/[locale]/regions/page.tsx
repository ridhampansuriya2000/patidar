import type { Metadata } from 'next'
import { PageShell, PageHeading } from '@/components/archive/PageShell'
import { RegionCard } from '@/components/archive/Cards'
import { MapPanel } from '@/components/archive/MapPanel'
import { getRegions } from '@/lib/content'
import { isLocale, pageCopy } from '@/lib/i18n'

export const metadata: Metadata = { title: 'Regions of Gujarat | Patidar History', description: 'An illustrated exploration of Gujarat’s regions and their distinct Patidar histories.' }

export default async function RegionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const regions = await getRegions()
  return (
    <PageShell locale={locale}>
      <PageHeading {...pageCopy('regions', isLocale(locale) ? locale : 'en')} />
      <MapPanel
        label="Gujarat"
        items={regions.map((r) => ({ slug: r.slug, name: r.name, position: r.mapPosition, href: `/${locale}/regions/${r.slug}` }))}
      />
      <div className="archive-card-grid">
        {regions.map((region) => <RegionCard key={region.id} locale={locale} region={region} />)}
      </div>
    </PageShell>
  )
}
