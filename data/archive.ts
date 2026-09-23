import type { Article, Document, Person, Place, Section, TimelineEvent } from '@/types/content'

const image = (url: string, alt: string, caption?: string) => ({ id: url, url, alt, caption })

export const sections: Section[] = [
  { id: 'origins', title: 'Origins', slug: 'origins', description: 'Tracing the early roots, identities and oral traditions that shaped the Patidar story.', order: 1, featured: true, coverImage: image('https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=85', 'Sunlit agricultural fields') },
  { id: 'agriculture', title: 'Agriculture', slug: 'agriculture', description: 'Land, cultivation and the changing agrarian worlds of Gujarat.', order: 2, featured: true, coverImage: image('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85', 'Rows of crops in a field') },
  { id: 'freedom', title: 'Freedom Movement', slug: 'freedom-movement', description: 'Peasant movements, civic courage and the making of modern Gujarat.', order: 3, featured: true, coverImage: image('https://commons.wikimedia.org/wiki/Special:FilePath/Gandhi%20and%20Sardar%20Patel%20Bardoli%20Satyagraha.jpg?width=1600', 'Mahatma Gandhi and Sardar Vallabhbhai Patel during the Bardoli Satyagraha') },
  { id: 'migration', title: 'Migration', slug: 'migration', description: 'Journeys from Gujarat to East Africa, Britain, North America and beyond.', order: 4, featured: true, coverImage: image('https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=1200&q=85', 'Vintage travel trunk') },
  { id: 'business', title: 'Business', slug: 'business', description: 'Enterprise, hospitality and the networks that connected a global community.', order: 5, featured: true, coverImage: image('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85', 'Historic-inspired office interior') },
  { id: 'diaspora', title: 'Global Diaspora', slug: 'global-diaspora', description: 'Belonging, memory and community across continents.', order: 6, featured: true, coverImage: image('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=85', 'Map and travel documents') },
]

export const timeline: TimelineEvent[] = [
  { id: 't1', year: '1800s', title: 'Agricultural transformation', description: 'A period of changing cultivation, landholding and village economies across Gujarat.', category: 'Agriculture', region: 'Gujarat' },
  { id: 't2', year: '1918', title: 'Kheda Satyagraha', description: 'A landmark campaign for peasant relief and civic rights.', category: 'Freedom Movement', region: 'Kheda' },
  { id: 't3', year: '1928', title: 'Bardoli Satyagraha', description: 'Collective action becomes a defining chapter in the freedom struggle.', category: 'Freedom Movement', region: 'South Gujarat' },
  { id: 't4', year: '1947', title: 'Independence', description: 'The end of colonial rule opens a new chapter for Gujarat and India.', category: 'Politics', region: 'India' },
  { id: 't5', year: '1960', title: 'Formation of Gujarat', description: 'A new state reshapes regional institutions, culture and public life.', category: 'Gujarat History', region: 'Gujarat' },
  { id: 't6', year: '1972', title: 'Uganda expulsion', description: 'A rupture that reshaped Gujarati lives, businesses and diaspora networks.', category: 'Migration', region: 'East Africa' },
]

