import { BarChart2 } from 'lucide-react'
import { tokens, foundation } from '../../tokens'
import { KPICardBase, IconBadge, kpiCard } from './KPICardBase'
import { TooltipIcon } from '../TooltipIcon'

export interface ShareOfVoiceCardProps {
  sharePercent: number   // e.g. 5.9
  label?: string
  topMedia: { name: string; percent: number }[]
  onClick?: () => void
}

const PURPLE = { bg: '#EDE9FE', color: '#7C3AED' }
const FONT   = kpiCard.fontFamily

const BAR_FILL  = foundation.color.brand.polynesianBlue[600]
const BAR_TRACK = tokens.color.surface.tertiary

export function ShareOfVoiceCard({
  sharePercent,
  label = 'Share of Voice',
  topMedia,
  onClick,
}: ShareOfVoiceCardProps) {
  const maxPercent = Math.max(...topMedia.map((m) => m.percent), 1)

  return (
    <KPICardBase onClick={onClick}>
      {/* Top row: icon left | share badge + tooltip right */}
      <div className="flex flex-row justify-between items-start">
        <IconBadge icon={BarChart2} bg={PURPLE.bg} color={PURPLE.color} />
        <div className="flex flex-row items-center" style={{ gap: tokens.spacing.xs }}>
          <span
            style={{
              fontFamily: FONT,
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
          <TooltipIcon text="Top media outlets by volume share in the selected period" />
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

      {/* Media bar rows — name | bar | percent */}
      <div className="flex flex-col" style={{ gap: tokens.spacing.sm }}>
        {topMedia.slice(0, 3).map((media) => (
          <div
            key={media.name}
            className="flex flex-row items-center"
            style={{ gap: tokens.spacing.sm }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontSize: kpiCard.sublabel.fontSize,
                color: tokens.color.text.secondary,
                width: 64,
                flexShrink: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {media.name}
            </span>

            <div
              style={{
                flex: 1,
                height: 8,
                backgroundColor: BAR_TRACK,
                borderRadius: tokens.radius.full,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${(media.percent / maxPercent) * 100}%`,
                  height: '100%',
                  backgroundColor: BAR_FILL,
                  borderRadius: tokens.radius.full,
                  transition: 'width 0.4s ease-out',
                }}
              />
            </div>

            <span
              style={{
                fontFamily: FONT,
                fontSize: kpiCard.sublabel.fontSize,
                fontWeight: tokens.typography.weight.medium,
                color: tokens.color.text.primary,
                width: 36,
                textAlign: 'right',
                flexShrink: 0,
              }}
            >
              {media.percent.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </KPICardBase>
  )
}
