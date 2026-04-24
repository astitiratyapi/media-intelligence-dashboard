import { useState } from 'react'
import { FileSearch, Newspaper, MessageCircle, ChevronDown } from 'lucide-react'
import { tokens, foundation } from '../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

export type SourceType  = 'NEWS' | 'SOCIAL'
export type SentimentId = 'all' | 'positive' | 'neutral' | 'negative'
export type TierId      = 'all' | 'tier1' | 'tier2' | 'tier3' | 'notier'

export interface EvidenceItem {
  title:      string
  source:     string
  sourceType: SourceType
  tier:       'Tier 1' | 'Tier 2' | 'Tier 3' | 'No Tier'
  sentiment:  'positive' | 'neutral' | 'negative'
  date:       string
}

export interface EvidenceSectionProps {
  items: EvidenceItem[]
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"

const SENTIMENT_STYLE = {
  positive: { bg: foundation.color.green[50],  text: foundation.color.green[700],  label: 'Positive' },
  neutral:  { bg: foundation.color.neutral[100], text: foundation.color.neutral[700], label: 'Neutral'  },
  negative: { bg: foundation.color.red[50],    text: foundation.color.red[600],    label: 'Negative' },
}

const TIER_MAP: Record<string, TierId> = {
  'Tier 1': 'tier1', 'Tier 2': 'tier2', 'Tier 3': 'tier3', 'No Tier': 'notier',
}

// ─── Styled select ────────────────────────────────────────────────────────────

function FilterSelect({
  value, onChange, options,
}: {
  value: string
  onChange: (v: string) => void
  options: { label: string; value: string }[]
}) {
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          fontFamily: FONT,
          fontSize: tokens.typography.size['label-xs'],
          fontWeight: tokens.typography.weight.medium,
          color: tokens.color.text.secondary,
          backgroundColor: tokens.component.card.bg,
          border: `1px solid ${tokens.color.border.primary}`,
          borderRadius: tokens.radius.default,
          paddingLeft: tokens.spacing.sm,
          paddingRight: 28,
          paddingTop: 5,
          paddingBottom: 5,
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown
        size={12}
        color={tokens.color.icon.secondary}
        style={{ position: 'absolute', right: 8, pointerEvents: 'none' }}
      />
    </div>
  )
}

// ─── Tier pill ────────────────────────────────────────────────────────────────

