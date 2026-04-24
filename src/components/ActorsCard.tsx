import { Users } from 'lucide-react'
import { tokens, foundation } from '../tokens'

// ─── Actor bar row ────────────────────────────────────────────────────────────
// Resizing: fill container horizontally, hug content vertically
// Auto Layout: flex-col, gap/xs (name row + bar row)

interface Actor {
  name: string
  count: number
}

interface ActorRowProps {
  actor: Actor
  maxCount: number
}

function ActorRow({ actor, maxCount }: ActorRowProps) {
  const fillPct = maxCount > 0 ? (actor.count / maxCount) * 100 : 0

  return (
    // Row container: flex-col, gap/xs (2px effectively)
    <div className="flex flex-col gap-1" style={{ minWidth: 0 }}>
      {/* Name + count row: flex-row, space-between */}
      <div className="flex flex-row items-center justify-between gap-2">
        <span
          className="truncate"
          style={{
            fontSize: tokens.typography.size['body-sm'],
            color: tokens.color.text.primary,
            fontWeight: tokens.typography.weight.medium,
            minWidth: 0,
          }}
        >
          {actor.name}
        </span>
        <span
          className="flex-shrink-0 font-semibold tabular-nums"
          style={{
            fontSize: tokens.typography.size['body-sm'],
            color: tokens.color.text.secondary,
          }}
        >
          {actor.count}
        </span>
      </div>

      {/* Bar track: fill container horizontally, fixed height */}
      <div
        className="w-full overflow-hidden"
        style={{
          height: 4,
          backgroundColor: foundation.color.neutral[100],
          borderRadius: tokens.radius.full,
        }}
      >
        {/* Bar fill: brand blue, proportional width */}
        <div
          style={{
            height: '100%',
            width: `${fillPct}%`,
            backgroundColor: tokens.color.surface.brand,
            borderRadius: tokens.radius.full,
            transition: 'width 0.5s ease-out',
          }}
        />
      </div>
    </div>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ActorsCardProps {
  actors: Actor[]
  subtitle?: string
}

// ─── Component ────────────────────────────────────────────────────────────────
// Resizing: fill container horizontally (flex-1), hug content vertically
// Auto Layout: flex-col, gap = spacing/default

export function ActorsCard({ actors, subtitle }: ActorsCardProps) {
  const maxCount = actors.reduce((m, a) => Math.max(m, a.count), 0)
  const visibleActors = actors.slice(0, 8)

  return (
    // Card container: fill × hug, flex-col, white bg, border, radius/default
    <article
      className="flex flex-col flex-1 bg-surface-primary border border-edge-primary rounded-token-default shadow-xs overflow-hidden"
      style={{ minWidth: 0 }}
    >
      {/* Card header: flex-col, gap/xs */}
      <div
        className="flex flex-col gap-1"
        style={{
          paddingLeft: tokens.component.card.headerPaddingX,
          paddingRight: tokens.component.card.headerPaddingX,
          paddingTop: tokens.component.card.headerPaddingTop,
          paddingBottom: tokens.component.card.headerPaddingBottom,
        }}
      >
        {/* Title row: flex-row, gap/sm */}
        <div className="flex flex-row items-center gap-2">
          <Users
            size={16}
            style={{ color: tokens.color.icon.brand, flexShrink: 0 }}
            aria-hidden="true"
          />
          <h3
            className="font-bold"
            style={{
              fontSize: tokens.typography.size['heading-xs'],
              lineHeight: tokens.typography.lineHeight.tight,
              color: tokens.color.text.primary,
            }}
          >
            Actors
          </h3>
        </div>

        {/* Subtitle: body-sm, tertiary */}
        {subtitle && (
          <p
            style={{
              fontSize: tokens.typography.size['body-sm'],
              color: tokens.color.text.tertiary,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Scrollable actor list: flex-col, gap/md, overflow-y-auto */}
      <div
        className="flex flex-col gap-3 overflow-y-auto"
        style={{
          paddingLeft: tokens.component.card.contentPaddingX,
          paddingRight: tokens.component.card.contentPaddingX,
          paddingBottom: tokens.component.card.contentPaddingBottom,
          // Subtle scrollbar track using surface tokens
          scrollbarWidth: 'thin',
          scrollbarColor: `${foundation.color.neutral[300]} transparent`,
        }}
        role="list"
        aria-label="Most mentioned actors"
      >
        {visibleActors.map((actor) => (
          <div key={actor.name} role="listitem">
            <ActorRow actor={actor} maxCount={maxCount} />
          </div>
        ))}
      </div>
    </article>
  )
}
