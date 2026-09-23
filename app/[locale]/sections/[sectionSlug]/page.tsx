import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight, BookOpen, MapPin, Users } from 'lucide-react'
import { PageShell } from '@/components/archive/PageShell'
import { Breadcrumbs } from '@/components/archive/Breadcrumbs'
import { PersonCard, PlaceCard } from '@/components/archive/Cards'
import {
  getSectionBySlug, getArticlesBySection, getPeopleBySlugs, getPlacesBySlugs, getDocumentsBySlugs, getTimelineByIds, getReferencesByIds,
} from '@/lib/content'
import { isLocale, localize, t, ui, type Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; sectionSlug: string }> }): Promise<Metadata> {
  const { sectionSlug } = await params
  const section = await getSectionBySlug(sectionSlug)
  if (!section) return {}
  return { title: `${section.title} | Patidar History`, description: section.description }
}

export default async function SectionDetailPage({ params }: { params: Promise<{ locale: string; sectionSlug: string }> }) {
  const { locale: rawLocale, sectionSlug } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en'
  const section = await getSectionBySlug(sectionSlug)
  if (!section) notFound()

  const [articles, people, places, documents, timelineEvents, references] = await Promise.all([
    getArticlesBySection(section.slug),
    getPeopleBySlugs(section.relatedPersonSlugs),
    getPlacesBySlugs(section.relatedPlaceSlugs),
    getDocumentsBySlugs(section.documentSlugs),
    getTimelineByIds(section.timelineEventIds),
    getReferencesByIds(section.referenceIds ?? []),
  ])

  // Only the title/description are translatable on Section; intro and subsections are always
  // English, so show the notice for any non-English locale rather than half-translating silently.
  const isTranslated = locale === 'en'

  return (
    <PageShell locale={locale}>
      <div className="archive-heading">
        <Breadcrumbs locale={locale} trail={[{ label: t(ui.nav.sections, locale), href: `/${locale}/sections` }, { label: section.title }]} />
        <p className="eyebrow">{t(ui.common.historicalSection, locale)}</p>
        <h1>{localize(section.titleI18n, section.title, locale)}</h1>
        <p>{localize(section.descriptionI18n, section.description, locale)}</p>
      </div>

      {!isTranslated && (
        <div className="cb-note evidence-open-question" style={{ marginBottom: 40, maxWidth: 730 }}>
          <p style={{ margin: 0 }}>{t(ui.common.translationPendingGeneric, locale)}</p>
        </div>
      )}

      <div className="section-detail">
        <img src={section.coverImage.url} alt={section.coverImage.alt} />
        <div>
          <p>{section.intro}</p>

          {section.subsections && section.subsections.length > 0 && (
            <>
              <h2>{t(ui.common.inThisSection, locale)}</h2>
              {section.subsections.map((sub) => (
                <div key={sub.id} style={{ padding: '18px 0', borderTop: '1px solid var(--archive-line)' }}>
                  <strong style={{ display: 'block', fontFamily: 'DM Serif Display, serif', fontSize: 19, marginBottom: 6 }}>{sub.title}</strong>
                  <span style={{ color: 'var(--archive-text-muted)', fontSize: 13.5 }}>{sub.description}</span>
                </div>
              ))}
            </>
          )}

          <h2 style={{ marginTop: 46 }}>{t(ui.common.allArticles, locale)}</h2>
          {articles.length === 0 ? (
            <p style={{ color: 'var(--archive-text-muted)' }}>{t(ui.common.articlesBeingPrepared, locale)}</p>
          ) : (
            articles.map((article) => (
              <Link className="article-row" key={article.id} href={`/${locale}/sections/${section.slug}/${article.slug}`}>
                <span>{article.readingTime} {t(ui.common.minRead, locale)}</span>
                <strong>{localize(article.titleI18n, article.title, locale)}</strong>
                <ArrowUpRight />
              </Link>
            ))
          )}
        </div>
      </div>

      {people.length > 0 && (
        <div style={{ marginTop: 90 }}>
          <div className="feature-heading"><div><p className="eyebrow"><Users style={{ width: 12, display: 'inline', verticalAlign: '-1px' }} /> {t(ui.common.relatedPeople, locale)}</p></div></div>
          <div className="directory-grid">{people.map((p) => <PersonCard key={p.id} locale={locale} person={p} />)}</div>
        </div>
      )}

      {places.length > 0 && (
        <div style={{ marginTop: 70 }}>
          <div className="feature-heading"><div><p className="eyebrow"><MapPin style={{ width: 12, display: 'inline', verticalAlign: '-1px' }} /> {t(ui.common.relatedPlaces, locale)}</p></div></div>
          <div className="directory-grid">{places.map((p) => <PlaceCard key={p.id} locale={locale} place={p} />)}</div>
        </div>
      )}

      {timelineEvents.length > 0 && (
        <div style={{ marginTop: 70 }}>
          <div className="feature-heading"><div><p className="eyebrow">{t(ui.common.timelineEvents, locale)}</p></div></div>
          <div className="long-timeline">
            {timelineEvents.map((event) => (
              <article key={event.id}><span>{event.year}</span><div><h2>{event.title}</h2><p>{event.description}</p></div></article>
            ))}
          </div>
        </div>
      )}

      {(documents.length > 0 || references.length > 0) && (
        <div style={{ marginTop: 70 }}>
          <div className="feature-heading"><div><p className="eyebrow"><BookOpen style={{ width: 12, display: 'inline', verticalAlign: '-1px' }} /> {t(ui.common.sourcesForSection, locale)}</p></div></div>
          {documents.length > 0 && (
            <div className="doc-grid" style={{ marginBottom: 24 }}>
              {documents.map((doc) => (
                <Link key={doc.id} className="cb-ref-card" href={`/${locale}/library/${doc.slug}`}>
                  <div className="cb-ref-icon"><BookOpen /></div>
                  <div><strong>{doc.title}</strong><span>{doc.author} · {doc.year}</span></div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </PageShell>
  )
}

export async function generateStaticParams() {
  const { getSections } = await import('@/lib/content')
  const sections = await getSections()
  const locales = ['en', 'gu', 'hi']
  return locales.flatMap((locale) => sections.map((s) => ({ locale, sectionSlug: s.slug })))
}
