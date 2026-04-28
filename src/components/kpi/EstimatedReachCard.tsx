import { Eye } from 'lucide-react'
import { tokens } from '../../tokens'
import { KPICardBase, IconBadge, kpiCard } from './KPICardBase'
import { TooltipIcon } from '../TooltipIcon'

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

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

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
      {/* Top row: icon left | tooltip right */}
      <div className="flex flex-row justify-between items-start">
        <IconBadge icon={Eye} bg={BLUE.bg} color={BLUE.color} />
        <TooltipIcon text="Estimated total audience reached from posts, likes, shares, and replies." />
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

      {/* Sub-metrics — single muted line */}
      <span
        style={{
          fontFamily: FONT,
          fontSize: tokens.typography.size['label-xs'],
          color: tokens.color.text.tertiary,
          lineHeight: tokens.typography.lineHeight.normal,
        }}
      >
        {subMetrics}
      </span>
    </KPICardBase>
  )
}
