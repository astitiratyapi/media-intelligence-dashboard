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
const FONT   = kpiCard.fontFamily

export function TopIssueCard({ issue, mentions, label = 'Top Issue', onClick }: TopIssueCardProps) {
  return (
    <KPICardBase onClick={onClick}>
      {/* Top row: icon left | mentions badge + tooltip right */}
      <div className="flex flex-row justify-between items-start">
        <IconBadge icon={Flame} bg={ORANGE.bg} color={ORANGE.color} />
        <div className="flex flex-row items-center" style={{ gap: tokens.spacing.xs }}>
          <span
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['label-xs'],
              fontWeight: tokens.typography.weight.medium,
              color: kpiCard.sublabel.color,
              whiteSpace: 'nowrap',
            }}
          >
            {mentions.toLocaleString()} mentions
          </span>
          <TooltipIcon text="Most frequently discussed issue in monitored media coverage." />
        </div>
      </div>

      {/* Card title */}
      <span
        style={{
          fontFamily: FONT,
          fontSize: kpiCard.label.fontSize,
          fontWeight: kpiCard.label.weight,
          color: kpiCard.label.color,
        }}
      >
        {label}
      </span>

      {/* Big number */}
      <p
        style={{
          fontFamily: FONT,
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
