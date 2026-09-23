import type { Metadata } from 'next'
import { PageShell, PageHeading } from '@/components/archive/PageShell'
import { LibraryDirectory } from '@/components/archive/Directories'
import { getDocuments } from '@/lib/content'
import { isLocale, pageCopy } from '@/lib/i18n'

export const metadata: Metadata = { title: 'Research Library | Patidar History', description: 'Books, government records, research papers, oral histories and community publications underlying this archive.' }

export default async function LibraryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const documents = await getDocuments()
  return (
    <PageShell locale={locale}>
      <PageHeading {...pageCopy('library', isLocale(locale) ? locale : 'en')} />
      <LibraryDirectory locale={locale} documents={documents} />
    </PageShell>
  )
}