function TierPill({ tier }: { tier: string }) {
  const isNoTier = tier === 'No Tier'
  return (
    <span
      style={{
        fontFamily: FONT,
        fontSize: tokens.typography.size['label-xs'],
        fontWeight: tokens.typography.weight.medium,
        color: isNoTier ? tokens.color.text.tertiary : tokens.color.text.brand,
        backgroundColor: isNoTier ? tokens.color.surface.tertiary : tokens.color.surface.infoSubtle,
        borderRadius: tokens.radius.full,
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 1,
        paddingBottom: 1,
        whiteSpace: 'nowrap' as const,
      }}
    >
      {tier}
    </span>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EvidenceSection({ items }: EvidenceSectionProps) {
  const [sourceTab,  setSourceTab]  = useState<SourceType>('NEWS')
  const [sentiment,  setSentiment]  = useState<SentimentId>('all')
  const [tier,       setTier]       = useState<TierId>('all')

  const filtered = items.filter((item) => {
    if (item.sourceType !== sourceTab) return false
    if (sentiment !== 'all' && item.sentiment !== sentiment) return false
    if (tier !== 'all' && TIER_MAP[item.tier] !== tier) return false
    return true
  })

  return (
    <div
      className="flex flex-col flex-1"
      style={{
        backgroundColor: tokens.component.card.bg,
        border: `1px solid ${tokens.component.card.border}`,
        borderRadius: 10,
        minWidth: 0,
        overflow: 'hidden',
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
          style={{ width: 32, height: 32, backgroundColor: tokens.color.surface.infoSubtle, borderRadius: tokens.radius.lg, color: tokens.color.icon.info }}
        >
          <FileSearch size={16} />
        </div>
        <div className="flex flex-col" style={{ gap: 2, flex: 1, minWidth: 0 }}>
          <span style={{ fontFamily: FONT, fontSize: tokens.typography.size['body-md'], fontWeight: tokens.typography.weight.bold, color: tokens.color.text.primary }}>
            Evidence &amp; What to Read
          </span>
          <span style={{ fontFamily: FONT, fontSize: tokens.typography.size['label-xs'], color: tokens.color.text.tertiary }}>
            Top impact stories and latest mentions
          </span>
        </div>
      </div>

      {/* Filter bar */}
      <div
        className="flex flex-row items-center flex-wrap"
        style={{
          paddingLeft: tokens.spacing.xl,
          paddingRight: tokens.spacing.xl,
          paddingTop: tokens.spacing.sm,
          paddingBottom: tokens.spacing.sm,
          borderBottom: `1px solid ${tokens.color.border.secondary}`,
          gap: tokens.spacing.sm,
          flexShrink: 0,
        }}
      >
        {/* News / Social toggle */}
        <div
          className="flex flex-row"
          style={{
            backgroundColor: tokens.color.surface.tertiary,
            borderRadius: tokens.radius.default,
            padding: 3,
            gap: 2,
          }}
        >
          {([
            { id: 'NEWS'   as SourceType, label: 'News',   Icon: Newspaper     },
            { id: 'SOCIAL' as SourceType, label: 'Social', Icon: MessageCircle },
          ] as const).map(({ id, label, Icon }) => {
            const isActive = sourceTab === id
            return (
              <button
                key={id}
                onClick={() => setSourceTab(id)}
                className="flex flex-row items-center"
                style={{
                  fontFamily: FONT,
                  fontSize: tokens.typography.size['label-xs'],
                  fontWeight: tokens.typography.weight.medium,
                  color: isActive ? tokens.color.text.primary : tokens.color.text.tertiary,
                  backgroundColor: isActive ? tokens.component.card.bg : 'transparent',
                  border: 'none',
                  borderRadius: tokens.radius.sm,
                  paddingLeft: tokens.spacing.sm,
                  paddingRight: tokens.spacing.sm,
                  paddingTop: 4,
                  paddingBottom: 4,
                  gap: 4,
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 150ms ease',
                }}
              >
                <Icon size={12} />
                {label}
              </button>
            )
          })}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Sentiment dropdown */}
        <FilterSelect
          value={sentiment}
          onChange={(v) => setSentiment(v as SentimentId)}
          options={[
            { label: 'All Sentiment', value: 'all'      },
            { label: 'Positive',      value: 'positive' },
            { label: 'Neutral',       value: 'neutral'  },
            { label: 'Negative',      value: 'negative' },
          ]}
        />

        {/* Tier dropdown */}
        <FilterSelect
          value={tier}
          onChange={(v) => setTier(v as TierId)}
          options={[
            { label: 'All Tiers', value: 'all'    },
            { label: 'Tier 1',    value: 'tier1'  },
            { label: 'Tier 2',    value: 'tier2'  },
            { label: 'Tier 3',    value: 'tier3'  },
            { label: 'No Tier',   value: 'notier' },
          ]}
        />
      </div>

      {/* Table header */}
      <div
        className="flex flex-row"
        style={{
          paddingLeft: tokens.spacing.xl,
          paddingRight: tokens.spacing.xl,
          paddingTop: tokens.spacing.sm,
          paddingBottom: tokens.spacing.sm,
          borderBottom: `1px solid ${tokens.color.border.secondary}`,
          flexShrink: 0,
          gap: tokens.spacing.sm,
        }}
      >
        {['Title / Content', 'Source / Author', 'Sentiment', 'Date'].map((h, i) => (
          <span
            key={h}
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['label-xs'],
              fontWeight: tokens.typography.weight.semibold,
              color: tokens.color.text.tertiary,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              flex: i === 0 ? 3 : i === 1 ? 2 : 1,
              textAlign: i === 3 ? 'right' : 'left',
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Scrollable rows */}
      <div style={{ overflowY: 'auto', flex: 1, minHeight: 0 }}>
        {filtered.length === 0 ? (
          <div style={{ padding: tokens.spacing.xl, textAlign: 'center' }}>
            <span style={{ fontFamily: FONT, fontSize: tokens.typography.size['body-sm'], color: tokens.color.text.tertiary }}>
              No items match the selected filters.
            </span>
          </div>
        ) : (
          filtered.map((item, i) => {
            const s = SENTIMENT_STYLE[item.sentiment]
            return (
              <div
                key={i}
                className="flex flex-row items-center"
                style={{
                  paddingLeft: tokens.spacing.xl,
                  paddingRight: tokens.spacing.xl,
                  paddingTop: tokens.spacing.sm,
                  paddingBottom: tokens.spacing.sm,
                  borderBottom: `1px solid ${tokens.color.border.secondary}`,
                  gap: tokens.spacing.sm,
                  transition: 'background-color 150ms ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = tokens.color.surface.secondary }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent' }}
              >
                {/* Title */}
                <span
                  style={{
                    flex: 3,
                    fontFamily: FONT,
                    fontSize: tokens.typography.size['body-sm'],
                    color: tokens.color.text.primary,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: tokens.typography.lineHeight.normal,
                  } as React.CSSProperties}
                >
                  {item.title}
                </span>

                {/* Source */}
                <div className="flex flex-col" style={{ flex: 2, gap: 4, minWidth: 0 }}>
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: tokens.typography.size['label-xs'],
                      color: tokens.color.text.brand,
                      fontWeight: tokens.typography.weight.medium,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.source}
                  </span>
                  <div className="flex flex-row items-center" style={{ gap: 4, flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontFamily: FONT,
                        fontSize: tokens.typography.size['label-xs'],
                        fontWeight: tokens.typography.weight.medium,
                        color: tokens.color.text.secondary,
                        backgroundColor: tokens.color.surface.tertiary,
                        borderRadius: tokens.radius.full,
                        paddingLeft: 6,
                        paddingRight: 6,
                        paddingTop: 1,
                        paddingBottom: 1,
                      }}
                    >
                      {item.sourceType}
                    </span>
                    <TierPill tier={item.tier} />
                  </div>
                </div>

                {/* Sentiment */}
                <div style={{ flex: 1 }}>
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
                      display: 'inline-block',
                    }}
                  >
                    {s.label}
                  </span>
                </div>

                {/* Date */}
                <span
                  style={{
                    flex: 1,
                    fontFamily: FONT,
                    fontSize: tokens.typography.size['label-xs'],
                    color: tokens.color.text.tertiary,
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.date}
                </span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
