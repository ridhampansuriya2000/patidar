'use client'

import { useMemo, useState } from 'react'
import type { TimelineEvent } from '@/types/content'
import { TimelineEventCard } from './Cards'

const CATEGORIES = ['All', 'Origins', 'Gujarat', 'Agriculture', 'Freedom Movement', 'Post-Independence', 'Migration', 'Global Diaspora', 'Present Day']

export function TimelineExplorer({ events }: { events: TimelineEvent[] }) {
  const [category, setCategory] = useState('All')
  const filtered = useMemo(() => (category === 'All' ? events : events.filter((e) => e.category === category)), [events, category])

  return (
    <>
      <div className="filter-chip-row" style={{ marginBottom: 50 }}>
        {CATEGORIES.map((c) => (
          <button key={c} type="button" className={`filter-chip ${category === c ? 'is-active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>
      <div className="timeline-page-track">
        {filtered.map((event) => <TimelineEventCard key={event.id} event={event} />)}
      </div>
    </>
  )
}
