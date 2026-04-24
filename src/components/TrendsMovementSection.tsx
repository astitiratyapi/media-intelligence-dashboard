import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { tokens } from '../tokens'
import { AllScrapedChart, type AllScrapedDataPoint } from './AllScrapedChart'
import { CoverageTrendChart, type DataPoint as CoveragePoint } from './CoverageTrendChart'
import { NegativeTrendChart, type DataPoint as NegativePoint } from './NegativeTrendChart'

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = 'all' | 'coverage' | 'negative'

export interface TrendsMovementSectionProps {
  allScrapedData: AllScrapedDataPoint[]
  coverageData: CoveragePoint[]
  negativeData: NegativePoint[]
  coveragePeriod?: string
  onNegativeSpikeClick?: (point: NegativePoint) => void
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
const CARD_RADIUS = 10
const CARD_PADDING = tokens.spacing.xl  // 24px

const TABS: { id: TabId; label: string }[] = [
  { id: 'all',      label: 'All Scraped Data'  },
  { id: 'coverage', label: 'Coverage Trend'    },
  { id: 'negative', label: 'Negative Trend'    },
]

// ─── Tab bar ──────────────────────────────────────────────────────────────────

function TabBar({ active, onChange }: { active: TabId; onChange: (id: TabId) => void }) {
  return (
    <div
      className="flex flex-row items-center"
      style={{ borderBottom: `1px solid ${tokens.color.border.secondary}` }}
    >
      {TABS.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['body-sm'],
              fontWeight: isActive ? tokens.typography.weight.bold : tokens.typography.weight.medium,
              color: isActive ? tokens.color.text.brand : tokens.color.text.secondary,
              background: 'none',
              border: 'none',
              borderBottom: isActive
                ? `2px solid ${tokens.color.surface.brand}`
                : '2px solid transparent',
              marginBottom: -1,
              paddingLeft: tokens.spacing.md,
              paddingRight: tokens.spacing.md,
              paddingTop: tokens.spacing.default,
              paddingBottom: tokens.spacing.default,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'color 150ms ease',
            }}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function TrendsMovementSection({
  allScrapedData,
  coverageData,
  negativeData,
  coveragePeriod,
  onNegativeSpikeClick,
}: TrendsMovementSectionProps) {
  const [activeTab, setActiveTab] = useState<TabId>('all')

  return (
    <section
      className="flex flex-col w-full"
      style={{ gap: tokens.spacing.lg }}
      aria-labelledby="trends-heading"
    >
      {/* Section header */}
      <div className="flex flex-row items-center" style={{ gap: tokens.spacing.md }}>
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 32,
            height: 32,
            backgroundColor: tokens.color.surface.infoSubtle,
            borderRadius: tokens.radius.lg,
            color: tokens.color.icon.info,
          }}
          aria-hidden="true"
        >
          <TrendingUp size={16} />
        </div>
        <div className="flex flex-col" style={{ gap: 2 }}>
          <h2
            id="trends-heading"
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['heading-sm'],
              fontWeight: tokens.typography.weight.bold,
              color: tokens.color.text.primary,
              margin: 0,
              lineHeight: tokens.typography.lineHeight.tight,
            }}
          >
            Trends &amp; Movement
          </h2>
          <p
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['body-sm'],
              color: tokens.color.text.tertiary,
              margin: 0,
            }}
          >
            Coverage volume and negative mention trends over time
          </p>
        </div>
      </div>

      {/* Card shell */}
      <div
        className="flex flex-col"
        style={{
          backgroundColor: tokens.component.card.bg,
          border: `1px solid ${tokens.component.card.border}`,
          borderRadius: CARD_RADIUS,
          overflow: 'hidden',
        }}
      >
        {/* Tab bar */}
        <div style={{ paddingLeft: tokens.spacing.sm, paddingRight: tokens.spacing.sm }}>
          <TabBar active={activeTab} onChange={setActiveTab} />
        </div>

        {/* Chart body */}
        <div style={{ padding: CARD_PADDING }}>
          {activeTab === 'all' && (
            <AllScrapedChart data={allScrapedData} />
          )}
          {activeTab === 'coverage' && (
            <CoverageTrendChart data={coverageData} period={coveragePeriod} />
          )}
          {activeTab === 'negative' && (
            <NegativeTrendChart data={negativeData} onSpikeClick={onNegativeSpikeClick} />
          )}
        </div>
      </div>
    </section>
  )
}
