// Data-access layer. UI components should only ever import from here, never from `@/data/*`
// directly. Every function is async so that swapping this mock layer for Supabase queries
// later requires no changes in consuming components.
import {
  sections, articles, people, places, documents, references, timeline, regions, diasporaDestinations,
} from '@/data/archive'
import type { SearchResult, SearchResultType } from '@/types/content'

export const contentProvider = 'mock' as const

/* ------------------------------- Sections -------------------------------- */
export async function getSections() {
  return [...sections].sort((a, b) => a.order - b.order)
}
export async function getFeaturedSections() {
  return sections.filter((s) => s.featured).sort((a, b) => a.order - b.order)
}
export async function getSectionBySlug(slug: string) {
  return sections.find((s) => s.slug === slug)
}

/* -------------------------------- Articles -------------------------------- */
export async function getArticles() {
  return articles
}
export async function getFeaturedArticles() {
  return articles.filter((a) => a.featured)
}
export async function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug)
}
export async function getArticlesBySection(sectionSlug: string) {
  return articles.filter((a) => a.sectionSlug === sectionSlug)
}
export async function getRelatedArticles(article: { relatedArticleSlugs?: string[]; sectionSlug: string; slug: string }) {
  if (article.relatedArticleSlugs?.length) {
    return article.relatedArticleSlugs.map((slug) => articles.find((a) => a.slug === slug)).filter(Boolean) as typeof articles
  }
  return articles.filter((a) => a.sectionSlug === article.sectionSlug && a.slug !== article.slug).slice(0, 3)
}

/* --------------------------------- People --------------------------------- */
export async function getPeople() {
  return people
}
export async function getPersonBySlug(slug: string) {
  return people.find((p) => p.slug === slug)
}
export async function getPeopleByArticle(slug: string) {
  return people.filter((p) => p.relatedArticleSlugs?.includes(slug))
}

/* --------------------------------- Places --------------------------------- */
export async function getPlaces() {
  return places
}
export async function getPlaceBySlug(slug: string) {
  return places.find((p) => p.slug === slug)
}
export async function getPlacesByArticle(slug: string) {
  return places.filter((p) => p.relatedArticleSlugs?.includes(slug))
}

/* -------------------------------- Documents -------------------------------- */
export async function getDocuments() {
  return documents
}
export async function getDocumentBySlug(slug: string) {
  return documents.find((d) => d.slug === slug)
}
export async function getReferences() {
  return references
}
export async function getReferencesByIds(ids: string[]) {
  return ids.map((id) => references.find((r) => r.id === id)).filter(Boolean) as typeof references
}
export async function getDocumentsCitingArticle(slug: string) {
  return documents.filter((d) => d.relatedArticleSlugs?.includes(slug))
}

/* -------------------------------- Timeline --------------------------------- */
export async function getTimeline() {
  return [...timeline].sort((a, b) => a.sortYear - b.sortYear)
}
export async function getTimelineByCategory(category?: string) {
  const sorted = await getTimeline()
  return category && category !== 'All' ? sorted.filter((e) => e.category === category) : sorted
}

/* -------------------------------- Regions ----------------------------------- */
export async function getRegions() {
  return regions
}
export async function getRegionBySlug(slug: string) {
  return regions.find((r) => r.slug === slug)
}

/* -------------------------------- Diaspora ----------------------------------- */
export async function getDiaspora() {
  return diasporaDestinations
}
export async function getDiasporaBySlug(slug: string) {
  return diasporaDestinations.find((d) => d.slug === slug)
}

/* ------------------------------ Batch helpers --------------------------------- */
export async function getPeopleBySlugs(slugs: string[] = []) {
  return slugs.map((slug) => people.find((p) => p.slug === slug)).filter(Boolean) as typeof people
}
export async function getPlacesBySlugs(slugs: string[] = []) {
  return slugs.map((slug) => places.find((p) => p.slug === slug)).filter(Boolean) as typeof places
}
export async function getDocumentsBySlugs(slugs: string[] = []) {
  return slugs.map((slug) => documents.find((d) => d.slug === slug)).filter(Boolean) as typeof documents
}
export async function getTimelineByIds(ids: string[] = []) {
  return ids.map((id) => timeline.find((e) => e.id === id)).filter(Boolean) as typeof timeline
}

/* --------------------------------- Search ------------------------------------ */
export async function search(query: string): Promise<SearchResult[]> {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const results: SearchResult[] = []

  for (const a of articles) {
    if (`${a.title} ${a.subtitle} ${a.excerpt} ${a.tags.join(' ')}`.toLowerCase().includes(q)) {
      results.push({ id: a.id, type: 'article', title: a.title, excerpt: a.excerpt, imageUrl: a.heroImage.url, href: `/sections/${a.sectionSlug}/${a.slug}`, category: a.sectionSlug })
    }
  }
  for (const s of sections) {
    if (`${s.title} ${s.description}`.toLowerCase().includes(q)) {
      results.push({ id: s.id, type: 'section', title: s.title, excerpt: s.description, imageUrl: s.coverImage.url, href: `/sections/${s.slug}` })
    }
  }
  for (const p of people) {
    if (`${p.name} ${p.shortDescription} ${p.knownFor}`.toLowerCase().includes(q)) {
      results.push({ id: p.id, type: 'person', title: p.name, excerpt: p.shortDescription, imageUrl: p.imageUrl, href: `/people/${p.slug}`, category: p.category })
    }
  }
  for (const p of places) {
    if (`${p.name} ${p.description}`.toLowerCase().includes(q)) {
      results.push({ id: p.id, type: 'place', title: p.name, excerpt: p.description, imageUrl: p.imageUrl, href: `/places/${p.slug}`, category: p.region })
    }
  }
  for (const d of documents) {
    if (`${d.title} ${d.description ?? ''} ${d.author ?? ''}`.toLowerCase().includes(q)) {
      results.push({ id: d.id, type: 'document', title: d.title, excerpt: d.description, href: `/library/${d.slug}`, category: d.category })
    }
  }
  for (const e of timeline) {
    if (`${e.title} ${e.description}`.toLowerCase().includes(q)) {
      results.push({ id: e.id, type: 'timeline', title: `${e.year} — ${e.title}`, excerpt: e.description, href: `/timeline#${e.id}`, category: e.category })
    }
  }
  for (const r of regions) {
    if (`${r.name} ${r.description}`.toLowerCase().includes(q)) {
      results.push({ id: r.id, type: 'region', title: r.name, excerpt: r.description, imageUrl: r.imageUrl, href: `/regions/${r.slug}` })
    }
  }
  for (const d of diasporaDestinations) {
    if (`${d.name} ${d.context}`.toLowerCase().includes(q)) {
      results.push({ id: d.id, type: 'diaspora', title: d.name, excerpt: d.context, imageUrl: d.imageUrl, href: `/diaspora#${d.slug}` })
    }
  }
  return results
}

export function groupSearchResults(results: SearchResult[]) {
  const groups: Record<SearchResultType, SearchResult[]> = { article: [], section: [], person: [], place: [], document: [], timeline: [], region: [], diaspora: [] }
  for (const r of results) groups[r.type].push(r)
  return groups
}
