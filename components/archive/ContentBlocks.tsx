import Link from 'next/link'
import { BookOpen, MapPin } from 'lucide-react'
import type { ContentBlock, Reference } from '@/types/content'
import { getDocumentBySlug, getPersonBySlug, getPlaceBySlug } from '@/lib/content'
import { EvidenceBadge } from './EvidenceBadge'

function citationNumber(references: Reference[], id: string) {
  const index = references.findIndex((r) => r.id === id)
  return index === -1 ? null : index + 1
}

async function Block({ block, locale, references }: { block: ContentBlock; locale: string; references: Reference[] }) {
  switch (block.type) {
    case 'heading':
      return <h2 id={`h-${block.id}`} className="cb-heading">{block.data.text}</h2>
    case 'subheading':
      return <p className="cb-subheading">{block.data.text}</p>
    case 'paragraph':
      return (
        <p className="cb-paragraph">
          {block.data.text}
          {block.data.citationIds?.map((id) => {
            const n = citationNumber(references, id)
            return n ? <sup key={id}><a href={`#ref-${id}`} className="citation-marker">[{n}]</a></sup> : null
          })}
        </p>
      )
    case 'quote':
      return (
        <blockquote className="cb-quote">
          {block.data.text}
          {(block.data.author || block.data.source) && <cite>{[block.data.author, block.data.source, block.data.year].filter(Boolean).join(' · ')}</cite>}
        </blockquote>
      )
    case 'image':
      return (
        <figure className={`cb-image width-${block.data.width ?? 'inline'}`}>
          <img src={block.data.url} alt={block.data.alt} loading="lazy" />
          {(block.data.caption || block.data.credit) && (
            <figcaption><span>{block.data.caption}</span><span>{block.data.credit}</span></figcaption>
          )}
        </figure>
      )
    case 'gallery':
      return (
        <div className="cb-gallery">
          {block.data.images.map((image, i) => (
            <figure key={i}>
              <img src={image.url} alt={image.alt} loading="lazy" />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      )
    case 'timeline':
      return (
        <div className="cb-timeline">
          {block.data.events.map((event, i) => (
            <div className="cb-timeline-item" key={i}>
              <span className="cb-t-year">{event.year}</span>
              <h4>{event.title}</h4>
              {event.description && <p>{event.description}</p>}
            </div>
          ))}
        </div>
      )
    case 'statistics':
      return (
        <div className="cb-stats">
          {block.data.stats.map((stat, i) => (
            <div className="cb-stat" key={i}><strong>{stat.value}</strong><span>{stat.label}</span></div>
          ))}
        </div>
      )
    case 'fact-box':
      return (
        <div className="cb-factbox">
          {block.data.evidenceLevel && <div style={{ marginBottom: 12 }}><EvidenceBadge level={block.data.evidenceLevel} locale={locale as any} /></div>}
          <h4>{block.data.title}</h4>
          <ul>{block.data.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>
      )
    case 'historical-note':
      return (
        <div className={`cb-note evidence-${block.data.evidenceLevel}`}>
          <div>
            <EvidenceBadge level={block.data.evidenceLevel} locale={locale as any} />
            <p style={{ marginTop: 10 }}>{block.data.text}</p>
          </div>
        </div>
      )
    case 'comparison':
      return (
        <div className="cb-comparison">
          <div><h4>{block.data.left.title}</h4><ul>{block.data.left.points.map((pt, i) => <li key={i}>{pt}</li>)}</ul></div>
          <div><h4>{block.data.right.title}</h4><ul>{block.data.right.points.map((pt, i) => <li key={i}>{pt}</li>)}</ul></div>
        </div>
      )
    case 'table':
      return (
        <div className="cb-table-wrap">
          <table className="cb-table">
            {block.data.caption && <caption>{block.data.caption}</caption>}
            <thead><tr>{block.data.headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
            <tbody>{block.data.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )
    case 'map':
      return (
        <div className="cb-map">
          <MapPin />
          <div><strong>{block.data.label}</strong>{block.data.caption && <span>{block.data.caption}</span>}</div>
        </div>
      )
    case 'person-ref': {
      const person = await getPersonBySlug(block.data.personSlug)
      if (!person) return null
      return (
        <Link className="cb-ref-card" href={`/${locale}/people/${person.slug}`}>
          <img src={person.imageUrl} alt={person.name} />
          <div><strong>{person.name}</strong><span>{person.knownFor}</span></div>
        </Link>
      )
    }
    case 'place-ref': {
      const place = await getPlaceBySlug(block.data.placeSlug)
      if (!place) return null
      return (
        <Link className="cb-ref-card" href={`/${locale}/places/${place.slug}`}>
          <div className="cb-ref-icon"><MapPin /></div>
          <div><strong>{place.name}</strong><span>{place.region}</span></div>
        </Link>
      )
    }
    case 'document-ref': {
      const doc = await getDocumentBySlug(block.data.documentSlug)
      if (!doc) return null
      return (
        <Link className="cb-ref-card" href={`/${locale}/library/${doc.slug}`}>
          <div className="cb-ref-icon"><BookOpen /></div>
          <div><strong>{doc.title}</strong><span>{doc.author} · {doc.year}</span></div>
        </Link>
      )
    }
    case 'citation':
      return null
    case 'divider':
      return <hr className="cb-divider" />
    default:
      return null
  }
}

export async function ContentBlockRenderer({ blocks, locale, references }: { blocks: ContentBlock[]; locale: string; references: Reference[] }) {
  const sorted = [...blocks].sort((a, b) => a.order - b.order)
  return (
    <div className="article-content">
      {sorted.map((block) => <Block key={block.id} block={block} locale={locale} references={references} />)}
    </div>
  )
}
