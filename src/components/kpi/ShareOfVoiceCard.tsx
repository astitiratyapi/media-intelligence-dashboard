import { BarChart2 } from 'lucide-react'
import { tokens } from '../../tokens'
import { KPICardBase, IconBadge, kpiCard } from './KPICardBase'

export interface ShareOfVoiceCardProps {
  sharePercent: number   // e.g. 5.9
  label?: string
  topMedia: { name: string; percent: number }[]
  onClick?: () => void
}

const PURPLE = { bg: '#EDE9FE', color: '#7C3AED' }

export function ShareOfVoiceCard({
  sharePercent,
  label = 'Share of Voice',
  topMedia,
  onClick,
}: ShareOfVoiceCardProps) {
  const maxPercent = Math.max(...topMedia.map((m) => m.percent), 1)

  return (
    <KPICardBase onClick={onClick}>
      {/* Header row: icon + label + share pill */}
      <div className="flex flex-row items-center" style={{ gap: tokens.spacing.sm }}>
        <IconBadge icon={BarChart2} bg={PURPLE.bg} color={PURPLE.color} />
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
            fontWeight: tokens.typography.weight.semibold,
            color: PURPLE.color,
            backgroundColor: PURPLE.bg,
            borderRadius: tokens.radius.full,
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 2,
            paddingBottom: 2,
            whiteSpace: 'nowrap',
          }}
        >
          {sharePercent.toFixed(1)}% share
        </span>
      </div>

      {/* Top media bars */}
      <div className="flex flex-col" style={{ gap: tokens.spacing.xs }}>
        {topMedia.slice(0, 3).map((media) => (
          <div key={media.name} className="flex flex-col" style={{ gap: 4 }}>
            <div className="flex flex-row items-center justify-between">
              <span style={{ fontSize: kpiCard.sublabel.fontSize, color: tokens.color.text.secondary }}>
                {media.name}
              </span>
              <span style={{ fontSize: kpiCard.sublabel.fontSize, color: kpiCard.sublabel.color }}>
                {media.percent.toFixed(1)}%
              </span>
            </div>
            <div
              style={{
                height: 4,
                backgroundColor: tokens.color.border.secondary,
                borderRadius: tokens.radius.full,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${(media.percent / maxPercent) * 100}%`,
                  height: '100%',
                  backgroundColor: PURPLE.color,
                  borderRadius: tokens.radius.full,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </KPICardBase>
  )
}
