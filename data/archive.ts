// Barrel export for the archive's mock data layer.
// UI code should prefer importing from `@/lib/content` (the data-access layer);
// this file exists to assemble the raw collections from their source files.

import { sections } from './sections'
import { articlesCore } from './articles-core'
import { articlesModern } from './articles-modern'
import { people } from './people'
import { places } from './places'
import { documents, references } from './documents'
import { timeline } from './timeline'
import { regions } from './regions'
import { diasporaDestinations } from './diaspora'

export const articles = [...articlesCore, ...articlesModern]
export { sections, people, places, documents, references, timeline, regions, diasporaDestinations }

export const contentStats = {
  sections: sections.length,
  articles: articles.length,
  people: people.length,
  places: places.length,
  documents: documents.length,
  timeline: timeline.length,
  regions: regions.length,
}

export const heroImage = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=90'
