import Link from 'next/link'

export function Breadcrumbs({ locale, trail }: { locale: string; trail: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href={`/${locale}`}>Home</Link>
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
