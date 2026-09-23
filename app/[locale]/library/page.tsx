import type { Metadata } from 'next'
import { PageShell, PageHeading } from '@/components/archive/PageShell'
import { LibraryDirectory } from '@/components/archive/Directories'
import { getDocuments } from '@/lib/content'

export const metadata: Metadata = { title: 'Research Library | Patidar History', description: 'Books, government records, research papers, oral histories and community publications underlying this archive.' }

export default async function LibraryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const documents = await getDocuments()
  return (
    <PageShell locale={locale}>
      <PageHeading
        eyebrow="Research library"
        title="Read the record"
        intro="Books, government documents, research papers, community publications and oral histories, ranked by the archive’s five-tier source framework: primary sources first, family oral history last — both essential, neither sufficient alone."
      />
      <LibraryDirectory locale={locale} documents={documents} />
    </PageShell>
  )
}
