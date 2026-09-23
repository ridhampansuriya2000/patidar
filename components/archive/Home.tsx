'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, BookOpen, Search } from 'lucide-react'
import type { Article, Document, Person, Place, Section, TimelineEvent } from '@/types/content'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { localize, type Locale } from '@/lib/i18n'
import { homeCopy as hc } from '@/lib/home-copy'

const heroSlides = [
  { image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=90', caption: 'Agricultural landscape, Gujarat', credit: 'Archive image · illustrative' },
  { image: '/images/hero-sardar-patel.png', caption: 'Sardar Vallabhbhai Patel and the making of modern India', credit: 'Generated archival interpretation · illustrative' },
  { image: '/images/hero-farmer.png', caption: 'Land, labour and the farming life of Gujarat', credit: 'Generated documentary interpretation · illustrative' },
  { image: '/images/hero-dham.png', caption: 'Khodaldham and Umiya Dham · Places of belonging', credit: 'Generated architectural interpretation · illustrative' },
]

export function Home({
  locale, sections, timeline, people, places, documents, stats,
}: {
  locale: Locale
  sections: Section[]
  timeline: TimelineEvent[]
  people: Person[]
  places: Place[]
  documents: Document[]
  stats: { articles: number; people: number; documents: number }
}) {
  const [activeHero, setActiveHero] = useState(0)
  const featured = sections.filter((section) => section.featured)
  const currentHero = heroSlides[activeHero]
  const L = (key: keyof typeof hc) => localize(hc[key], hc[key].en, locale)

  useEffect(() => {
    const timer = window.setInterval(() => setActiveHero((current) => (current + 1) % heroSlides.length), 6500)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <main className="archive-shell" id="main-content">
      <Header locale={locale} />

      <section id="top" className="hero" aria-label="Featured archive stories">
        {heroSlides.map((slide, index) => (
          <div key={slide.image} className={`hero-slide ${index === activeHero ? 'is-active' : ''}`} style={{ backgroundImage: `linear-gradient(90deg, rgba(20,25,22,.83) 0%, rgba(20,25,22,.45) 54%, rgba(20,25,22,.08) 100%), url(${slide.image})` }} aria-hidden={index !== activeHero} />
        ))}
        <div className="hero-content">
          <p className="eyebrow light">{L('eyebrow')}</p>
          <h1>Patidar<br /><em>History</em></h1>
          <p className="hero-subtitle">{L('subtitle')}</p>
          <p className="hero-copy">{L('copy')}</p>
          <div className="hero-actions">
            <Link className="button button-light" href={`/${locale}/history`}>{L('exploreCta')} <ArrowUpRight /></Link>
            <Link className="text-link light-link" href={`/${locale}/library`}><BookOpen /> {L('libraryCta')}</Link>
          </div>
        </div>
        <div className="hero-caption">{currentHero.caption}<br /><span>{currentHero.credit}</span></div>
        <div className="hero-dots" aria-label="Choose featured story">
          {heroSlides.map((slide, index) => (
            <button key={slide.image} className={index === activeHero ? 'is-active' : ''} onClick={() => setActiveHero(index)} aria-label={`Show slide ${index + 1}`} aria-pressed={index === activeHero} />
          ))}
        </div>
        <div className="hero-scroll">Scroll to explore <span>↓</span></div>
      </section>

      <section className="intro section-pad">
        <div className="intro-label"><span className="section-number">01</span><span>Introduction</span></div>
        <div>
          <p className="eyebrow">{L('introEyebrow')}</p>
          <h2>{L('introTitleLine1')}<br /><em>{L('introTitleLine2')}</em></h2>
          <p className="intro-copy">{L('introCopy')}</p>
          <Link className="text-link" href={`/${locale}/history`}>{L('introReadMore')} <ArrowUpRight /></Link>
        </div>
        <div className="intro-stats">
          <div><strong>{stats.articles}+</strong><span>{L('articlesLabel')}</span></div>
          <div><strong>{stats.people}+</strong><span>{L('peopleLabel')}</span></div>
          <div><strong>{stats.documents}+</strong><span>{L('documentsLabel')}</span></div>
        </div>
      </section>

      <section id="history" className="history-section section-pad">
        <div className="section-heading">
          <div><p className="eyebrow">{L('sectionsEyebrow')}</p><h2>{L('sectionsTitleLine1')}<br /><em>{L('sectionsTitleLine2')}</em></h2></div>
          <Link className="text-link" href={`/${locale}/sections`}>{L('viewAllSections')} <ArrowUpRight /></Link>
        </div>
        <div className="section-grid">
          {featured.map((section, index) => (
            <Link className={`section-card card-${index + 1}`} href={`/${locale}/sections/${section.slug}`} key={section.id}>
              <img src={section.coverImage.url} alt={section.coverImage.alt} />
              <div className="section-card-overlay">
                <span>0{index + 1}</span>
                <h3>{localize(section.titleI18n, section.title, locale)}</h3>
                <p>{localize(section.descriptionI18n, section.description, locale)}</p>
                <span className="card-arrow"><ArrowUpRight /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="timeline" className="timeline-section section-pad">
        <div className="section-heading">
          <div><p className="eyebrow">{L('timelineEyebrow')}</p><h2>{L('timelineTitleLine1')}<br /><em>{L('timelineTitleLine2')}</em></h2></div>
          <Link className="text-link" href={`/${locale}/timeline`}>{L('exploreTimeline')} <ArrowUpRight /></Link>
        </div>
        <div className="timeline-track">
          {timeline.map((event, index) => (
            <div className="timeline-item" key={event.id}>
              <span className="timeline-dot" />
              <p className="timeline-year">{event.year}</p>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              {index < timeline.length - 1 && <span className="timeline-line" />}
            </div>
          ))}
        </div>
      </section>

      <section id="people" className="feature-section section-pad">
        <div className="feature-heading">
          <div><p className="eyebrow">{L('peopleEyebrow')}</p><h2>{L('peopleTitleLine1')}<br /><em>{L('peopleTitleLine2')}</em></h2></div>
          <Link className="text-link" href={`/${locale}/people`}>{L('meetPeople')} <ArrowUpRight /></Link>
        </div>
        <div className="people-grid">
          {people.map((person) => (
            <article className="person-card" key={person.id}>
              <img src={person.imageUrl} alt={person.name} />
              <div>
                <p className="eyebrow">{person.category} · {person.region}</p>
                <h3>{person.name}</h3>
                <p>{person.shortDescription}</p>
                <Link className="small-link" href={`/${locale}/people/${person.slug}`}>{L('viewProfile')} <ArrowUpRight /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="places" className="places-section section-pad">
        <div className="section-heading">
          <div><p className="eyebrow">{L('placesEyebrow')}</p><h2>{L('placesTitleLine1')}<br /><em>{L('placesTitleLine2')}</em></h2></div>
          <Link className="text-link" href={`/${locale}/places`}>{L('exploreAllPlaces')} <ArrowUpRight /></Link>
        </div>
        <div className="places-grid">
          {places.map((place) => (
            <Link href={`/${locale}/places/${place.slug}`} className="place-card" key={place.id}>
              <img src={place.imageUrl} alt={place.name} />
              <div><span>{place.region}</span><h3>{place.name}</h3><ArrowUpRight /></div>
            </Link>
          ))}
        </div>
      </section>

      <section id="library" className="library-section section-pad">
        <div className="library-copy">
          <p className="eyebrow light">{L('libraryEyebrow')}</p>
          <h2>{L('libraryTitleLine1')}<br /><em>{L('libraryTitleLine2')}</em></h2>
          <p>{L('libraryCopy')}</p>
          <Link className="button button-light" href={`/${locale}/library`}>{L('enterLibrary')} <ArrowUpRight /></Link>
        </div>
        <div className="document-stack">
          {documents.map((doc) => (
            <article className="document-card" key={doc.id}>
              <span className="doc-type">{doc.category}</span>
              <h3>{doc.title}</h3>
              <p>{doc.author} · {doc.year}</p>
              <span className="doc-pages">{doc.pages ?? '—'} pages <ArrowUpRight /></span>
            </article>
          ))}
        </div>
      </section>

      <section className="search-section section-pad">
        <div><p className="eyebrow">{L('searchEyebrow')}</p><h2>{L('searchTitleLine1')}<br /><em>{L('searchTitleLine2')}</em></h2></div>
        <Link href={`/${locale}/search`} className="search-wrap" style={{ textDecoration: 'none' }}>
          <Search />
          <span style={{ flex: 1, opacity: .8 }}>{L('searchPlaceholder')}</span>
          <span>⌘ K</span>
        </Link>
      </section>

      <Footer locale={locale} />
    </main>
  )
}
