import { BarChart2 } from 'lucide-react'
import { tokens } from '../tokens'
import { TotalMentionsCard, type TotalMentionsCardProps } from './kpi/TotalMentionsCard'
import { EstimatedReachCard, type EstimatedReachCardProps } from './kpi/EstimatedReachCard'
import { ShareOfVoiceCard, type ShareOfVoiceCardProps } from './kpi/ShareOfVoiceCard'
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
  totalMentions: TotalMentionsCardProps
  estimatedReach: EstimatedReachCardProps
  shareOfVoice: ShareOfVoiceCardProps
  topIssue: TopIssueCardProps
  topRegion: TopRegionCardProps
}

// ─── Component ────────────────────────────────────────────────────────────────

export function KPISection({
  totalMentions,
  estimatedReach,
  shareOfVoice,
  topIssue,
  topRegion,
}: KPISectionProps) {
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

      {/* Single row — all 5 cards, equal width */}
      <div className="flex flex-row items-stretch" style={{ gap: tokens.spacing.default }}>
        <TotalMentionsCard  {...totalMentions}  />
        <EstimatedReachCard {...estimatedReach} />
        <ShareOfVoiceCard   {...shareOfVoice}   />
        <TopIssueCard       {...topIssue}        />
        <TopRegionCard      {...topRegion}       />
      </div>
    </section>
  )
}
