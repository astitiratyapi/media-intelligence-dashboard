import { useState } from 'react'
import { BarChart2, Newspaper, MessageCircle } from 'lucide-react'
import { tokens, foundation } from '../tokens'
import { TooltipIcon } from './TooltipIcon'
import { TierDetailModal, type TierDetailItem } from './TierDetailModal'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DistributionSubItem {
  label: string
  value: number
}

export interface DistributionCategory {
  label: string
  icon: 'newspaper' | 'chat'
  value: number
  subItems: DistributionSubItem[]
}

export interface DataDistributionSectionProps {
  total: number
  totalLabel?: string
  categories: DistributionCategory[]
}

// ─── Internal constants ───────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
const CARD_RADIUS = 10
const CARD_PADDING = tokens.spacing.xl

const BAR_COLORS = {
  total:    foundation.color.brand.polynesianBlue[800],  // #004990
  category: foundation.color.brand.pictonBlue[500],     // #1BA8DF
  sub:      foundation.color.brand.pictonBlue[200],     // #BEE7F9
}
const BAR_BG = tokens.color.border.secondary

// ─── Detail data (per tier / platform) ───────────────────────────────────────

const tier1Data: TierDetailItem[] = [
  { name: 'Kompas.com',       scope: 'Nasional · Online', mentions: 82 },
  { name: 'Detik.com',        scope: 'Nasional · Online', mentions: 68 },
  { name: 'Tempo.co',         scope: 'Nasional · Online', mentions: 54 },
  { name: 'CNN Indonesia',    scope: 'Nasional · Online', mentions: 43 },
  { name: 'Republika.co.id',  scope: 'Nasional · Online', mentions: 34 },
  { name: 'CNBC Indonesia',   scope: 'Nasional · Online', mentions: 28 },
  { name: 'Antara',           scope: 'Nasional · Online', mentions: 26 },
  { name: 'Bisnis Indonesia', scope: 'Nasional · Online', mentions: 24 },
]

const tier2Data: TierDetailItem[] = [
  { name: 'Kumparan',   scope: 'Nasional · Online', mentions: 45 },
  { name: 'Okezone',    scope: 'Nasional · Online', mentions: 38 },
  { name: 'Tribunnews', scope: 'Nasional · Online', mentions: 32 },
  { name: 'Liputan6',   scope: 'Nasional · Online', mentions: 28 },
  { name: 'Merdeka',    scope: 'Nasional · Online', mentions: 22 },
  { name: 'Sindonews',  scope: 'Nasional · Online', mentions: 16 },
  { name: 'Viva',       scope: 'Nasional · Online', mentions: 11 },
]

const tier3Data: TierDetailItem[] = [
  { name: 'Radar Bogor', scope: 'Regional · Online', mentions: 0 },
  { name: 'Pos Kota',    scope: 'Regional · Online', mentions: 0 },
]

const instagramData: TierDetailItem[] = [
  { name: '@badangizinasional.ri', scope: 'Instagram · Official',  mentions: 98 },
  { name: '@bgn.official',         scope: 'Instagram · Official',  mentions: 62 },
  { name: '@giziindonesia',        scope: 'Instagram · Community', mentions: 28 },
  { name: '@kemenkesri',           scope: 'Instagram · Official',  mentions: 19 },
]

const youtubeData: TierDetailItem[] = [
  { name: 'Kompas TV',     scope: 'YouTube · Media', mentions: 42 },
  { name: 'CNN Indonesia', scope: 'YouTube · Media', mentions: 35 },
  { name: 'Narasi TV',     scope: 'YouTube · Media', mentions: 18 },
  { name: 'tvOne',         scope: 'YouTube · Media', mentions:  9 },
]

const tiktokData: TierDetailItem[] = [
  { name: '@bgn_official',  scope: 'TikTok · Official',  mentions: 51 },
  { name: '@makanbergizi',  scope: 'TikTok · Community', mentions: 28 },
  { name: '@kemenkes_ri',   scope: 'TikTok · Official',  mentions: 18 },
]

const facebookData: TierDetailItem[] = [
  { name: 'Badan Gizi Nasional', scope: 'Facebook · Official', mentions: 10 },
  { name: 'Kemenkes RI',         scope: 'Facebook · Official', mentions:  5 },
]

// Map sub-item labels → detail data
const DETAIL_MAP: Record<string, { data: TierDetailItem[]; title: string }> = {
  'Tier 1':    { data: tier1Data,     title: 'Media Tier 1 — 359 mention'  },
  'Tier 2':    { data: tier2Data,     title: 'Media Tier 2 — 192 mention'  },
  'Tier 3':    { data: tier3Data,     title: 'Media Tier 3 — 0 mention'    },
  'Instagram': { data: instagramData, title: 'Instagram — 207 mention'     },
  'YouTube':   { data: youtubeData,   title: 'YouTube — 104 mention'       },
  'TikTok':    { data: tiktokData,    title: 'TikTok — 97 mention'         },
  'Facebook':  { data: facebookData,  title: 'Facebook — 15 mention'       },
}

// ─── Bar row ──────────────────────────────────────────────────────────────────

