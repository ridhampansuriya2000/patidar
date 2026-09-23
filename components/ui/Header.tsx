'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronRight, Menu, Search, X } from 'lucide-react'

const nav = [
  ['history', 'History'],
  ['sections', 'Sections'],
  ['timeline', 'Timeline'],
  ['people', 'People'],
  ['places', 'Places'],
  ['library', 'Documents'],
  ['regions', 'Regions'],
  ['diaspora', 'Diaspora'],
  ['atak', 'Surnames']
]

export function Header({ locale }: { locale: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isEn = locale === 'en'

  return (
    <>
      <header className="site-header">
        <Link className="wordmark" href={`/${isEn ? '' : locale}`} aria-label="Patidar History home">
          <span className="wordmark-mark">PH</span>
          <span><strong>Patidar</strong> History<small>Digital archive</small></span>
        </Link>
        
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([href, label]) => (
            <Link key={href} href={`/${locale}/${href}`}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href={`/${locale}/search`} className="icon-button" aria-label="Search">
            <Search />
          </Link>
          
          <Link href={`/${isEn ? 'gu' : 'en'}`} className="language-button">
            {isEn ? 'EN' : 'ગુજરાતી'} <ChevronRight />
          </Link>
          
          <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          {nav.map(([href, label]) => (
            <Link key={href} href={`/${locale}/${href}`} onClick={() => setMenuOpen(false)}>
              {label}
              <ArrowUpRight />
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
