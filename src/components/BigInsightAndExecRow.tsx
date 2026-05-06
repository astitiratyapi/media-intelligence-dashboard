import { BigInsight, type BigInsightProps } from './BigInsight'
import { ExecutiveSummary, type ExecutiveSummaryProps } from './ExecutiveSummary'
import { tokens } from '../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BigInsightAndExecRowProps {
  bigInsight:       BigInsightProps
  executiveSummary: ExecutiveSummaryProps
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BigInsightAndExecRow({ bigInsight, executiveSummary }: BigInsightAndExecRowProps) {
  return (
    <div
      className="flex flex-row items-stretch"
      style={{ gap: tokens.spacing.md }}
    >
      <BigInsight      {...bigInsight}       />
      <ExecutiveSummary {...executiveSummary} />
    </div>
  )
}
