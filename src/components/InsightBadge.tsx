import { Lightbulb } from 'lucide-react'
import { tokens, foundation } from '../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InsightBadgeProps {
  text: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"

// ─── Component ────────────────────────────────────────────────────────────────

export function InsightBadge({ text }: InsightBadgeProps) {
  return (
    <div
      className="flex flex-row items-start"
      style={{
        backgroundColor: foundation.color.yellow[50],  // #FEFCE8 ≈ amber-50
        borderRadius:    tokens.radius.default,
        paddingLeft:     tokens.spacing.sm,
        paddingRight:    tokens.spacing.sm,
        paddingTop:      tokens.spacing.xs,
        paddingBottom:   tokens.spacing.xs,
        gap:             tokens.spacing.xs,
      }}
    >
      <Lightbulb
        size={13}
        aria-hidden="true"
        style={{
          color:     foundation.color.yellow[500],  // #EAB308 ≈ amber-500
          flexShrink: 0,
          marginTop: 1,
        }}
      />
      <p
        style={{
          fontFamily:  FONT,
          fontSize:    tokens.typography.size['label-xs'],
          color:       foundation.color.yellow[800],  // #854D0E ≈ amber-800
          lineHeight:  tokens.typography.lineHeight.tight,
          margin:      0,
        }}
      >
        {text}
      </p>
    </div>
  )
}
