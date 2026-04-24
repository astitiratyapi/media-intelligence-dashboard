import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'

interface TooltipContent {
  active?: boolean
  payload?: { value: number }[]
  label?: string
}
import { tokens, foundation } from '../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DataPoint {
  date: string
  value: number
}

export interface CoverageTrendChartProps {
  data: DataPoint[]
  period?: string    // e.g. "2016-04-24 to 2026-04-22"
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
const BLUE = foundation.color.blue[500]   // #3B82F6

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: TooltipContent) {
  if (!active || !payload?.length) return null
  return (
    <div
      style={{
        backgroundColor: tokens.component.card.bg,
        border: `1px solid ${tokens.color.border.secondary}`,
        borderRadius: tokens.radius.default,
        padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
        fontFamily: FONT,
        fontSize: tokens.typography.size['label-xs'],
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        minWidth: 110,
      }}
    >
      <p style={{ margin: 0, fontWeight: 600, color: tokens.color.text.primary, marginBottom: 4 }}>
        {fmtDate(String(label))}
      </p>
      <span style={{ color: BLUE, fontWeight: 500 }}>
        Mentions: {payload[0]?.value}
      </span>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CoverageTrendChart({ data, period }: CoverageTrendChartProps) {
  return (
    <div className="flex flex-col" style={{ gap: tokens.spacing.md }}>
      {/* Subtitle */}
      <p style={{ fontFamily: FONT, fontSize: tokens.typography.size['body-sm'], color: tokens.color.text.tertiary, margin: 0 }}>
        Mentions over time — hover to see top stories — click to see details
      </p>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="4 4"
            stroke={tokens.color.border.secondary}
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tickFormatter={fmtDate}
            tick={{ fontFamily: FONT, fontSize: 11, fill: tokens.color.text.tertiary }}
            axisLine={false}
            tickLine={false}
            tickMargin={8}
          />
          <YAxis
            tick={{ fontFamily: FONT, fontSize: 11, fill: tokens.color.text.tertiary }}
            axisLine={false}
            tickLine={false}
            ticks={[0, 15, 30, 45, 60]}
            tickMargin={4}
          />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ stroke: tokens.color.border.primary, strokeWidth: 1, strokeDasharray: '4 2' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={BLUE}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: BLUE, stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Period label */}
      {period && (
        <p style={{ fontFamily: FONT, fontSize: tokens.typography.size['label-xs'], color: tokens.color.text.tertiary, margin: 0 }}>
          Period: {period}
        </p>
      )}
    </div>
  )
}
