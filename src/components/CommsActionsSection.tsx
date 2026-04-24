import { useState } from 'react'
import { Lightbulb, AlertTriangle, ListChecks, FileText, AlertCircle, type LucideIcon } from 'lucide-react'
import { tokens, foundation } from '../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

export type CommsTabId = 'opportunities' | 'risks' | 'checklist'

export interface CommsAction {
  title:        string
  description:  string
  highlighted?: boolean
}

export interface CommsActionsData {
  opportunities: CommsAction[]
  risks:         CommsAction[]
  checklist:     CommsAction[]
  source:        string    // e.g. "Laporan AI — 9 Apr 2026, 23.13"
}

export interface CommsActionsSectionProps {
  data: CommsActionsData
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT   = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
const YELLOW = { bg: '#FFFBEB', icon: '#D97706' }   // amber

const TABS: { id: CommsTabId; label: string; Icon: LucideIcon }[] = [
  { id: 'opportunities', label: 'Opportunities', Icon: Lightbulb    },
  { id: 'risks',         label: 'Risks',         Icon: AlertTriangle },
  { id: 'checklist',     label: 'Checklist',     Icon: ListChecks   },
]

// ─── Segmented tab bar ────────────────────────────────────────────────────────

function SegmentedTabs({ active, onChange }: { active: CommsTabId; onChange: (id: CommsTabId) => void }) {
  return (
    <div
      className="flex flex-row"
      style={{
        backgroundColor: tokens.color.surface.tertiary,
        borderRadius: tokens.radius.default,
        padding: 3,
        gap: 2,
      }}
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = id === active
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="flex flex-row items-center justify-center flex-1"
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['label-xs'],
              fontWeight: isActive ? tokens.typography.weight.semibold : tokens.typography.weight.medium,
              color: isActive ? tokens.color.text.primary : tokens.color.text.tertiary,
              backgroundColor: isActive ? tokens.component.card.bg : 'transparent',
              border: 'none',
              borderRadius: tokens.radius.sm,
              paddingTop: tokens.spacing.sm,
              paddingBottom: tokens.spacing.sm,
              paddingLeft: tokens.spacing.sm,
              paddingRight: tokens.spacing.sm,
              gap: 5,
              cursor: 'pointer',
              boxShadow: isActive ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 150ms ease',
              whiteSpace: 'nowrap',
            }}
          >
            <Icon size={13} />
            {label}
          </button>
        )
      })}
    </div>
  )
}

// ─── Action item ──────────────────────────────────────────────────────────────

function ActionItem({ title, description, highlighted }: CommsAction) {
  return (
    <div
      className="flex flex-col"
      style={{
        backgroundColor: highlighted ? foundation.color.green[50] : tokens.component.card.bg,
        border: `1px solid ${highlighted ? foundation.color.green[200] : tokens.color.border.secondary}`,
        borderRadius: tokens.radius.default,
        padding: tokens.spacing.default,
        gap: tokens.spacing.xs,
      }}
    >
      <span
        style={{
          fontFamily: FONT,
          fontSize: tokens.typography.size['body-sm'],
          fontWeight: tokens.typography.weight.bold,
          color: tokens.color.text.primary,
          lineHeight: tokens.typography.lineHeight.tight,
        }}
      >
        {title}
      </span>
      <p
        style={{
          fontFamily: FONT,
          fontSize: tokens.typography.size['body-sm'],
          color: tokens.color.text.secondary,
          lineHeight: tokens.typography.lineHeight.normal,
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        } as React.CSSProperties}
      >
        {description}
      </p>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CommsActionsSection({ data }: CommsActionsSectionProps) {
  const [activeTab, setActiveTab] = useState<CommsTabId>('opportunities')

  const actionMap: Record<CommsTabId, CommsAction[]> = {
    opportunities: data.opportunities,
    risks:         data.risks,
    checklist:     data.checklist,
  }
  const actions = actionMap[activeTab]

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
          style={{ width: 32, height: 32, backgroundColor: YELLOW.bg, borderRadius: tokens.radius.lg, color: YELLOW.icon }}
        >
          <Lightbulb size={16} />
        </div>
        <div className="flex flex-col" style={{ gap: 2 }}>
          <span style={{ fontFamily: FONT, fontSize: tokens.typography.size['body-md'], fontWeight: tokens.typography.weight.bold, color: tokens.color.text.primary }}>
            Comms Actions
          </span>
          <span style={{ fontFamily: FONT, fontSize: tokens.typography.size['label-xs'], color: tokens.color.text.tertiary }}>
            AI-generated opportunities, risks, and weekly checklist
          </span>
        </div>
      </div>

      {/* Tab filter + source label */}
      <div
        className="flex flex-col"
        style={{
          paddingLeft: tokens.spacing.xl,
          paddingRight: tokens.spacing.xl,
          paddingTop: tokens.spacing.default,
          paddingBottom: tokens.spacing.sm,
          borderBottom: `1px solid ${tokens.color.border.secondary}`,
          gap: tokens.spacing.sm,
          flexShrink: 0,
        }}
      >
        <SegmentedTabs active={activeTab} onChange={setActiveTab} />

        {/* Source label */}
        <div className="flex flex-row items-center" style={{ gap: 5 }}>
          <FileText size={12} color={tokens.color.text.tertiary} />
          <span style={{ fontFamily: FONT, fontSize: tokens.typography.size['label-xs'], color: tokens.color.text.tertiary }}>
            Source: {data.source}
          </span>
        </div>
      </div>

      {/* Scrollable action list */}
      <div
        style={{ overflowY: 'auto', flex: 1, minHeight: 0, padding: tokens.spacing.default }}
      >
        <div className="flex flex-col" style={{ gap: tokens.spacing.sm }}>
          {actions.map((action, i) => (
            <ActionItem key={i} {...action} />
          ))}
        </div>
      </div>

      {/* Footer warning */}
      <div
        className="flex flex-row items-start"
        style={{
          paddingLeft: tokens.spacing.xl,
          paddingRight: tokens.spacing.xl,
          paddingTop: tokens.spacing.sm,
          paddingBottom: tokens.spacing.sm,
          borderTop: `1px solid ${tokens.color.border.secondary}`,
          gap: tokens.spacing.xs,
          flexShrink: 0,
        }}
      >
        <AlertCircle size={13} color={foundation.color.yellow[600]} style={{ flexShrink: 0, marginTop: 1 }} />
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['label-xs'],
            color: foundation.color.yellow[700],
            lineHeight: tokens.typography.lineHeight.normal,
          }}
        >
          Recommendations are communications &amp; engagement actions only (not policy advice).
        </span>
      </div>
    </div>
  )
}
