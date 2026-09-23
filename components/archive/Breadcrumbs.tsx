import Link from 'next/link'
import { isLocale, t, ui } from '@/lib/i18n'

export function Breadcrumbs({ locale, trail }: { locale: string; trail: { label: string; href?: string }[] }) {
  const l = isLocale(locale) ? locale : 'en'
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href={l === 'en' ? '/' : `/${l}`}>{t(ui.common.home, l)}</Link>
      {trail.map((item, index) => (
        <span key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span aria-hidden="true">/</span>
          {item.href && index < trail.length - 1 ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span className="current" aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
