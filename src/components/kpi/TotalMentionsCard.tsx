import { MessageSquare } from 'lucide-react'
import { tokens } from '../../tokens'
import { KPICardBase, IconBadge, kpiCard } from './KPICardBase'
import { TooltipIcon } from '../TooltipIcon'

export interface TotalMentionsCardProps {
  value: string        // e.g. "1.1K"
  label?: string
  onClick?: () => void
}

const BLUE = { bg: tokens.color.surface.infoSubtle, color: tokens.color.surface.info }
const FONT = kpiCard.fontFamily

export function TotalMentionsCard({ value, label = 'Total Mentions', onClick }: TotalMentionsCardProps) {
  return (
    <KPICardBase onClick={onClick}>
      {/* Top row: icon left | tooltip right */}
      <div className="flex flex-row justify-between items-start">
        <IconBadge icon={MessageSquare} bg={BLUE.bg} color={BLUE.color} />
        <TooltipIcon text="Total number of scraped mentions across all media sources" />
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
        {value}
      </p>
    </KPICardBase>
  )
}
