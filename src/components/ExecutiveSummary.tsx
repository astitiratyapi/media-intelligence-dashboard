import { AlignLeft } from 'lucide-react'
import { tokens, foundation } from '../tokens'
import { TooltipIcon } from './TooltipIcon'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ExecutiveSummaryProps {
  summaryText:  string
  generatedAt?: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"

// ─── Component ────────────────────────────────────────────────────────────────

export function ExecutiveSummary({ summaryText, generatedAt }: ExecutiveSummaryProps) {
  return (
    <div
      style={{
        width:           '100%',
        backgroundColor: '#F3E8FF',
        border:          '1px solid #DDD6FE',
        borderRadius:    foundation.radius['2xl'],  // 16px
        paddingLeft:     tokens.spacing.xl,
        paddingRight:    tokens.spacing.xl,
        paddingTop:      tokens.spacing.lg,
        paddingBottom:   tokens.spacing.lg,
        display:         'flex',
        flexDirection:   'column',
        gap:             tokens.spacing.sm,
      }}
    >
      {/* ── Header row: icon badge + label + tooltip ── */}
      <div
        className="flex flex-row items-center justify-between"
        style={{ gap: tokens.spacing.sm }}
      >
        <div className="flex flex-row items-center" style={{ gap: tokens.spacing.sm }}>
          {/* Icon badge */}
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width:           32,
              height:          32,
              backgroundColor: '#EDE9FE',
              borderRadius:    tokens.radius.default,
              color:           '#7C3AED',
            }}
          >
            <AlignLeft size={14} />
          </div>

          {/* Label */}
          <span
            style={{
              fontFamily:  FONT,
              fontSize:    tokens.typography.size['body-sm'],
              fontWeight:  tokens.typography.weight.semibold,
              color:       '#7C3AED',
              lineHeight:  tokens.typography.lineHeight.tight,
            }}
          >
            Executive Summary
          </span>
        </div>

        <TooltipIcon text="AI-generated summary of the current media landscape for this program." />
      </div>

      {/* ── Body text ── */}
      <p
        style={{
          fontFamily:  FONT,
          fontSize:    tokens.typography.size['body-sm'],  // 14px
          fontWeight:  tokens.typography.weight.regular,
          color:       '#18191F',
          lineHeight:  tokens.typography.lineHeight.normal,
          margin:      0,
        }}
      >
        {summaryText}
      </p>

      {/* ── Generated timestamp ── */}
      {generatedAt && (
        <span
          style={{
            fontFamily: FONT,
            fontSize:   tokens.typography.size['label-xs'],
            color:      '#9333EA',   // purple-600 — readable on #F3E8FF bg
            opacity:    0.7,
            display:    'block',
            marginTop:  tokens.spacing.xs,
          }}
        >
          Generated: {generatedAt}
        </span>
      )}
    </div>
  )
}
