'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import type { Person, Place, Document } from '@/types/content'
import { PersonCard, PlaceCard, DocumentCard } from './Cards'
import { isLocale, t, ui, type Locale } from '@/lib/i18n'

function loc(locale: string): Locale {
  return isLocale(locale) ? locale : 'en'
}

function Chips({ options, active, onChange, allLabel }: { options: string[]; active: string; onChange: (v: string) => void; allLabel: string }) {
  return (
    <div className="filter-chip-row">
      {[allLabel, ...options].map((opt) => (
        <button key={opt} type="button" className={`filter-chip ${active === opt ? 'is-active' : ''}`} onClick={() => onChange(opt)}>
          {opt}
        </button>
      ))}
    </div>
  )
}

export function PeopleDirectory({ locale, people }: { locale: string; people: Person[] }) {
  const l = loc(locale)
  const ALL = t(ui.common.all, l)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(ALL)
  const [region, setRegion] = useState(ALL)
  const categories = useMemo(() => [...new Set(people.map((p) => p.category))], [people])
  const regions = useMemo(() => [...new Set(people.map((p) => p.region))], [people])

  const filtered = people.filter((p) => {
    const matchesQuery = !query || `${p.name} ${p.shortDescription} ${p.knownFor}`.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = category === ALL || p.category === category
    const matchesRegion = region === ALL || p.region === region
    return matchesQuery && matchesCategory && matchesRegion
  })

  return (
    <>
      <div className="archive-filter">
        <Search />
        <input placeholder={t(ui.common.searchPeople, l)} aria-label={t(ui.common.searchPeople, l)} value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="filter-bar">
        <Chips options={categories} active={category} onChange={setCategory} allLabel={ALL} />
        <Chips options={regions} active={region} onChange={setRegion} allLabel={ALL} />
        <span className="filter-count">{filtered.length} {t(filtered.length === 1 ? ui.common.record : ui.common.records, l)}</span>
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state"><h2>{t(ui.common.noPeopleMatch, l)}</h2><p>{t(ui.common.tryDifferentSearch, l)}</p></div>
      ) : (
        <div className="directory-grid">{filtered.map((p) => <PersonCard key={p.id} locale={locale} person={p} />)}</div>
      )}
    </>
  )
}

export function PlacesDirectory({ locale, places }: { locale: string; places: Place[] }) {
  const l = loc(locale)
  const ALL = t(ui.common.all, l)
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState(ALL)
  const [type, setType] = useState(ALL)
  const regions = useMemo(() => [...new Set(places.map((p) => p.region))], [places])
  const types = useMemo(() => [...new Set(places.map((p) => p.type))], [places])

  const filtered = places.filter((p) => {
    const matchesQuery = !query || `${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase())
    const matchesRegion = region === ALL || p.region === region
    const matchesType = type === ALL || p.type === type
    return matchesQuery && matchesRegion && matchesType
  })

  return (
    <>
      <div className="archive-filter">
        <Search />
        <input placeholder={t(ui.common.searchPlaces, l)} aria-label={t(ui.common.searchPlaces, l)} value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="filter-bar">
        <Chips options={regions} active={region} onChange={setRegion} allLabel={ALL} />
        <Chips options={types} active={type} onChange={setType} allLabel={ALL} />
        <span className="filter-count">{filtered.length} {t(filtered.length === 1 ? ui.common.record : ui.common.records, l)}</span>
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state"><h2>{t(ui.common.noPlacesMatch, l)}</h2><p>{t(ui.common.tryDifferentSearch, l)}</p></div>
      ) : (
        <div className="directory-grid">{filtered.map((p) => <PlaceCard key={p.id} locale={locale} place={p} />)}</div>
      )}
    </>
  )
}

export function LibraryDirectory({ locale, documents }: { locale: string; documents: Document[] }) {
  const l = loc(locale)
  const ALL = t(ui.common.all, l)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(ALL)
  const categories = useMemo(() => [...new Set(documents.map((d) => d.category))], [documents])

  const filtered = documents.filter((d) => {
    const matchesQuery = !query || `${d.title} ${d.author ?? ''} ${d.description ?? ''}`.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = category === ALL || d.category === category
    return matchesQuery && matchesCategory
  })

  return (
    <>
      <div className="archive-filter">
        <Search />
        <input placeholder={t(ui.common.searchLibrary, l)} aria-label={t(ui.common.searchLibrary, l)} value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="filter-bar">
        <Chips options={categories} active={category} onChange={setCategory} allLabel={ALL} />
        <span className="filter-count">{filtered.length} {t(filtered.length === 1 ? ui.common.record : ui.common.records, l)}</span>
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state"><h2>{t(ui.common.noDocumentsMatch, l)}</h2><p>{t(ui.common.tryDifferentSearch, l)}</p></div>
      ) : (
        <div className="doc-grid">{filtered.map((d) => <DocumentCard key={d.id} locale={locale} document={d} />)}</div>
      )}
    </>
  )
}
