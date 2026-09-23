'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, BookOpen, ChevronRight, Menu, Search, X } from 'lucide-react'
import { articles, contentStats, documents, heroImage, people, places, sections, timeline } from '@/data/archive'

const heroSlides = [
  { image: heroImage, caption: 'Agricultural landscape, Gujarat', credit: 'Archive image · Demonstration' },
  { image: '/images/hero-sardar-patel.png', caption: 'Sardar Vallabhbhai Patel and the making of modern India', credit: 'Generated archival interpretation · Demonstration' },
  { image: '/images/hero-farmer.png', caption: 'Land, labour and the farming life of Gujarat', credit: 'Generated documentary interpretation · Demonstration' },
  { image: '/images/hero-dham.png', caption: 'Khodaldham and Umiya Dham · Places of belonging', credit: 'Generated architectural interpretation · Demonstration' },
]

const nav = ['History', 'Timeline', 'People', 'Places', 'Library']

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeHero, setActiveHero] = useState(0)
  const featured = sections.filter((section) => section.featured)
  const currentHero = heroSlides[activeHero]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <main className="archive-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Patidar History home"><span className="wordmark-mark">PH</span><span><strong>Patidar</strong> History<small>Digital archive</small></span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">{nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</nav>
        <div className="header-actions"><button className="icon-button" aria-label="Search" onClick={() => document.getElementById('archive-search')?.focus()}><Search /></button><button className="language-button">EN <ChevronRight /></button><button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
      </header>
      {menuOpen && <div className="mobile-menu">{nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}<ArrowUpRight /></a>)}</div>}

      <section id="top" className="hero" aria-label="Featured archive stories">
        {heroSlides.map((slide, index) => <div key={slide.image} className={`hero-slide ${index === activeHero ? 'is-active' : ''}`} style={{ backgroundImage: `linear-gradient(90deg, rgba(20,25,22,.83) 0%, rgba(20,25,22,.45) 54%, rgba(20,25,22,.08) 100%), url(${slide.image})` }} aria-hidden={index !== activeHero} />)}
        <div className="hero-content"><p className="eyebrow light">A living historical record <span>—</span> 1800 to present</p><h1>Patidar<br /><em>History</em></h1><p className="hero-subtitle">From Kanbi roots to a global community.</p><p className="hero-copy">Explore centuries of agriculture, migration, social change, freedom struggle, entrepreneurship and global diaspora.</p><div className="hero-actions"><a className="button button-light" href="#history">Explore history <ArrowUpRight /></a><a className="text-link light-link" href="#library"><BookOpen /> Research library</a></div></div><div className="hero-caption">{currentHero.caption}<br /><span>{currentHero.credit}</span></div><div className="hero-dots" aria-label="Choose featured story">{heroSlides.map((slide, index) => <button key={slide.image} className={index === activeHero ? 'is-active' : ''} onClick={() => setActiveHero(index)} aria-label={`Show slide ${index + 1}`} aria-pressed={index === activeHero} />)}</div><div className="hero-scroll">Scroll to explore <span>↓</span></div>
      </section>

      <section className="intro section-pad"><div className="intro-label"><span className="section-number">01</span><span>Introduction</span></div><div><p className="eyebrow">An evolving public record</p><h2>Understanding the<br /><em>Patidar story</em></h2><p className="intro-copy">This archive brings together the histories of a community shaped by land, movement and collective imagination. It is a place to follow the threads between village, region and world.</p><a className="text-link" href="#history">Read the introduction <ArrowUpRight /></a></div><div className="intro-stats"><div><strong>{contentStats.articles}+</strong><span>Articles</span></div><div><strong>{contentStats.people}+</strong><span>People & stories</span></div><div><strong>{contentStats.documents}+</strong><span>Research records</span></div></div></section>

      <section id="history" className="history-section section-pad"><div className="section-heading"><div><p className="eyebrow">Explore the archive</p><h2>Many histories.<br /><em>One living story.</em></h2></div><a className="text-link" href="#library">View all sections <ArrowUpRight /></a></div><div className="section-grid">{featured.map((section, index) => <a className={`section-card card-${index + 1}`} href={`#${section.slug}`} key={section.id}><img src={section.coverImage?.url} alt={section.coverImage?.alt} /><div className="section-card-overlay"><span>0{index + 1}</span><h3>{section.title}</h3><p>{section.description}</p><span className="card-arrow"><ArrowUpRight /></span></div></a>)}</div></section>

      <section id="timeline" className="timeline-section section-pad"><div className="section-heading"><div><p className="eyebrow">A chronology of change</p><h2>Across time &<br /><em>place</em></h2></div><a className="text-link" href="#timeline">Explore timeline <ArrowUpRight /></a></div><div className="timeline-track">{timeline.map((event, index) => <div className="timeline-item" key={event.id}><span className="timeline-dot" /><p className="timeline-year">{event.year}</p><h3>{event.title}</h3><p>{event.description}</p>{index < timeline.length - 1 && <span className="timeline-line" />}</div>)}</div></section>

      <section id="people" className="feature-section section-pad"><div className="feature-heading"><div><p className="eyebrow">People & memory</p><h2>Lives that<br /><em>made history</em></h2></div><a className="text-link" href="#people">Meet the people <ArrowUpRight /></a></div><div className="people-grid">{people.map((person) => <article className="person-card" key={person.id}><img src={person.imageUrl} alt={person.name} /><div><p className="eyebrow">{person.category} · {person.region}</p><h3>{person.name}</h3><p>{person.shortDescription}</p><a className="small-link" href={`#${person.slug}`}>View profile <ArrowUpRight /></a></div></article>)}</div></section>

      <section id="places" className="places-section section-pad"><div className="section-heading"><div><p className="eyebrow">A geography of belonging</p><h2>Places hold<br /><em>the memory</em></h2></div><a className="text-link" href="#places">Explore all places <ArrowUpRight /></a></div><div className="places-grid">{places.map((place) => <a href={`#${place.slug}`} className="place-card" key={place.id}><img src={place.imageUrl} alt={place.name} /><div><span>{place.region}</span><h3>{place.name}</h3><ArrowUpRight /></div></a>)}</div></section>

      <section id="library" className="library-section section-pad"><div className="library-copy"><p className="eyebrow light">Research library</p><h2>Read the<br /><em>record</em></h2><p>Browse books, papers, community publications and archival documents that help us ask better questions of the past.</p><a className="button button-light" href="#library">Enter the library <ArrowUpRight /></a></div><div className="document-stack">{documents.map((doc, index) => <article className={`document-card doc-${index}`} key={doc.id}><span className="doc-type">{doc.category}</span><h3>{doc.title}</h3><p>{doc.author} · {doc.year}</p><span className="doc-pages">{doc.pages} pages <ArrowUpRight /></span></article>)}</div></section>

      <section className="search-section section-pad"><div><p className="eyebrow">Search the archive</p><h2>What are you<br /><em>looking for?</em></h2></div><div className="search-wrap"><Search /><input id="archive-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people, places, events..." aria-label="Search archive" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X /></button>}<span>⌘ K</span></div></section>

      <footer className="site-footer"><div className="footer-top"><a className="wordmark footer-brand" href="#top"><span className="wordmark-mark">PH</span><span><strong>Patidar</strong> History<small>Digital archive</small></span></a><p>A digital archive of people, places,<br />movement and memory.</p><div className="footer-languages"><span>Read in</span><button>English</button><button>ગુજરાતી</button><button>हिन्दी</button></div></div><div className="footer-bottom"><span>© 2026 Patidar History Archive</span><span>Demonstration content · Research prototype</span><span>Built for a living archive <span className="footer-dot">●</span></span></div></footer>
    </main>
  )
}
