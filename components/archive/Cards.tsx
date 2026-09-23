import Link from 'next/link'
import { ArrowUpRight, BookOpen, Calendar, MapPin } from 'lucide-react'
import type { Article, Section, Person, Place, Document, Region, DiasporaDestination, TimelineEvent } from '@/types/content'
import { EvidenceBadge } from './EvidenceBadge'

export function SectionCard({ locale, section, articleCount }: { locale: string; section: Section; articleCount: number }) {
  return (
    <Link className="archive-card" href={`/${locale}/sections/${section.slug}`}>
      <img src={section.coverImage.url} alt={section.coverImage.alt} loading="lazy" />
      <div>
        <p className="eyebrow">Section · {articleCount} article{articleCount === 1 ? '' : 's'}</p>
        <h2>{section.title}</h2>
        <p>{section.description}</p>
        <span>Explore <ArrowUpRight /></span>
      </div>
    </Link>
  )
}

export function ArticleCard({ locale, article }: { locale: string; article: Article }) {
  return (
    <Link className="directory-item" href={`/${locale}/sections/${article.sectionSlug}/${article.slug}`}>
      <img src={article.heroImage.url} alt={article.heroImage.alt} loading="lazy" />
      <div>
        <p className="eyebrow">{article.historicalPeriod} · {article.readingTime} min read</p>
        <h2>{article.title}</h2>
        <p>{article.excerpt}</p>
        <span>Read article <ArrowUpRight /></span>
      </div>
    </Link>
  )
}

export function PersonCard({ locale, person }: { locale: string; person: Person }) {
  return (
    <Link className="directory-item" href={`/${locale}/people/${person.slug}`}>
      <img src={person.imageUrl} alt={person.name} loading="lazy" />
      <div>
        <p className="eyebrow">{person.category} · {person.period}</p>
        <h2>{person.name}</h2>
        <p>{person.shortDescription}</p>
        <span>View profile <ArrowUpRight /></span>
      </div>
    </Link>
  )
}

export function PlaceCard({ locale, place }: { locale: string; place: Place }) {
  return (
    <Link className="directory-item" href={`/${locale}/places/${place.slug}`}>
      <img src={place.imageUrl} alt={place.name} loading="lazy" />
      <div>
        <p className="eyebrow"><MapPin style={{ width: 11, display: 'inline', verticalAlign: '-1px' }} /> {place.region}</p>
        <h2>{place.name}</h2>
        <p>{place.description}</p>
        <span>View record <ArrowUpRight /></span>
      </div>
    </Link>
  )
}

export function DocumentCard({ locale, document }: { locale: string; document: Document }) {
  return (
    <Link className="doc-card" href={`/${locale}/library/${document.slug}`}>
      <div className="doc-card-type"><span>{document.category}</span><BookOpen style={{ width: 14, height: 14 }} /></div>
      <h2>{document.title}</h2>
      <p>{document.author}{document.year ? ` · ${document.year}` : ''}</p>
      <div className="doc-card-footer">
        <span>{document.pages ? `${document.pages} pages` : document.type}</span>
        <span>View <ArrowUpRight style={{ width: 12, height: 12, display: 'inline' }} /></span>
      </div>
    </Link>
  )
}

export function RegionCard({ locale, region }: { locale: string; region: Region }) {
  return (
    <Link className="archive-card" href={`/${locale}/regions/${region.slug}`}>
      <img src={region.imageUrl} alt={region.name} loading="lazy" />
      <div>
        <p className="eyebrow">Region</p>
        <h2>{region.name}</h2>
        <p>{region.tagline}</p>
        <span>Explore <ArrowUpRight /></span>
      </div>
    </Link>
  )
}

export function DiasporaCard({ locale, destination }: { locale: string; destination: DiasporaDestination }) {
  return (
    <div className="archive-card" id={destination.slug}>
      <img src={destination.imageUrl} alt={destination.name} loading="lazy" />
      <div>
        <p className="eyebrow"><Calendar style={{ width: 11, display: 'inline', verticalAlign: '-1px' }} /> {destination.period}</p>
        <h2>{destination.name}</h2>
        <p>{destination.context.slice(0, 130)}…</p>
      </div>
    </div>
  )
}

export function TimelineEventCard({ event }: { event: TimelineEvent }) {
  return (
    <article className="timeline-page-event" id={event.id}>
      <span className="timeline-page-year">{event.year}</span>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <div className="timeline-page-tags">
        <span className="filter-chip" style={{ cursor: 'default' }}>{event.category}</span>
        {event.region && <span className="filter-chip" style={{ cursor: 'default' }}>{event.region}</span>}
        {event.evidenceLevel && <EvidenceBadge level={event.evidenceLevel} />}
      </div>
    </article>
  )
}
