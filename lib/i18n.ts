import type { I18nText, Locale } from '@/types/content'

export { LOCALES, DEFAULT_LOCALE } from '@/types/content'
export type { Locale } from '@/types/content'

export const LOCALE_LABEL: Record<Locale, string> = { en: 'English', gu: 'ગુજરાતી', hi: 'हिन्दी' }
export const LOCALE_SHORT: Record<Locale, string> = { en: 'EN', gu: 'ગુ', hi: 'हि' }

/** Resolve an I18nText field for a locale, falling back to English. */
export function localize(text: I18nText | undefined, fallback: string, locale: Locale): string {
  if (!text) return fallback
  return text[locale] || text.en || fallback
}

export function isLocale(value: string): value is Locale {
  return value === 'en' || value === 'gu' || value === 'hi'
}

/** UI chrome copy — content (articles, people, places…) is translated via I18nText in the data layer instead. */
export const ui = {
  nav: {
    history: { en: 'History', gu: 'ઇતિહાસ', hi: 'इतिहास' },
    sections: { en: 'Sections', gu: 'વિભાગો', hi: 'खंड' },
    timeline: { en: 'Timeline', gu: 'સમયરેખા', hi: 'समयरेखा' },
    people: { en: 'People', gu: 'વ્યક્તિઓ', hi: 'लोग' },
    places: { en: 'Places', gu: 'સ્થળો', hi: 'स्थान' },
    library: { en: 'Documents', gu: 'દસ્તાવેજો', hi: 'दस्तावेज़' },
    regions: { en: 'Regions', gu: 'પ્રદેશો', hi: 'क्षेत्र' },
    diaspora: { en: 'Diaspora', gu: 'ડાયસ્પોરા', hi: 'प्रवासी' },
    surnames: { en: 'Surnames', gu: 'અટકો', hi: 'उपनाम' },
    search: { en: 'Search', gu: 'શોધો', hi: 'खोजें' },
    about: { en: 'About', gu: 'વિશે', hi: 'परिचय' },
    sources: { en: 'Sources', gu: 'સ્રોતો', hi: 'स्रोत' },
  },
  common: {
    explore: { en: 'Explore', gu: 'જુઓ', hi: 'देखें' },
    readMore: { en: 'Read more', gu: 'વધુ વાંચો', hi: 'और पढ़ें' },
    viewProfile: { en: 'View profile', gu: 'પ્રોફાઇલ જુઓ', hi: 'प्रोफ़ाइल देखें' },
    viewRecord: { en: 'View record', gu: 'રેકોર્ડ જુઓ', hi: 'रिकॉर्ड देखें' },
    viewDocument: { en: 'View document', gu: 'દસ્તાવેજ જુઓ', hi: 'दस्तावेज़ देखें' },
    viewAll: { en: 'View all', gu: 'બધું જુઓ', hi: 'सभी देखें' },
    backTo: { en: 'Back to', gu: 'પર પાછા', hi: 'वापस' },
    articles: { en: 'articles', gu: 'લેખો', hi: 'लेख' },
    minRead: { en: 'min read', gu: 'મિનિટ વાંચન', hi: 'मिनट पठन' },
    relatedArticles: { en: 'Related articles', gu: 'સંબંધિત લેખો', hi: 'संबंधित लेख' },
    relatedPeople: { en: 'Related people', gu: 'સંબંધિત વ્યક્તિઓ', hi: 'संबंधित लोग' },
    relatedPlaces: { en: 'Related places', gu: 'સંબંધિત સ્થળો', hi: 'संबंधित स्थान' },
    references: { en: 'References', gu: 'સંદર્ભો', hi: 'संदर्भ' },
    documents: { en: 'Documents', gu: 'દસ્તાવેજો', hi: 'दस्तावेज़' },
    timeline: { en: 'Timeline', gu: 'સમયરેખા', hi: 'समयरेखा' },
    tableOfContents: { en: 'Contents', gu: 'અનુક્રમણિકા', hi: 'विषय सूची' },
    search: { en: 'Search the archive', gu: 'આર્કાઇવ શોધો', hi: 'अभिलेख खोजें' },
    noResults: { en: 'No records match your search yet.', gu: 'તમારી શોધ સાથે મેળ ખાતો કોઈ રેકોર્ડ નથી.', hi: 'आपकी खोज से मेल खाता कोई रिकॉर्ड नहीं मिला.' },
    demo: {
      en: 'Demonstration content — verify against primary sources before publication.',
      gu: 'ડેમો સામગ્રી — પ્રકાશન પહેલાં પ્રાથમિક સ્રોતો સામે ચકાસો.',
      hi: 'डेमो सामग्री — प्रकाशन से पहले प्राथमिक स्रोतों से सत्यापित करें.',
    },
    translationPending: {
      en: 'A full translation of this article is in progress. Showing the English text below.',
      gu: 'આ લેખનો સંપૂર્ણ અનુવાદ પ્રગતિમાં છે. નીચે અંગ્રેજી લખાણ બતાવવામાં આવ્યું છે.',
      hi: 'इस लेख का पूर्ण अनुवाद प्रगति पर है। नीचे अंग्रेज़ी पाठ दिखाया गया है.',
    },
  },
} as const

export function t(entry: I18nText, locale: Locale): string {
  return entry[locale] || entry.en
}
