'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { LOCALES, LOCALE_LABEL, LOCALE_SHORT, t, ui, type Locale } from '@/lib/i18n'

/** Swaps the leading /en|/gu|/hi segment of the current path, or the bare '/' home, preserving the rest of the route. */
export function getLocalizedPath(pathname: string, target: Locale): string {
  const segments = pathname.split('/').filter(Boolean)
  if (segments[0] === 'en' || segments[0] === 'gu' || segments[0] === 'hi') {
    segments[0] = target
  } else {
    segments.unshift(target)
  }
  if (target === 'en' && segments.length === 1) return '/'
  return `/${segments.join('/')}`
}

export function LanguageSwitcher({ locale, variant = 'header' }: { locale: Locale; variant?: 'header' | 'footer' }) {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)

  if (variant === 'footer') {
    return (
      <div className="footer-languages">
        <span>{t(ui.common.readIn, locale)}</span>
        {LOCALES.map((l) => (
          <Link key={l} href={getLocalizedPath(pathname, l)} aria-current={l === locale ? 'true' : undefined} style={l === locale ? { color: '#d49a78' } : undefined}>
            {LOCALE_LABEL[l]}
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        className="language-button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t(ui.common.changeLanguage, locale)}
      >
        {LOCALE_SHORT[locale]} <ChevronDown style={{ width: 13 }} />
      </button>
      {open && (
        <>
          <button aria-hidden="true" onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'transparent', border: 0, cursor: 'default', zIndex: 20 }} />
          <div
            role="listbox"
            aria-label={t(ui.common.changeLanguage, locale)}
            style={{
              position: 'absolute', zIndex: 21, top: 'calc(100% + 10px)', right: 0, minWidth: 170,
              background: 'var(--archive-paper)', border: '1px solid var(--archive-line)', boxShadow: '0 20px 40px rgba(0,0,0,.18)',
            }}
          >
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={getLocalizedPath(pathname, l)}
                role="option"
                aria-selected={l === locale}
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex', justifyContent: 'space-between', gap: 10, padding: '12px 16px', fontSize: 13,
                  color: l === locale ? 'var(--archive-rust)' : 'var(--archive-ink)', borderBottom: '1px solid var(--archive-line)',
                }}
              >
                <span>{LOCALE_LABEL[l]}</span>
                <span style={{ color: 'var(--archive-text-muted)', fontSize: 11 }}>{LOCALE_SHORT[l]}</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
