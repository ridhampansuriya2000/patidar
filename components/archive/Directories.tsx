'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import type { Person, Place, Document } from '@/types/content'
import { PersonCard, PlaceCard, DocumentCard } from './Cards'

function Chips({ options, active, onChange }: { options: string[]; active: string; onChange: (v: string) => void }) {
  return (
    <div className="filter-chip-row">
      {['All', ...options].map((opt) => (
        <button key={opt} type="button" className={`filter-chip ${active === opt ? 'is-active' : ''}`} onClick={() => onChange(opt)}>
          {opt}
        </button>
      ))}
    </div>
  )
}

export function PeopleDirectory({ locale, people }: { locale: string; people: Person[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [region, setRegion] = useState('All')
  const categories = useMemo(() => [...new Set(people.map((p) => p.category))], [people])
  const regions = useMemo(() => [...new Set(people.map((p) => p.region))], [people])

  const filtered = people.filter((p) => {
    const matchesQuery = !query || `${p.name} ${p.shortDescription} ${p.knownFor}`.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = category === 'All' || p.category === category
    const matchesRegion = region === 'All' || p.region === region
    return matchesQuery && matchesCategory && matchesRegion
  })

  return (
    <>
      <div className="archive-filter">
        <Search />
        <input placeholder="Search people" aria-label="Search people" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="filter-bar">
        <Chips options={categories} active={category} onChange={setCategory} />
        <Chips options={regions} active={region} onChange={setRegion} />
        <span className="filter-count">{filtered.length} record{filtered.length === 1 ? '' : 's'}</span>
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state"><h2>No people match yet</h2><p>Try a different search term or filter.</p></div>
      ) : (
        <div className="directory-grid">{filtered.map((p) => <PersonCard key={p.id} locale={locale} person={p} />)}</div>
      )}
    </>
  )
}

export function PlacesDirectory({ locale, places }: { locale: string; places: Place[] }) {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('All')
  const [type, setType] = useState('All')
  const regions = useMemo(() => [...new Set(places.map((p) => p.region))], [places])
  const types = useMemo(() => [...new Set(places.map((p) => p.type))], [places])

  const filtered = places.filter((p) => {
    const matchesQuery = !query || `${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase())
    const matchesRegion = region === 'All' || p.region === region
    const matchesType = type === 'All' || p.type === type
    return matchesQuery && matchesRegion && matchesType
  })

  return (
    <>
      <div className="archive-filter">
        <Search />
        <input placeholder="Search places" aria-label="Search places" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="filter-bar">
        <Chips options={regions} active={region} onChange={setRegion} />
        <Chips options={types} active={type} onChange={setType} />
        <span className="filter-count">{filtered.length} record{filtered.length === 1 ? '' : 's'}</span>
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state"><h2>No places match yet</h2><p>Try a different search term or filter.</p></div>
      ) : (
        <div className="directory-grid">{filtered.map((p) => <PlaceCard key={p.id} locale={locale} place={p} />)}</div>
      )}
    </>
  )
}

export function LibraryDirectory({ locale, documents }: { locale: string; documents: Document[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const categories = useMemo(() => [...new Set(documents.map((d) => d.category))], [documents])

  const filtered = documents.filter((d) => {
    const matchesQuery = !query || `${d.title} ${d.author ?? ''} ${d.description ?? ''}`.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = category === 'All' || d.category === category
    return matchesQuery && matchesCategory
  })

  return (
    <>
      <div className="archive-filter">
        <Search />
        <input placeholder="Search the research library" aria-label="Search documents" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="filter-bar">
        <Chips options={categories} active={category} onChange={setCategory} />
        <span className="filter-count">{filtered.length} record{filtered.length === 1 ? '' : 's'}</span>
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state"><h2>No documents match yet</h2><p>Try a different search term or category.</p></div>
      ) : (
        <div className="doc-grid">{filtered.map((d) => <DocumentCard key={d.id} locale={locale} document={d} />)}</div>
      )}
    </>
  )
}
