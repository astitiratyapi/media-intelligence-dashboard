import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'

interface TooltipContent {
  active?: boolean
  payload?: { dataKey: string; value: number }[]
  label?: string
}
import { tokens, foundation } from '../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AllScrapedDataPoint {
  date: string   // ISO date e.g. "2024-02-04"
  news: number
  social: number
}

export interface AllScrapedChartProps {
  data: AllScrapedDataPoint[]
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT  = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
const BLUE  = foundation.color.blue[500]       // #3B82F6
const GREEN = foundation.color.green[500]      // #22C55E
const BLUE_FILL  = foundation.color.blue[50]   // #EFF6FF
const GREEN_FILL = foundation.color.green[50]  // #F0FDF4

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: TooltipContent) {
  if (!active || !payload?.length) return null
  const news   = payload.find((p: { dataKey: string }) => p.dataKey === 'news')?.value
  const social = payload.find((p: { dataKey: string }) => p.dataKey === 'social')?.value

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
        minWidth: 120,
      }}
    >
      <p style={{ margin: 0, fontWeight: 600, color: tokens.color.text.primary, marginBottom: 6 }}>
        {fmtDate(String(label))}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ color: BLUE, fontWeight: 500 }}>News: {news}</span>
        <span style={{ color: GREEN, fontWeight: 500 }}>Social: {social}</span>
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AllScrapedChart({ data }: AllScrapedChartProps) {
  return (
    <div className="flex flex-col" style={{ gap: tokens.spacing.md }}>
      {/* Subtitle + legend */}
      <div className="flex flex-row items-center justify-between" style={{ gap: tokens.spacing.sm }}>
        <p style={{ fontFamily: FONT, fontSize: tokens.typography.size['body-sm'], color: tokens.color.text.tertiary, margin: 0 }}>
          Volume of news and social media content over time — click to see details
        </p>
        <div className="flex flex-row items-center" style={{ gap: tokens.spacing.default }}>
          {[{ label: 'News', color: BLUE }, { label: 'Social', color: GREEN }].map((item) => (
            <div key={item.label} className="flex flex-row items-center" style={{ gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: item.color }} />
              <span style={{ fontFamily: FONT, fontSize: tokens.typography.size['label-xs'], color: tokens.color.text.secondary, fontWeight: 500 }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="newsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={BLUE_FILL} stopOpacity={0.9} />
              <stop offset="100%" stopColor={BLUE_FILL} stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="socialGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={GREEN_FILL} stopOpacity={0.9} />
              <stop offset="100%" stopColor={GREEN_FILL} stopOpacity={0.1} />
            </linearGradient>
          </defs>
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
            ticks={[0, 8, 16, 24, 32]}
            tickMargin={4}
          />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ stroke: tokens.color.border.primary, strokeWidth: 1, strokeDasharray: '4 2' }}
          />
          <Area
            type="monotone"
            dataKey="news"
            stroke={BLUE}
            strokeWidth={2}
            fill="url(#newsGrad)"
            dot={false}
            activeDot={{ r: 4, fill: BLUE, stroke: '#fff', strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="social"
            stroke={GREEN}
            strokeWidth={2}
            fill="url(#socialGrad)"
            dot={false}
            activeDot={{ r: 4, fill: GREEN, stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
