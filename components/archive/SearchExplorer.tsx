'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Search } from 'lucide-react'
import type { Article, Section, Person, Place, Document, TimelineEvent, Region, DiasporaDestination, SearchResult } from '@/types/content'

const LABEL: Record<SearchResult['type'], string> = {
  article: 'Articles', section: 'Sections', person: 'People', place: 'Places', document: 'Documents', timeline: 'Timeline', region: 'Regions', diaspora: 'Diaspora',
}

export function SearchExplorer({
  locale, sections, articles, people, places, documents, timeline, regions, diaspora,
}: {
  locale: string
  sections: Section[]
  articles: Article[]
  people: Person[]
  places: Place[]
  documents: Document[]
  timeline: TimelineEvent[]
  regions: Region[]
  diaspora: DiasporaDestination[]
}) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const out: SearchResult[] = []
    for (const a of articles) if (`${a.title} ${a.subtitle} ${a.excerpt} ${a.tags.join(' ')}`.toLowerCase().includes(q)) out.push({ id: a.id, type: 'article', title: a.title, excerpt: a.excerpt, imageUrl: a.heroImage.url, href: `/${locale}/sections/${a.sectionSlug}/${a.slug}` })
    for (const s of sections) if (`${s.title} ${s.description}`.toLowerCase().includes(q)) out.push({ id: s.id, type: 'section', title: s.title, excerpt: s.description, imageUrl: s.coverImage.url, href: `/${locale}/sections/${s.slug}` })
    for (const p of people) if (`${p.name} ${p.shortDescription} ${p.knownFor}`.toLowerCase().includes(q)) out.push({ id: p.id, type: 'person', title: p.name, excerpt: p.shortDescription, imageUrl: p.imageUrl, href: `/${locale}/people/${p.slug}` })
    for (const p of places) if (`${p.name} ${p.description}`.toLowerCase().includes(q)) out.push({ id: p.id, type: 'place', title: p.name, excerpt: p.description, imageUrl: p.imageUrl, href: `/${locale}/places/${p.slug}` })
    for (const d of documents) if (`${d.title} ${d.description ?? ''} ${d.author ?? ''}`.toLowerCase().includes(q)) out.push({ id: d.id, type: 'document', title: d.title, excerpt: d.description, href: `/${locale}/library/${d.slug}` })
    for (const e of timeline) if (`${e.title} ${e.description}`.toLowerCase().includes(q)) out.push({ id: e.id, type: 'timeline', title: `${e.year} — ${e.title}`, excerpt: e.description, href: `/${locale}/timeline#${e.id}` })
    for (const r of regions) if (`${r.name} ${r.description}`.toLowerCase().includes(q)) out.push({ id: r.id, type: 'region', title: r.name, excerpt: r.description, imageUrl: r.imageUrl, href: `/${locale}/regions/${r.slug}` })
    for (const d of diaspora) if (`${d.name} ${d.context}`.toLowerCase().includes(q)) out.push({ id: d.id, type: 'diaspora', title: d.name, excerpt: d.context, imageUrl: d.imageUrl, href: `/${locale}/diaspora#${d.slug}` })
    return out
  }, [query, sections, articles, people, places, documents, timeline, regions, diaspora, locale])

  const grouped = useMemo(() => {
    const groups: Partial<Record<SearchResult['type'], SearchResult[]>> = {}
    for (const r of results) (groups[r.type] ??= []).push(r)
    return groups
  }, [results])

  return (
    <>
      <div className="search-hero-input">
        <Search />
        <input autoFocus placeholder="Search people, places, events, documents…" aria-label="Search the archive" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      {!query && <p style={{ color: 'var(--archive-text-muted)', fontSize: 14 }}>Try “Africa”, “Bardoli”, “Amul” or “Charotar.”</p>}
      {query && results.length === 0 && (
        <div className="empty-state"><h2>Nothing found yet</h2><p>No records match “{query}.” Try a shorter or different term.</p></div>
      )}
      {(Object.keys(grouped) as SearchResult['type'][]).map((type) => (
        <div className="search-category" key={type}>
          <div className="search-category-head"><span>{LABEL[type]}</span><span className="count">{grouped[type]!.length}</span></div>
          {grouped[type]!.map((r) => (
            <Link key={r.id} href={r.href} className="search-result-row">
              {r.imageUrl && <img src={r.imageUrl} alt="" />}
              <div><strong>{r.title}</strong>{r.excerpt && <p>{r.excerpt}</p>}</div>
              <ArrowUpRight style={{ marginLeft: 'auto', width: 16, flex: 'none', color: 'var(--archive-text-muted)' }} />
            </Link>
          ))}
        </div>
      ))}
    </>
  )
}
