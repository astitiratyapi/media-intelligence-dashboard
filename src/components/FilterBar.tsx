import { Filter, Calendar, Hash, Globe, SlidersHorizontal, ChevronDown, Sparkles } from 'lucide-react'
import { tokens, foundation } from '../tokens'
import { ExportButton, type ExportButtonProps } from './ExportButton'

// ─── Dropdown filter pill ─────────────────────────────────────────────────────
// Resizing: hug content, inline-flex
// Auto Layout: flex-row, gap/xs, padding from input tokens

interface FilterPillProps {
  icon: React.ReactNode
  label: string
  value: string
  onChange?: (value: string) => void
}

function FilterPill({ icon, label, value, onChange }: FilterPillProps) {
  return (
    // Pill: flex-row, gap/xs, hug content, input-height, border, radius/default
    <button
      type="button"
      aria-label={`${label}: ${value}`}
      className="flex flex-row items-center gap-1.5 hover:border-edge-secondary transition-colors"
      style={{
        height: tokens.component.input.height,
        paddingLeft: tokens.component.input.paddingX,
        paddingRight: tokens.component.input.paddingX,
        backgroundColor: tokens.component.input.bg,
        border: `${foundation.borderWidth.sm}px solid ${tokens.component.input.border}`,
        borderRadius: tokens.component.input.radius,
        cursor: 'pointer',
        gap: tokens.spacing.xs,
        flexShrink: 0,
      }}
      onClick={() => onChange?.(value)}
    >
      {/* Icon: secondary icon color */}
      <span style={{ color: tokens.color.icon.secondary, display: 'flex', alignItems: 'center' }}>
        {icon}
      </span>

      {/* Value label: body-base, primary text */}
      <span
        style={{
          fontSize: tokens.typography.size['body-base'],
          color: tokens.color.text.primary,
          fontWeight: tokens.typography.weight.regular,
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </span>

      {/* Chevron: tertiary icon */}
      <ChevronDown
        size={14}
        style={{ color: tokens.color.icon.secondary, flexShrink: 0 }}
        aria-hidden="true"
      />
    </button>
  )
}

// ─── Primary action button ────────────────────────────────────────────────────
// Resizing: hug content, flex-row
// Auto Layout: flex-row, gap/xs, brand bg, height from button tokens

interface PrimaryButtonProps {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
}

function PrimaryButton({ label, icon, onClick }: PrimaryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-row items-center gap-2 flex-shrink-0 transition-colors"
      style={{
        height: tokens.component.button.primary.height,
        paddingLeft: tokens.component.button.primary.paddingX,
        paddingRight: tokens.component.button.primary.paddingX,
        backgroundColor: tokens.component.button.primary.bg,
        color: tokens.component.button.primary.text,
        borderRadius: tokens.component.button.primary.radius,
        fontSize: tokens.component.button.primary.fontSize,
        fontWeight: tokens.component.button.primary.fontWeight,
        border: 'none',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
          tokens.component.button.primary.bgHover
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
          tokens.component.button.primary.bg
      }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {label}
    </button>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface FilterBarProps extends ExportButtonProps {
  timeRange: string
  topic: string
  source: string
  keyword: string
  onTimeRangeChange?: (v: string) => void
  onTopicChange?: (v: string) => void
  onSourceChange?: (v: string) => void
  onKeywordChange?: (v: string) => void
  onGenerateNarrative?: () => void
}

// ─── Component ────────────────────────────────────────────────────────────────
// Resizing: fill container horizontally (w-full), hug content vertically
// Auto Layout: flex-row, items-center, gap/md, space-between
// Background: surface/primary (white), border-bottom: edge/secondary

export function FilterBar({
  timeRange,
  topic,
  source,
  keyword,
  onTimeRangeChange,
  onTopicChange,
  onSourceChange,
  onKeywordChange,
  onGenerateNarrative,
  onDownloadDailyBriefPDF,
  onDownloadMonthlyPDF,
  onDownloadMonthlyPPTX,
}: FilterBarProps) {
  return (
    // Filter bar: flex-row, wrap, gap/sm, fill width, padding/default
    <div
      className="w-full flex flex-row flex-wrap items-center gap-3"
      style={{
        paddingTop: tokens.spacing.md,
        paddingBottom: tokens.spacing.md,
        paddingLeft: tokens.spacing.xl,
        paddingRight: tokens.spacing.xl,
        backgroundColor: tokens.color.surface.primary,
        borderBottom: `${foundation.borderWidth.sm}px solid ${tokens.color.border.secondary}`,
      }}
    >
      {/* Left: filters group — flex-row, gap/sm, wrap */}
      <div className="flex flex-row flex-wrap items-center gap-2 flex-1 min-w-0">
        {/* Filters label: flex-row, gap/xs */}
        <div
          className="flex flex-row items-center gap-1.5 flex-shrink-0"
          style={{
            fontSize: tokens.typography.size['body-sm'],
            fontWeight: tokens.typography.weight.semibold,
            color: tokens.color.text.secondary,
          }}
        >
          <Filter size={13} style={{ color: tokens.color.icon.secondary }} aria-hidden="true" />
          <span>FILTERS</span>
        </div>

        {/* Filter pills: flex-row, gap/sm */}
        <div className="flex flex-row flex-wrap items-center gap-2">
          <FilterPill
            icon={<Calendar size={14} />}
            label="Time range"
            value={timeRange}
            onChange={onTimeRangeChange}
          />
          <FilterPill
            icon={<Hash size={14} />}
            label="Topic"
            value={topic}
            onChange={onTopicChange}
          />
          <FilterPill
            icon={<Globe size={14} />}
            label="Source"
            value={source}
            onChange={onSourceChange}
          />
          <FilterPill
            icon={<SlidersHorizontal size={14} />}
            label="Keyword"
            value={keyword}
            onChange={onKeywordChange}
          />
        </div>
      </div>

      {/* Right: action buttons — flex-row, gap/sm, flex-shrink-0 */}
      <div className="flex flex-row items-center" style={{ gap: tokens.spacing.sm, flexShrink: 0 }}>
        <ExportButton
          onDownloadDailyBriefPDF={onDownloadDailyBriefPDF}
          onDownloadMonthlyPDF={onDownloadMonthlyPDF}
          onDownloadMonthlyPPTX={onDownloadMonthlyPPTX}
        />
        <PrimaryButton
          label="Generate Narrative"
          icon={<Sparkles size={14} />}
          onClick={onGenerateNarrative}
        />
      </div>
    </div>
  )
}
