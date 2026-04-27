import { Newspaper, Share2, Users } from 'lucide-react'
import { tokens, foundation } from '../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Actor {
  name: string
  type: 'Media' | 'Media Sosial'
  count: number
  sentiment: 'Positif' | 'Netral' | 'Negatif'
  positive: number
  neutral: number
  negative: number
}

export interface ActorsCardProps {
  actors: Actor[]
  subtitle?: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"

const SENTIMENT_BADGE = {
  Positif: {
    bg:   foundation.color.green[50],
    text: foundation.color.green[700],
    border: foundation.color.green[600],
  },
  Netral: {
    bg:   foundation.color.neutral[100],
    text: foundation.color.neutral[600],
    border: foundation.color.neutral[300],
  },
  Negatif: {
    bg:   foundation.color.red[50],
    text: foundation.color.red[600],
    border: foundation.color.red[500],
  },
}

// Each compact card ≈ 80px + 4px gap → 4 cards fit in 348px; use 360px for breathing room
const LIST_HEIGHT = 360

// ─── SentimentBadge ───────────────────────────────────────────────────────────

function SentimentBadge({ value }: { value: 'Positif' | 'Netral' | 'Negatif' }) {
  const s = SENTIMENT_BADGE[value]
  return (
    <span
      style={{
        fontFamily: FONT,
        fontSize: tokens.typography.size['label-xs'],
        fontWeight: tokens.typography.weight.semibold,
        color: s.text,
        backgroundColor: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: tokens.radius.full,
        paddingLeft: tokens.spacing.sm,
        paddingRight: tokens.spacing.sm,
        paddingTop: 2,
        paddingBottom: 2,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {value}
    </span>
  )
}

// ─── SourceTag ────────────────────────────────────────────────────────────────

function SourceTag({ type }: { type: 'Media' | 'Media Sosial' }) {
  return (
    <span
      style={{
        fontFamily: FONT,
        fontSize: tokens.typography.size['label-xs'],
        fontWeight: tokens.typography.weight.medium,
        color: tokens.color.text.tertiary,
        backgroundColor: foundation.color.neutral[100],
        border: `1px solid ${foundation.color.neutral[200]}`,
        borderRadius: tokens.radius.sm,
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 1,
        paddingBottom: 1,
        whiteSpace: 'nowrap',
        alignSelf: 'flex-start',
      }}
    >
      {type}
    </span>
  )
}

// ─── SentimentBar ─────────────────────────────────────────────────────────────

function SentimentBar({
  positive, neutral, negative,
}: {
  positive: number
  neutral: number
  negative: number
}) {
  const total = positive + neutral + negative
  if (total === 0) return null

  const posPct = (positive / total) * 100
  const neuPct = (neutral  / total) * 100
  const negPct = (negative / total) * 100

  return (
    <div className="flex flex-col" style={{ gap: 4, minWidth: 0 }}>
      {/* Segmented bar */}
      <div
        className="flex flex-row w-full overflow-hidden"
        style={{
          height: 6,
          borderRadius: tokens.radius.full,
          backgroundColor: foundation.color.neutral[100],
        }}
      >
        {posPct > 0 && (
          <div
            style={{
              width: `${posPct}%`,
              height: '100%',
              backgroundColor: foundation.color.green[500],
              flexShrink: 0,
            }}
          />
        )}
        {neuPct > 0 && (
          <div
            style={{
              width: `${neuPct}%`,
              height: '100%',
              backgroundColor: foundation.color.neutral[300],
              flexShrink: 0,
            }}
          />
        )}
        {negPct > 0 && (
          <div
            style={{
              width: `${negPct}%`,
              height: '100%',
              backgroundColor: foundation.color.red[400],
              flexShrink: 0,
            }}
          />
        )}
      </div>

      {/* Counts row: pos · neu · neg */}
      <div
        className="flex flex-row justify-between"
        style={{ minWidth: 0 }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['label-xs'],
            fontWeight: tokens.typography.weight.medium,
            color: foundation.color.green[700],
          }}
        >
          {positive}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['label-xs'],
            fontWeight: tokens.typography.weight.medium,
            color: tokens.color.text.tertiary,
          }}
        >
          {neutral}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['label-xs'],
            fontWeight: tokens.typography.weight.medium,
            color: foundation.color.red[600],
          }}
        >
          {negative}
        </span>
      </div>
    </div>
  )
}

