import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageShell } from '@/components/archive/PageShell'
import { Breadcrumbs } from '@/components/archive/Breadcrumbs'
import { ContentBlockRenderer } from '@/components/archive/ContentBlocks'
import { ArticleCard, PersonCard, PlaceCard, DocumentCard } from '@/components/archive/Cards'
import { getRegionBySlug, getArticleBySlug, getPeopleBySlugs, getPlacesBySlugs, getDocumentsBySlugs, getTimelineByIds } from '@/lib/content'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const region = await getRegionBySlug(slug)
  if (!region) return {}
  return { title: `${region.name} | Patidar History`, description: region.description }
}

export default async function RegionDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const region = await getRegionBySlug(slug)
  if (!region) notFound()

  const [articles, people, places, documents, timelineEvents] = await Promise.all([
    Promise.all((region.relatedArticleSlugs ?? []).map((s) => getArticleBySlug(s))).then((a) => a.filter(Boolean)) as any,
    getPeopleBySlugs(region.relatedPersonSlugs),
    getPlacesBySlugs(region.relatedPlaceSlugs),
    getDocumentsBySlugs(region.documentSlugs),
    getTimelineByIds(region.timelineEventIds),
  ])

  return (
    <PageShell locale={locale}>
      <div className="archive-heading" style={{ marginBottom: 0 }}>
        <Breadcrumbs locale={locale} trail={[{ label: 'Regions', href: `/${locale}/regions` }, { label: region.name }]} />
      </div>

      <div className="section-detail" style={{ marginTop: 40 }}>
        <img src={region.imageUrl} alt={region.name} />
        <div>
          <p className="eyebrow">{region.tagline}</p>
          <h1 style={{ font: '400 clamp(2.2rem,5vw,3.6rem)/1.02 "DM Serif Display", serif', margin: '10px 0 20px' }}>{region.name}</h1>
          <p>{region.description}</p>

          <h2>Patidar connection</h2>
          <p>{region.patidarConnection}</p>

          {region.agriculture && (<><h2>Agriculture</h2><p>{region.agriculture}</p></>)}
          {region.migration && (<><h2>Migration</h2><p>{region.migration}</p></>)}

          <h2>Key areas</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 30 }}>
            {region.keyAreas.map((area) => <span key={area} className="filter-chip" style={{ cursor: 'default' }}>{area}</span>)}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 760, marginTop: 20 }}>
        <ContentBlockRenderer blocks={region.historicalBackground} locale={locale} references={[]} />
      </div>

      {timelineEvents.length > 0 && (
        <section style={{ marginTop: 80 }}>
          <div className="feature-heading"><div><p className="eyebrow">Timeline</p></div></div>
          <div className="long-timeline">
            {timelineEvents.map((e) => <article key={e.id}><span>{e.year}</span><div><h2>{e.title}</h2><p>{e.description}</p></div></article>)}
          </div>
        </section>
      )}
      {people.length > 0 && (
        <section style={{ marginTop: 70 }}>
          <div className="feature-heading"><div><p className="eyebrow">Important people</p></div></div>
          <div className="directory-grid">{people.map((p) => <PersonCard key={p.id} locale={locale} person={p} />)}</div>
        </section>
      )}
      {places.length > 0 && (
        <section style={{ marginTop: 70 }}>
          <div className="feature-heading"><div><p className="eyebrow">Important places</p></div></div>
          <div className="directory-grid">{places.map((p) => <PlaceCard key={p.id} locale={locale} place={p} />)}</div>
        </section>
      )}
      {documents.length > 0 && (
        <section style={{ marginTop: 70 }}>
          <div className="feature-heading"><div><p className="eyebrow">Documents</p></div></div>
          <div className="doc-grid">{documents.map((d) => <DocumentCard key={d.id} locale={locale} document={d} />)}</div>
        </section>
      )}
      {articles.length > 0 && (
        <section style={{ marginTop: 70 }}>
          <div className="feature-heading"><div><p className="eyebrow">Articles</p></div></div>
          <div className="directory-grid">{articles.map((a: any) => <ArticleCard key={a.id} locale={locale} article={a} />)}</div>
        </section>
      )}
    </PageShell>
  )
}

export async function generateStaticParams() {
  const { getRegions } = await import('@/lib/content')
  const regions = await getRegions()
  const locales = ['en', 'gu', 'hi']
  return locales.flatMap((locale) => regions.map((r) => ({ locale, slug: r.slug })))
}
