import { Grid2x2 } from 'lucide-react'
import { tokens, foundation } from '../tokens'
import { TooltipIcon } from './TooltipIcon'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HeatmapRow {
  issue:    string
  mentions: number
  pct:      string
  positive: number
  neutral:  number
  negative: number
}

export interface IssueHeatmapProps {
  rows:         HeatmapRow[]
  onCellClick?: (row: HeatmapRow, field: 'positive' | 'neutral' | 'negative') => void
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT   = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
const PURPLE = { bg: '#EDE9FE', icon: '#7C3AED' }

// thead ~40px + each row ~58px × 7 + scroll
const SCROLL_HEIGHT = 446

// ─── Pill color intensity ─────────────────────────────────────────────────────

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
    return               { bg: foundation.color.green[500], text: '#fff' }
  }
  if (type === 'neutral') {
    if (r < 0.15) return { bg: foundation.color.yellow[50],  text: foundation.color.yellow[700] }
    if (r < 0.35) return { bg: foundation.color.yellow[100], text: foundation.color.yellow[700] }
    if (r < 0.6 ) return { bg: foundation.color.yellow[200], text: foundation.color.yellow[800] }
    if (r < 0.8 ) return { bg: foundation.color.yellow[400], text: '#fff'                       }
    return               { bg: foundation.color.yellow[500], text: '#fff'                       }
  }
  if (r < 0.15) return { bg: foundation.color.red[50],  text: foundation.color.red[600] }
  if (r < 0.35) return { bg: foundation.color.red[100], text: foundation.color.red[700] }
  if (r < 0.6 ) return { bg: foundation.color.red[200], text: foundation.color.red[800] }
  if (r < 0.8 ) return { bg: foundation.color.red[400], text: '#fff' }
  return               { bg: foundation.color.red[500],  text: '#fff' }
}

// ─── Pill ─────────────────────────────────────────────────────────────────────

function Pill({ value, style, onClick }: {
  value:   number
  style:   { bg: string; text: string }
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        justifyContent:  'center',
        backgroundColor: style.bg,
        color:           style.text,
        borderRadius:    tokens.radius.lg,
        fontFamily:      FONT,
        fontSize:        tokens.typography.size['body-sm'],
        fontWeight:      tokens.typography.weight.semibold,
        minWidth:        52,
        height:          36,
        paddingLeft:     tokens.spacing.sm,
        paddingRight:    tokens.spacing.sm,
        cursor:          onClick ? 'pointer' : 'default',
        transition:      'opacity 150ms ease',
        userSelect:      'none',
        whiteSpace:      'nowrap',
      }}
      onMouseEnter={(e) => { if (onClick) (e.currentTarget as HTMLDivElement).style.opacity = '0.8' }}
      onMouseLeave={(e) => { if (onClick) (e.currentTarget as HTMLDivElement).style.opacity = '1' }}
    >
      {value}
    </div>
  )
}

// ─── Column header ────────────────────────────────────────────────────────────

