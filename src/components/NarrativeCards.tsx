import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import { tokens } from '../tokens'
import { NarrativeCard, type NarrativeCardData } from './NarrativeCard'
import { TooltipIcon } from './TooltipIcon'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NarrativeCardsProps {
  cards: NarrativeCardData[]
  generatedAt?: string
}

type SentimentFilter = 'all' | 'positive' | 'negative'

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT   = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
const PURPLE = { bg: '#EDE9FE', icon: '#7C3AED' }

const FILTERS: { id: SentimentFilter; label: string }[] = [
  { id: 'all',      label: 'All'      },
  { id: 'positive', label: 'Positive' },
  { id: 'negative', label: 'Negative' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function NarrativeCards({ cards, generatedAt }: NarrativeCardsProps) {
  const [filter, setFilter] = useState<SentimentFilter>('all')

  const visible = filter === 'all'
    ? cards
    : cards.filter((c) => c.sentiment === filter)

  return (
    <div
      className="flex flex-col flex-1"
      style={{
        backgroundColor: tokens.component.card.bg,
        border: `1px solid ${tokens.component.card.border}`,
        borderRadius: 10,
        minWidth: 0,
      }}
    >
      {/* Card header */}
      <div
        className="flex flex-row items-center"
        style={{
          paddingLeft: tokens.spacing.xl,
          paddingRight: tokens.spacing.xl,
          paddingTop: tokens.spacing.default,
          paddingBottom: tokens.spacing.default,
          borderBottom: `1px solid ${tokens.color.border.secondary}`,
          gap: tokens.spacing.sm,
          flexShrink: 0,
        }}
      >
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{ width: 32, height: 32, backgroundColor: PURPLE.bg, borderRadius: tokens.radius.lg, color: PURPLE.icon }}
          aria-hidden="true"
        >
          <BookOpen size={16} />
        </div>
        <div className="flex flex-col flex-1" style={{ gap: 2 }}>
          <span
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['body-md'],
              fontWeight: tokens.typography.weight.bold,
              color: tokens.color.text.primary,
            }}
          >
            Narrative Cards
          </span>
          <span
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['label-xs'],
              color: tokens.color.text.tertiary,
            }}
          >
            Key story frames — comms strategy is about frames, not keywords
          </span>
        </div>
        <TooltipIcon text="Key story frames currently circulating across media coverage." />
      </div>

      {/* Sentiment filter */}
      <div
        className="flex flex-row items-center"
        style={{
          paddingLeft: tokens.spacing.xl,
          paddingRight: tokens.spacing.xl,
          paddingTop: tokens.spacing.sm,
          paddingBottom: tokens.spacing.sm,
          borderBottom: `1px solid ${tokens.color.border.secondary}`,
          flexShrink: 0,
        }}
      >
        <div
          className="flex flex-row"
          style={{
            backgroundColor: tokens.color.surface.tertiary,
            borderRadius: tokens.radius.default,
            padding: 3,
            gap: 2,
          }}
        >
          {FILTERS.map(({ id, label }) => {
            const isActive = filter === id
            return (
              <button
                key={id}
                onClick={() => setFilter(id)}
                style={{
                  fontFamily: FONT,
                  fontSize: tokens.typography.size['label-xs'],
                  fontWeight: isActive ? tokens.typography.weight.semibold : tokens.typography.weight.medium,
                  color: isActive ? tokens.color.text.primary : tokens.color.text.tertiary,
                  backgroundColor: isActive ? tokens.component.card.bg : 'transparent',
                  border: 'none',
                  borderRadius: tokens.radius.sm,
                  paddingTop: tokens.spacing.xs,
                  paddingBottom: tokens.spacing.xs,
                  paddingLeft: tokens.spacing.sm,
                  paddingRight: tokens.spacing.sm,
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 150ms ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Card list — flex-1 fills remaining height, scroll for items beyond view */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          scrollBehavior: 'smooth',
          padding: tokens.spacing.default,
        }}
      >
        {visible.length === 0 ? (
          <div style={{ padding: tokens.spacing.xl, textAlign: 'center' }}>
            <span
              style={{
                fontFamily: FONT,
                fontSize: tokens.typography.size['body-sm'],
                color: tokens.color.text.tertiary,
              }}
            >
              No narratives match the selected filter.
            </span>
          </div>
        ) : (
          <div className="flex flex-col" style={{ gap: tokens.spacing.sm }}>
            {visible.map((card, i) => (
              <NarrativeCard key={i} {...card} />
            ))}
          </div>
        )}
      </div>

      {/* Footer: generated timestamp */}
      {generatedAt && (
        <div
          style={{
            paddingLeft: tokens.spacing.xl,
            paddingRight: tokens.spacing.xl,
            paddingTop: tokens.spacing.sm,
            paddingBottom: tokens.spacing.sm,
            borderTop: `1px solid ${tokens.color.border.secondary}`,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['label-xs'],
              color: tokens.color.text.tertiary,
            }}
          >
            Generated: {generatedAt}
          </span>
        </div>
      )}
    </div>
  )
}
