import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell, PageHeading } from '@/components/archive/PageShell'
import { getDocuments } from '@/lib/content'
import { isLocale, pageCopy, t, ui } from '@/lib/i18n'

export const metadata: Metadata = { title: 'Sources | Patidar History', description: 'The five-tier source framework and major source categories used across this archive.' }

const TIERS = [
  { tier: 1, name: 'Primary sources', desc: 'Government records, court documents, census reports, land/revenue records, archival letters, contemporary newspapers, official biographies and legislative documents.' },
  { tier: 2, name: 'Scholarly research', desc: 'Peer-reviewed anthropology, history, sociology, migration studies and economic history — the backbone of this archive’s interpretive claims.' },
  { tier: 3, name: 'Reputable institutional sources', desc: 'Universities, museums, archives, government cultural institutions and established research centres.' },
  { tier: 4, name: 'Community sources', desc: 'Patidar Samaj publications, temple histories, genealogical records and community websites — essential for preserving tradition and local memory.' },
  { tier: 5, name: 'Family oral history', desc: 'Interviews and family documents. Valuable evidence, but always cross-checked against documentary sources before being presented as fact.' },
]

export default async function SourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'en'
  const documents = await getDocuments()

  return (
    <PageShell locale={locale}>
      <PageHeading
        {...pageCopy('sources', locale)}
        intro="This framework prevents two opposite mistakes: treating every community tradition as proven history, and dismissing community memory merely because it is not an academic publication."
      />

      {locale !== 'en' && (
        <div className="cb-note evidence-open-question" style={{ marginBottom: 40, maxWidth: 730 }}>
          <p style={{ margin: 0 }}>{t(ui.common.translationPendingGeneric, locale)}</p>
        </div>
      )}

      <div className="tier-list">
        {TIERS.map((tier) => (
          <div className="tier-row" key={tier.tier}>
            <strong>Tier {tier.tier}</strong>
            <p><strong style={{ color: 'var(--archive-ink)' }}>{tier.name}.</strong> {tier.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 70 }}>
        <div className="feature-heading"><div><p className="eyebrow">Full source catalogue</p></div><Link className="text-link" href={`/${locale}/library`}>{t(ui.common.viewAll, locale)}</Link></div>
        <div className="doc-grid">
          {documents.slice(0, 6).map((doc) => (
            <Link key={doc.id} className="doc-card" href={`/${locale}/library/${doc.slug}`}>
              <div className="doc-card-type"><span>Tier {doc.tier}</span><span>{doc.category}</span></div>
              <h2>{doc.title}</h2>
              <p>{doc.author}{doc.year ? ` · ${doc.year}` : ''}</p>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
