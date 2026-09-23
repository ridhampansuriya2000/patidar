'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronLeft, ChevronRight, Search, SlidersHorizontal } from 'lucide-react'
import rawData from '@/data/patidarAtak.json'

type Entry = { id: string; gujarati: string; english: string; hindi: string }
const data = rawData as { leuvaPatel: Entry[]; kadvaPatel: Entry[] }
const pageSize = 25

export default function AtakPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en'
  const [community, setCommunity] = useState<'leuvaPatel' | 'kadvaPatel'>('leuvaPatel')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<'source' | 'alphabetical'>('source')
  const [page, setPage] = useState(1)
  const entries = data[community]
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase()
    const result = term ? entries.filter((entry) => `${entry.gujarati} ${entry.english} ${entry.hindi}`.toLocaleLowerCase().includes(term)) : [...entries]
    if (sort === 'alphabetical') result.sort((a, b) => a.gujarati.localeCompare(b.gujarati, 'gu'))
    return result
  }, [community, entries, query, sort])
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)
  const selectCommunity = (value: 'leuvaPatel' | 'kadvaPatel') => { setCommunity(value); setPage(1); setQuery('') }

  return <main className="atak-page">
    <div className="atak-wrap">
      <Link className="atak-back" href="/"><ArrowLeft /> Patidar History</Link>
      <header className="atak-heading"><p className="eyebrow">Public research directory</p><h1>Patidar Surnames</h1><p>A reference directory of surnames and family branches found in the supplied Patidar source images.</p></header>
      <div className="atak-tabs" role="tablist" aria-label="Patidar community"><button role="tab" aria-selected={community === 'leuvaPatel'} className={community === 'leuvaPatel' ? 'active' : ''} onClick={() => selectCommunity('leuvaPatel')}>Leuva Patel</button><button role="tab" aria-selected={community === 'kadvaPatel'} className={community === 'kadvaPatel' ? 'active' : ''} onClick={() => selectCommunity('kadvaPatel')}>Kadva Patel</button></div>
      {community === 'kadvaPatel' ? <section className="atak-empty"><p className="eyebrow">Kadva Patel</p><h2>Kadva Patel surnames are not included in this edition.</h2><p>The supplied source images document the Leuva Patel surname directory. Kadva Patel records can be added when source material is provided.</p></section> : <>
        <div className="atak-summary"><div><span className="eyebrow">Total directory records</span><strong>{entries.length}</strong><span>Total Leuva Patel surnames</span></div><div className="atak-controls"><label className="atak-search"><Search /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder="Search surnames..." aria-label="Search surnames" /></label><label className="atak-sort"><SlidersHorizontal /><span className="sr-only">Sort order</span><select value={sort} onChange={(event) => { setSort(event.target.value as 'source' | 'alphabetical'); setPage(1) }}><option value="source">Source Order</option><option value="alphabetical">Alphabetical</option></select></label></div></div>
        <div className="atak-table-shell"><table className="atak-table"><thead><tr><th>#</th><th>Surname</th></tr></thead><tbody>{visible.map((entry, index) => <tr key={entry.id}><td>{(page - 1) * pageSize + index + 1}</td><th scope="row">{locale === 'hi' ? `${entry.hindi} - ${entry.english}` : `${entry.english} - ${entry.gujarati}`}</th></tr>)}</tbody></table>{visible.length === 0 && <p className="atak-no-results">No surnames found.</p>}</div>
        <nav className="atak-pagination" aria-label="Pagination"><span>{filtered.length ? `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, filtered.length)} of ${filtered.length}` : '0 results'}</span><div><button disabled={page === 1} onClick={() => setPage((value) => value - 1)} aria-label="Previous page"><ChevronLeft /></button><strong>{page} / {totalPages}</strong><button disabled={page === totalPages} onClick={() => setPage((value) => value + 1)} aria-label="Next page"><ChevronRight /></button></div></nav>
      </>}
      <footer className="atak-source"><p className="eyebrow">Source note</p><p><strong>Supplied Patidar surname reference images</strong></p><p>This directory uses the surname spellings from the supplied images. Patel is included only as it appears in those source images; no internet search or external surname list was used.</p></footer>
    </div>
  </main>
}

