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
        flex:            1,
        backgroundColor: tokens.color.surface.infoSubtle,          // blue[50] = #EFF6FF
        border:          `1px solid ${foundation.color.blue[200]}`, // border-blue-200
        borderRadius:    foundation.radius['2xl'],                  // 16px
        boxShadow:       '0 1px 3px rgba(0,0,0,0.06)',
        paddingLeft:     tokens.spacing.xl,
        paddingRight:    tokens.spacing.xl,
        paddingTop:      tokens.spacing.default,
        paddingBottom:   tokens.spacing.default,
        display:         'flex',
        flexDirection:   'column',
        gap:             tokens.spacing.xs,
      }}
    >
      {/* ── Label row ── */}
      <div
        className="flex flex-row items-center"
        style={{ gap: tokens.spacing.xs }}
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
          fontSize:   tokens.typography.size['body-sm'],  // 14px
          fontWeight: tokens.typography.weight.regular,
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
