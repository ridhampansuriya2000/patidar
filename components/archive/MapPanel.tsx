import Link from 'next/link'

export function MapPanel({
  label, items,
}: {
  label: string
  items: { slug: string; name: string; position: { top: string; left: string }; href: string }[]
}) {
  return (
    <div className="map-panel" role="img" aria-label={`Illustrative map of ${label}`}>
      <span className="map-panel-label">{label} · illustrative positions</span>
      {items.map((item) => (
        <Link key={item.slug} href={item.href} className="map-pin" style={{ top: item.position.top, left: item.position.left }}>
          <span className="map-pin-dot" aria-hidden="true" />
          <span className="map-pin-label">{item.name}</span>
        </Link>
      ))}
    </div>
  )
}
