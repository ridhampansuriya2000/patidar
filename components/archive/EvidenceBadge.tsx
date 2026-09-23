import { BookCheck, CircleHelp, ScrollText, Users } from 'lucide-react'
import { EVIDENCE_LABEL, type EvidenceLevel, type Locale } from '@/types/content'
import { localize } from '@/lib/i18n'

const ICON: Record<EvidenceLevel, React.ComponentType<{ className?: string }>> = {
  documented: BookCheck,
  'scholarly-interpretation': ScrollText,
  'community-tradition': Users,
  'open-question': CircleHelp,
}

export function EvidenceBadge({ level, locale = 'en' }: { level: EvidenceLevel; locale?: Locale }) {
  const Icon = ICON[level]
  return (
    <span className={`evidence-badge evidence-${level}`}>
      <Icon />
      {localize(EVIDENCE_LABEL[level], EVIDENCE_LABEL[level].en, locale)}
    </span>
  )
}
