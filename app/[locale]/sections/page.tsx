import type { Metadata } from 'next'
import { PageShell, PageHeading } from '@/components/archive/PageShell'
import { SectionCard } from '@/components/archive/Cards'
import { getSections, getArticlesBySection } from '@/lib/content'

export const metadata: Metadata = { title: 'Sections | Patidar History', description: 'Browse the major historical sections of the Patidar History archive.' }

export default async function SectionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const sections = await getSections()
  const counts = await Promise.all(sections.map((s) => getArticlesBySection(s.slug)))

  return (
    <PageShell locale={locale}>
      <PageHeading
        eyebrow="Chapters of the story"
        title="Explore the archive"
        intro="Fifteen major themes trace the Patidar story from Kanbi agricultural roots through Gujarat's history, the freedom movement, cooperatives, migration and a global diaspora, to the present day."
      />
      <div className="archive-card-grid">
        {sections.map((section, i) => (
          <SectionCard key={section.id} locale={locale} section={section} articleCount={counts[i].length} />
        ))}
      </div>
    </PageShell>
  )
}
