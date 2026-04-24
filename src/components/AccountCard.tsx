import { ExternalLink, Flame, Heart, MessageCircle } from 'lucide-react'
import { tokens, foundation } from '../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Account {
  name: string
  handle: string
  likes: number
  replies: number
  shares: number
  sentiment: { positive: number; neutral: number; negative: number }
  topPost: { text: string; likes: number; replies: number; url: string }
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
const CARD_RADIUS = 10
const CARD_PADDING = tokens.spacing.xl   // 24px

const SENTIMENT_COLOR = {
  positive: foundation.color.green[500],    // #22C55E
  neutral:  foundation.color.neutral[300],  // #D1D5DB — subtle gray track
  negative: foundation.color.red[400],      // #F87171
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return n.toLocaleString()
}

// ─── Metric column ────────────────────────────────────────────────────────────

function MetricCol({ label, value, hasDivider }: { label: string; value: number; hasDivider: boolean }) {
  return (
    <div
      className="flex flex-col items-center flex-1"
      style={{
        paddingTop: tokens.spacing.default,
        paddingBottom: tokens.spacing.default,
        paddingLeft: tokens.spacing.sm,
        paddingRight: tokens.spacing.sm,
        gap: 4,
        borderRight: hasDivider ? `1px solid ${tokens.color.border.secondary}` : 'none',
      }}
    >
      <span
        style={{
          fontFamily: FONT,
          fontSize: tokens.typography.size['label-xs'],
          fontWeight: tokens.typography.weight.semibold,
          color: tokens.color.text.tertiary,
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: FONT,
          fontSize: tokens.typography.size['heading-md'],
          fontWeight: tokens.typography.weight.bold,
          color: tokens.color.text.primary,
          lineHeight: tokens.typography.lineHeight.tight,
        }}
      >
        {fmt(value)}
      </span>
    </div>
  )
}

// ─── Sentiment bar ────────────────────────────────────────────────────────────

function SentimentBar({ positive, neutral, negative }: { positive: number; neutral: number; negative: number }) {
  return (
    <div className="flex flex-col" style={{ gap: tokens.spacing.sm }}>
      <span
        style={{
          fontFamily: FONT,
          fontSize: tokens.typography.size['body-sm'],
          fontWeight: tokens.typography.weight.semibold,
          color: tokens.color.text.primary,
        }}
      >
        Sentiment Distribution
      </span>

      {/* Segmented bar */}
      <div
        style={{
          height: 8,
          display: 'flex',
          flexDirection: 'row' as const,
          borderRadius: tokens.radius.full,
          overflow: 'hidden',
          backgroundColor: tokens.color.border.secondary,
          gap: 2,
        }}
      >
        {positive > 0 && (
          <div
            style={{
              width: `${positive}%`,
              height: '100%',
              backgroundColor: SENTIMENT_COLOR.positive,
            }}
          />
        )}
        {neutral > 0 && (
          <div
            style={{
              width: `${neutral}%`,
              height: '100%',
              backgroundColor: SENTIMENT_COLOR.neutral,
            }}
          />
        )}
        {negative > 0 && (
          <div
            style={{
              width: `${negative}%`,
              height: '100%',
              backgroundColor: SENTIMENT_COLOR.negative,
            }}
          />
        )}
      </div>

      {/* Percentage labels */}
      <div className="flex flex-row" style={{ gap: tokens.spacing.default }}>
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['label-xs'],
            fontWeight: tokens.typography.weight.medium,
            color: SENTIMENT_COLOR.positive,
          }}
        >
          {positive}% positive
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['label-xs'],
            fontWeight: tokens.typography.weight.medium,
            color: tokens.color.text.tertiary,
          }}
        >
          {neutral}% neutral
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['label-xs'],
            fontWeight: tokens.typography.weight.medium,
            color: SENTIMENT_COLOR.negative,
          }}
        >
          {negative}% negative
        </span>
      </div>
    </div>
  )
}

// ─── Top Trending Post ────────────────────────────────────────────────────────

