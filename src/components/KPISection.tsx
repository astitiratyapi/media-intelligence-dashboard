import { BarChart2 } from 'lucide-react'
import { tokens } from '../tokens'
import { TotalMentionsCard, type TotalMentionsCardProps } from './kpi/TotalMentionsCard'
import { EstimatedReachCard, type EstimatedReachCardProps } from './kpi/EstimatedReachCard'
import { ShareOfVoiceCard, type ShareOfVoiceCardProps } from './kpi/ShareOfVoiceCard'
import { Tier1MentionsCard, type Tier1MentionsCardProps } from './kpi/Tier1MentionsCard'
import { TopIssueCard, type TopIssueCardProps } from './kpi/TopIssueCard'
import { TopRegionCard, type TopRegionCardProps } from './kpi/TopRegionCard'

// ─── Section icon badge ───────────────────────────────────────────────────────

function SectionIcon({ icon }: { icon: React.ReactNode }) {
  return (
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
      {icon}
    </div>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface KPISectionProps {
  totalMentions:      TotalMentionsCardProps
  estimatedReach:     EstimatedReachCardProps
  shareOfVoice:       ShareOfVoiceCardProps        // news — top media outlets
  shareOfVoiceSocial: ShareOfVoiceCardProps        // social — top accounts
  tier1Mentions:      Tier1MentionsCardProps       // news only — Tier-1 outlet count
  topIssue:           TopIssueCardProps
  topRegion:          TopRegionCardProps
  selectedSource:     'news' | 'social'
}

// ─── Component ────────────────────────────────────────────────────────────────

export function KPISection({
  totalMentions,
  estimatedReach,
  shareOfVoice,
  shareOfVoiceSocial,
  tier1Mentions,
  topIssue,
  topRegion,
  selectedSource,
}: KPISectionProps) {
  const isNews = selectedSource === 'news'

  // ── Card arrays (5 cards each mode) ───────────────────────────────────────
  const newsCards = [
    { key: 'total',  node: <TotalMentionsCard  {...totalMentions}                      /> },
    { key: 'sov',    node: <ShareOfVoiceCard   {...shareOfVoice}   source="news"       /> },
    { key: 'tier1',  node: <Tier1MentionsCard  {...tier1Mentions}                      /> },
    { key: 'issue',  node: <TopIssueCard       {...topIssue}                           /> },
    { key: 'region', node: <TopRegionCard      {...topRegion}                          /> },
  ]

  const socialCards = [
    { key: 'total',  node: <TotalMentionsCard  {...totalMentions}                      /> },
    { key: 'reach',  node: <EstimatedReachCard {...estimatedReach}                     /> },
    { key: 'sov',    node: <ShareOfVoiceCard   {...shareOfVoiceSocial} source="social" /> },
    { key: 'region', node: <TopRegionCard      {...topRegion}                          /> },
  ]

  const cards = isNews ? newsCards : socialCards

  return (
    <section
      className="flex flex-col w-full"
      style={{ gap: tokens.spacing.lg }}
      aria-labelledby="kpi-section-heading"
    >
      {/* Section header */}
      <div className="flex flex-row items-center" style={{ gap: tokens.spacing.md }}>
        <SectionIcon icon={<BarChart2 size={16} />} />
        <div className="flex flex-col" style={{ gap: 2 }}>
          <h2
            id="kpi-section-heading"
            className="font-bold"
            style={{
              fontSize: tokens.typography.size['heading-sm'],
              lineHeight: tokens.typography.lineHeight.tight,
              color: tokens.color.text.primary,
            }}
          >
            Key Performance Indicators
          </h2>
          <p
            style={{
              fontSize: tokens.typography.size['body-sm'],
              color: tokens.color.text.tertiary,
            }}
          >
            Operational metrics for the selected period
          </p>
        </div>
      </div>

      {/* Card row
          News   (5): Total Mentions | Share of Voice | Tier-1 Mentions | Top Issue | Top Region
          Social (4): Total Mentions | Estimated Reach | Share of Voice | Top Region */}
      <div
        key={selectedSource}
        className="flex flex-row items-stretch"
        style={{
          gap: tokens.spacing.default,
          animation: 'fadeIn 200ms ease',
        }}
      >
        {cards.map(({ key, node }) => (
          <div key={key} className="flex-1 min-w-0" style={{ display: 'flex' }}>
            {node}
          </div>
        ))}
      </div>
    </section>
  )
}
