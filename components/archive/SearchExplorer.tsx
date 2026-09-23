'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Search } from 'lucide-react'
import type { Article, Section, Person, Place, Document, TimelineEvent, Region, DiasporaDestination, SearchResult } from '@/types/content'
import { isLocale, t, ui, type Locale } from '@/lib/i18n'

function labelFor(type: SearchResult['type'], l: Locale): string {
  switch (type) {
    case 'article': return t(ui.common.articles, l)
    case 'section': return t(ui.nav.sections, l)
    case 'person': return t(ui.nav.people, l)
    case 'place': return t(ui.nav.places, l)
    case 'document': return t(ui.nav.library, l)
    case 'timeline': return t(ui.nav.timeline, l)
    case 'region': return t(ui.nav.regions, l)
    case 'diaspora': return t(ui.nav.diaspora, l)
  }
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
  const l: Locale = isLocale(locale) ? locale : 'en'

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
        <input autoFocus placeholder={t(ui.common.searchPlaceholderLong, l)} aria-label={t(ui.common.search, l)} value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      {!query && <p style={{ color: 'var(--archive-text-muted)', fontSize: 14 }}>{t(ui.common.searchHint, l)}</p>}
      {query && results.length === 0 && (
        <div className="empty-state"><h2>{t(ui.common.nothingFoundYet, l)}</h2><p>{t(ui.common.noResults, l)} {t(ui.common.tryShorterTerm, l)}</p></div>
      )}
      {(Object.keys(grouped) as SearchResult['type'][]).map((type) => (
        <div className="search-category" key={type}>
          <div className="search-category-head"><span>{labelFor(type, l)}</span><span className="count">{grouped[type]!.length}</span></div>
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