export const people: Person[] = [
  { id: 'p1', name: 'Vallabhbhai Patel', slug: 'vallabhbhai-patel', shortDescription: 'Barrister, organiser and one of the central figures of India’s independence movement.', birthYear: 1875, deathYear: 1950, region: 'Charotar', category: 'Political leader', imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sardar%20Patel.jpg?width=800' },
  { id: 'p2', name: 'Tribhuvandas Patel', slug: 'tribhuvandas-patel', shortDescription: 'Cooperative organiser whose work helped shape the dairy movement in Gujarat.', birthYear: 1903, deathYear: 1994, region: 'Kheda', category: 'Cooperative leader', imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tribhuvandas%20Patel.jpg?width=800' },
  { id: 'p3', name: 'Anasuya Sarabhai', slug: 'anasuya-sarabhai', shortDescription: 'A pioneering organiser in labour, education and social reform in Ahmedabad.', birthYear: 1885, deathYear: 1972, region: 'Ahmedabad', category: 'Social reformer', imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Anasuya%20Sarabhai.jpg?width=800' },
]

export const places: Place[] = [
  { id: 'pl1', name: 'Karamsad', slug: 'karamsad', description: 'A village in Charotar remembered for its connections to the Patel family and regional public life.', region: 'Charotar', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Sardar_Patel_Memorial_Karamsad.JPG' },
  { id: 'pl2', name: 'Anand', slug: 'anand', description: 'A city associated with cooperative institutions, education and the dairy economy.', region: 'Central Gujarat', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Amul_Plant_at_Anand.jpg' },
  { id: 'pl3', name: 'Nadiad', slug: 'nadiad', description: 'A historic town and cultural centre in the Kheda district.', region: 'Charotar', imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85' },
  { id: 'pl4', name: 'Unjha', slug: 'unjha', description: 'A North Gujarat trading centre known for its agricultural markets and institutions.', region: 'North Gujarat', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Umiya_Mata_Temple_at_Unjha%2CGujarat%2C_India.jpg' },
]

export const documents: Document[] = [
  { id: 'd1', title: 'The Bardoli Campaign: A Documentary Record', author: 'Gujarat State Archives', year: '1928', source: 'Demonstration archive record', category: 'Government documents', pages: 84, archive: 'Patidar History Research Library' },
  { id: 'd2', title: 'Cooperation and Rural Change in Kheda', author: 'Research Library Collection', year: '1965', source: 'Demonstration archive record', category: 'Research papers', pages: 42, archive: 'Patidar History Research Library' },
  { id: 'd3', title: 'Gujarati Merchants in East Africa', author: 'Community History Series', year: '1978', source: 'Demonstration archive record', category: 'Community publications', pages: 116, archive: 'Patidar History Research Library' },
]

export const articles: Article[] = [
  { id: 'a1', sectionId: 'freedom', title: 'Bardoli Satyagraha', slug: 'bardoli-satyagraha', subtitle: 'Land, tax and the power of collective action', excerpt: 'A visual introduction to one of the most studied peasant campaigns in modern Gujarat.', author: 'Patidar History Editorial Desk', publishedDate: new Date('2026-01-12'), readingTime: 8, featured: true, heroImage: image('https://commons.wikimedia.org/wiki/Special:FilePath/Gandhi%20and%20Sardar%20Patel%20Bardoli%20Satyagraha.jpg?width=1600', 'Mahatma Gandhi and Sardar Vallabhbhai Patel during the Bardoli Satyagraha'), tags: ['Freedom movement', 'Bardoli', 'Peasant history'], content: [{ id: 'b1', type: 'paragraph', order: 1, data: { text: 'This demonstration article shows how long-form historical writing can be assembled from structured content blocks. Sources and citations are intentionally marked as demonstration material until the research collection is connected.' } }, { id: 'b2', type: 'quote', order: 2, data: { text: 'The archive is not only a store of the past; it is a conversation about what communities choose to remember.', author: 'Demonstration editorial note', year: '2026' } }] },
  { id: 'a2', sectionId: 'origins', title: 'Kanbi and Patidar', slug: 'kanbi-and-patidar', subtitle: 'Names, identities and the making of a community', excerpt: 'A guide to reading identity, memory and agrarian history together.', author: 'Patidar History Editorial Desk', publishedDate: new Date('2026-02-04'), readingTime: 6, featured: true, heroImage: image('https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1600&q=90', 'Agricultural fields at golden hour'), tags: ['Origins', 'Identity', 'Agriculture'], content: [{ id: 'b3', type: 'paragraph', order: 1, data: { text: 'The Patidar story is best approached as a layered history: of land and labour, kinship and mobility, village institutions and new global connections.' } }] },
  { id: 'a3', sectionId: 'migration', title: 'Patidar Migration to East Africa', slug: 'patidar-migration-to-east-africa', subtitle: 'Routes of work, family and belonging', excerpt: 'How journeys across the Indian Ocean became part of a wider Gujarati history.', author: 'Patidar History Editorial Desk', publishedDate: new Date('2026-02-19'), readingTime: 7, featured: true, heroImage: image('https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=1600&q=90', 'Vintage travel trunk'), tags: ['Migration', 'East Africa', 'Diaspora'], content: [{ id: 'b4', type: 'paragraph', order: 1, data: { text: 'Migration is presented here as a network of decisions and relationships rather than a single journey: a history carried through letters, businesses, associations and memory.' } }] },
]

export function getSection(slug: string) { return sections.find((section) => section.slug === slug) }
export function getArticle(slug: string) { return articles.find((article) => article.slug === slug) }
export function getFeaturedArticles() { return articles.filter((article) => article.featured) }
export function getArticlesForSection(sectionId: string) { return articles.filter((article) => article.sectionId === sectionId) }
export function getPerson(slug: string) { return people.find((person) => person.slug === slug) }
export function getPlace(slug: string) { return places.find((place) => place.slug === slug) }
export function getAllContent() { return { sections, articles, people, places, documents, timeline } }
export const demoLabel = 'Demonstration content — replace with verified research records.'

export const navigationLabels = { en: { history: 'History', timeline: 'Timeline', people: 'People', places: 'Places', library: 'Research library' }, gu: { history: 'ઇતિહાસ', timeline: 'સમયરેખા', people: 'વ્યક્તિઓ', places: 'સ્થળો', library: 'સંશોધન પુસ્તકાલ��' }, hi: { history: 'इतिहास', timeline: 'समयरेखा', people: 'लोग', places: 'स्थान', library: 'शोध पुस्तकालय' } }

export type Locale = keyof typeof navigationLabels
export function getNavigationLabels(locale: Locale = 'en') { return navigationLabels[locale] }

export const demoContent = { sections, articles, people, places, documents, timeline }

export const featuredPeople = people.slice(0, 3)
export const featuredPlaces = places.slice(0, 4)
export const recentDocuments = documents.slice(0, 3)

export const contentStats = { articles: 42, people: 86, places: 34, documents: 128 }

export const getArticleById = (id: string) => articles.find((article) => article.id === id)
export const getSectionById = (id: string) => sections.find((section) => section.id === id)
export const getPersonById = (id: string) => people.find((person) => person.id === id)
export const getPlaceById = (id: string) => places.find((place) => place.id === id)
export const getDocumentById = (id: string) => documents.find((document) => document.id === id)

export const relatedArticles = articles
export const relatedPeople = people
export const relatedPlaces = places

export const archiveCategories = ['Books', 'PDFs', 'Government documents', 'Research papers', 'Historical records', 'Newspapers', 'Community publications']
export const regions = ['Charotar', 'North Gujarat', 'Saurashtra', 'South Gujarat', 'Central Gujarat', 'Kutch']
export const languages = [{ code: 'en', label: 'English' }, { code: 'gu', label: 'ગુજરાતી' }, { code: 'hi', label: 'हिन्दी' }]

export const searchResults = [...articles.map((item) => ({ id: item.id, type: 'article' as const, title: item.title, excerpt: item.excerpt, slug: item.slug })), ...people.map((item) => ({ id: item.id, type: 'person' as const, title: item.name, excerpt: item.shortDescription, slug: item.slug }))]

export function searchArchive(query: string) { const q = query.toLowerCase().trim(); return q ? searchResults.filter((item) => `${item.title} ${item.excerpt}`.toLowerCase().includes(q)) : [] }

export const archiveMeta = { title: 'Patidar History', description: 'From Kanbi roots to a global community — a digital historical archive.' }

export const placeholderDocument = documents[0]
export const placeholderReference = { id: 'ref-demo', title: 'Demonstration reference record', source: 'Patidar History Research Library', year: '2026', page: 1 }

export const sectionCards = sections.filter((section) => section.featured)
export const timelinePreview = timeline.slice(0, 6)
export const peoplePreview = featuredPeople
export const placesPreview = featuredPlaces

export const footerLinks = ['About the archive', 'Editorial method', 'Contribute a source', 'Contact']

export const translations = { 'home.explore': 'Explore history', 'home.library': 'Research library', 'home.introEyebrow': 'An evolving public record', 'home.introTitle': 'Understanding the Patidar story', 'home.introBody': 'Explore centuries of agriculture, migration, social change, freedom struggle, entrepreneurship and global diaspora.', 'common.demo': demoLabel }

export const contentModelVersion = '0.1.0'

export const getMockData = () => demoContent

export default demoContent

export const siteNavigation = [
  { label: 'History', href: '#history' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'People', href: '#people' },
  { label: 'Places', href: '#places' },
  { label: 'Library', href: '#library' },
]

export const heroImage = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=90'
export const archiveYears = '1800 — Present'
export const currentLocale: Locale = 'en'
export const supportedLocales: Locale[] = ['en', 'gu', 'hi']
export const defaultLocale: Locale = 'en'

export const getSections = () => sections
export const getArticles = () => articles
export const getPeople = () => people
export const getPlaces = () => places
export const getDocuments = () => documents
export const getTimeline = () => timeline

export const citationStyle = 'Chicago Notes & Bibliography'
export const isDemo = true
export const archiveName = 'Patidar History'
export const archiveSubtitle = 'From Kanbi Roots to a Global Community'
export const archiveTagline = 'A digital archive of people, places, movement and memory.'
export const archiveVersion = 'Frontend research prototype'
export const lastUpdated = 'September 2026'
export const contactEmail = 'archive@example.org'
export const copyrightNotice = '© 2026 Patidar History Archive'
export const socialLinks = { instagram: '#', youtube: '#', email: `mailto:${contactEmail}` }
export const sectionCount = sections.length
export const articleCount = articles.length
export const personCount = people.length
export const placeCount = places.length
export const documentCount = documents.length
export const timelineCount = timeline.length
export const allSlugs = { sections: sections.map((s) => s.slug), articles: articles.map((a) => a.slug), people: people.map((p) => p.slug), places: places.map((p) => p.slug) }
export const contentTypeLabels = { article: 'Article', person: 'Person', place: 'Place', document: 'Document', timeline: 'Timeline event' }
export const mockDataWarning = demoLabel
export const localeOptions = languages
export const regionOptions = regions
export const categoryOptions = archiveCategories
export const timelineCategories = [...new Set(timeline.map((event) => event.category).filter(Boolean))]
export const articleTags = [...new Set(articles.flatMap((article) => article.tags ?? []))]
export const archiveDescription = archiveMeta.description
export const archiveTitle = archiveMeta.title
export const primarySection = sections[2]
export const primaryArticle = articles[0]
export const primaryPerson = people[0]
export const primaryPlace = places[0]
export const primaryDocument = documents[0]
export const primaryTimelineEvent = timeline[0]
export const contentAccess = { provider: 'mock', replaceWith: 'Supabase data access functions' }
export const routeExamples = ['/en', '/en/sections/freedom-movement', '/en/sections/freedom-movement/bardoli-satyagraha', '/en/people', '/en/places', '/en/timeline', '/en/library']
export const schemaReady = true
export const backendReady = false
export const adminReady = false
export const authReady = false
export const translationApiReady = false
export const searchReady = false
export const finalMockDataExport = { ...demoContent, schemaReady, backendReady, adminReady }

export const getDataAccess = () => ({ getSections, getArticles, getPeople, getPlaces, getDocuments, getTimeline, getArticle, getSection, getPerson, getPlace })

export const __archiveData = { sections, articles, people, places, documents, timeline }

export const dataVersion = 'mock-2026-09'
export const archiveMode = 'frontend-only'
export const futureIntegrations = ['Supabase', 'Authentication', 'CMS', 'Translation API', 'Search index']
export const currentDataSource = 'TypeScript mock data'
export const contentWarning = 'Historical claims shown in this prototype require source verification before publication.'
export const researchStatus = 'Prototype'
export const availableLanguages = ['English', 'ગુજરાતી', 'हिन्दी']
export const homepageSections = ['introduction', 'history', 'timeline', 'people', 'places', 'library', 'articles', 'regions', 'diaspora']
export const footerNote = 'Built as a scholarly starting point for a living archive.'
export const siteTitle = `${archiveName} — ${archiveSubtitle}`
export const pageDescription = archiveMeta.description
export const metaKeywords = ['Patidar', 'Gujarat', 'history', 'archive', 'diaspora', 'Kanbi']
export const openGraphImage = heroImage
export const canonicalPath = '/en'
export const accessibilityNote = 'Semantic, keyboard-friendly and responsive by design.'
export const editorialNote = 'Content in this prototype is demonstrative and not a substitute for cited historical research.'
export const apiBoundary = 'lib/content'
export const cmsBoundary = 'data/content blocks'
export const localeBoundary = 'next-intl ready'
export const final = true

export const makeMockId = (prefix: string, index: number) => `${prefix}-${index}`
export const formatYearRange = (start: number, end?: number) => `${start}${end ? ` — ${end}` : ' — present'}`
export const getLocaleLabel = (locale: Locale) => languages.find((language) => language.code === locale)?.label ?? 'English'
export const getContentCount = () => ({ sections: sections.length, articles: articles.length, people: people.length, places: places.length, documents: documents.length, timeline: timeline.length })
export const hasMockContent = true
export const dataLayer = { mock: true, database: false, api: false }
export const version = contentModelVersion
export const status = 'ready'
export const end = true
