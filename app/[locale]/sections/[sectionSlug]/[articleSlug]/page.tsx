import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Calendar, Clock } from 'lucide-react'
import { PageShell } from '@/components/archive/PageShell'
import { Breadcrumbs } from '@/components/archive/Breadcrumbs'
import { EvidenceBadge } from '@/components/archive/EvidenceBadge'
import { ContentBlockRenderer } from '@/components/archive/ContentBlocks'
import { ArticleCard, PersonCard, PlaceCard } from '@/components/archive/Cards'
import { TableOfContents, FontSizeControl, ShareButton, CopyLinkButton } from '@/components/archive/ArticleChrome'
import {
  getArticleBySlug, getSectionBySlug, getRelatedArticles, getPeopleBySlugs, getPlacesBySlugs, getDocumentsBySlugs,
} from '@/lib/content'
import { isLocale, localize, t, ui, type Locale } from '@/lib/i18n'
import type { ContentBlock } from '@/types/content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; sectionSlug: string; articleSlug: string }> }): Promise<Metadata> {
  const { articleSlug } = await params
  const article = await getArticleBySlug(articleSlug)
  if (!article) return {}
  return {
    title: `${article.title} | Patidar History`,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, images: [article.heroImage.url] },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string; sectionSlug: string; articleSlug: string }> }) {
  const { locale: rawLocale, sectionSlug, articleSlug } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en'
  const article = await getArticleBySlug(articleSlug)
  if (!article || article.sectionSlug !== sectionSlug) notFound()

  const section = await getSectionBySlug(sectionSlug)
  const [related, relatedPeople, relatedPlaces, relatedDocs] = await Promise.all([
    getRelatedArticles(article),
    getPeopleBySlugs(article.relatedPersonSlugs),
    getPlacesBySlugs(article.relatedPlaceSlugs),
    getDocumentsBySlugs(article.documentSlugs),
  ])

  const localizedBody: ContentBlock[] = locale !== 'en' && article.contentI18n?.[locale] ? article.contentI18n[locale]! : article.content
  const usingFallback = locale !== 'en' && !article.contentI18n?.[locale]
  const headings = article.content.filter((b) => b.type === 'heading').map((b) => ({ id: `h-${b.id}`, text: (b.data as any).text }))

  const title = localize(article.titleI18n, article.title, locale)
  const subtitle = localize(article.subtitleI18n, article.subtitle, locale)

  return (
    <PageShell locale={locale} withProgress>
      <div className="archive-heading" style={{ maxWidth: 900 }}>
        <Breadcrumbs
          locale={locale}
          trail={[
            { label: 'Sections', href: `/${locale}/sections` },
            { label: section?.title ?? sectionSlug, href: `/${locale}/sections/${sectionSlug}` },
            { label: title },
          ]}
        />
      </div>

      <article>
        <div className="article-shell-header">
          <div className="article-eyebrow-row">
            <EvidenceBadge level={article.evidenceLevel} locale={locale} />
            <span className="eyebrow" style={{ margin: 0 }}>{article.historicalPeriod}</span>
          </div>
          <h1 className="article-title">{title}</h1>
          <p className="article-subtitle">{subtitle}</p>
          <div className="article-meta-row">
            <span>By {article.author}</span>
            <span className="meta-sep">·</span>
            <span><Calendar style={{ width: 12, display: 'inline', verticalAlign: '-2px' }} /> {new Date(article.publishedDate).toLocaleDateString(locale === 'gu' ? 'gu-IN' : locale === 'hi' ? 'hi-IN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="meta-sep">·</span>
            <span><Clock style={{ width: 12, display: 'inline', verticalAlign: '-2px' }} /> {article.readingTime} {t(ui.common.minRead, locale)}</span>
            <div className="article-meta-actions">
              <ShareButton />
              <CopyLinkButton />
            </div>
          </div>
        </div>

        <figure className="article-hero-figure">
          <img src={article.heroImage.url} alt={article.heroImage.alt} />
          {(article.heroImage.caption || article.heroImage.credit) && (
            <figcaption><span>{article.heroImage.caption}</span><span>{article.heroImage.credit}</span></figcaption>
          )}
        </figure>

        <div className="article-layout">
          <div>
            {usingFallback && (
              <div className="cb-note evidence-open-question" style={{ marginBottom: 30 }}>
                <p style={{ margin: 0 }}>{t(ui.common.translationPending, locale)}</p>
              </div>
            )}
            <ContentBlockRenderer blocks={localizedBody} locale={locale} references={article.references} />

            {article.references.length > 0 && (
              <div style={{ marginTop: 60 }}>
                <h2 className="cb-heading">{t(ui.common.references, locale)}</h2>
                <div className="references-list" style={{ marginTop: 20 }}>
                  {article.references.map((ref, i) => (
                    <div className="reference-row" id={`ref-${ref.id}`} key={ref.id}>
                      <span className="ref-number">{i + 1}</span>
                      <div>
                        <strong>{ref.title}</strong>
                        <p>{[ref.author, ref.publisher, ref.year, ref.page ? `p. ${ref.page}` : null].filter(Boolean).join(' · ')}</p>
                        {ref.documentSlug && <Link href={`/${locale}/library/${ref.documentSlug}`}>View document</Link>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside>
            <TableOfContents headings={headings} label={t(ui.common.tableOfContents, locale)} />
            <FontSizeControl />
          </aside>
        </div>
      </article>

      {relatedPeople.length > 0 && (
        <section style={{ marginTop: 100 }}>
          <div className="feature-heading"><div><p className="eyebrow">{t(ui.common.relatedPeople, locale)}</p></div></div>
          <div className="directory-grid">{relatedPeople.map((p) => <PersonCard key={p.id} locale={locale} person={p} />)}</div>
        </section>
      )}
      {relatedPlaces.length > 0 && (
        <section style={{ marginTop: 70 }}>
          <div className="feature-heading"><div><p className="eyebrow">{t(ui.common.relatedPlaces, locale)}</p></div></div>
          <div className="directory-grid">{relatedPlaces.map((p) => <PlaceCard key={p.id} locale={locale} place={p} />)}</div>
        </section>
      )}
      {relatedDocs.length > 0 && (
        <section style={{ marginTop: 70 }}>
          <div className="feature-heading"><div><p className="eyebrow">{t(ui.common.documents, locale)}</p></div></div>
          <div className="doc-grid">
            {relatedDocs.map((doc) => (
              <Link key={doc.id} className="cb-ref-card" href={`/${locale}/library/${doc.slug}`}>
                <div className="cb-ref-icon"><BookOpen /></div>
                <div><strong>{doc.title}</strong><span>{doc.author} · {doc.year}</span></div>
              </Link>
            ))}
          </div>
        </section>
      )}
      {related.length > 0 && (
        <section style={{ marginTop: 70 }}>
          <div className="feature-heading"><div><p className="eyebrow">{t(ui.common.relatedArticles, locale)}</p></div></div>
          <div className="directory-grid">{related.map((a) => <ArticleCard key={a.id} locale={locale} article={a} />)}</div>
        </section>
      )}
    </PageShell>
  )
}

export async function generateStaticParams() {
  const { getArticles } = await import('@/lib/content')
  const articles = await getArticles()
  const locales = ['en', 'gu', 'hi']
  return locales.flatMap((locale) => articles.map((a) => ({ locale, sectionSlug: a.sectionSlug, articleSlug: a.slug })))
}
