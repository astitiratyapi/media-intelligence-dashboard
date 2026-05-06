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
        width:         '100%',
        backgroundColor: '#069568',
        borderRadius:  foundation.radius['2xl'],  // 16px
        paddingLeft:   tokens.spacing.xl,
        paddingRight:  tokens.spacing.xl,
        paddingTop:    tokens.spacing.default,
        paddingBottom: tokens.spacing.default,
        display:       'flex',
        flexDirection: 'column',
        gap:           tokens.spacing.xs,
      }}
    >
      {/* ── Label row ── */}
      <div
        className="flex flex-row items-center"
        style={{ gap: tokens.spacing.xs }}
      >
        <Zap size={13} aria-hidden="true" style={{ color: '#ffffff', flexShrink: 0 }} />
        <span
          style={{
            fontFamily:    FONT,
            fontSize:      tokens.typography.size['label-xs'],
            fontWeight:    tokens.typography.weight.semibold,
            color:         'rgba(255, 255, 255, 0.7)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Big Insight
        </span>
      </div>

      {/* ── Body text ── */}
      <p
        style={{
          fontFamily:  FONT,
          fontSize:    tokens.typography.size['body-sm'],   // 14px
          fontWeight:  tokens.typography.weight.semibold,
          color:       '#ffffff',
          lineHeight:  tokens.typography.lineHeight.tight,
          margin:      0,
        }}
      >
        {text}
      </p>
    </div>
  )
}
