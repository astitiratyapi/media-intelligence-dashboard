import { MessageSquare } from 'lucide-react'
import { tokens } from '../../tokens'
import { KPICardBase, IconBadge, kpiCard } from './KPICardBase'

export interface TotalMentionsCardProps {
  value: string        // e.g. "1.1K"
  label?: string
  onClick?: () => void
}

const BLUE = { bg: tokens.color.surface.infoSubtle, color: tokens.color.surface.info }

export function TotalMentionsCard({ value, label = 'Total Mentions', onClick }: TotalMentionsCardProps) {
  return (
    <KPICardBase onClick={onClick}>
      {/* Header row: icon badge + label + clickable pill */}
      <div className="flex flex-row items-center" style={{ gap: tokens.spacing.sm }}>
        <IconBadge icon={MessageSquare} bg={BLUE.bg} color={BLUE.color} />
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
        {onClick && (
          <span
            style={{
              fontSize: tokens.typography.size['label-xs'],
              fontWeight: tokens.typography.weight.medium,
              color: tokens.color.surface.info,
              backgroundColor: tokens.color.surface.infoSubtle,
              borderRadius: tokens.radius.full,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 2,
              paddingBottom: 2,
            }}
          >
            click
          </span>
        )}
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
        {value}
      </p>
    </KPICardBase>
  )
}
