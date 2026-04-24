import { AlignLeft } from 'lucide-react'
import { foundation, tokens } from '../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ExecutiveSummaryProps {
  summaryText: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"

// Figma: status/green/200 = #DCFCE7 (banner bg)
// Figma: secondary/caribbean green/700 = #069568 (icon badge bg on light green)
// Figma: status/green/1000 = #14532D (deep green text — WCAG AA on #DCFCE7)
const BG        = foundation.color.green[100]  // #DCFCE7
const ICON_BG   = '#069568'                    // caribbean green/700 — icon badge on light green
const TEXT      = '#14532D'                    // status/green/1000 — body text

// ─── Component ────────────────────────────────────────────────────────────────

export function ExecutiveSummary({ summaryText }: ExecutiveSummaryProps) {
  return (
    <div
      className="w-full flex flex-col"
      style={{
        backgroundColor: BG,
        borderRadius: tokens.radius.default,
        paddingTop: tokens.spacing.xl,
        paddingBottom: tokens.spacing.xl,
        paddingLeft: tokens.spacing['2xl'],
        paddingRight: tokens.spacing['2xl'],
        gap: tokens.spacing.sm,
      }}
    >
      {/* Header row: icon badge + label */}
      <div className="flex flex-row items-center" style={{ gap: tokens.spacing.sm }}>
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 28,
            height: 28,
            backgroundColor: ICON_BG,
            borderRadius: tokens.radius.sm,
            color: '#FFFFFF',
          }}
        >
          <AlignLeft size={14} />
        </div>
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['body-sm'],
            fontWeight: tokens.typography.weight.semibold,
            color: TEXT,
            lineHeight: tokens.typography.lineHeight.tight,
          }}
        >
          Executive Summary
        </span>
      </div>

      {/* Body text */}
      <p
        style={{
          fontFamily: FONT,
          fontSize: tokens.typography.size['body-base'],
          fontWeight: tokens.typography.weight.regular,
          color: tokens.color.text.primary,
          lineHeight: tokens.typography.lineHeight.relaxed,
          margin: 0,
        }}
      >
        {summaryText}
      </p>
    </div>
  )
}
