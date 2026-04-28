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
const FONT  = kpiCard.fontFamily

export function TopRegionCard({ region, label = 'Top Region', sublabel }: TopRegionCardProps) {
  return (
    <KPICardBase>
      {/* Top row: icon left | tooltip right */}
      <div className="flex flex-row justify-between items-start">
        <IconBadge icon={MapPin} bg={GREEN.bg} color={GREEN.color} />
        <TooltipIcon text="Region with the highest volume of mentions" />
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
        {region}
      </p>

      {sublabel && (
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['label-xs'],
            color: kpiCard.sublabel.color,
          }}
        >
          {sublabel}
        </span>
      )}
    </KPICardBase>
  )
}