function BarRow({
  label,
  value,
  maxValue,
  barColor,
  icon,
  indent = 0,
  bold = false,
  onDetailClick,
}: {
  label:          string
  value:          number
  maxValue:       number
  barColor:       string
  icon?:          React.ReactNode
  indent?:        number
  bold?:          boolean
  onDetailClick?: () => void
}) {
  const pct = maxValue > 0 ? Math.min((value / maxValue) * 100, 100) : 0

  return (
    <div
      className="flex flex-row items-center"
      style={{
        gap: tokens.spacing.sm,
        paddingLeft: indent,
        minWidth: 0,
      }}
    >
      {/* Label + optional "Lihat Detail" button */}
      <div
        className="flex flex-row items-center flex-shrink-0"
        style={{ gap: 4, width: 130 }}
      >
        {icon && <span style={{ color: BAR_COLORS.category, display: 'flex' }}>{icon}</span>}
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['body-sm'],
            fontWeight: bold ? tokens.typography.weight.semibold : tokens.typography.weight.regular,
            color: icon ? BAR_COLORS.category : tokens.color.text.secondary,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {label}
        </span>

        {onDetailClick && (
          <button
            type="button"
            onClick={onDetailClick}
            style={{
              fontFamily:     FONT,
              fontSize:       tokens.typography.size['label-xs'],
              color:          tokens.color.text.brand,
              background:     'none',
              border:         'none',
              padding:        0,
              cursor:         'pointer',
              textDecoration: 'underline',
              textUnderlineOffset: 2,
              whiteSpace:     'nowrap',
              flexShrink:     0,
              opacity:        1,
              transition:     'opacity 120ms ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.65' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
          >
            See Detail
          </button>
        )}
      </div>

      {/* Bar track */}
      <div
        className="flex-1"
        style={{
          height: 8,
          backgroundColor: BAR_BG,
          borderRadius: tokens.radius.full,
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            backgroundColor: barColor,
            borderRadius: tokens.radius.full,
            transition: 'width 400ms ease',
          }}
        />
      </div>

      {/* Value */}
      <span
        className="flex-shrink-0"
        style={{
          fontFamily: FONT,
          fontSize: tokens.typography.size['body-sm'],
          fontWeight: bold ? tokens.typography.weight.bold : tokens.typography.weight.regular,
          color: bold ? tokens.color.text.primary : tokens.color.text.secondary,
          width: 36,
          textAlign: 'right',
        }}
      >
        {value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value}
      </span>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function DataDistributionSection({ total, totalLabel = 'Total Mention', categories }: DataDistributionSectionProps) {
  const ICON_MAP = {
    newspaper: <Newspaper size={13} />,
    chat: <MessageCircle size={13} />,
  }

  // Modal state: null = closed, otherwise holds the active detail
  const [modal, setModal] = useState<{ title: string; items: TierDetailItem[] } | null>(null)

  return (
    <>
      <div
        className="flex flex-col"
        style={{
          backgroundColor: tokens.component.card.bg,
          border: `1px solid ${tokens.component.card.border}`,
          borderRadius: CARD_RADIUS,
          minWidth: 0,
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          className="flex flex-row items-center"
          style={{
            paddingLeft: CARD_PADDING,
            paddingRight: CARD_PADDING,
            paddingTop: tokens.spacing.default,
            paddingBottom: tokens.spacing.default,
            borderBottom: `1px solid ${tokens.color.border.secondary}`,
            gap: tokens.spacing.sm,
            flexShrink: 0,
          }}
        >
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: 32,
              height: 32,
              backgroundColor: tokens.color.surface.infoSubtle,
              borderRadius: tokens.radius.lg,
              color: tokens.color.icon.info,
            }}
          >
            <BarChart2 size={16} />
          </div>
          <span
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['heading-sm'],
              fontWeight: tokens.typography.weight.bold,
              color: tokens.color.text.primary,
            }}
          >
            Data Distribution
          </span>
          <TooltipIcon text="Breakdown of mentions by media type, tier, and social media platform." />
        </div>

        {/* Chart body */}
        <div
          className="flex flex-col"
          style={{
            padding: CARD_PADDING,
            gap: tokens.spacing.sm,
            flex: 1,
          }}
        >
          {/* Total row */}
          <BarRow
            label={totalLabel}
            value={total}
            maxValue={total}
            barColor={BAR_COLORS.total}
            bold
          />

          {/* Category rows */}
          {categories.map((cat) => (
            <div key={cat.label} className="flex flex-col" style={{ gap: tokens.spacing.xs }}>
              {/* Separator before category */}
              <div style={{ height: 1, backgroundColor: tokens.color.border.secondary, marginTop: 2, marginBottom: 2 }} />

              {/* Category row */}
              <BarRow
                label={cat.label}
                value={cat.value}
                maxValue={total}
                barColor={BAR_COLORS.category}
                icon={ICON_MAP[cat.icon]}
                indent={12}
              />

              {/* Sub-item rows */}
              {cat.subItems.map((sub) => {
                const detail = DETAIL_MAP[sub.label]
                return (
                  <BarRow
                    key={sub.label}
                    label={sub.label}
                    value={sub.value}
                    maxValue={total}
                    barColor={BAR_COLORS.sub}
                    indent={28}
                    onDetailClick={detail ? () => setModal({ title: detail.title, items: detail.data }) : undefined}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Modal — rendered outside the card so it can escape overflow:hidden */}
      {modal && (
        <TierDetailModal
          title={modal.title}
          items={modal.items}
          onClose={() => setModal(null)}
        />
      )}
    </>
  )
}
