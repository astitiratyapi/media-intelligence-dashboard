import { Eye, FileText, Heart, Share2, MessageCircle } from 'lucide-react'
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

// ─── Sub-metric row ───────────────────────────────────────────────────────────

function SubMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div
      className="flex flex-row items-center"
      style={{ gap: tokens.spacing.xs }}
    >
      <Icon
        size={13}
        style={{ color: tokens.color.icon.secondary, flexShrink: 0 }}
        strokeWidth={2}
      />
      <span
        style={{
          fontFamily: FONT,
          fontSize: tokens.typography.size['body-sm'],
          color: tokens.color.text.tertiary,
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: FONT,
          fontSize: tokens.typography.size['body-sm'],
          color: tokens.color.text.secondary,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EstimatedReachCard({
  value,
  label = 'Estimated Reach',
  postCount,
  engaged,
}: EstimatedReachCardProps) {
  return (
    <KPICardBase>
      {/* Header row: icon + label */}
      <div className="flex flex-row items-center" style={{ gap: tokens.spacing.sm }}>
        <IconBadge icon={Eye} bg={BLUE.bg} color={BLUE.color} />
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
      </div>

      {/* Main value + sublabel */}
      <div className="flex flex-col" style={{ gap: 2 }}>
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
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['body-sm'],
            color: tokens.color.text.tertiary,
          }}
        >
          Total estimated reach
        </span>
      </div>

      {/* Sub-metrics: 2-column grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: `${tokens.spacing.xs}px ${tokens.spacing.md}px`,
        }}
      >
        <SubMetric icon={FileText}       label="Posts"   value={fmt(postCount)}       />
        <SubMetric icon={Heart}          label="Likes"   value={fmt(engaged.likes)}   />
        <SubMetric icon={Share2}         label="Shares"  value={fmt(engaged.shares)}  />
        <SubMetric icon={MessageCircle}  label="Replies" value={fmt(engaged.replies)} />
      </div>
    </KPICardBase>
  )
}
