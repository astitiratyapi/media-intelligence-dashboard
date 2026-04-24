import { tokens } from '../tokens'
import { EvidenceSection, type EvidenceSectionProps } from './EvidenceSection'
import { CommsActionsSection, type CommsActionsSectionProps } from './CommsActionsSection'

export interface EvidenceAndCommsRowProps {
  evidence:     EvidenceSectionProps
  commsActions: CommsActionsSectionProps
}

export function EvidenceAndCommsRow({ evidence, commsActions }: EvidenceAndCommsRowProps) {
  return (
    <div
      className="flex flex-row items-stretch w-full"
      style={{ gap: tokens.spacing.default }}
    >
      <EvidenceSection {...evidence} />
      <CommsActionsSection {...commsActions} />
    </div>
  )
}
