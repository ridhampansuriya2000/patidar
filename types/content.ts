// Content type definitions for the Patidar History Archive.
// This is the shape the future Supabase-backed CMS should target —
// UI components read exclusively through lib/content, never these arrays directly.

export type Locale = 'en' | 'gu' | 'hi'
export const LOCALES: Locale[] = ['en', 'gu', 'hi']
export const DEFAULT_LOCALE: Locale = 'en'

/** A string with optional Gujarati/Hindi translations. `en` is always the source of truth. */
export interface I18nText {
  en: string
  gu?: string
  hi?: string
}

/** Evidence label used throughout the archive to separate fact from tradition. */
export type EvidenceLevel = 'documented' | 'scholarly-interpretation' | 'community-tradition' | 'open-question'

export const EVIDENCE_LABEL: Record<EvidenceLevel, I18nText> = {
  documented: { en: 'Documented', gu: 'દસ્તાવેજીકૃત', hi: 'प्रलेखित' },
  'scholarly-interpretation': { en: 'Scholarly interpretation', gu: 'વિદ્વતાપૂર્ણ અર્થઘટન', hi: 'विद्वत व्याख्या' },
  'community-tradition': { en: 'Community tradition', gu: 'સામુદાયિક પરંપરા', hi: 'सामुदायिक परंपरा' },
  'open-question': { en: 'Open question', gu: 'ખુલ્લો પ્રશ્ન', hi: 'खुला प्रश्न' },
}

export interface Image {
  id: string
  url: string
  alt: string
  caption?: string
  credit?: string
  photographer?: string
  year?: string
  source?: string
}

export interface Gallery {
  id: string
  title?: string
  images: Image[]
}

export interface Reference {
  id: string
  title: string
  author?: string
  source?: string
  publisher?: string
  year?: string
  page?: number
  url?: string
  documentSlug?: string
  quote?: string
  tier?: 1 | 2 | 3 | 4 | 5
}

export interface Document {
  id: string
  slug: string
  title: string
  description?: string
  author?: string
  year?: string
  publisher?: string
  source?: string
  language?: string
  category: string
  type: 'book' | 'government' | 'record' | 'paper' | 'newspaper' | 'report' | 'photograph' | 'scan' | 'oral-history' | 'other'
  pages?: number
  coverImage?: Image
  archive?: string
  tags?: string[]
  tier?: 1 | 2 | 3 | 4 | 5
  relatedArticleSlugs?: string[]
}

/* ---------------------------- Content blocks ---------------------------- */

export type ContentBlockType =
  | 'heading'
  | 'subheading'
  | 'paragraph'
  | 'quote'
  | 'image'
  | 'gallery'
  | 'timeline'
  | 'statistics'
  | 'fact-box'
  | 'historical-note'
  | 'comparison'
  | 'table'
  | 'map'
  | 'person-ref'
  | 'place-ref'
  | 'document-ref'
  | 'citation'
  | 'divider'

interface BaseBlock {
  id: string
  type: ContentBlockType
  order: number
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading' | 'subheading'
  data: { text: string }
}
export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph'
  data: { text: string; citationIds?: string[] }
}
export interface QuoteBlock extends BaseBlock {
  type: 'quote'
  data: { text: string; author?: string; source?: string; year?: string }
}
export interface ImageBlock extends BaseBlock {
  type: 'image'
  data: Image & { width?: 'inline' | 'wide' | 'full' }
}
export interface GalleryBlock extends BaseBlock {
  type: 'gallery'
  data: { images: Image[] }
}
export interface TimelineBlockData {
  year: string
  title: string
  description?: string
}
export interface TimelineBlock extends BaseBlock {
  type: 'timeline'
  data: { events: TimelineBlockData[] }
}
export interface StatisticsBlock extends BaseBlock {
  type: 'statistics'
  data: { stats: { value: string; label: string }[] }
}
export interface FactBoxBlock extends BaseBlock {
  type: 'fact-box'
  data: { title: string; items: string[]; evidenceLevel?: EvidenceLevel }
}
export interface HistoricalNoteBlock extends BaseBlock {
  type: 'historical-note'
  data: { text: string; evidenceLevel: EvidenceLevel }
}
export interface ComparisonBlock extends BaseBlock {
  type: 'comparison'
  data: { left: { title: string; points: string[] }; right: { title: string; points: string[] } }
}
export interface TableBlock extends BaseBlock {
  type: 'table'
  data: { caption?: string; headers: string[]; rows: string[][] }
}
export interface MapBlock extends BaseBlock {
  type: 'map'
  data: { label: string; caption?: string; latitude?: number; longitude?: number }
}
export interface PersonRefBlock extends BaseBlock {
  type: 'person-ref'
  data: { personSlug: string }
}
export interface PlaceRefBlock extends BaseBlock {
  type: 'place-ref'
  data: { placeSlug: string }
}
export interface DocumentRefBlock extends BaseBlock {
  type: 'document-ref'
  data: { documentSlug: string }
}
export interface CitationBlock extends BaseBlock {
  type: 'citation'
  data: { referenceId: string; citationNumber: number }
}
export interface DividerBlock extends BaseBlock {
  type: 'divider'
  data?: Record<string, never>
}

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | QuoteBlock
  | ImageBlock
  | GalleryBlock
  | TimelineBlock
  | StatisticsBlock
  | FactBoxBlock
  | HistoricalNoteBlock
  | ComparisonBlock
  | TableBlock
  | MapBlock
  | PersonRefBlock
  | PlaceRefBlock
  | DocumentRefBlock
  | CitationBlock
  | DividerBlock

