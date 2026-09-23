'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu, Search, X } from 'lucide-react'
import { LOCALES, LOCALE_LABEL, isLocale, ui, t, type Locale } from '@/lib/i18n'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher, getLocalizedPath } from '@/components/archive/LanguageSwitcher'

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
  const loc: Locale = isLocale(locale) ? locale : 'en'
  const isEn = loc === 'en'
  const pathname = usePathname() || '/'

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

          <span className="desktop-only-lang"><LanguageSwitcher locale={loc} /></span>

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

          <div className="mobile-menu-lang">
            <span>{t(ui.common.readIn, loc)}</span>
            <div>
              {LOCALES.map((l) => (
                <Link key={l} href={getLocalizedPath(pathname, l)} onClick={() => setMenuOpen(false)} className={l === loc ? 'is-active' : ''}>
                  {LOCALE_LABEL[l]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
