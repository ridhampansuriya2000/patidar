import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Download, FileText } from 'lucide-react'
import { PageShell } from '@/components/archive/PageShell'
import { Breadcrumbs } from '@/components/archive/Breadcrumbs'
import { ArticleCard } from '@/components/archive/Cards'
import { getDocumentBySlug, getArticleBySlug, getReferences } from '@/lib/content'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const doc = await getDocumentBySlug(slug)
  if (!doc) return {}
  return { title: `${doc.title} | Patidar History`, description: doc.description }
}

export default async function DocumentDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const doc = await getDocumentBySlug(slug)
  if (!doc) notFound()

  const [articles, allReferences] = await Promise.all([
    Promise.all((doc.relatedArticleSlugs ?? []).map((s) => getArticleBySlug(s))).then((a) => a.filter(Boolean)) as any,
    getReferences(),
  ])
  const citingReferences = allReferences.filter((r) => r.documentSlug === doc.slug)

  return (
    <PageShell locale={locale}>
      <div className="archive-heading" style={{ marginBottom: 0 }}>
        <Breadcrumbs locale={locale} trail={[{ label: 'Documents', href: `/${locale}/library` }, { label: doc.title }]} />
      </div>

      <div className="doc-detail-header" style={{ marginTop: 40 }}>
        <div className="doc-preview"><FileText /></div>
        <div>
          <p className="eyebrow">{doc.category} · {doc.type}</p>
          <h1 style={{ font: '400 clamp(1.8rem,4vw,3rem)/1.05 "DM Serif Display", serif', margin: '10px 0 18px' }}>{doc.title}</h1>
          <p style={{ color: 'var(--archive-text-muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 620 }}>{doc.description}</p>

          <dl className="doc-meta-table">
            <dt>Author</dt><dd>{doc.author ?? '—'}</dd>
            <dt>Year</dt><dd>{doc.year ?? '—'}</dd>
            <dt>Publisher</dt><dd>{doc.publisher ?? '—'}</dd>
            <dt>Language</dt><dd>{doc.language ?? '—'}</dd>
            <dt>Pages</dt><dd>{doc.pages ?? '—'}</dd>
            <dt>Source tier</dt><dd>Tier {doc.tier ?? '—'}</dd>
            <dt>Archive</dt><dd>{doc.archive ?? '—'}</dd>
          </dl>

          <div style={{ display: 'flex', gap: 14, marginTop: 10 }}>
            <button className="button" style={{ background: 'var(--archive-ink)', color: 'var(--archive-paper)', border: 0, cursor: 'not-allowed', opacity: .7 }} disabled>
              <Download /> Download (pending upload)
            </button>
          </div>
        </div>
      </div>

      {doc.tags && doc.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 50 }}>
          {doc.tags.map((tag) => <span key={tag} className="filter-chip" style={{ cursor: 'default' }}>{tag}</span>)}
        </div>
      )}

      <div style={{ maxWidth: 640 }}>
        <h2 className="cb-heading">Suggested citation</h2>
        <p className="citation-box" style={{ marginTop: 16 }}>
          {doc.author ?? 'Author unknown'}. <em>{doc.title}</em>. {doc.publisher ?? ''}{doc.year ? `, ${doc.year}` : ''}.
        </p>
      </div>

      {citingReferences.length > 0 && (
        <section style={{ marginTop: 60 }}>
          <div className="feature-heading"><div><p className="eyebrow">Cited at these pages</p></div></div>
          <div className="references-list">
            {citingReferences.map((ref) => (
              <div className="reference-row" key={ref.id}>
                <span className="ref-number">·</span>
                <div><strong>{ref.title}</strong><p>{[ref.author, ref.year, ref.page ? `p. ${ref.page}` : null].filter(Boolean).join(' · ')}</p></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {articles.length > 0 && (
        <section style={{ marginTop: 70 }}>
          <div className="feature-heading"><div><p className="eyebrow">Referenced by these articles</p></div></div>
          <div className="directory-grid">{articles.map((a: any) => <ArticleCard key={a.id} locale={locale} article={a} />)}</div>
        </section>
      )}
    </PageShell>
  )
}

export async function generateStaticParams() {
  const { getDocuments } = await import('@/lib/content')
  const documents = await getDocuments()
  const locales = ['en', 'gu', 'hi']
  return locales.flatMap((locale) => documents.map((d) => ({ locale, slug: d.slug })))
}