/* --------------------------------- People -------------------------------- */

export type PersonCategory =
  | 'Freedom movement'
  | 'Political figure'
  | 'Social leader'
  | 'Business leader'
  | 'Educationist'
  | 'Community leader'
  | 'International figure'
  | 'Cooperative leader'

export interface Person {
  id: string
  slug: string
  name: string
  nameI18n?: I18nText
  shortDescription: string
  shortDescriptionI18n?: I18nText
  biography: ContentBlock[]
  knownFor: string
  birthYear?: number
  deathYear?: number
  placeOfBirth?: string
  region: string
  category: PersonCategory
  period: string
  imageUrl: string
  occupation?: string[]
  evidenceLevel?: EvidenceLevel
  relatedArticleSlugs?: string[]
  relatedPlaceSlugs?: string[]
  relatedPersonSlugs?: string[]
  timelineEventIds?: string[]
  referenceIds?: string[]
}

/* --------------------------------- Places -------------------------------- */

export type PlaceType = 'village' | 'city' | 'region' | 'historical-site' | 'migration-destination' | 'institution'

export interface Place {
  id: string
  slug: string
  name: string
  nameI18n?: I18nText
  description: string
  descriptionI18n?: I18nText
  type: PlaceType
  region: string
  period?: string
  imageUrl: string
  latitude?: number
  longitude?: number
  historicalSignificance: ContentBlock[]
  patidarConnection?: string
  modernContext?: string
  evidenceLevel?: EvidenceLevel
  relatedPersonSlugs?: string[]
  relatedArticleSlugs?: string[]
  timelineEventIds?: string[]
  referenceIds?: string[]
  documentSlugs?: string[]
}

/* -------------------------------- Timeline -------------------------------- */

export type TimelineCategory =
  | 'Origins'
  | 'Gujarat'
  | 'Agriculture'
  | 'Freedom Movement'
  | 'Post-Independence'
  | 'Migration'
  | 'Global Diaspora'
  | 'Present Day'

export interface TimelineEvent {
  id: string
  year: string
  sortYear: number
  title: string
  titleI18n?: I18nText
  description: string
  descriptionI18n?: I18nText
  category: TimelineCategory
  region?: string
  imageUrl?: string
  evidenceLevel?: EvidenceLevel
  relatedArticleSlug?: string
  relatedPersonSlugs?: string[]
  relatedPlaceSlugs?: string[]
}

/* -------------------------------- Articles -------------------------------- */

export interface Article {
  id: string
  sectionSlug: string
  subsectionTitle?: string
  slug: string
  title: string
  titleI18n?: I18nText
  subtitle: string
  subtitleI18n?: I18nText
  excerpt: string
  excerptI18n?: I18nText
  heroImage: Image
  content: ContentBlock[]
  contentI18n?: Partial<Record<'gu' | 'hi', ContentBlock[]>>
  author: string
  historicalPeriod: string
  evidenceLevel: EvidenceLevel
  publishedDate: string
  updatedDate?: string
  readingTime: number
  tags: string[]
  references: Reference[]
  relatedPersonSlugs?: string[]
  relatedPlaceSlugs?: string[]
  relatedArticleSlugs?: string[]
  documentSlugs?: string[]
  featured?: boolean
}

/* -------------------------------- Sections -------------------------------- */

export interface Subsection {
  id: string
  title: string
  description: string
}

export interface Section {
  id: string
  slug: string
  title: string
  titleI18n?: I18nText
  description: string
  descriptionI18n?: I18nText
  intro: string
  order: number
  featured?: boolean
  coverImage: Image
  subsections?: Subsection[]
  relatedPersonSlugs?: string[]
  relatedPlaceSlugs?: string[]
  timelineEventIds?: string[]
  documentSlugs?: string[]
  referenceIds?: string[]
}

/* -------------------------------- Regions -------------------------------- */

export interface Region {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  imageUrl: string
  keyAreas: string[]
  historicalBackground: ContentBlock[]
  patidarConnection: string
  agriculture?: string
  migration?: string
  relatedPersonSlugs?: string[]
  relatedPlaceSlugs?: string[]
  relatedArticleSlugs?: string[]
  timelineEventIds?: string[]
  documentSlugs?: string[]
  mapPosition: { top: string; left: string }
}

/* ------------------------------- Diaspora --------------------------------- */

export interface DiasporaDestination {
  id: string
  slug: string
  name: string
  region: string
  period: string
  originGujarat: string
  imageUrl: string
  context: string
  settlement: string
  sectors: string[]
  institutions: string[]
  modernCommunity: string
  relatedPersonSlugs?: string[]
  relatedArticleSlugs?: string[]
  documentSlugs?: string[]
  timelineEventIds?: string[]
  mapPosition: { top: string; left: string }
}

/* -------------------------------- Search ---------------------------------- */

export type SearchResultType = 'article' | 'section' | 'person' | 'place' | 'document' | 'timeline' | 'region' | 'diaspora'

export interface SearchResult {
  id: string
  type: SearchResultType
  title: string
  excerpt?: string
  imageUrl?: string
  href: string
  category?: string
}
