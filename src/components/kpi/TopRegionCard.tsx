import { MapPin } from 'lucide-react'
import { tokens } from '../../tokens'
import { KPICardBase, IconBadge, kpiCard } from './KPICardBase'
import { TooltipIcon } from '../TooltipIcon'

export interface TopRegionCardProps {
  region: string       // e.g. "N/A" or "Jakarta"
  label?: string
  sublabel?: string
}

const GREEN = { bg: '#F0FDF4', color: '#16A34A' }

export function TopRegionCard({ region, label = 'Top Region', sublabel }: TopRegionCardProps) {
  return (
    <KPICardBase>
      {/* Header row */}
      <div className="flex flex-row items-center" style={{ gap: tokens.spacing.sm }}>
        <IconBadge icon={MapPin} bg={GREEN.bg} color={GREEN.color} />
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
        <TooltipIcon text="Region with the highest volume of mentions" />
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
        {region}
      </p>

      {sublabel && (
        <span style={{ fontSize: kpiCard.sublabel.fontSize, color: kpiCard.sublabel.color }}>
          {sublabel}
        </span>
      )}
    </KPICardBase>
  )
}
