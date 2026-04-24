import { Award } from 'lucide-react'
import { tokens } from '../../tokens'
import { KPICardBase, IconBadge, kpiCard } from './KPICardBase'

export interface Tier1MentionsCardProps {
  value: number | string   // e.g. 359
  label?: string
  sublabel?: string
  onClick?: () => void
}

const ORANGE = { bg: '#FFF7ED', color: '#F97316' }

export function Tier1MentionsCard({
  value,
  label = 'Tier-1 Mentions',
  sublabel,
  onClick,
}: Tier1MentionsCardProps) {
  return (
    <KPICardBase onClick={onClick}>
      {/* Header row */}
      <div className="flex flex-row items-center" style={{ gap: tokens.spacing.sm }}>
        <IconBadge icon={Award} bg={ORANGE.bg} color={ORANGE.color} />
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
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>

      {sublabel && (
        <span style={{ fontSize: kpiCard.sublabel.fontSize, color: kpiCard.sublabel.color }}>
          {sublabel}
        </span>
      )}
    </KPICardBase>
  )
}
