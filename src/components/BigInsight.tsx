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
      style={{
        // 2/3 of parent width, accounting for 1 gap between 3 cards (gap = spacing.lg = 24px)
        width:           'calc((100% / 3) * 2 + 12px)',
        backgroundColor: tokens.color.surface.infoSubtle,   // blue[50] = #EFF6FF
        borderRadius:    foundation.radius['2xl'],           // 16px
        paddingLeft:     tokens.spacing.xl,
        paddingRight:    tokens.spacing.xl,
        paddingTop:      tokens.spacing.default,
        paddingBottom:   tokens.spacing.default,
      }}
    >
      {/* ── Label row ── */}
      <div
        className="flex flex-row items-center"
        style={{ gap: tokens.spacing.xs, marginBottom: tokens.spacing.xs }}
      >
        <Zap
          size={13}
          aria-hidden="true"
          style={{ color: tokens.color.icon.info, flexShrink: 0 }}
        />
        <span
          style={{
            fontFamily:    FONT,
            fontSize:      tokens.typography.size['label-xs'],
            fontWeight:    tokens.typography.weight.semibold,
            color:         tokens.color.text.brand,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Big Insight
        </span>
      </div>

      {/* ── Main text ── */}
      <p
        style={{
          fontFamily: FONT,
          fontSize:   tokens.typography.size['body-sm'],   // 14px
          fontWeight: tokens.typography.weight.regular,    // normal weight
          color:      tokens.color.text.primary,
          lineHeight: tokens.typography.lineHeight.tight,
          margin:     0,
        }}
      >
        {text}
      </p>
    </div>
  )
}
