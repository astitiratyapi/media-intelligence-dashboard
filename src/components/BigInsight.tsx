import { Zap } from 'lucide-react'
import { tokens, foundation } from '../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BigInsightProps {
  text: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"

// ─── Component ────────────────────────────────────────────────────────────────

export function BigInsight({ text }: BigInsightProps) {
  return (
    <div
      className="w-full"
      style={{
        background:    'linear-gradient(to right, #0F2744, #1E3A5F)',
        borderRadius:  foundation.radius['2xl'],
        paddingLeft:   tokens.spacing['2xl'],
        paddingRight:  tokens.spacing['2xl'],
        paddingTop:    tokens.spacing.xl,
        paddingBottom: tokens.spacing.xl,
      }}
    >
      {/* ── Label row ── */}
      <div
        className="flex flex-row items-center"
        style={{ gap: tokens.spacing.xs, marginBottom: tokens.spacing.sm }}
      >
        <Zap
          size={14}
          aria-hidden="true"
          style={{ color: foundation.color.yellow[400], flexShrink: 0 }}
        />
        <span
          style={{
            fontFamily:    FONT,
            fontSize:      tokens.typography.size['label-xs'],
            fontWeight:    tokens.typography.weight.semibold,
            color:         'rgba(255, 255, 255, 0.6)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Big Insight
        </span>
      </div>

      {/* ── Accent line + main text ── */}
      <div
        style={{
          borderLeft:  `4px solid ${foundation.color.yellow[400]}`,
          paddingLeft: tokens.spacing.default,
        }}
      >
        <p
          style={{
            fontFamily:  FONT,
            fontSize:    tokens.typography.size['heading-md'],
            fontWeight:  tokens.typography.weight.bold,
            color:       '#ffffff',
            lineHeight:  tokens.typography.lineHeight.tight,
            margin:      0,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  )
}
