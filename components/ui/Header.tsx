'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Menu, Search, X } from 'lucide-react'
import { LOCALES, LOCALE_SHORT, isLocale, ui, t, type Locale } from '@/lib/i18n'
import { ThemeToggle } from './ThemeToggle'

const nav: [keyof typeof ui.nav, string][] = [
  ['history', 'history'],
  ['sections', 'sections'],
  ['timeline', 'timeline'],
  ['people', 'people'],
  ['places', 'places'],
  ['library', 'library'],
  ['regions', 'regions'],
  ['diaspora', 'diaspora'],
  ['surnames', 'atak'],
]

export function Header({ locale }: { locale: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const loc: Locale = isLocale(locale) ? locale : 'en'
  const isEn = loc === 'en'

  return (
    <>
      <header className="site-header">
        <Link className="wordmark" href={`/${isEn ? '' : loc}`} aria-label="Patidar History home">
          <span className="wordmark-mark">PH</span>
          <span><strong>Patidar</strong> History<small>Digital archive</small></span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([key, href]) => (
            <Link key={href} href={`/${loc}/${href}`}>{t(ui.nav[key], loc)}</Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href={`/${loc}/search`} className="icon-button" aria-label={t(ui.nav.search, loc)}>
            <Search />
          </Link>

          <div style={{ position: 'relative' }}>
            <button className="language-button" onClick={() => setLangOpen((v) => !v)} aria-haspopup="listbox" aria-expanded={langOpen} aria-label="Change language">
              {LOCALE_SHORT[loc]}
            </button>
            {langOpen && (
              <div className="mobile-menu" style={{ position: 'absolute', inset: 'auto 0 auto auto', top: 'calc(100% + 10px)', width: 160, borderBottom: 0, boxShadow: '0 20px 40px rgba(0,0,0,.18)' }}>
                {LOCALES.map((l) => (
                  <Link key={l} href={`/${l === 'en' ? '' : l}`} onClick={() => setLangOpen(false)} style={{ fontSize: 16, padding: '10px 0' }}>
                    {LOCALE_SHORT[l]} · {l === 'en' ? 'English' : l === 'gu' ? 'ગુજરાતી' : 'हिन्दी'}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <ThemeToggle />

          <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          {nav.map(([key, href]) => (
            <Link key={href} href={`/${loc}/${href}`} onClick={() => setMenuOpen(false)}>
              {t(ui.nav[key], loc)}
              <ArrowUpRight />
            </Link>
          ))}
          <Link href={`/${loc}/about`} onClick={() => setMenuOpen(false)}>{t(ui.nav.about, loc)}<ArrowUpRight /></Link>
        </div>
      )}
    </>
  )
}