function ColHeader({ label, color }: { label: string; color?: string }) {
  return (
    <th
      style={{
        fontFamily:    FONT,
        fontSize:      tokens.typography.size['label-xs'],
        fontWeight:    tokens.typography.weight.semibold,
        color:         color ?? tokens.color.text.tertiary,
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        padding:       `${tokens.spacing.sm}px ${tokens.spacing.sm}px`,
        textAlign:     'center',
        whiteSpace:    'nowrap',
        borderBottom:  `1px solid ${tokens.color.border.secondary}`,
      }}
    >
      {label}
    </th>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function IssueHeatmap({ rows, onCellClick }: IssueHeatmapProps) {
  const maxPositive = Math.max(...rows.map((r) => r.positive), 1)
  const maxNeutral  = Math.max(...rows.map((r) => r.neutral),  1)
  const maxNegative = Math.max(...rows.map((r) => r.negative), 1)

  return (
    <div
      className="flex flex-col flex-1"
      style={{
        backgroundColor: tokens.component.card.bg,
        border:          `1px solid ${tokens.component.card.border}`,
        borderRadius:    10,
        minWidth:        0,
        overflow:        'hidden',
      }}
    >
      {/* Card header */}
      <div
        className="flex flex-row items-center"
        style={{
          paddingLeft:   tokens.spacing.xl,
          paddingRight:  tokens.spacing.xl,
          paddingTop:    tokens.spacing.default,
          paddingBottom: tokens.spacing.default,
          borderBottom:  `1px solid ${tokens.color.border.secondary}`,
          gap:           tokens.spacing.sm,
          flexShrink:    0,
        }}
      >
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
        <TooltipIcon text="Sentiment breakdown per issue — positive, neutral, and negative counts." />
      </div>

      {/* Table — fixed height, scrollable */}
      <div
        style={{
          height:         SCROLL_HEIGHT,
          overflowY:      'auto',
          scrollBehavior: 'smooth',
          flexShrink:     0,
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ position: 'sticky', top: 0, backgroundColor: tokens.component.card.bg, zIndex: 1 }}>
            <tr>
              <th style={{
                width:        32,
                padding:      `${tokens.spacing.sm}px ${tokens.spacing.sm}px ${tokens.spacing.sm}px ${tokens.spacing.xl}px`,
                borderBottom: `1px solid ${tokens.color.border.secondary}`,
              }} />
              <th
                style={{
                  fontFamily:    FONT,
                  fontSize:      tokens.typography.size['label-xs'],
                  fontWeight:    tokens.typography.weight.semibold,
                  color:         tokens.color.text.tertiary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  padding:       `${tokens.spacing.sm}px ${tokens.spacing.sm}px`,
                  textAlign:     'left',
                  borderBottom:  `1px solid ${tokens.color.border.secondary}`,
                  whiteSpace:    'nowrap',
                }}
              >
                Issue / Topic
              </th>
              <ColHeader label="Positive" color={foundation.color.green[600]} />
              <ColHeader label="Neutral"  color={tokens.color.text.tertiary}  />
              <ColHeader label="Negative" color={foundation.color.red[600]}   />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={`${row.issue}-${i}`}
                style={{ backgroundColor: i % 2 === 1 ? tokens.color.surface.secondary : 'transparent' }}
              >
                <td style={{ padding: `${tokens.spacing.sm}px ${tokens.spacing.sm}px ${tokens.spacing.sm}px ${tokens.spacing.xl}px`, verticalAlign: 'middle', width: 32 }}>
                  <span style={{ fontFamily: FONT, fontSize: tokens.typography.size['label-xs'], color: tokens.color.text.tertiary, fontWeight: tokens.typography.weight.medium }}>
                    {i + 1}
                  </span>
                </td>

                <td style={{ padding: `${tokens.spacing.sm}px ${tokens.spacing.sm}px` }}>
                  <div className="flex flex-col" style={{ gap: 2, minWidth: 0 }}>
                    <span style={{ fontFamily: FONT, fontSize: tokens.typography.size['body-sm'], fontWeight: tokens.typography.weight.bold, color: tokens.color.text.primary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {row.issue}
                    </span>
                    <span style={{ fontFamily: FONT, fontSize: tokens.typography.size['label-xs'], color: tokens.color.text.tertiary, whiteSpace: 'nowrap' }}>
                      {row.mentions.toLocaleString()} mentions ({row.pct})
                    </span>
                  </div>
                </td>

                <td style={{ textAlign: 'center', padding: `${tokens.spacing.xs}px ${tokens.spacing.sm}px` }}>
                  <Pill value={row.positive} style={pillStyle(row.positive, maxPositive, 'positive')} onClick={onCellClick ? () => onCellClick(row, 'positive') : undefined} />
                </td>
                <td style={{ textAlign: 'center', padding: `${tokens.spacing.xs}px ${tokens.spacing.sm}px` }}>
                  <Pill value={row.neutral}  style={pillStyle(row.neutral,  maxNeutral,  'neutral')}  onClick={onCellClick ? () => onCellClick(row, 'neutral')  : undefined} />
                </td>
                <td style={{ textAlign: 'center', padding: `${tokens.spacing.xs}px ${tokens.spacing.sm}px` }}>
                  <Pill value={row.negative} style={pillStyle(row.negative, maxNegative, 'negative')} onClick={onCellClick ? () => onCellClick(row, 'negative') : undefined} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
