import { useState } from 'react'
import { Grid2x2, Globe, MessageCircle } from 'lucide-react'
import { tokens, foundation } from '../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

type HeatmapTabId = 'all' | 'news' | 'social'

export interface HeatmapRow {
  issue: string
  share: number        // percentage, e.g. 39.7
  positive: number
  neutral: number
  negative: number
  total: number
}

export interface IssueHeatmapProps {
  rowsByTab: Record<HeatmapTabId, HeatmapRow[]>
  onCellClick?: (row: HeatmapRow, field: 'positive' | 'neutral' | 'negative') => void
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT   = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
const PURPLE = { bg: '#EDE9FE', icon: '#7C3AED' }

const TABS: { id: HeatmapTabId; label: string; icon?: React.ReactNode }[] = [
  { id: 'all',    label: 'Semua'  },
  { id: 'news',   label: 'Berita', icon: <Globe   size={13} /> },
  { id: 'social', label: 'Sosial', icon: <MessageCircle size={13} /> },
]

// ─── Pill color intensity ──────────────────────────────────────────────────────

function pillStyle(value: number, max: number, type: 'positive' | 'neutral' | 'negative') {
  if (value === 0 || max === 0) {
    return { bg: tokens.color.surface.tertiary, text: tokens.color.text.tertiary }
  }
  const r = value / max

  if (type === 'positive') {
    if (r < 0.15) return { bg: foundation.color.green[50],  text: foundation.color.green[700] }
    if (r < 0.35) return { bg: foundation.color.green[100], text: foundation.color.green[700] }
    if (r < 0.6 ) return { bg: foundation.color.green[200], text: foundation.color.green[800] }
    if (r < 0.8 ) return { bg: foundation.color.green[400], text: '#fff' }
    return                { bg: foundation.color.green[500], text: '#fff' }
  }
  if (type === 'neutral') {
    if (r < 0.15) return { bg: foundation.color.neutral[100], text: foundation.color.neutral[600] }
    if (r < 0.35) return { bg: foundation.color.neutral[200], text: foundation.color.neutral[700] }
    if (r < 0.6 ) return { bg: foundation.color.neutral[300], text: foundation.color.neutral[800] }
    if (r < 0.8 ) return { bg: foundation.color.neutral[400], text: '#fff' }
    return                { bg: foundation.color.neutral[500], text: '#fff' }
  }
  // negative
  if (r < 0.15) return { bg: foundation.color.red[50],  text: foundation.color.red[600] }
  if (r < 0.35) return { bg: foundation.color.red[100], text: foundation.color.red[700] }
  if (r < 0.6 ) return { bg: foundation.color.red[200], text: foundation.color.red[800] }
  if (r < 0.8 ) return { bg: foundation.color.red[400], text: '#fff' }
  return              { bg: foundation.color.red[500],  text: '#fff' }
}

// ─── Pill ─────────────────────────────────────────────────────────────────────

function Pill({
  value, style, onClick,
}: {
  value: number
  style: { bg: string; text: string }
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: style.bg,
        color: style.text,
        borderRadius: tokens.radius.full,
        paddingLeft: tokens.spacing.sm,
        paddingRight: tokens.spacing.sm,
        paddingTop: 2,
        paddingBottom: 2,
        fontFamily: FONT,
        fontSize: tokens.typography.size['label-xs'],
        fontWeight: tokens.typography.weight.semibold,
        minWidth: 36,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'opacity 150ms ease',
        userSelect: 'none',
      }}
      onMouseEnter={(e) => { if (onClick) (e.currentTarget as HTMLDivElement).style.opacity = '0.8' }}
      onMouseLeave={(e) => { if (onClick) (e.currentTarget as HTMLDivElement).style.opacity = '1' }}
    >
      {value}
    </div>
  )
}

// ─── Tab bar ──────────────────────────────────────────────────────────────────

