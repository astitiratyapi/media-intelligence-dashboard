import { tokens } from '../tokens'
import { ExecutiveSummary, type ExecutiveSummaryProps } from './ExecutiveSummary'
import { CommsActionsSection, type CommsActionsSectionProps } from './CommsActionsSection'

export interface ExecAndCommsRowProps {
  executiveSummary: ExecutiveSummaryProps
  commsActions:     CommsActionsSectionProps
}

export function ExecAndCommsRow({ executiveSummary, commsActions }: ExecAndCommsRowProps) {
  return (
    <div
      className="flex flex-row items-stretch w-full"
      style={{ gap: tokens.spacing.default }}
    >
      <div className="flex-1 min-w-0">
        <ExecutiveSummary {...executiveSummary} />
      </div>
      <div className="flex-1 min-w-0">
        <CommsActionsSection {...commsActions} />
      </div>
    </div>
  )
}
