import type { ReactNode } from 'react'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { ReadingProgress } from './ArticleChrome'

export function PageShell({ locale, children, withProgress = false }: { locale: string; children: ReactNode; withProgress?: boolean }) {
  return (
    <div className="archive-page">
      {withProgress && <ReadingProgress />}
      <Header locale={locale} />
      <main id="main-content">{children}</main>
      <Footer locale={locale} />
    </div>
  )
}

export function PageHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <header className="archive-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {intro && <p>{intro}</p>}
    </header>
  )
}