function TabBar({ active, onChange }: { active: HeatmapTabId; onChange: (id: HeatmapTabId) => void }) {
  return (
    <div className="flex flex-row items-center" style={{ gap: 2 }}>
      {TABS.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="flex flex-row items-center"
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['label-xs'],
              fontWeight: isActive ? tokens.typography.weight.bold : tokens.typography.weight.medium,
              color: isActive ? tokens.color.text.brand : tokens.color.text.secondary,
              backgroundColor: isActive ? tokens.color.surface.infoSubtle : 'transparent',
              border: isActive ? `1px solid ${tokens.color.border.info}` : '1px solid transparent',
              borderRadius: tokens.radius.default,
              paddingLeft: tokens.spacing.sm,
              paddingRight: tokens.spacing.sm,
              paddingTop: 4,
              paddingBottom: 4,
              gap: 4,
              cursor: 'pointer',
              transition: 'all 150ms ease',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

// ─── Column header ────────────────────────────────────────────────────────────

function ColHeader({ label, color }: { label: string; color?: string }) {
  return (
    <th
      style={{
        fontFamily: FONT,
        fontSize: tokens.typography.size['label-xs'],
        fontWeight: tokens.typography.weight.semibold,
        color: color ?? tokens.color.text.tertiary,
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        padding: `${tokens.spacing.sm}px ${tokens.spacing.sm}px`,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        borderBottom: `1px solid ${tokens.color.border.secondary}`,
      }}
    >
      {label}
    </th>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function IssueHeatmap({ rowsByTab, onCellClick }: IssueHeatmapProps) {
  const [activeTab, setActiveTab] = useState<HeatmapTabId>('all')
  const rows = rowsByTab[activeTab] ?? []

  const maxPositive = Math.max(...rows.map((r) => r.positive), 1)
  const maxNeutral  = Math.max(...rows.map((r) => r.neutral),  1)
  const maxNegative = Math.max(...rows.map((r) => r.negative), 1)

  return (
    <div
      className="flex flex-col flex-1"
      style={{
        backgroundColor: tokens.component.card.bg,
        border: `1px solid ${tokens.component.card.border}`,
        borderRadius: 10,
        minWidth: 0,
        overflow: 'hidden',
      }}
    >
      {/* Card header */}
      <div
        className="flex flex-row items-center justify-between"
        style={{
          paddingLeft: tokens.spacing.xl,
          paddingRight: tokens.spacing.xl,
          paddingTop: tokens.spacing.default,
          paddingBottom: tokens.spacing.default,
          borderBottom: `1px solid ${tokens.color.border.secondary}`,
          gap: tokens.spacing.sm,
          flexShrink: 0,
        }}
      >
        <div className="flex flex-row items-center" style={{ gap: tokens.spacing.sm }}>
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: 32, height: 32, backgroundColor: PURPLE.bg, borderRadius: tokens.radius.lg, color: PURPLE.icon }}
            aria-hidden="true"
          >
            <Grid2x2 size={16} />
          </div>
          <div className="flex flex-col" style={{ gap: 2 }}>
            <span style={{ fontFamily: FONT, fontSize: tokens.typography.size['body-md'], fontWeight: tokens.typography.weight.bold, color: tokens.color.text.primary }}>
              Issue Heatmap
            </span>
            <span style={{ fontFamily: FONT, fontSize: tokens.typography.size['label-xs'], color: tokens.color.text.tertiary }}>
              Issue × Sentiment — click a cell to filter
            </span>
          </div>
        </div>
        <TabBar active={activeTab} onChange={setActiveTab} />
      </div>

      {/* Table */}
      <div style={{ overflowY: 'auto', flex: 1 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ position: 'sticky', top: 0, backgroundColor: tokens.component.card.bg, zIndex: 1 }}>
            <tr>
              <th
                style={{
                  fontFamily: FONT,
                  fontSize: tokens.typography.size['label-xs'],
                  fontWeight: tokens.typography.weight.semibold,
                  color: tokens.color.text.tertiary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  padding: `${tokens.spacing.sm}px ${tokens.spacing.xl}px`,
                  textAlign: 'left',
                  borderBottom: `1px solid ${tokens.color.border.secondary}`,
                  whiteSpace: 'nowrap',
                }}
              >
                Issue / Topic
              </th>
              <th
                style={{
                  fontFamily: FONT,
                  fontSize: tokens.typography.size['label-xs'],
                  fontWeight: tokens.typography.weight.semibold,
                  color: tokens.color.text.tertiary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  padding: `${tokens.spacing.sm}px ${tokens.spacing.sm}px`,
                  textAlign: 'center',
                  borderBottom: `1px solid ${tokens.color.border.secondary}`,
                }}
              >
                %
              </th>
              <ColHeader label="Positive" color={foundation.color.green[600]} />
              <ColHeader label="Neutral"  color={tokens.color.text.tertiary}  />
              <ColHeader label="Negative" color={foundation.color.red[600]}   />
              <ColHeader label="Total"    />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.issue}
                style={{
                  backgroundColor: i % 2 === 1 ? tokens.color.surface.secondary : 'transparent',
                }}
              >
                {/* Issue name */}
                <td
                  style={{
                    fontFamily: FONT,
                    fontSize: tokens.typography.size['body-sm'],
                    color: tokens.color.text.primary,
                    padding: `${tokens.spacing.sm}px ${tokens.spacing.xl}px`,
                    maxWidth: 200,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row.issue}
                </td>

                {/* % Share */}
                <td style={{ textAlign: 'center', padding: `${tokens.spacing.sm}px ${tokens.spacing.sm}px` }}>
                  <span style={{ fontFamily: FONT, fontSize: tokens.typography.size['label-xs'], color: tokens.color.text.tertiary }}>
                    {row.share.toFixed(1)}%
                  </span>
                </td>

                {/* Positive */}
                <td style={{ textAlign: 'center', padding: `${tokens.spacing.xs}px ${tokens.spacing.sm}px` }}>
                  <Pill
                    value={row.positive}
                    style={pillStyle(row.positive, maxPositive, 'positive')}
                    onClick={onCellClick ? () => onCellClick(row, 'positive') : undefined}
                  />
                </td>

                {/* Neutral */}
                <td style={{ textAlign: 'center', padding: `${tokens.spacing.xs}px ${tokens.spacing.sm}px` }}>
                  <Pill
                    value={row.neutral}
                    style={pillStyle(row.neutral, maxNeutral, 'neutral')}
                    onClick={onCellClick ? () => onCellClick(row, 'neutral') : undefined}
                  />
                </td>

                {/* Negative */}
                <td style={{ textAlign: 'center', padding: `${tokens.spacing.xs}px ${tokens.spacing.sm}px` }}>
                  <Pill
                    value={row.negative}
                    style={pillStyle(row.negative, maxNegative, 'negative')}
                    onClick={onCellClick ? () => onCellClick(row, 'negative') : undefined}
                  />
                </td>

                {/* Total */}
                <td style={{ textAlign: 'center', padding: `${tokens.spacing.sm}px ${tokens.spacing.xl}px` }}>
                  <span style={{ fontFamily: FONT, fontSize: tokens.typography.size['body-sm'], fontWeight: tokens.typography.weight.semibold, color: tokens.color.text.primary }}>
                    {row.total}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
