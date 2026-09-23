'use client'

import { useEffect, useState } from 'react'
import { Check, Link2, Minus, Plus, Share2 } from 'lucide-react'
import { t, ui, type Locale } from '@/lib/i18n'

export function ReadingProgress() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      setWidth(scrollable > 0 ? Math.min(100, (doc.scrollTop / scrollable) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="reading-progress" style={{ width: `${width}%` }} aria-hidden="true" />
}

export function TableOfContents({ headings, label }: { headings: { id: string; text: string }[]; label: string }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (!headings.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-96px 0px -70% 0px' },
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (!headings.length) return null

  return (
    <nav className="article-toc" aria-label={label}>
      <h3>{label}</h3>
      <ol>
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className={activeId === h.id ? 'is-active' : ''}>{h.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function FontSizeControl({ locale = 'en' }: { locale?: Locale }) {
  const [size, setSize] = useState(17)
  useEffect(() => {
    document.documentElement.style.setProperty('--article-font-size', `${size}px`)
  }, [size])
  useEffect(() => () => { document.documentElement.style.removeProperty('--article-font-size') }, [])
  return (
    <div className="font-size-control">
      <span>{t(ui.common.textSize, locale)}</span>
      <button type="button" onClick={() => setSize((s) => Math.max(14, s - 1))} aria-label="Decrease text size"><Minus size={12} /></button>
      <button type="button" onClick={() => setSize((s) => Math.min(21, s + 1))} aria-label="Increase text size"><Plus size={12} /></button>
    </div>
  )
}

export function ShareButton({ locale = 'en' }: { locale?: Locale }) {
  const [copied, setCopied] = useState(false)
  async function share() {
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ url, title: document.title }); return } catch {}
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {}
  }
  return (
    <button type="button" onClick={share} aria-label="Share this article">
      {copied ? <Check /> : <Share2 />} {copied ? t(ui.common.copied, locale) : t(ui.common.share, locale)}
    </button>
  )
}

export function CopyLinkButton({ locale = 'en' }: { locale?: Locale }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {}
  }
  return (
    <button type="button" onClick={copy} aria-label="Copy link">
      {copied ? <Check /> : <Link2 />} {copied ? t(ui.common.copied, locale) : t(ui.common.copyLink, locale)}
    </button>
  )
}
