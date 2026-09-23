import Link from 'next/link'

const localeText = {
  en: { demo: 'Demonstration content — replace with verified research records.' },
  gu: { demo: 'ડેમો સામગ્રી — ચકાસેલ સંશોધન રેકોર્ડથી બદલો.' },
  hi: { demo: 'डेमो सामग्री — सत्यापित शोध रिकॉर्ड से बदलें.' }
}

export function Footer({ locale }: { locale: string }) {
  const t = localeText[locale as keyof typeof localeText] ?? localeText.en
  const isEn = locale === 'en'

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link className="wordmark footer-brand" href={`/${isEn ? '' : locale}`}>
          <span className="wordmark-mark">PH</span>
          <span><strong>Patidar</strong> History<small>Digital archive</small></span>
        </Link>
        <p>A digital archive of people, places,<br />movement and memory.</p>
        <div className="footer-languages">
          <span>Read in</span>
          <Link href="/en">English</Link>
          <Link href="/gu">ગુજરાતી</Link>
          <Link href="/hi">हिन्दी</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Patidar History Archive</span>
        <span>{t.demo}</span>
        <span>Built for a living archive <span className="footer-dot">●</span></span>
      </div>
    </footer>
  )
}
