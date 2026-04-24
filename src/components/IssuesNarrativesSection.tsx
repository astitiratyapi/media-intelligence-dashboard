import { CircleAlert } from 'lucide-react'
import { tokens } from '../tokens'
import { IssueHeatmap, type IssueHeatmapProps } from './IssueHeatmap'
import { NarrativeCards, type NarrativeCardsProps } from './NarrativeCards'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IssuesNarrativesSectionProps {
  heatmap: IssueHeatmapProps
  narratives: NarrativeCardsProps
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"

// ─── Component ────────────────────────────────────────────────────────────────

export function IssuesNarrativesSection({ heatmap, narratives }: IssuesNarrativesSectionProps) {
  return (
    <section
      className="flex flex-col w-full"
      style={{ gap: tokens.spacing.lg }}
      aria-labelledby="issues-narratives-heading"
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
          <CircleAlert size={16} />
        </div>
        <div className="flex flex-col" style={{ gap: 2 }}>
          <h2
            id="issues-narratives-heading"
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['heading-sm'],
              fontWeight: tokens.typography.weight.bold,
              color: tokens.color.text.primary,
              margin: 0,
              lineHeight: tokens.typography.lineHeight.tight,
            }}
          >
            Issues &amp; Narratives
          </h2>
          <p
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['body-sm'],
              color: tokens.color.text.tertiary,
              margin: 0,
            }}
          >
            What people are talking about — heatmap, ranking, and narrative frames
          </p>
        </div>
      </div>

      {/* Two-panel row: 50:50 */}
      <div
        className="flex flex-row items-stretch"
        style={{ gap: tokens.spacing.default }}
      >
        <IssueHeatmap {...heatmap} />
        <NarrativeCards {...narratives} />
      </div>
    </section>
  )
}
