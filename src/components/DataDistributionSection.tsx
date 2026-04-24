import { BarChart2, Newspaper, MessageCircle } from 'lucide-react'
import { tokens, foundation } from '../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DistributionSubItem {
  label: string
  value: number
}

export interface DistributionCategory {
  label: string
  icon: 'newspaper' | 'chat'
  value: number
  subItems: DistributionSubItem[]
}

export interface DataDistributionSectionProps {
  total: number
  totalLabel?: string
  categories: DistributionCategory[]
}

// ─── Internal constants ───────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
const CARD_RADIUS = 10
const CARD_PADDING = tokens.spacing.xl

const BAR_COLORS = {
  total:    foundation.color.brand.polynesianBlue[800],  // #004990
  category: foundation.color.brand.pictonBlue[500],     // #1BA8DF
  sub:      foundation.color.brand.pictonBlue[200],     // #BEE7F9
}
const BAR_BG = tokens.color.border.secondary

// ─── Bar row ──────────────────────────────────────────────────────────────────

function BarRow({
  label,
  value,
  maxValue,
  barColor,
  icon,
  indent = 0,
  bold = false,
}: {
  label: string
  value: number
  maxValue: number
  barColor: string
  icon?: React.ReactNode
  indent?: number
  bold?: boolean
}) {
  const pct = maxValue > 0 ? Math.min((value / maxValue) * 100, 100) : 0

  return (
    <div
      className="flex flex-row items-center"
      style={{
        gap: tokens.spacing.sm,
        paddingLeft: indent,
        minWidth: 0,
      }}
    >
      {/* Label */}
      <div
        className="flex flex-row items-center flex-shrink-0"
        style={{ gap: 4, width: 130 }}
      >
        {icon && <span style={{ color: BAR_COLORS.category, display: 'flex' }}>{icon}</span>}
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['body-sm'],
            fontWeight: bold ? tokens.typography.weight.semibold : tokens.typography.weight.regular,
            color: icon ? BAR_COLORS.category : tokens.color.text.secondary,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {label}
        </span>
      </div>

      {/* Bar track */}
      <div
        className="flex-1"
        style={{
          height: 8,
          backgroundColor: BAR_BG,
          borderRadius: tokens.radius.full,
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            backgroundColor: barColor,
            borderRadius: tokens.radius.full,
            transition: 'width 400ms ease',
          }}
        />
      </div>

      {/* Value */}
      <span
        className="flex-shrink-0"
        style={{
          fontFamily: FONT,
          fontSize: tokens.typography.size['body-sm'],
          fontWeight: bold ? tokens.typography.weight.bold : tokens.typography.weight.regular,
          color: bold ? tokens.color.text.primary : tokens.color.text.secondary,
          width: 36,
          textAlign: 'right',
        }}
      >
        {value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value}
      </span>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function DataDistributionSection({ total, totalLabel = 'Total Mention', categories }: DataDistributionSectionProps) {
  const ICON_MAP = {
    newspaper: <Newspaper size={13} />,
    chat: <MessageCircle size={13} />,
  }

  return (
    <div
      className="flex flex-col"
      style={{
        backgroundColor: tokens.component.card.bg,
        border: `1px solid ${tokens.component.card.border}`,
        borderRadius: CARD_RADIUS,
        minWidth: 0,
        flex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        className="flex flex-row items-center"
        style={{
          paddingLeft: CARD_PADDING,
          paddingRight: CARD_PADDING,
          paddingTop: tokens.spacing.default,
          paddingBottom: tokens.spacing.default,
          borderBottom: `1px solid ${tokens.color.border.secondary}`,
          gap: tokens.spacing.sm,
          flexShrink: 0,
        }}
      >
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 32,
            height: 32,
            backgroundColor: tokens.color.surface.infoSubtle,
            borderRadius: tokens.radius.lg,
            color: tokens.color.icon.info,
          }}
        >
          <BarChart2 size={16} />
        </div>
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['heading-sm'],
            fontWeight: tokens.typography.weight.bold,
            color: tokens.color.text.primary,
          }}
        >
          Data Distribution
        </span>
      </div>

      {/* Chart body */}
      <div
        className="flex flex-col"
        style={{
          padding: CARD_PADDING,
          gap: tokens.spacing.sm,
          flex: 1,
        }}
      >
        {/* Total row */}
        <BarRow
          label={totalLabel}
          value={total}
          maxValue={total}
          barColor={BAR_COLORS.total}
          bold
        />

        {/* Category rows */}
        {categories.map((cat) => (
          <div key={cat.label} className="flex flex-col" style={{ gap: tokens.spacing.xs }}>
            {/* Separator before category */}
            <div style={{ height: 1, backgroundColor: tokens.color.border.secondary, marginTop: 2, marginBottom: 2 }} />

            {/* Category row */}
            <BarRow
              label={cat.label}
              value={cat.value}
              maxValue={total}
              barColor={BAR_COLORS.category}
              icon={ICON_MAP[cat.icon]}
              indent={12}
            />

            {/* Sub-item rows */}
            {cat.subItems.map((sub) => (
              <BarRow
                key={sub.label}
                label={sub.label}
                value={sub.value}
                maxValue={total}
                barColor={BAR_COLORS.sub}
                indent={28}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
