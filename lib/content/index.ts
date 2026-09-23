import { articles, documents, people, places, sections, timeline } from '@/data/archive'

export async function getSections() { return sections }
export async function getSectionBySlug(slug: string) { return sections.find((section) => section.slug === slug) }
export async function getArticles() { return articles }
export async function getArticleBySlug(slug: string) { return articles.find((article) => article.slug === slug) }
export async function getPeople() { return people }
export async function getPersonBySlug(slug: string) { return people.find((person) => person.slug === slug) }
export async function getPlaces() { return places }
export async function getPlaceBySlug(slug: string) { return places.find((place) => place.slug === slug) }
export async function getDocuments() { return documents }
export async function getTimeline() { return timeline }

// Replace these mock implementations with Supabase queries without changing UI consumers.
export const contentProvider = 'mock'
