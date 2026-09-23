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
    translationPendingGeneric: {
      en: 'A full translation of this record is in progress. Showing the English text below.',
      gu: 'આ રેકોર્ડનો સંપૂર્ણ અનુવાદ પ્રગતિમાં છે. નીચે અંગ્રેજી લખાણ બતાવવામાં આવ્યું છે.',
      hi: 'इस रिकॉर्ड का पूर्ण अनुवाद प्रगति पर है। नीचे अंग्रेज़ी पाठ दिखाया गया है.',
    },
    readArticle: { en: 'Read article', gu: 'લેખ વાંચો', hi: 'लेख पढ़ें' },
    allArticles: { en: 'All articles', gu: 'બધા લેખો', hi: 'सभी लेख' },
    inThisSection: { en: 'In this section', gu: 'આ વિભાગમાં', hi: 'इस खंड में' },
    sourcesForSection: { en: 'Sources for this section', gu: 'આ વિભાગના સ્રોતો', hi: 'इस खंड के स्रोत' },
    timelineEvents: { en: 'Timeline events', gu: 'સમયરેખા ઘટનાઓ', hi: 'समयरेखा घटनाएं' },
    importantPeople: { en: 'Important people', gu: 'મહત્વપૂર્ણ વ્યક્તિઓ', hi: 'महत्वपूर्ण लोग' },
    importantPlaces: { en: 'Important places', gu: 'મહત્વપૂર્ણ સ્થળો', hi: 'महत्वपूर्ण स्थान' },
    citedByArticles: { en: 'Referenced by these articles', gu: 'આ લેખો દ્વારા સંદર્ભિત', hi: 'इन लेखों द्वारा संदर्भित' },
    citedAtPages: { en: 'Cited at these pages', gu: 'આ પાનાઓ પર ટાંકવામાં આવ્યું', hi: 'इन पृष्ठों पर उद्धृत' },
    suggestedCitation: { en: 'Suggested citation', gu: 'સૂચિત ટાંકણ', hi: 'सुझाया गया उद्धरण' },
    historicalSignificance: { en: 'Historical significance', gu: 'ઐતિહાસિક મહત્વ', hi: 'ऐतिहासिक महत्व' },
    patidarConnection: { en: 'Patidar connection', gu: 'પટીદાર જોડાણ', hi: 'पटीदार संबंध' },
    modernContext: { en: 'Modern context', gu: 'આધુનિક સંદર્ભ', hi: 'आधुनिक संदर्भ' },
    keyAreas: { en: 'Key areas', gu: 'મુખ્ય વિસ્તારો', hi: 'प्रमुख क्षेत्र' },
    agriculture: { en: 'Agriculture', gu: 'ખેતી', hi: 'कृषि' },
    migration: { en: 'Migration', gu: 'સ્થળાંતર', hi: 'प्रवासन' },
    sectors: { en: 'Sectors', gu: 'ક્ષેત્રો', hi: 'क्षेत्र' },
    institutions: { en: 'Institutions', gu: 'સંસ્થાઓ', hi: 'संस्थाएं' },
    communityToday: { en: 'The community today', gu: 'આજે સમુદાય', hi: 'आज समुदाय' },
    downloadPending: { en: 'Download (pending upload)', gu: 'ડાઉનલોડ (અપલોડ બાકી)', hi: 'डाउनलोड (अपलोड लंबित)' },
    viewAllSections: { en: 'View all sections', gu: 'બધા વિભાગો જુઓ', hi: 'सभी खंड देखें' },
    share: { en: 'Share', gu: 'શેર કરો', hi: 'साझा करें' },
    copied: { en: 'Copied', gu: 'નકલ થયું', hi: 'कॉपी हो गया' },
    copyLink: { en: 'Copy link', gu: 'લિંક નકલ કરો', hi: 'लिंक कॉपी करें' },
    textSize: { en: 'Text size', gu: 'ટેક્સ્ટ કદ', hi: 'टेक्स्ट आकार' },
    illustrativeMap: { en: 'Interactive map integration pending — shown as an illustrative placeholder.', gu: 'ઇન્ટરેક્ટિવ નકશો એકીકરણ બાકી — ઉદાહરણરૂપ સ્થાનધારક તરીકે બતાવેલ.', hi: 'इंटरैक्टिव मानचित्र एकीकरण लंबित — उदाहरणात्मक प्लेसहोल्डर के रूप में दिखाया गया.' },
    record: { en: 'record', gu: 'રેકોર્ડ', hi: 'रिकॉर्ड' },
    records: { en: 'records', gu: 'રેકોર્ડ', hi: 'रिकॉर्ड' },
    all: { en: 'All', gu: 'બધા', hi: 'सभी' },
    searchPeople: { en: 'Search people', gu: 'વ્યક્તિઓ શોધો', hi: 'लोग खोजें' },
    searchPlaces: { en: 'Search places', gu: 'સ્થળો શોધો', hi: 'स्थान खोजें' },
    searchLibrary: { en: 'Search the research library', gu: 'સંશોધન પુસ્તકાલય શોધો', hi: 'शोध पुस्तकालय खोजें' },
    noPeopleMatch: { en: 'No people match yet', gu: 'હજી કોઈ વ્યક્તિ મેળ ખાતી નથી', hi: 'अभी तक कोई व्यक्ति मेल नहीं खाता' },
    noPlacesMatch: { en: 'No places match yet', gu: 'હજી કોઈ સ્થળ મેળ ખાતું નથી', hi: 'अभी तक कोई स्थान मेल नहीं खाता' },
    noDocumentsMatch: { en: 'No documents match yet', gu: 'હજી કોઈ દસ્તાવેજ મેળ ખાતો નથી', hi: 'अभी तक कोई दस्तावेज़ मेल नहीं खाता' },
    tryDifferentSearch: { en: 'Try a different search term or filter.', gu: 'અલગ શોધ શબ્દ અથવા ફિલ્ટર અજમાવો.', hi: 'अलग खोज शब्द या फ़िल्टर आज़माएं.' },
    changeLanguage: { en: 'Change language', gu: 'ભાષા બદલો', hi: 'भाषा बदलें' },
    readIn: { en: 'Read in', gu: 'આમાં વાંચો', hi: 'इसमें पढ़ें' },
    historicalSection: { en: 'Historical section', gu: 'ઐતિહાસિક વિભાગ', hi: 'ऐतिहासिक खंड' },
    articlesBeingPrepared: { en: 'Articles for this section are being prepared.', gu: 'આ વિભાગ માટેના લેખો તૈયાર થઈ રહ્યા છે.', hi: 'इस खंड के लिए लेख तैयार किए जा रहे हैं.' },
    searchPlaceholderLong: { en: 'Search people, places, events, documents…', gu: 'લોકો, સ્થળો, ઘટનાઓ, દસ્તાવેજો શોધો…', hi: 'लोग, स्थान, घटनाएं, दस्तावेज़ खोजें…' },
    searchHint: { en: 'Try “Africa”, “Bardoli”, “Amul” or “Charotar.”', gu: '“Africa”, “Bardoli”, “Amul” અથવા “Charotar” અજમાવો.', hi: '“Africa”, “Bardoli”, “Amul” या “Charotar” आज़माएं.' },
    nothingFoundYet: { en: 'Nothing found yet', gu: 'હજી કંઈ મળ્યું નથી', hi: 'अभी तक कुछ नहीं मिला' },
    tryShorterTerm: { en: 'Try a shorter or different term.', gu: 'ટૂંકો અથવા અલગ શબ્દ અજમાવો.', hi: 'छोटा या अलग शब्द आज़माएं.' },
    home: { en: 'Home', gu: 'હોમ', hi: 'होम' },
  },
  pages: {
    history: { eyebrow: { en: 'A layered history', gu: 'એક સ્તરવાળો ઇતિહાસ', hi: 'एक परतदार इतिहास' }, title: { en: 'The story of a community', gu: 'એક સમુદાયની વાર્તા', hi: 'एक समुदाय की कहानी' }, intro: { en: 'This is not a single straight-line story. It moves through agricultural settlement, landholding, revenue administration, social mobility, marriage networks, migration, entrepreneurship, political participation and changing identity — traced here as one continuous chronology.', gu: 'આ એક સીધી લીટીની વાર્તા નથી. તે ખેતીપ્રધાન વસાહત, જમીનધારણ, મહેસૂલ વહીવટ, સામાજિક ગતિશીલતા, લગ્ન-નેટવર્ક, સ્થળાંતર, સાહસિકતા, રાજકીય ભાગીદારી અને બદલાતી ઓળખમાંથી પસાર થાય છે — અહીં એક સતત કાલક્રમ તરીકે શોધાયેલ.', hi: 'यह एक सीधी रेखा की कहानी नहीं है। यह कृषि बस्ती, भूमि-स्वामित्व, राजस्व प्रशासन, सामाजिक गतिशीलता, विवाह-नेटवर्क, प्रवासन, उद्यमिता, राजनीतिक भागीदारी और बदलती पहचान से गुज़रती है — यहां एक निरंतर कालक्रम के रूप में दर्शाई गई है.' } },
    sections: { eyebrow: { en: 'Chapters of the story', gu: 'વાર્તાના પ્રકરણો', hi: 'कहानी के अध्याय' }, title: { en: 'Explore the archive', gu: 'આર્કાઇવ જુઓ', hi: 'अभिलेख देखें' }, intro: { en: 'Fifteen major themes trace the Patidar story from Kanbi agricultural roots through Gujarat’s history, the freedom movement, cooperatives, migration and a global diaspora, to the present day.', gu: 'પંદર મુખ્ય વિષયો કણબી કૃષિ મૂળથી ગુજરાતના ઇતિહાસ, સ્વાતંત્ર્ય સંગ્રામ, સહકારી મંડળીઓ, સ્થળાંતર અને વૈશ્વિક ડાયસ્પોરા સુધી, વર્તમાન સમય સુધીની પટીદાર વાર્તાને શોધે છે.', hi: 'पंद्रह प्रमुख विषय कणबी कृषि जड़ों से गुजरात के इतिहास, स्वतंत्रता संग्राम, सहकारी समितियों, प्रवासन और वैश्विक प्रवासी से लेकर वर्तमान तक पटीदार कहानी का पता लगाते हैं.' } },
    people: { eyebrow: { en: 'People & memory', gu: 'લોકો અને સ્મૃતિ', hi: 'लोग और स्मृति' }, title: { en: 'Lives that made history', gu: 'જીવન જેણે ઇતિહાસ ઘડ્યો', hi: 'जीवन जिसने इतिहास रचा' }, intro: { en: 'Freedom-movement organisers, cooperative leaders, scholars and diaspora entrepreneurs — profiles of the people whose work, lives and choices shaped this archive. Illustrative profiles are clearly marked where a verified individual biography is not yet available.', gu: 'સ્વાતંત્ર્ય-આંદોલન સંગઠકો, સહકારી નેતાઓ, વિદ્વાનો અને ડાયસ્પોરા સાહસિકો — એ લોકોની પ્રોફાઇલ જેમના કાર્ય, જીવન અને પસંદગીઓએ આ આર્કાઇવને ઘડ્યું. જ્યાં ચકાસાયેલ વ્યક્તિગત જીવનચરિત્ર ઉપલબ્ધ નથી ત્યાં ઉદાહરણરૂપ પ્રોફાઇલ સ્પષ્ટ રીતે ચિહ્નિત છે.', hi: 'स्वतंत्रता-आंदोलन आयोजक, सहकारी नेता, विद्वान और प्रवासी उद्यमी — उन लोगों की प्रोफ़ाइल जिनके काम, जीवन और विकल्पों ने इस अभिलेख को आकार दिया। जहां सत्यापित व्यक्तिगत जीवनी उपलब्ध नहीं है वहां उदाहरणात्मक प्रोफ़ाइल स्पष्ट रूप से चिह्नित हैं.' } },
    places: { eyebrow: { en: 'A geography of belonging', gu: 'સંબંધની ભૂગોળ', hi: 'अपनेपन का भूगोल' }, title: { en: 'Places in the Patidar story', gu: 'પટીદાર વાર્તામાં સ્થળો', hi: 'पटीदार कहानी में स्थान' }, intro: { en: 'From Charotar villages to East African trading towns and British resettlement cities — the places that carry this history, each labelled by its documented significance.', gu: 'ચરોતરના ગામડાઓથી પૂર્વ આફ્રિકાના વેપારી શહેરો અને બ્રિટિશ પુનર્વસન શહેરો સુધી — આ ઇતિહાસ વહન કરતા સ્થળો, દરેકને તેના દસ્તાવેજીકૃત મહત્વ દ્વારા ચિહ્નિત કરાયેલ.', hi: 'चरोतर के गांवों से लेकर पूर्वी अफ्रीका के व्यापारिक शहरों और ब्रिटिश पुनर्वास शहरों तक — इस इतिहास को वहन करने वाले स्थान, प्रत्येक को उसके प्रलेखित महत्व से चिह्नित किया गया है.' } },
    timeline: { eyebrow: { en: 'A chronology of change', gu: 'પરિવર્તનની કાલક્રમ', hi: 'परिवर्तन का कालक्रम' }, title: { en: 'Timeline', gu: 'સમયરેખા', hi: 'समयरेखा' }, intro: { en: 'From pre-1800 agricultural settlement to the present day, filtered by theme. Each entry carries the evidence label used throughout this archive.', gu: '1800 પહેલાની ખેતીપ્રધાન વસાહતથી વર્તમાન દિવસ સુધી, વિષય દ્વારા ફિલ્ટર કરેલ. દરેક એન્ટ્રી આ આર્કાઇવમાં વપરાયેલ પુરાવા લેબલ ધરાવે છે.', hi: '1800 से पहले की कृषि बस्ती से लेकर वर्तमान दिन तक, विषय के अनुसार फ़िल्टर किया गया। प्रत्येक प्रविष्टि इस अभिलेख में उपयोग किए गए साक्ष्य लेबल को वहन करती है.' } },
    regions: { eyebrow: { en: 'Gujarat', gu: 'ગુજરાત', hi: 'गुजरात' }, title: { en: 'Regions of connection', gu: 'જોડાણના પ્રદેશો', hi: 'जुड़ाव के क्षेत्र' }, intro: { en: 'Charotar, north Gujarat, Saurashtra, south Gujarat and Kutch each produced a distinct Patidar trajectory. This map is illustrative, not GIS-accurate — use it to navigate, not to measure distance.', gu: 'ચરોતર, ઉત્તર ગુજરાત, સૌરાષ્ટ્ર, દક્ષિણ ગુજરાત અને કચ્છ દરેકે એક અલગ પટીદાર માર્ગ ઉત્પન્ન કર્યો. આ નકશો ઉદાહરણરૂપ છે, GIS-સચોટ નથી — તેનો ઉપયોગ નેવિગેટ કરવા માટે કરો, અંતર માપવા માટે નહીં.', hi: 'चरोतर, उत्तर गुजरात, सौराष्ट्र, दक्षिण गुजरात और कच्छ में से प्रत्येक ने एक अलग पटीदार प्रक्षेपवक्र उत्पन्न किया। यह मानचित्र उदाहरणात्मक है, GIS-सटीक नहीं — इसका उपयोग नेविगेट करने के लिए करें, दूरी मापने के लिए नहीं.' } },
    diaspora: { eyebrow: { en: 'Beyond Gujarat', gu: 'ગુજરાતની બહાર', hi: 'गुजरात से परे' }, title: { en: 'A global community', gu: 'એક વૈશ્વિક સમુદાય', hi: 'एक वैश्विक समुदाय' }, intro: { en: 'From colonial-era East African trade to British resettlement, American hospitality entrepreneurship and beyond — explore this connected geography through carefully sourced stories, places and movement.', gu: 'સંસ્થાનવાદી યુગના પૂર્વ આફ્રિકન વેપારથી બ્રિટિશ પુનર્વસન, અમેરિકન આતિથ્ય સાહસિકતા અને તેનાથી આગળ — કાળજીપૂર્વક સ્રોત કરેલી વાર્તાઓ, સ્થળો અને ગતિ દ્વારા આ જોડાયેલી ભૂગોળ શોધો.', hi: 'औपनिवेशिक युग के पूर्वी अफ्रीकी व्यापार से लेकर ब्रिटिश पुनर्वास, अमेरिकी आतिथ्य उद्यमिता और उससे आगे — सावधानी से स्रोतित कहानियों, स्थानों और गति के माध्यम से इस जुड़ी हुई भूगोल का अन्वेषण करें.' } },
    library: { eyebrow: { en: 'Research library', gu: 'સંશોધન પુસ્તકાલય', hi: 'शोध पुस्तकालय' }, title: { en: 'Read the record', gu: 'નોંધ વાંચો', hi: 'अभिलेख पढ़ें' }, intro: { en: 'Books, government documents, research papers, community publications and oral histories, ranked by the archive’s five-tier source framework: primary sources first, family oral history last — both essential, neither sufficient alone.', gu: 'પુસ્તકો, સરકારી દસ્તાવેજો, સંશોધન પેપર્સ, સામુદાયિક પ્રકાશનો અને મૌખિક ઇતિહાસ, આર્કાઇવના પાંચ-સ્તરીય સ્રોત માળખા દ્વારા ક્રમાંકિત: પ્રાથમિક સ્રોતો પ્રથમ, પારિવારિક મૌખિક ઇતિહાસ છેલ્લે — બંને આવશ્યક, એકલા પૂરતા નથી.', hi: 'पुस्तकें, सरकारी दस्तावेज़, शोधपत्र, सामुदायिक प्रकाशन और मौखिक इतिहास, अभिलेख के पांच-स्तरीय स्रोत ढांचे द्वारा क्रमबद्ध: प्राथमिक स्रोत पहले, पारिवारिक मौखिक इतिहास अंत में — दोनों आवश्यक, अकेले पर्याप्त नहीं.' } },
    search: { eyebrow: { en: 'Research interface', gu: 'સંશોધન ઇન્ટરફેસ', hi: 'शोध इंटरफ़ेस' }, title: { en: 'Search the archive', gu: 'આર્કાઇવ શોધો', hi: 'अभिलेख खोजें' }, intro: { en: 'Find articles, people, places, documents, timeline events and regions across the whole collection.', gu: 'સમગ્ર સંગ્રહમાં લેખો, વ્યક્તિઓ, સ્થળો, દસ્તાવેજો, સમયરેખા ઘટનાઓ અને પ્રદેશો શોધો.', hi: 'पूरे संग्रह में लेख, लोग, स्थान, दस्तावेज़, समयरेखा घटनाएं और क्षेत्र खोजें.' } },
    about: { eyebrow: { en: 'Institutional record', gu: 'સંસ્થાકીય નોંધ', hi: 'संस्थागत अभिलेख' }, title: { en: 'About this archive', gu: 'આ આર્કાઇવ વિશે', hi: 'इस अभिलेख के बारे में' } },
    sources: { eyebrow: { en: 'Working source categories', gu: 'કાર્યકારી સ્રોત શ્રેણીઓ', hi: 'कार्यशील स्रोत श्रेणियां' }, title: { en: 'Sources & references', gu: 'સ્રોતો અને સંદર્ભો', hi: 'स्रोत और संदर्भ' } },
  },
} as const

export function t(entry: I18nText, locale: Locale): string {
  return entry[locale] || entry.en
}

/** Resolves the localized {eyebrow, title, intro} copy for a static directory/detail page defined in ui.pages. */
export function pageCopy(key: keyof typeof ui.pages, locale: Locale) {
  const entry = ui.pages[key] as { eyebrow: I18nText; title: I18nText; intro?: I18nText }
  return {
    eyebrow: t(entry.eyebrow, locale),
    title: t(entry.title, locale),
    intro: entry.intro ? t(entry.intro, locale) : undefined,
  }
}
