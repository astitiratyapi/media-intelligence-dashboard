import { Filter, Calendar, Hash, Globe, SlidersHorizontal, Sparkles } from 'lucide-react'
import { tokens, foundation } from '../tokens'
import { ExportButton, type ExportButtonProps } from './ExportButton'
import { FilterDropdown, type FilterOption } from './FilterDropdown'

// ─── Filter option lists ──────────────────────────────────────────────────────

export const timeOptions: FilterOption[] = [
  { value: 'today',   label: 'Today'           },
  { value: 'last7',   label: 'Last 7 Days'     },
  { value: 'last30',  label: 'Last 30 Days'    },
  { value: 'qtd',     label: 'Quarter to Date' },
  { value: 'custom',  label: 'Custom'          },
]

export const topicOptions: FilterOption[] = [
  { value: 'all',           label: 'All Topics'    },
  { value: 'motor_listrik', label: 'Motor Listrik' },
  { value: 'mbg',           label: 'MBG'           },
]

export const sourceOptions: FilterOption[] = [
  { value: 'all',    label: 'All Sources'  },
  { value: 'news',   label: 'News'         },
  { value: 'social', label: 'Social Media' },
]

export const keywordOptions: FilterOption[] = [
  { value: 'keyword',  label: 'Keyword'  },
  { value: 'semantic', label: 'Semantic' },
  { value: 'hybrid',   label: 'Hybrid'   },
]

// ─── Custom date range inputs ─────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"

function DateRangePicker({
  from, to, onFromChange, onToChange,
}: {
  from: string; to: string
  onFromChange: (v: string) => void
  onToChange:   (v: string) => void
}) {
  const inputStyle: React.CSSProperties = {
    fontFamily:      FONT,
    fontSize:        tokens.typography.size['body-sm'],
    color:           tokens.color.text.primary,
    backgroundColor: tokens.component.input.bg,
    border:          `${foundation.borderWidth.sm}px solid ${tokens.component.input.border}`,
    borderRadius:    tokens.component.input.radius,
    height:          tokens.component.input.height,
    paddingLeft:     tokens.component.input.paddingX,
    paddingRight:    tokens.component.input.paddingX,
    outline:         'none',
    cursor:          'pointer',
  }

  return (
    <div className="flex flex-row items-center" style={{ gap: tokens.spacing.sm }}>
      <span style={{ fontFamily: FONT, fontSize: tokens.typography.size['label-xs'], color: tokens.color.text.tertiary }}>
        From
      </span>
      <input
        type="date"
        value={from}
        onChange={(e) => onFromChange(e.target.value)}
        style={inputStyle}
      />
      <span style={{ fontFamily: FONT, fontSize: tokens.typography.size['label-xs'], color: tokens.color.text.tertiary }}>
        To
      </span>
      <input
        type="date"
        value={to}
        onChange={(e) => onToChange(e.target.value)}
        style={inputStyle}
      />
    </div>
  )
}

// ─── Primary action button ────────────────────────────────────────────────────

function PrimaryButton({ label, icon, onClick }: { label: string; icon?: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-row items-center gap-2 flex-shrink-0 transition-colors"
      style={{
        height:          tokens.component.button.primary.height,
        paddingLeft:     tokens.component.button.primary.paddingX,
        paddingRight:    tokens.component.button.primary.paddingX,
        backgroundColor: tokens.component.button.primary.bg,
        color:           tokens.component.button.primary.text,
        borderRadius:    tokens.component.button.primary.radius,
        fontSize:        tokens.component.button.primary.fontSize,
        fontWeight:      tokens.component.button.primary.fontWeight,
        border:          'none',
        cursor:          'pointer',
        whiteSpace:      'nowrap',
        fontFamily:      FONT,
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = tokens.component.button.primary.bgHover }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = tokens.component.button.primary.bg }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {label}
    </button>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface FilterBarProps extends ExportButtonProps {
  timeRange:          string
  topic:              string
  source:             string
  keyword:            string
  customFrom?:        string
  customTo?:          string
  onTimeRangeChange:  (v: string) => void
  onTopicChange:      (v: string) => void
  onSourceChange:     (v: string) => void
  onKeywordChange:    (v: string) => void
  onCustomFromChange?: (v: string) => void
  onCustomToChange?:   (v: string) => void
  onGenerateNarrative?: () => void
}

// ─── Component ────────────────────────────────────────────────────────────────

export function FilterBar({
  timeRange, topic, source, keyword,
  customFrom = '', customTo = '',
  onTimeRangeChange, onTopicChange, onSourceChange, onKeywordChange,
  onCustomFromChange, onCustomToChange,
  onGenerateNarrative,
  onDownloadDailyBriefPDF, onDownloadMonthlyPDF, onDownloadMonthlyPPTX,
}: FilterBarProps) {
  const isCustom = timeRange === 'custom'

  return (
    <div
      className="w-full flex flex-col"
      style={{
        backgroundColor: tokens.color.surface.primary,
        borderBottom:    `${foundation.borderWidth.sm}px solid ${tokens.color.border.secondary}`,
        flexShrink:      0,
      }}
    >
      {/* ── Main filter row ── */}
      <div
        className="w-full flex flex-row items-center justify-between"
        style={{
          paddingTop:    tokens.spacing.md,
          paddingBottom: isCustom ? tokens.spacing.sm : tokens.spacing.md,
          paddingLeft:   tokens.spacing.xl,
          paddingRight:  tokens.spacing.xl,
          gap:           tokens.spacing.md,
        }}
      >
        {/* Left: label + 4 dropdowns */}
        <div className="flex flex-row items-center" style={{ gap: tokens.spacing.sm }}>
          <div
            className="flex flex-row items-center"
            style={{
              fontSize:   tokens.typography.size['body-sm'],
              fontWeight: tokens.typography.weight.semibold,
              color:      tokens.color.text.secondary,
              gap:        tokens.spacing.xs,
              fontFamily: FONT,
              flexShrink: 0,
            }}
          >
            <Filter size={13} style={{ color: tokens.color.icon.secondary }} aria-hidden="true" />
            <span>FILTERS</span>
          </div>

          <FilterDropdown
            icon={<Calendar size={14} />}
            label="All Time"
            options={timeOptions}
            value={timeRange}
            onChange={onTimeRangeChange}
          />
          <FilterDropdown
            icon={<Hash size={14} />}
            label="All Topics"
            options={topicOptions}
            value={topic}
            onChange={onTopicChange}
          />
          <FilterDropdown
            icon={<Globe size={14} />}
            label="All Sources"
            options={sourceOptions}
            value={source}
            onChange={onSourceChange}
          />
          <FilterDropdown
            icon={<SlidersHorizontal size={14} />}
            label="Keyword"
            options={keywordOptions}
            value={keyword}
            onChange={onKeywordChange}
          />
        </div>

        {/* Right: Export + Generate Narrative */}
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

      {/* ── Custom date range row — only when Custom is selected ── */}
      {isCustom && (
        <div
          className="flex flex-row items-center"
          style={{
            paddingLeft:   tokens.spacing.xl,
            paddingRight:  tokens.spacing.xl,
            paddingBottom: tokens.spacing.md,
            gap:           tokens.spacing.sm,
          }}
        >
          <DateRangePicker
            from={customFrom}
            to={customTo}
            onFromChange={onCustomFromChange ?? (() => {})}
            onToChange={onCustomToChange ?? (() => {})}
          />
        </div>
      )}
    </div>
  )
}
