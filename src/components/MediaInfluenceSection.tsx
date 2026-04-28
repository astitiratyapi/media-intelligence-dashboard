import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { tokens, foundation } from '../tokens'
import { TooltipIcon } from './TooltipIcon'

// ─── Types ────────────────────────────────────────────────────────────────────

export type TabId = 'total' | 'media' | 'social'

export interface SentimentData {
  positif: number
  netral: number
  negatif: number
}

export interface MediaInfluenceSectionProps {
  sentimentByTab: Record<TabId, SentimentData>
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
const CARD_RADIUS = 10
const CARD_PADDING = tokens.spacing.xl

const SENTIMENT_COLORS = {
  positif: foundation.color.green[500],   // #22C55E
  netral:  '#A3C453',                     // yellow-green
  negatif: foundation.color.red[500],     // #EF4444
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'total',  label: 'TOTAL' },
  { id: 'media',  label: 'MEDIA' },
  { id: 'social', label: 'SOCIAL MEDIA' },
]

// ─── Tab bar ──────────────────────────────────────────────────────────────────

function TabBar({ active, onChange }: { active: TabId; onChange: (id: TabId) => void }) {
  return (
    <div
      className="flex flex-row items-center"
      style={{ borderBottom: `2px solid ${tokens.color.border.secondary}` }}
    >
      {TABS.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['label-sm'],
              fontWeight: isActive ? tokens.typography.weight.bold : tokens.typography.weight.medium,
              color: isActive ? tokens.color.text.brand : tokens.color.text.tertiary,
              background: 'none',
              border: 'none',
              borderBottom: isActive
                ? `2px solid ${tokens.color.surface.brand}`
                : '2px solid transparent',
              marginBottom: -2,
              paddingLeft: tokens.spacing.md,
              paddingRight: tokens.spacing.md,
              paddingTop: tokens.spacing.sm,
              paddingBottom: tokens.spacing.sm,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              letterSpacing: '0.05em',
              transition: 'color 150ms ease',
            }}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

// ─── Donut chart ─────────────────────────────────────────────────────────────

function DonutChart({ data }: { data: SentimentData }) {
  const total = data.positif + data.netral + data.negatif
  const displayTotal = total >= 1000 ? `${(total / 1000).toFixed(1)}K` : String(total)

  const chartData = [
    { name: 'Positif', value: data.positif, color: SENTIMENT_COLORS.positif },
    { name: 'Netral',  value: data.netral,  color: SENTIMENT_COLORS.netral  },
    { name: 'Negatif', value: data.negatif, color: SENTIMENT_COLORS.negatif },
  ]

  const legendItems = [
    { label: 'Positif', count: data.positif, pct: total > 0 ? Math.round((data.positif / total) * 100) : 0, color: SENTIMENT_COLORS.positif },
    { label: 'Netral',  count: data.netral,  pct: total > 0 ? Math.round((data.netral  / total) * 100) : 0, color: SENTIMENT_COLORS.netral  },
    { label: 'Negatif', count: data.negatif, pct: total > 0 ? Math.round((data.negatif / total) * 100) : 0, color: SENTIMENT_COLORS.negatif },
  ]

  return (
    <div
      className="flex flex-col items-center justify-center flex-1"
      style={{ gap: tokens.spacing.lg, paddingTop: tokens.spacing.lg, paddingBottom: tokens.spacing.lg }}
    >
      {/* Donut + center overlay — no external labels, percentages moved to legend */}
      <div style={{ width: 220, height: 220, position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={96}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              label={false}
              labelLine={false}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [
                typeof value === 'number'
                  ? `${((value / total) * 100).toFixed(1)}%  (${value})`
                  : value,
              ]}
              contentStyle={{
                fontFamily: FONT,
                fontSize: 12,
                borderRadius: 8,
                border: `1px solid ${tokens.color.border.secondary}`,
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontSize: 10,
              fontWeight: 600,
              color: tokens.color.text.tertiary,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
            }}
          >
            TOTAL
          </span>
          <span
            style={{
              fontFamily: FONT,
              fontSize: 26,
              fontWeight: 700,
              color: tokens.color.text.primary,
              lineHeight: 1.1,
            }}
          >
            {displayTotal}
          </span>
        </div>
      </div>

      {/* Enhanced legend — dot · label · large % · count */}
      <div
        className="flex flex-row items-start justify-center"
        style={{ gap: tokens.spacing['2xl'] }}
      >
        {legendItems.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center"
            style={{ gap: tokens.spacing.xs }}
          >
            {/* Dot + label row */}
            <div className="flex flex-row items-center" style={{ gap: 6 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: tokens.radius.full,
                  backgroundColor: item.color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: tokens.typography.size['body-sm'],
                  color: tokens.color.text.secondary,
                }}
              >
                {item.label}
              </span>
            </div>

            {/* Large percentage */}
            <span
              style={{
                fontFamily: FONT,
                fontSize: tokens.typography.size['heading-sm'],  // 18px
                fontWeight: tokens.typography.weight.bold,
                color: item.color,
                lineHeight: 1,
              }}
            >
              {item.pct}%
            </span>

            {/* Count */}
            <span
              style={{
                fontFamily: FONT,
                fontSize: tokens.typography.size['body-sm'],
                color: tokens.color.text.tertiary,
              }}
            >
              ({item.count.toLocaleString()})
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function MediaInfluenceSection({ sentimentByTab }: MediaInfluenceSectionProps) {
  const [activeTab, setActiveTab] = useState<TabId>('total')
  const sentimentData = sentimentByTab[activeTab]

  return (
    <div
      className="flex flex-col flex-1"
      style={{
        backgroundColor: tokens.component.card.bg,
        border: `1px solid ${tokens.component.card.border}`,
        borderRadius: CARD_RADIUS,
        minWidth: 0,
        overflow: 'hidden',
      }}
    >
      {/* Card header */}
      <div
        className="flex flex-row items-center justify-between"
        style={{
          paddingLeft: CARD_PADDING,
          paddingRight: CARD_PADDING,
          paddingTop: tokens.spacing.default,
          paddingBottom: tokens.spacing.default,
          borderBottom: `1px solid ${tokens.color.border.secondary}`,
          flexShrink: 0,
          gap: tokens.spacing.sm,
        }}
      >
        {/* Title group */}
        <div className="flex flex-row items-center" style={{ gap: tokens.spacing.sm }}>
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
            <TrendingUp size={16} />
          </div>
          <span
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['heading-sm'],
              fontWeight: tokens.typography.weight.bold,
              color: tokens.color.text.primary,
            }}
          >
            Media Influence
          </span>
          <TooltipIcon text="Sentiment distribution (positive, neutral, negative) across media sources" />
        </div>

        {/* Tab filter */}
        <TabBar active={activeTab} onChange={setActiveTab} />
      </div>

      {/* Donut chart body — centered, fills remaining height */}
      <DonutChart data={sentimentData} />
    </div>
  )
}
