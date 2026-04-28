import { useState } from 'react'
import { Lightbulb, Shield, ListChecks, FileText, AlertTriangle, type LucideIcon } from 'lucide-react'
import { tokens, foundation } from '../tokens'
import { TooltipIcon } from './TooltipIcon'

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
  source:        string
}

export interface CommsActionsSectionProps {
  data: CommsActionsData
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT   = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
const YELLOW = {
  bg:   foundation.color.yellow[50],   // amber-50 tint
  icon: foundation.color.yellow[600],  // amber icon
}

const TABS: { id: CommsTabId; label: string; Icon: LucideIcon }[] = [
  { id: 'opportunities', label: 'Opportunities', Icon: Lightbulb  },
  { id: 'risks',         label: 'Risks',         Icon: Shield     },
  { id: 'checklist',     label: 'Checklist',     Icon: ListChecks },
]

// ─── Scroll-area height ───────────────────────────────────────────────────────
// Per-item (body-md title, body-sm desc ~2 lines, leading-relaxed):
//   border:       1px × 2               =  2px
//   padding:      16px × 2              = 32px  (tokens.spacing.default)
//   title (1 ln): 16px × 1.25 lh        = 20px  (body-md, lineHeight.tight)
//   gap:          8px                   =  8px  (tokens.spacing.sm)
//   desc (2 ln):  12px × 1.75 lh × 2   = 42px  (body-sm, lineHeight.relaxed)
//                                       = 104px per item
// 3 items × 104 + 2 gaps × 12 (md) + container padding 2 × 16 = 312+24+32 = 368px
const SCROLL_HEIGHT = 370  // +2px buffer above exact 368px

// ─── Segmented tab bar ────────────────────────────────────────────────────────

function SegmentedTabs({
  active,
  onChange,
}: {
  active: CommsTabId
  onChange: (id: CommsTabId) => void
}) {
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
              fontWeight: isActive
                ? tokens.typography.weight.semibold
                : tokens.typography.weight.medium,
              color: isActive
                ? tokens.color.text.primary
                : tokens.color.text.tertiary,
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
        border: `1px solid ${highlighted ? foundation.color.green[200] : foundation.color.neutral[100]}`,
        borderRadius: tokens.radius.lg,   // 12px — rounded-xl
        padding: tokens.spacing.default,  // 16px — p-4
        gap: tokens.spacing.sm,           // 8px between title and description
      }}
    >
      {/* Title — text-base, bold, full text (no truncation) */}
      <span
        style={{
          fontFamily: FONT,
          fontSize: tokens.typography.size['body-md'],  // 16px — text-base
          fontWeight: tokens.typography.weight.bold,
          color: tokens.color.text.primary,
          lineHeight: tokens.typography.lineHeight.tight,
        }}
      >
        {title}
      </span>

      {/* Description — text-sm, leading-relaxed, full paragraph (no clamp) */}
      <p
        style={{
          fontFamily: FONT,
          fontSize: tokens.typography.size['body-sm'],      // 12px — text-sm
          color: tokens.color.text.secondary,
          lineHeight: tokens.typography.lineHeight.relaxed, // 1.75 — leading-relaxed
          margin: 0,
        }}
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
      className="flex flex-col w-full"
      style={{
        backgroundColor: tokens.component.card.bg,
        border: `1px solid ${tokens.component.card.border}`,
        borderRadius: tokens.radius.lg,
      }}
    >
      {/* ── Card header ── */}
      <div
        className="flex flex-row items-center"
        style={{
          paddingLeft:   tokens.spacing.xl,
          paddingRight:  tokens.spacing.xl,
          paddingTop:    tokens.spacing.default,
          paddingBottom: tokens.spacing.default,
          borderBottom:  `1px solid ${tokens.color.border.secondary}`,
          gap:           tokens.spacing.sm,
          flexShrink:    0,
        }}
      >
        <Lightbulb
          size={20}
          style={{ color: YELLOW.icon, flexShrink: 0 }}
          aria-hidden="true"
        />
        <div className="flex flex-col flex-1" style={{ gap: 2 }}>
          <span
            style={{
              fontFamily:  FONT,
              fontSize:    tokens.typography.size['heading-sm'], // 18px — large
              fontWeight:  tokens.typography.weight.bold,
              color:       tokens.color.text.primary,
              lineHeight:  tokens.typography.lineHeight.tight,
            }}
          >
            Comms Actions
          </span>
          <span
            style={{
              fontFamily: FONT,
              fontSize:   tokens.typography.size['label-xs'],
              color:      tokens.color.text.tertiary,
            }}
          >
            AI-generated suggestions — Opportunities, Risks, Checklist
          </span>
        </div>
        <TooltipIcon text="AI-generated communication recommendations based on current media analysis" />
      </div>

      {/* ── Tab filter + source label ── */}
      <div
        className="flex flex-col"
        style={{
          paddingLeft:   tokens.spacing.xl,
          paddingRight:  tokens.spacing.xl,
          paddingTop:    tokens.spacing.default,
          paddingBottom: tokens.spacing.sm,
          borderBottom:  `1px solid ${tokens.color.border.secondary}`,
          gap:           tokens.spacing.sm,
          flexShrink:    0,
        }}
      >
        <SegmentedTabs active={activeTab} onChange={setActiveTab} />

        <div className="flex flex-row items-center" style={{ gap: 5 }}>
          <FileText size={12} color={tokens.color.text.tertiary} />
          <span
            style={{
              fontFamily: FONT,
              fontSize:   tokens.typography.size['label-xs'],
              color:      tokens.color.text.tertiary,
            }}
          >
            Source: {data.source}
          </span>
        </div>
      </div>

      {/* ── Scrollable action list — 3 items visible, rest on scroll ── */}
      {/* SCROLL_HEIGHT = 370px — see constant above for breakdown       */}
      <div
        style={{
          height:         SCROLL_HEIGHT,
          overflowY:      'auto',
          scrollBehavior: 'smooth',
          padding:        tokens.spacing.default,
          flexShrink:     0,
        }}
      >
        <div className="flex flex-col" style={{ gap: tokens.spacing.md }}>
          {actions.map((action, i) => (
            <ActionItem key={i} {...action} />
          ))}
        </div>
      </div>

      {/* ── Footer warning — always visible, outside scroll container ── */}
      <div
        className="flex flex-row items-start"
        style={{
          paddingLeft:     tokens.spacing.xl,
          paddingRight:    tokens.spacing.xl,
          paddingTop:      tokens.spacing.sm,
          paddingBottom:   tokens.spacing.sm,
          borderTop:       `1px solid ${tokens.color.border.warning}`,
          backgroundColor: tokens.color.surface.warningSubtle,
          gap:             tokens.spacing.xs,
          flexShrink:      0,
        }}
      >
        <AlertTriangle
          size={13}
          color={foundation.color.yellow[600]}
          style={{ flexShrink: 0, marginTop: 1 }}
        />
        <span
          style={{
            fontFamily:  FONT,
            fontSize:    tokens.typography.size['label-xs'],
            color:       foundation.color.yellow[700],
            lineHeight:  tokens.typography.lineHeight.normal,
          }}
        >
          Recommendations are communications &amp; engagement actions only (not policy advice).
        </span>
      </div>
    </div>
  )
}
