import { useState, useRef, useEffect } from 'react'
import { TrendingUp, ChevronDown, Check } from 'lucide-react'
import { tokens } from '../tokens'
import { TooltipIcon } from './TooltipIcon'
import { AllScrapedChart, type AllScrapedDataPoint } from './AllScrapedChart'

// ─── Types ────────────────────────────────────────────────────────────────────

type SentimentId = 'all' | 'positif' | 'netral' | 'negatif'

export interface TrendsMovementSectionProps {
  allScrapedData: AllScrapedDataPoint[]
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT        = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
const CARD_RADIUS = 10
const CARD_PADDING = tokens.spacing.xl  // 24px

const SENTIMENT_OPTIONS: { value: SentimentId; label: string }[] = [
  { value: 'all',     label: 'All Sentiment' },
  { value: 'positif', label: 'Positif'       },
  { value: 'netral',  label: 'Netral'        },
  { value: 'negatif', label: 'Negatif'       },
]

// ─── Sentiment dropdown ───────────────────────────────────────────────────────

function SentimentDropdown({
  value,
  onChange,
}: {
  value:    SentimentId
  onChange: (v: SentimentId) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const selected = SENTIMENT_OPTIONS.find(o => o.value === value)!

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          display:         'flex',
          flexDirection:   'row',
          alignItems:      'center',
          gap:             6,
          fontFamily:      FONT,
          fontSize:        tokens.typography.size['body-sm'],
          fontWeight:      tokens.typography.weight.medium,
          color:           tokens.color.text.secondary,
          backgroundColor: tokens.component.card.bg,
          border:          `1px solid ${tokens.color.border.secondary}`,
          borderRadius:    tokens.radius.default,
          paddingLeft:     tokens.spacing.md,
          paddingRight:    tokens.spacing.sm,
          height:          34,
          cursor:          'pointer',
          whiteSpace:      'nowrap',
        }}
      >
        {selected.label}
        <ChevronDown
          size={14}
          style={{
            color:     tokens.color.icon.secondary,
            transition: 'transform 150ms ease',
            transform:  open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          style={{
            position:        'absolute',
            top:             'calc(100% + 6px)',
            right:           0,
            zIndex:          50,
            backgroundColor: tokens.component.card.bg,
            border:          `1px solid ${tokens.color.border.secondary}`,
            borderRadius:    tokens.radius.lg,
            boxShadow:       '0 4px 16px rgba(0,0,0,0.10)',
            minWidth:        160,
            overflow:        'hidden',
          }}
        >
          {SENTIMENT_OPTIONS.map(opt => {
            const isActive = opt.value === value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false) }}
                style={{
                  display:         'flex',
                  flexDirection:   'row',
                  alignItems:      'center',
                  gap:             8,
                  width:           '100%',
                  fontFamily:      FONT,
                  fontSize:        tokens.typography.size['body-sm'],
                  fontWeight:      isActive ? tokens.typography.weight.semibold : tokens.typography.weight.regular,
                  color:           isActive ? tokens.color.text.primary : tokens.color.text.secondary,
                  backgroundColor: 'transparent',
                  border:          'none',
                  paddingLeft:     tokens.spacing.default,
                  paddingRight:    tokens.spacing.default,
                  paddingTop:      tokens.spacing.sm,
                  paddingBottom:   tokens.spacing.sm,
                  cursor:          'pointer',
                  textAlign:       'left',
                  transition:      'background-color 120ms ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = tokens.color.surface.secondary }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent' }}
              >
                {/* Checkmark — fixed width so text stays aligned */}
                <span style={{ width: 14, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  {isActive && <Check size={13} color={tokens.color.text.brand} />}
                </span>
                {opt.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function TrendsMovementSection({ allScrapedData }: TrendsMovementSectionProps) {
  const [sentiment, setSentiment] = useState<SentimentId>('all')

  // ── Derive chart data from selected sentiment ─────────────────────────
  const chartData = allScrapedData.map(pt => ({
    date:   pt.date,
    news:   sentiment === 'all'     ? pt.news
          : sentiment === 'positif' ? (pt.newsPositif  ?? 0)
          : sentiment === 'netral'  ? (pt.newsNetral   ?? 0)
          :                           (pt.newsNegatif  ?? 0),
    social: sentiment === 'all'     ? pt.social
          : sentiment === 'positif' ? (pt.socialPositif ?? 0)
          : sentiment === 'netral'  ? (pt.socialNetral  ?? 0)
          :                           (pt.socialNegatif ?? 0),
  }))

  return (
    <section
      className="flex flex-col w-full"
      style={{ gap: tokens.spacing.lg }}
      aria-labelledby="trends-heading"
    >
      {/* ── Section header ── */}
      <div className="flex flex-row items-center" style={{ gap: tokens.spacing.md }}>
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width:           32,
            height:          32,
            backgroundColor: tokens.color.surface.infoSubtle,
            borderRadius:    tokens.radius.lg,
            color:           tokens.color.icon.info,
          }}
          aria-hidden="true"
        >
          <TrendingUp size={16} />
        </div>
        <div className="flex flex-col flex-1" style={{ gap: 2 }}>
          <h2
            id="trends-heading"
            style={{
              fontFamily:  FONT,
              fontSize:    tokens.typography.size['heading-sm'],
              fontWeight:  tokens.typography.weight.bold,
              color:       tokens.color.text.primary,
              margin:      0,
              lineHeight:  tokens.typography.lineHeight.tight,
            }}
          >
            Trends &amp; Movement
          </h2>
          <p
            style={{
              fontFamily: FONT,
              fontSize:   tokens.typography.size['body-sm'],
              color:      tokens.color.text.tertiary,
              margin:     0,
            }}
          >
            Coverage volume and sentiment trends over time
          </p>
        </div>
        <TooltipIcon text="Volume of all scraped news and social media content over time." />
      </div>

      {/* ── Card shell ── */}
      <div
        className="flex flex-col"
        style={{
          backgroundColor: tokens.component.card.bg,
          border:          `1px solid ${tokens.component.card.border}`,
          borderRadius:    CARD_RADIUS,
          overflow:        'hidden',
        }}
      >
        {/* Card header: title + subtitle left, dropdown right */}
        <div
          className="flex flex-row items-center justify-between"
          style={{
            paddingLeft:   CARD_PADDING,
            paddingRight:  CARD_PADDING,
            paddingTop:    tokens.spacing.default,
            paddingBottom: tokens.spacing.default,
            borderBottom:  `1px solid ${tokens.color.border.secondary}`,
            gap:           tokens.spacing.md,
            flexShrink:    0,
          }}
        >
          <div className="flex flex-col" style={{ gap: 2 }}>
            <span
              style={{
                fontFamily:  FONT,
                fontSize:    tokens.typography.size['heading-sm'],
                fontWeight:  tokens.typography.weight.bold,
                color:       tokens.color.text.primary,
                lineHeight:  tokens.typography.lineHeight.tight,
              }}
            >
              All Scraped Data
            </span>
            <span
              style={{
                fontFamily: FONT,
                fontSize:   tokens.typography.size['body-sm'],
                color:      tokens.color.text.tertiary,
              }}
            >
              Volume of news and social media content over time — click point on chart to see details
            </span>
          </div>

          <SentimentDropdown value={sentiment} onChange={setSentiment} />
        </div>

        {/* Chart body */}
        <div style={{ padding: CARD_PADDING }}>
          <AllScrapedChart data={chartData} />
        </div>
      </div>
    </section>
  )
}
