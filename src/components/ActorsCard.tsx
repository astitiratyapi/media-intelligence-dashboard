import { Newspaper, Share2, Users } from 'lucide-react'
import { tokens, foundation } from '../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Actor {
  name: string
  type: 'Media' | 'Media Sosial'
  /** Kept for data compatibility — no longer rendered */
  count?: number
  /** Kept for data compatibility — no longer rendered */
  sentiment?: 'Positif' | 'Netral' | 'Negatif'
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

// Each compact card ≈ 68px + 4px gap → 4 cards fit in ~296px; use 320px for breathing room
const LIST_HEIGHT = 320

// ─── SentimentBar ─────────────────────────────────────────────────────────────

function SentimentBar({
  positive, neutral, negative,
}: {
  positive: number
  neutral: number
  negative: number
}) {
  const total = positive + neutral + negative

  const posPct = total > 0 ? (positive / total) * 100 : 0
  const neuPct = total > 0 ? (neutral  / total) * 100 : 0
  const negPct = total > 0 ? (negative / total) * 100 : 0

  return (
    <div className="flex flex-col w-full" style={{ gap: tokens.spacing.xs }}>
      {/* Segmented bar — full gray track when all-zero */}
      <div
        className="flex flex-row w-full overflow-hidden"
        style={{
          height: 6,
          borderRadius: tokens.radius.full,
          backgroundColor: foundation.color.neutral[200],
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

      {/* Raw count labels: positive (green) · neutral (gray) · negative (red) */}
      <div className="flex flex-row justify-between w-full">
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['body-sm'],
            fontWeight: tokens.typography.weight.medium,
            color: tokens.color.text.success,
          }}
        >
          {positive}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['body-sm'],
            fontWeight: tokens.typography.weight.medium,
            color: tokens.color.text.secondary,
          }}
        >
          {neutral}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['body-sm'],
            fontWeight: tokens.typography.weight.medium,
            color: tokens.color.text.error,
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
      {/* ── Top row: icon + name only ── */}
      <div
        className="flex flex-row items-center"
        style={{ gap: 6, minWidth: 0 }}
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
