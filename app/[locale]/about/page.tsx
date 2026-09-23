import type { Metadata } from 'next'
import { PageShell, PageHeading } from '@/components/archive/PageShell'
import { EvidenceBadge } from '@/components/archive/EvidenceBadge'

export const metadata: Metadata = { title: 'About | Patidar History', description: 'Purpose, methodology, sources and the evidence framework behind this archive.' }

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <PageShell locale={locale}>
      <PageHeading
        eyebrow="Institutional record"
        title="About this archive"
        intro="Patidar History is a research interface designed to make historical uncertainty visible and connections easy to follow — built as a starting point for a genuinely archival history of the Patidar community."
      />

      <div className="article-body institutional">
        <h2>Purpose</h2>
        <p>
          The Patidar story is not a single straight-line narrative. It is a history of agricultural communities, landholding, revenue
          administration, social mobility, marriage networks, migration, entrepreneurship, political participation and changing identity.
          This project exists to trace those threads together, in one connected reading and research experience, rather than as isolated
          facts scattered across community publications, family memory and academic monographs.
        </p>

        <h2 style={{ marginTop: 46 }}>The evidence framework</h2>
        <p>Every claim in this archive is labelled with one of four evidence levels, adapted directly from the research edition underlying this site:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '20px 0 30px' }}>
          <EvidenceBadge level="documented" locale={locale as any} />
          <EvidenceBadge level="scholarly-interpretation" locale={locale as any} />
          <EvidenceBadge level="community-tradition" locale={locale as any} />
          <EvidenceBadge level="open-question" locale={locale as any} />
        </div>
        <div className="methodology-grid">
          <div className="methodology-item"><h3>Documented</h3><p>Supported by archival, government, scholarly or other strong historical evidence — the standard applied to land-revenue records, government publications and peer-reviewed research.</p></div>
          <div className="methodology-item"><h3>Scholarly interpretation</h3><p>An interpretation offered by identified researchers, distinguished from settled fact so readers can weight it accordingly.</p></div>
          <div className="methodology-item"><h3>Community tradition</h3><p>A genealogy or origin account maintained by community organisations or oral tradition — culturally important without being independently verified history.</p></div>
          <div className="methodology-item"><h3>Open question</h3><p>Evidence is incomplete or competing explanations exist. This label marks the archive’s unfinished work honestly, rather than filling gaps with invented certainty.</p></div>
        </div>

        <h2 style={{ marginTop: 50 }}>Primary vs. secondary sources</h2>
        <p>
          The archive prioritises primary sources — government records, court documents, census reports, land and revenue records,
          archival letters and contemporary newspapers — above secondary scholarly research, institutional sources, community publications
          and family oral history, in that order. See the <a href={`/${locale}/sources`} className="text-link" style={{ display: 'inline-flex' }}>Sources</a> page
          for the full five-tier breakdown.
        </p>

        <h2 style={{ marginTop: 46 }}>Translation methodology</h2>
        <p>
          Content exists independently in English, Gujarati and Hindi through a structured translation field on every article, section and
          UI string. English is the source language for this research edition; Gujarati and Hindi translations are being completed
          article by article. Where a full translation is not yet available, the archive shows the English text with a clear notice rather
          than a machine-translated approximation presented as final.
        </p>

        <h2 style={{ marginTop: 46 }}>Corrections and contribution</h2>
        <p>
          This is a living archive. If you hold family records, land documents, photographs or oral histories that could verify, correct or
          extend an entry, the intended contribution pathway is a structured submission reviewed against this evidence framework before
          publication — not an anonymous edit. That contribution system is not yet built; this frontend is a prototype for the interface it
          will eventually connect to.
        </p>

        <h2 style={{ marginTop: 46 }}>What this project is not</h2>
        <p>
          This is not a genealogy service, a caste-certification tool, or a political platform. Where the underlying research material
          intersects with contested contemporary politics — such as the 2015 reservation movement — this archive treats the subject as a
          research summary requiring primary legal and government documentation, not as an occasion for endorsement or argument.
        </p>
      </div>
    </PageShell>
  )
}
