import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageShell, PageHeading } from '@/components/archive/PageShell'
import { EvidenceBadge } from '@/components/archive/EvidenceBadge'
import { getTimeline, getArticleBySlug } from '@/lib/content'

export const metadata: Metadata = {
  title: 'The Story of a Community | Patidar History',
  description: 'A chronological journey through Patidar history, from Kanbi agricultural roots to a global diaspora.',
}

export default async function HistoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const timeline = await getTimeline()
  const linkedArticles = await Promise.all(timeline.map((e) => (e.relatedArticleSlug ? getArticleBySlug(e.relatedArticleSlug) : Promise.resolve(undefined))))

  return (
    <PageShell locale={locale}>
      <PageHeading
        eyebrow="A layered history"
        title="The story of a community"
        intro="This is not a single straight-line story. It moves through agricultural settlement, landholding, revenue administration, social mobility, marriage networks, migration, entrepreneurship, political participation and changing identity — traced here as one continuous chronology."
      />
      <div className="long-timeline">
        {timeline.map((event, i) => {
          const article = linkedArticles[i]
          return (
            <article key={event.id} id={event.id}>
              <span>{event.year}</span>
              <div>
                <p className="eyebrow">{event.category}{event.region ? ` · ${event.region}` : ''}</p>
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                  {event.evidenceLevel && <EvidenceBadge level={event.evidenceLevel} />}
                  {article && (
                    <Link className="small-link" href={`/${locale}/sections/${article.sectionSlug}/${article.slug}`}>Read more <ArrowUpRight /></Link>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </PageShell>
  )
}
