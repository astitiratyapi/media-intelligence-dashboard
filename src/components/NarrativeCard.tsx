import { tokens, foundation } from '../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NarrativeCardData {
  title: string
  sentiment: 'positive' | 'negative'
  description: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"

const SENTIMENT_STYLE = {
  positive: {
    bg:   foundation.color.green[50],
    text: foundation.color.green[700],
    label: 'Positive',
  },
  negative: {
    bg:   foundation.color.red[50],
    text: foundation.color.red[600],
    label: 'Negative',
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NarrativeCard({ title, sentiment, description }: NarrativeCardData) {
  const s = SENTIMENT_STYLE[sentiment]

  return (
    <div
      className="flex flex-col"
      style={{
        backgroundColor: tokens.component.card.bg,
        border: `1px solid ${tokens.component.card.border}`,
        borderRadius: tokens.radius.default,
        padding: tokens.spacing.default,
        gap: tokens.spacing.sm,
        minWidth: 0,
      }}
    >
      {/* Title + sentiment badge */}
      <div className="flex flex-row items-start justify-between" style={{ gap: tokens.spacing.sm }}>
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['body-sm'],
            fontWeight: tokens.typography.weight.bold,
            color: tokens.color.text.primary,
            lineHeight: tokens.typography.lineHeight.normal,
            flex: 1,
            minWidth: 0,
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['label-xs'],
            fontWeight: tokens.typography.weight.semibold,
            color: s.text,
            backgroundColor: s.bg,
            borderRadius: tokens.radius.full,
            paddingLeft: tokens.spacing.sm,
            paddingRight: tokens.spacing.sm,
            paddingTop: 2,
            paddingBottom: 2,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {s.label}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: FONT,
          fontSize: tokens.typography.size['body-sm'],
          color: tokens.color.text.secondary,
          lineHeight: tokens.typography.lineHeight.normal,
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        } as React.CSSProperties}
      >
        {description}
      </p>
    </div>
  )
}