// ─── ActorItem ────────────────────────────────────────────────────────────────

function ActorItem({ actor }: { actor: Actor }) {
  const Icon = actor.type === 'Media' ? Newspaper : Share2

  return (
    <article
      className="flex flex-col"
      style={{
        backgroundColor: tokens.component.card.bg,
        border: `1px solid ${tokens.color.border.secondary}`,
        borderRadius: tokens.radius.default,
        paddingLeft: tokens.spacing.md,
        paddingRight: tokens.spacing.md,
        paddingTop: tokens.spacing.sm,
        paddingBottom: tokens.spacing.sm,
        gap: tokens.spacing.xs,
        minWidth: 0,
      }}
    >
      {/* ── Top row: icon + name | count + sentiment badge ── */}
      <div
        className="flex flex-row items-start justify-between"
        style={{ gap: tokens.spacing.sm, minWidth: 0 }}
      >
        {/* Left: icon + name column */}
        <div
          className="flex flex-row items-center"
          style={{ gap: 6, minWidth: 0, flex: 1 }}
        >
          <Icon
            size={14}
            style={{ color: tokens.color.icon.secondary, flexShrink: 0 }}
            aria-hidden="true"
          />
          <span
            className="truncate"
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['body-sm'],
              fontWeight: tokens.typography.weight.bold,
              color: tokens.color.text.primary,
              lineHeight: tokens.typography.lineHeight.tight,
              minWidth: 0,
            }}
          >
            {actor.name}
          </span>
        </div>

        {/* Right: count + badge */}
        <div
          className="flex flex-row items-center flex-shrink-0"
          style={{ gap: 6 }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['body-sm'],
              fontWeight: tokens.typography.weight.bold,
              color: tokens.color.text.primary,
              lineHeight: tokens.typography.lineHeight.tight,
            }}
          >
            {actor.count}
          </span>
          <SentimentBadge value={actor.sentiment} />
        </div>
      </div>

      {/* ── Source type tag ── */}
      <SourceTag type={actor.type} />

      {/* ── Sentiment bar + counts ── */}
      <SentimentBar
        positive={actor.positive}
        neutral={actor.neutral}
        negative={actor.negative}
      />
    </article>
  )
}

// ─── ActorsCard ───────────────────────────────────────────────────────────────

export function ActorsCard({ actors, subtitle }: ActorsCardProps) {
  return (
    <article
      className="flex flex-col flex-1"
      style={{
        backgroundColor: tokens.component.card.bg,
        border: `1px solid ${tokens.component.card.border}`,
        borderRadius: tokens.component.card.radius,
        minWidth: 0,
        overflow: 'hidden',
      }}
    >
      {/* ── Card header ── */}
      <div
        className="flex flex-col"
        style={{
          paddingLeft: tokens.component.card.headerPaddingX,
          paddingRight: tokens.component.card.headerPaddingX,
          paddingTop: tokens.component.card.headerPaddingTop,
          paddingBottom: tokens.component.card.headerPaddingBottom,
          borderBottom: `1px solid ${tokens.color.border.secondary}`,
          gap: 4,
          flexShrink: 0,
        }}
      >
        <div className="flex flex-row items-center" style={{ gap: tokens.spacing.sm }}>
          <Users
            size={16}
            style={{ color: tokens.color.icon.brand, flexShrink: 0 }}
            aria-hidden="true"
          />
          <h3
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['heading-xs'],
              fontWeight: tokens.typography.weight.bold,
              color: tokens.color.text.primary,
              lineHeight: tokens.typography.lineHeight.tight,
              margin: 0,
            }}
          >
            Actors
          </h3>
        </div>
        {subtitle && (
          <p
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['body-sm'],
              color: tokens.color.text.tertiary,
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Scrollable actor list ── */}
      <div
        role="list"
        aria-label="Most mentioned actors"
        style={{
          height: LIST_HEIGHT,
          overflowY: 'auto',
          padding: tokens.spacing.md,
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacing.xs,
          scrollbarWidth: 'thin',
          scrollbarColor: `${foundation.color.neutral[300]} transparent`,
        }}
      >
        {actors.map((actor) => (
          <div key={actor.name} role="listitem">
            <ActorItem actor={actor} />
          </div>
        ))}
      </div>
    </article>
  )
}
