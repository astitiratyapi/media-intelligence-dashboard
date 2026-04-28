import { Flame } from 'lucide-react'
import { tokens } from '../../tokens'
import { KPICardBase, IconBadge, kpiCard } from './KPICardBase'
import { TooltipIcon } from '../TooltipIcon'

export interface TopIssueCardProps {
  issue: string         // e.g. "MBG"
  mentions: number      // e.g. 344
  label?: string
  onClick?: () => void
}

const ORANGE = { bg: '#FFF7ED', color: '#F97316' }

export function TopIssueCard({ issue, mentions, label = 'Top Issue', onClick }: TopIssueCardProps) {
  return (
    <KPICardBase onClick={onClick}>
      {/* Header row: icon + label + mentions pill + tooltip */}
      <div className="flex flex-row items-center" style={{ gap: tokens.spacing.sm }}>
        <IconBadge icon={Flame} bg={ORANGE.bg} color={ORANGE.color} />
        <span
          className="flex-1"
          style={{
            fontSize: kpiCard.label.fontSize,
            fontWeight: kpiCard.label.weight,
            color: kpiCard.label.color,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: tokens.typography.size['label-xs'],
            fontWeight: tokens.typography.weight.medium,
            color: ORANGE.color,
            backgroundColor: ORANGE.bg,
            borderRadius: tokens.radius.full,
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 2,
            paddingBottom: 2,
            whiteSpace: 'nowrap',
          }}
        >
          {mentions.toLocaleString()} mentions
        </span>
        <TooltipIcon text="Most frequently discussed issue in the monitored period" />
      </div>

      {/* Value */}
      <p
        style={{
          fontSize: kpiCard.value.fontSize,
          fontWeight: kpiCard.value.weight,
          color: kpiCard.value.color,
          lineHeight: tokens.typography.lineHeight.tight,
          margin: 0,
        }}
      >
        {issue}
      </p>
    </KPICardBase>
  )
}
