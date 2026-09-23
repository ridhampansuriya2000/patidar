import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { PageShell } from '@/components/archive/PageShell'
import { Breadcrumbs } from '@/components/archive/Breadcrumbs'
import { EvidenceBadge } from '@/components/archive/EvidenceBadge'
import { ContentBlockRenderer } from '@/components/archive/ContentBlocks'
import { ArticleCard, DocumentCard } from '@/components/archive/Cards'
import { getPlaceBySlug, getArticleBySlug, getPeopleBySlugs, getTimelineByIds, getDocumentsBySlugs, getReferencesByIds } from '@/lib/content'
import { isLocale, localize, t, ui, type Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const place = await getPlaceBySlug(slug)
  if (!place) return {}
  return { title: `${place.name} | Patidar History`, description: place.description }
}

export default async function PlaceDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en'
  const place = await getPlaceBySlug(slug)
  if (!place) notFound()

  const [articles, people, timelineEvents, documents, references] = await Promise.all([
    Promise.all((place.relatedArticleSlugs ?? []).map((s) => getArticleBySlug(s))).then((a) => a.filter(Boolean)) as any,
    getPeopleBySlugs(place.relatedPersonSlugs),
    getTimelineByIds(place.timelineEventIds),
    getDocumentsBySlugs(place.documentSlugs),
    getReferencesByIds(place.referenceIds ?? []),
  ])

  // Place.historicalSignificance has no per-locale variant, so body text is always English
  // even on the rare place where descriptionI18n (just the one summary line) is set.
  const isTranslated = locale === 'en'

  return (
    <PageShell locale={locale}>
      <div className="archive-heading" style={{ marginBottom: 0 }}>
        <Breadcrumbs locale={locale} trail={[{ label: t(ui.nav.places, locale), href: `/${locale}/places` }, { label: place.name }]} />
      </div>

      <div className="profile-hero">
        <img src={place.imageUrl} alt={place.name} />
        <div className="profile-hero-meta">
          <EvidenceBadge level={place.evidenceLevel ?? 'documented'} locale={locale} />
          <h1>{localize(place.nameI18n, place.name, locale)}</h1>
          <p className="profile-known-for"><MapPin style={{ width: 14, display: 'inline', verticalAlign: '-2px' }} /> {place.region}{place.period ? ` · ${place.period}` : ''}</p>
          <p className="profile-known-for">{localize(place.descriptionI18n, place.description, locale)}</p>
          <div className="profile-tags"><span>{place.type.replace('-', ' ')}</span></div>
        </div>
      </div>

      <div className="profile-layout">
        <div>
          {!isTranslated && (
            <div className="cb-note evidence-open-question" style={{ marginBottom: 30 }}>
              <p style={{ margin: 0 }}>{t(ui.common.translationPendingGeneric, locale)}</p>
            </div>
          )}
          <h2 className="cb-heading">{t(ui.common.historicalSignificance, locale)}</h2>
          <ContentBlockRenderer blocks={place.historicalSignificance} locale={locale} references={references} />

          {place.patidarConnection && (
            <div className="cb-factbox" style={{ marginTop: 30 }}>
              <h4>{t(ui.common.patidarConnection, locale)}</h4>
              <p style={{ color: 'var(--archive-ink)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{place.patidarConnection}</p>
            </div>
          )}
          {place.modernContext && (
            <div style={{ marginTop: 30 }}>
              <h2 className="cb-heading">{t(ui.common.modernContext, locale)}</h2>
              <p className="cb-paragraph">{place.modernContext}</p>
            </div>
          )}

          <div className="cb-map" style={{ marginTop: 30 }}>
            <MapPin />
            <div><strong>{place.name}</strong><span>{t(ui.common.illustrativeMap, locale)}</span></div>
          </div>

          {references.length > 0 && (
            <div style={{ marginTop: 50 }}>
              <h2 className="cb-heading">{t(ui.common.references, locale)}</h2>
              <div className="references-list" style={{ marginTop: 20 }}>
                {references.map((ref, i) => (
                  <div className="reference-row" id={`ref-${ref.id}`} key={ref.id}>
                    <span className="ref-number">{i + 1}</span>
                    <div><strong>{ref.title}</strong><p>{[ref.author, ref.publisher, ref.year, ref.page ? `p. ${ref.page}` : null].filter(Boolean).join(' · ')}</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="profile-side">
          {timelineEvents.length > 0 && (
            <div>
              <h3>{t(ui.common.timeline, locale)}</h3>
              {timelineEvents.map((e) => (
                <div key={e.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--archive-line)' }}>
                  <span style={{ color: 'var(--archive-rust)', fontSize: 12, fontWeight: 700 }}>{e.year}</span>
                  <p style={{ margin: '4px 0 0', fontSize: 13 }}>{e.title}</p>
                </div>
              ))}
            </div>
          )}
          {people.length > 0 && (
            <div>
              <h3>{t(ui.common.importantPeople, locale)}</h3>
              <div className="side-link-list">
                {people.map((p) => (
                  <Link key={p.id} className="side-link-row" href={`/${locale}/people/${p.slug}`}>
                    <img src={p.imageUrl} alt={p.name} /><span>{p.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {documents.length > 0 && (
        <section style={{ marginTop: 90 }}>
          <div className="feature-heading"><div><p className="eyebrow">{t(ui.common.documents, locale)}</p></div></div>
          <div className="doc-grid">{documents.map((d) => <DocumentCard key={d.id} locale={locale} document={d} />)}</div>
        </section>
      )}
      {articles.length > 0 && (
        <section style={{ marginTop: 70 }}>
          <div className="feature-heading"><div><p className="eyebrow">{t(ui.common.relatedArticles, locale)}</p></div></div>
          <div className="directory-grid">{articles.map((a: any) => <ArticleCard key={a.id} locale={locale} article={a} />)}</div>
        </section>
      )}
    </PageShell>
  )
}

export async function generateStaticParams() {
  const { getPlaces } = await import('@/lib/content')
  const places = await getPlaces()
  const locales = ['en', 'gu', 'hi']
  return locales.flatMap((locale) => places.map((p) => ({ locale, slug: p.slug })))
}
