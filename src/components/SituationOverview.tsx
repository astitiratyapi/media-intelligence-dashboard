import { Eye } from 'lucide-react'
import { tokens } from '../tokens'
import { ReputationHealthCard, type ReputationHealthProps } from './ReputationHealthCard'
import { RiskLevelCard, type RiskLevelProps } from './RiskLevelCard'
import { ActorsCard, type ActorsCardProps } from './ActorsCard'

// ─── Section icon badge ───────────────────────────────────────────────────────
// Resizing: fixed 32×32 (hug content), rounded-token-md
// Auto Layout: flex, items-center, justify-center, bg = surface/info-subtle

function SectionIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{
        width: 32,
        height: 32,
        backgroundColor: tokens.color.surface.infoSubtle,
        borderRadius: tokens.radius.lg,         // border/radius/lg = 12px
        color: tokens.color.icon.info,
      }}
      aria-hidden="true"
    >
      {icon}
    </div>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface SituationOverviewProps {
  reputationHealth: ReputationHealthProps
  riskLevel: RiskLevelProps
  actors: ActorsCardProps
}

// ─── Component ────────────────────────────────────────────────────────────────
// Resizing: fill container horizontally (w-full), hug content vertically
// Auto Layout: flex-col, gap = spacing/lg (20px)

export function SituationOverview({ reputationHealth, riskLevel, actors }: SituationOverviewProps) {
  return (
    // Section container: flex-col, gap/lg
    <section
      className="flex flex-col w-full"
      style={{ gap: tokens.spacing.md }}
      aria-labelledby="situation-overview-heading"
    >
      {/* Section header: flex-row, gap/sm, align-center */}
      <div
        className="flex flex-row items-center gap-3"
        style={{ gap: tokens.spacing.md }}
      >
        <SectionIcon icon={<Eye size={16} />} />

        {/* Section title + subtitle: flex-col, gap/xs */}
        <div className="flex flex-col gap-0.5">
          <h2
            id="situation-overview-heading"
            className="font-bold"
            style={{
              fontSize: tokens.typography.size['heading-sm'],
              lineHeight: tokens.typography.lineHeight.tight,
              color: tokens.color.text.primary,
            }}
          >
            Situation Overview
          </h2>
          <p
            style={{
              fontSize: tokens.typography.size['body-sm'],
              color: tokens.color.text.tertiary,
            }}
          >
            Executive snapshot of reputation health and risk
          </p>
        </div>
      </div>

      {/* Cards row: flex-row, gap/default (16px), equal-width children */}
      {/* Each card has flex-1 — fills available width equally (Figma: fill container) */}
      <div
        className="flex flex-row items-stretch"
        style={{ gap: tokens.spacing.md }}
      >
        <ReputationHealthCard {...reputationHealth} />
        <RiskLevelCard {...riskLevel} />
        <ActorsCard {...actors} />
      </div>
    </section>
  )
}
