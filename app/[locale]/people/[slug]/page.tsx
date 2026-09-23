import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageShell } from '@/components/archive/PageShell'
import { Breadcrumbs } from '@/components/archive/Breadcrumbs'
import { EvidenceBadge } from '@/components/archive/EvidenceBadge'
import { ContentBlockRenderer } from '@/components/archive/ContentBlocks'
import { ArticleCard } from '@/components/archive/Cards'
import { getPersonBySlug, getArticleBySlug, getPlacesBySlugs, getTimelineByIds, getPeopleBySlugs, getReferencesByIds } from '@/lib/content'
import { isLocale, localize, type Locale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const person = await getPersonBySlug(slug)
  if (!person) return {}
  return { title: `${person.name} | Patidar History`, description: person.shortDescription }
}

export default async function PersonDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en'
  const person = await getPersonBySlug(slug)
  if (!person) notFound()

  const [articles, places, timelineEvents, relatedPeople, references] = await Promise.all([
    Promise.all((person.relatedArticleSlugs ?? []).map((s) => getArticleBySlug(s))).then((a) => a.filter(Boolean)) as any,
    getPlacesBySlugs(person.relatedPlaceSlugs),
    getTimelineByIds(person.timelineEventIds),
    getPeopleBySlugs(person.relatedPersonSlugs),
    getReferencesByIds(person.referenceIds ?? []),
  ])

  return (
    <PageShell locale={locale}>
      <div className="archive-heading" style={{ marginBottom: 0 }}>
        <Breadcrumbs locale={locale} trail={[{ label: 'People', href: `/${locale}/people` }, { label: person.name }]} />
      </div>

      <div className="profile-hero">
        <img src={person.imageUrl} alt={person.name} />
        <div className="profile-hero-meta">
          <EvidenceBadge level={person.evidenceLevel ?? 'documented'} locale={locale} />
          <h1>{localize(person.nameI18n, person.name, locale)}</h1>
          <p className="profile-known-for">{person.knownFor}</p>
          <div className="profile-tags">
            <span>{person.category}</span>
            <span>{person.region}</span>
            <span>{person.period}</span>
            {person.occupation?.map((o) => <span key={o}>{o}</span>)}
          </div>
        </div>
      </div>

      <div className="profile-layout">
        <div>
          <ContentBlockRenderer blocks={person.biography} locale={locale} references={references} />

          {references.length > 0 && (
            <div style={{ marginTop: 50 }}>
              <h2 className="cb-heading">References</h2>
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
              <h3>Timeline</h3>
              {timelineEvents.map((e) => (
                <div key={e.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--archive-line)' }}>
                  <span style={{ color: 'var(--archive-rust)', fontSize: 12, fontWeight: 700 }}>{e.year}</span>
                  <p style={{ margin: '4px 0 0', fontSize: 13 }}>{e.title}</p>
                </div>
              ))}
            </div>
          )}
          {places.length > 0 && (
            <div>
              <h3>Related places</h3>
              <div className="side-link-list">
                {places.map((p) => (
                  <Link key={p.id} className="side-link-row" href={`/${locale}/places/${p.slug}`}>
                    <img src={p.imageUrl} alt={p.name} /><span>{p.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {relatedPeople.length > 0 && (
            <div>
              <h3>Related people</h3>
              <div className="side-link-list">
                {relatedPeople.map((p) => (
                  <Link key={p.id} className="side-link-row" href={`/${locale}/people/${p.slug}`}>
                    <img src={p.imageUrl} alt={p.name} /><span>{p.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {articles.length > 0 && (
        <section style={{ marginTop: 90 }}>
          <div className="feature-heading"><div><p className="eyebrow">Related articles</p></div><Link className="text-link" href={`/${locale}/sections`}>All sections <ArrowUpRight /></Link></div>
          <div className="directory-grid">{articles.map((a: any) => <ArticleCard key={a.id} locale={locale} article={a} />)}</div>
        </section>
      )}
    </PageShell>
  )
}

export async function generateStaticParams() {
  const { getPeople } = await import('@/lib/content')
  const people = await getPeople()
  const locales = ['en', 'gu', 'hi']
  return locales.flatMap((locale) => people.map((p) => ({ locale, slug: p.slug })))
}
