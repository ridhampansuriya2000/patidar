// Content type definitions for the Patidar History Archive

export type ContentBlockType =
  | 'heading'
  | 'paragraph'
  | 'quote'
  | 'image'
  | 'gallery'
  | 'video'
  | 'timeline'
  | 'statistics'
  | 'info-card'
  | 'warning'
  | 'comparison'
  | 'table'
  | 'map'
  | 'person-card'
  | 'place-card'
  | 'document'
  | 'reference'
  | 'divider';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content?: string;
  data?: Record<string, any>;
  order: number;
}

export interface HeadingBlock extends ContentBlock {
  type: 'heading';
  data: {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    text: string;
  };
}

export interface ParagraphBlock extends ContentBlock {
  type: 'paragraph';
  data: {
    text: string;
  };
}

export interface QuoteBlock extends ContentBlock {
  type: 'quote';
  data: {
    text: string;
    source?: string;
    author?: string;
    year?: string;
  };
}

export interface ImageBlock extends ContentBlock {
  type: 'image';
  data: {
    url: string;
    caption?: string;
    credit?: string;
    photographer?: string;
    year?: string;
    alt: string;
    width?: number;
    height?: number;
  };
}

export interface GalleryBlock extends ContentBlock {
  type: 'gallery';
  data: {
    images: ImageBlock['data'][];
  };
}

export interface Reference {
  id: string;
  title: string;
  author?: string;
  source?: string;
  year?: string;
  page?: number;
  url?: string;
  pdfUrl?: string;
  quote?: string;
  archive?: string;
}

export interface ReferenceBlock extends ContentBlock {
  type: 'reference';
  data: {
    referenceId: string;
    reference: Reference;
    citationNumber: number;
  };
}

export interface TimelineEventData {
  year: string;
  title: string;
  description?: string;
}

export interface TimelineBlock extends ContentBlock {
  type: 'timeline';
  data: {
    events: TimelineEventData[];
  };
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  author?: string;
  year?: string;
  source?: string;
  category?: string;
  pdfUrl?: string;
  pages?: number;
  archive?: string;
  tags?: string[];
}

export interface Image {
  id: string;
  url: string;
  caption?: string;
  photographer?: string;
  source?: string;
  year?: string;
  alt: string;
  copyright?: string;
}

export interface Person {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  biography?: string;
  birthYear?: number;
  deathYear?: number;
  region?: string;
  category?: string;
  imageUrl?: string;
  occupation?: string[];
  placeOfBirth?: string;
  associations?: string[];
  documents?: Document[];
  references?: Reference[];
  relatedArticles?: string[];
}

export interface Place {
  id: string;
  name: string;
  slug: string;
  description: string;
  region?: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  historicalSignificance?: string;
  notablePeople?: string[];
  documents?: Document[];
  relatedArticles?: string[];
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  category?: string;
  region?: string;
  imageUrl?: string;
  relatedArticle?: string;
  relatedPerson?: string;
  documents?: Document[];
}

export interface Article {
  id: string;
  sectionId: string;
  title: string;
  slug: string;
  subtitle?: string;
  excerpt: string;
  heroImage?: Image;
  content: ContentBlock[];
  author?: string;
  publishedDate: Date;
  updatedDate?: Date;
  readingTime?: number;
  tags?: string[];
  references?: Reference[];
  relatedPeople?: string[];
  relatedPlaces?: string[];
  relatedArticles?: string[];
  documents?: Document[];
  featured?: boolean;
  translations?: {
    en?: string;
    gu?: string;
    hi?: string;
  };
}

export interface Section {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: Image;
  order: number;
  featured?: boolean;
  children?: Section[];
  articles?: Article[];
  people?: Person[];
  places?: Place[];
  timelineEvents?: TimelineEvent[];
  documents?: Document[];
}

export interface SearchResult {
  id: string;
  type: 'article' | 'person' | 'place' | 'document' | 'timeline';
  title: string;
  excerpt?: string;
  imageUrl?: string;
  slug: string;
  category?: string;
}
