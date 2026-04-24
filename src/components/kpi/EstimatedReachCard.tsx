import { Eye, Info } from 'lucide-react'
import { tokens } from '../../tokens'
import { KPICardBase, IconBadge, kpiCard } from './KPICardBase'

export interface EstimatedReachCardProps {
  value: string          // e.g. "1.1M"
  label?: string
  postCount: number
  engaged: {
    likes: number
    shares: number
    replies: number
  }
  onInfo?: () => void
}

const BLUE = { bg: tokens.color.surface.infoSubtle, color: tokens.color.surface.info }

export function EstimatedReachCard({
  value,
  label = 'Estimated Reach',
  postCount,
  engaged,
  onInfo,
}: EstimatedReachCardProps) {
  return (
    <KPICardBase>
      {/* Header row: icon + label + info icon */}
      <div className="flex flex-row items-center" style={{ gap: tokens.spacing.sm }}>
        <IconBadge icon={Eye} bg={BLUE.bg} color={BLUE.color} />
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
        {onInfo && (
          <button
            onClick={onInfo}
            style={{ color: tokens.color.icon.secondary, display: 'flex', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            aria-label="More info"
          >
            <Info size={14} />
          </button>
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

      {/* Sub-metrics */}
      <div className="flex flex-col" style={{ gap: tokens.spacing.xs }}>
        <span style={{ fontSize: kpiCard.sublabel.fontSize, color: kpiCard.sublabel.color }}>
          Jumlah Post: <strong style={{ color: tokens.color.text.secondary }}>{postCount.toLocaleString()}</strong>
        </span>
        <span style={{ fontSize: kpiCard.sublabel.fontSize, color: kpiCard.sublabel.color }}>
          Engaged:{' '}
          <strong style={{ color: tokens.color.text.secondary }}>
            {engaged.likes.toLocaleString()} Likes · {engaged.shares.toLocaleString()} Shares · {engaged.replies.toLocaleString()} Replies
          </strong>
        </span>
      </div>
    </KPICardBase>
  )
}
