import Link from 'next/link'
import { isLocale, t, ui, type Locale } from '@/lib/i18n'
import { LanguageSwitcher } from '@/components/archive/LanguageSwitcher'

export function Footer({ locale }: { locale: string }) {
  const loc: Locale = isLocale(locale) ? locale : 'en'
  const isEn = loc === 'en'

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link className="wordmark footer-brand" href={`/${isEn ? '' : loc}`}>
          <span className="wordmark-mark">PH</span>
          <span><strong>Patidar</strong> History<small>Digital archive</small></span>
        </Link>
        <p>A digital archive of people, places,<br />movement and memory.</p>
        <LanguageSwitcher locale={loc} variant="footer" />
        <div className="footer-languages">
          <span>{t(ui.common.explore, loc)}</span>
          <Link href={`/${loc}/about`}>{t(ui.nav.about, loc)}</Link>
          <Link href={`/${loc}/sources`}>{t(ui.nav.sources, loc)}</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Patidar History Archive</span>
        <span>{t(ui.common.demo, loc)}</span>
        <span>Built for a living archive <span className="footer-dot">●</span></span>
      </div>
    </footer>
  )
}
