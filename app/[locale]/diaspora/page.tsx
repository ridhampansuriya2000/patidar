import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Calendar } from 'lucide-react'
import { PageShell, PageHeading } from '@/components/archive/PageShell'
import { MapPanel } from '@/components/archive/MapPanel'
import { PersonCard } from '@/components/archive/Cards'
import { getDiaspora, getPeopleBySlugs, getArticleBySlug } from '@/lib/content'

export const metadata: Metadata = { title: 'Global Diaspora | Patidar History', description: 'East Africa, Britain, the United States, Canada and Australia — the global journey of the Patidar diaspora.' }

export default async function DiasporaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const destinations = await getDiaspora()

  return (
    <PageShell locale={locale}>
      <PageHeading
        eyebrow="Beyond Gujarat"
        title="A global community"
        intro="From colonial-era East African trade to British resettlement, American hospitality entrepreneurship and beyond — explore this connected geography through carefully sourced stories, places and movement."
      />
      <MapPanel
        label="World"
        items={destinations.map((d) => ({ slug: d.slug, name: d.name, position: d.mapPosition, href: `#${d.slug}` }))}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: 'var(--archive-line)', border: '1px solid var(--archive-line)' }}>
        {await Promise.all(destinations.map(async (d) => {
          const people = await getPeopleBySlugs(d.relatedPersonSlugs)
          const articles = (await Promise.all((d.relatedArticleSlugs ?? []).map((s) => getArticleBySlug(s)))).filter(Boolean) as any[]
          return (
            <div key={d.id} id={d.slug} style={{ background: 'var(--archive-surface)', padding: '50px 5vw', scrollMarginTop: 100 }}>
              <div className="section-detail">
                <img src={d.imageUrl} alt={d.name} />
                <div>
                  <p className="eyebrow"><Calendar style={{ width: 11, display: 'inline', verticalAlign: '-1px' }} /> {d.period} · origin: {d.originGujarat}</p>
                  <h2 style={{ marginTop: 8 }}>{d.name}</h2>
                  <p>{d.context}</p>
                  <p>{d.settlement}</p>

                  <div className="two-col-panel" style={{ marginTop: 30 }}>
                    <div>
                      <h3 style={{ fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--archive-text-muted)' }}>Sectors</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                        {d.sectors.map((s) => <span key={s} className="filter-chip" style={{ cursor: 'default' }}>{s}</span>)}
                      </div>
                    </div>
                    <div>
                      <h3 style={{ fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--archive-text-muted)' }}>Institutions</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                        {d.institutions.map((s) => <span key={s} className="filter-chip" style={{ cursor: 'default' }}>{s}</span>)}
                      </div>
                    </div>
                  </div>

                  <h3 style={{ marginTop: 26, fontFamily: 'DM Serif Display, serif', fontWeight: 400, fontSize: 20 }}>The community today</h3>
                  <p>{d.modernCommunity}</p>

                  {articles.length > 0 && (
                    <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {articles.map((a) => (
                        <Link key={a.id} className="small-link" href={`/${locale}/sections/${a.sectionSlug}/${a.slug}`}>{a.title} <ArrowUpRight /></Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {people.length > 0 && (
                <div style={{ marginTop: 40 }}>
                  <div className="directory-grid">{people.map((p) => <PersonCard key={p.id} locale={locale} person={p} />)}</div>
                </div>
              )}
            </div>
          )
        }))}
      </div>
    </PageShell>
  )
}
