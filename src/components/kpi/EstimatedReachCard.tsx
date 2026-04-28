import { Eye } from 'lucide-react'
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
const FONT = kpiCard.fontFamily

// ─── Format helper ────────────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EstimatedReachCard({
  value,
  label = 'Estimated Reach',
  postCount,
  engaged,
}: EstimatedReachCardProps) {
  const subMetrics = [
    `Posts: ${fmt(postCount)}`,
    `Likes: ${fmt(engaged.likes)}`,
    `Shares: ${fmt(engaged.shares)}`,
    `Replies: ${fmt(engaged.replies)}`,
  ].join(' · ')

  return (
    <KPICardBase>
      {/* Icon — alone on top row */}
      <IconBadge icon={Eye} bg={BLUE.bg} color={BLUE.color} />

      {/* Main value + label */}
      <div className="flex flex-col" style={{ gap: 2 }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: kpiCard.value.fontSize,   // heading-xl = 30px
            fontWeight: kpiCard.value.weight,   // bold
            color: kpiCard.value.color,
            lineHeight: tokens.typography.lineHeight.tight,
            margin: 0,
          }}
        >
          {value}
        </p>
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['body-sm'],
            fontWeight: tokens.typography.weight.regular,
            color: tokens.color.text.secondary,
          }}
        >
          {label}
        </span>
      </div>

      {/* Sub-metrics — single muted line */}
      <span
        style={{
          fontFamily: FONT,
          fontSize: tokens.typography.size['body-sm'],
          color: tokens.color.text.tertiary,
          lineHeight: tokens.typography.lineHeight.normal,
        }}
      >
        {subMetrics}
      </span>
    </KPICardBase>
  )
}