function TrendingPost({ text, likes, replies, url }: Account['topPost']) {
  return (
    <div
      className="flex flex-col"
      style={{
        backgroundColor: tokens.color.surface.secondary,
        borderRadius: tokens.radius.default,
        padding: tokens.spacing.default,
        gap: tokens.spacing.sm,
      }}
    >
      {/* Label row */}
      <div className="flex flex-row items-center" style={{ gap: tokens.spacing.xs }}>
        <Flame size={14} color={foundation.color.orange[500]} />
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['label-xs'],
            fontWeight: tokens.typography.weight.semibold,
            color: tokens.color.text.secondary,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.06em',
          }}
        >
          Top Trending Post
        </span>
      </div>

      {/* Post text */}
      <p
        style={{
          fontFamily: FONT,
          fontSize: tokens.typography.size['body-sm'],
          color: tokens.color.text.primary,
          lineHeight: tokens.typography.lineHeight.normal,
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        } as React.CSSProperties}
      >
        {text}
      </p>

      {/* Post footer */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center" style={{ gap: tokens.spacing.md }}>
          <div className="flex flex-row items-center" style={{ gap: 4 }}>
            <Heart size={12} color={tokens.color.text.tertiary} />
            <span
              style={{
                fontFamily: FONT,
                fontSize: tokens.typography.size['label-xs'],
                color: tokens.color.text.secondary,
              }}
            >
              {fmt(likes)}
            </span>
          </div>
          <div className="flex flex-row items-center" style={{ gap: 4 }}>
            <MessageCircle size={12} color={tokens.color.text.tertiary} />
            <span
              style={{
                fontFamily: FONT,
                fontSize: tokens.typography.size['label-xs'],
                color: tokens.color.text.secondary,
              }}
            >
              {fmt(replies)}
            </span>
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['label-xs'],
            fontWeight: tokens.typography.weight.semibold,
            color: tokens.color.text.brand,
            textDecoration: 'none',
          }}
        >
          View →
        </a>
      </div>
    </div>
  )
}

// ─── AccountCard ──────────────────────────────────────────────────────────────

export function AccountCard({ name, handle, likes, replies, shares, sentiment, topPost }: Account) {
  const metrics: { label: string; value: number }[] = [
    { label: 'LIKES',   value: likes   },
    { label: 'REPLIES', value: replies },
    { label: 'SHARES',  value: shares  },
  ]

  return (
    <div
      className="flex flex-col flex-1"
      style={{
        backgroundColor: tokens.component.card.bg,
        border: `1px solid ${tokens.component.card.border}`,
        borderRadius: CARD_RADIUS,
        minWidth: 0,
        overflow: 'hidden',
      }}
    >
      {/* Card header */}
      <div
        className="flex flex-row items-start justify-between"
        style={{
          padding: CARD_PADDING,
          paddingBottom: tokens.spacing.default,
          borderBottom: `1px solid ${tokens.color.border.secondary}`,
          gap: tokens.spacing.sm,
        }}
      >
        <div className="flex flex-col" style={{ gap: 2, minWidth: 0 }}>
          <span
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['body-md'],
              fontWeight: tokens.typography.weight.bold,
              color: tokens.color.text.primary,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {name}
          </span>
          <span
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['body-sm'],
              color: tokens.color.text.tertiary,
            }}
          >
            {handle}
          </span>
        </div>
        <a
          href={topPost.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: tokens.color.icon.secondary, flexShrink: 0, display: 'flex' }}
          aria-label={`Open ${name} page`}
        >
          <ExternalLink size={16} />
        </a>
      </div>

      {/* Metrics row */}
      <div
        className="flex flex-row"
        style={{ borderBottom: `1px solid ${tokens.color.border.secondary}` }}
      >
        {metrics.map((m, i) => (
          <MetricCol
            key={m.label}
            label={m.label}
            value={m.value}
            hasDivider={i < metrics.length - 1}
          />
        ))}
      </div>

      {/* Body */}
      <div
        className="flex flex-col"
        style={{ padding: CARD_PADDING, gap: tokens.spacing.default }}
      >
        <SentimentBar {...sentiment} />
        <TrendingPost {...topPost} />
      </div>
    </div>
  )
}
