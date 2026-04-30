import { useState } from 'react'
import { Lightbulb, Shield, CalendarDays, FileText, AlertTriangle, ChevronDown, ChevronUp, type LucideIcon } from 'lucide-react'
import { tokens, foundation } from '../tokens'
import { TooltipIcon } from './TooltipIcon'

// ─── Types ────────────────────────────────────────────────────────────────────

export type CommsTabId = 'opportunities' | 'mitigation' | 'recommendation'

export interface CommsAction {
  title:        string
  description:  string
  highlighted?: boolean
}

export interface OpportunityItem {
  title:       string
  subtitle:    string
  description: string
}

export interface RecommendationGroup {
  label: string          // e.g. "1 Bulan ke Depan"
  items: CommsAction[]
}

export interface CommsActionsData {
  opportunities:  OpportunityItem[]
  mitigation:     CommsAction[]
  recommendation: RecommendationGroup[]
  source:         string
}

export interface CommsActionsSectionProps {
  data: CommsActionsData
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT   = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
const YELLOW = {
  bg:   foundation.color.yellow[50],
  icon: foundation.color.yellow[600],
}

const TABS: { id: CommsTabId; label: string; Icon: LucideIcon }[] = [
  { id: 'opportunities', label: 'Opportunities', Icon: Lightbulb    },
  { id: 'mitigation',    label: 'Mitigation',    Icon: Shield       },
  { id: 'recommendation',label: 'Recommendation',Icon: CalendarDays },
]

// ─── Scroll-area height ───────────────────────────────────────────────────────
// Per-item (body-md title, body-sm desc ~2 lines, leading-relaxed):
//   border:       1px × 2               =  2px
//   padding:      16px × 2              = 32px
//   title (1 ln): 16px × 1.25 lh        = 20px
//   gap:          8px                   =  8px
//   desc (2 ln):  12px × 1.75 lh × 2   = 42px
//                                       = 104px per item
// 3 items × 104 + 2 gaps × 12 (md) + container padding 2 × 16 = 368px
const SCROLL_HEIGHT = 370

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
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.default,
        gap: tokens.spacing.sm,
      }}
    >
      <span
        style={{
          fontFamily: FONT,
          fontSize: tokens.typography.size['body-md'],
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
          lineHeight: tokens.typography.lineHeight.relaxed,
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  )
}

// ─── Opportunity item (expandable) ───────────────────────────────────────────

function OpportunityActionItem({
  item,
  isExpanded,
  onToggle,
}: {
  item:       OpportunityItem
  isExpanded: boolean
  onToggle:   () => void
}) {
  return (
    <div
      className="flex flex-col"
      style={{
        backgroundColor: tokens.component.card.bg,
        border:          `1px solid ${foundation.color.neutral[100]}`,
        borderRadius:    tokens.radius.lg,
        padding:         tokens.spacing.default,
        gap:             tokens.spacing.xs,
      }}
    >
      {/* Title */}
      <span
        style={{
          fontFamily:  FONT,
          fontSize:    tokens.typography.size['body-md'],
          fontWeight:  tokens.typography.weight.bold,
          color:       tokens.color.text.primary,
          lineHeight:  tokens.typography.lineHeight.tight,
        }}
      >
        {item.title}
      </span>

      {/* Subtitle */}
      <span
        style={{
          fontFamily:  FONT,
          fontSize:    tokens.typography.size['label-xs'],
          fontStyle:   'italic',
          color:       tokens.color.text.secondary,
          lineHeight:  tokens.typography.lineHeight.normal,
        }}
      >
        ↪ {item.subtitle}
      </span>

      {/* Description — only when expanded */}
      {isExpanded && (
        <p
          style={{
            fontFamily:  FONT,
            fontSize:    tokens.typography.size['body-sm'],
            color:       tokens.color.text.secondary,
            lineHeight:  tokens.typography.lineHeight.relaxed,
            margin:      0,
            marginTop:   tokens.spacing.sm,
          }}
        >
          {item.description}
        </p>
      )}

      {/* Show Detail / Show Less button */}
      <div className="flex justify-end" style={{ marginTop: tokens.spacing.xs }}>
        <button
          type="button"
          onClick={onToggle}
          className="flex flex-row items-center"
          style={{
            fontFamily:  FONT,
            fontSize:    tokens.typography.size['label-xs'],
            fontWeight:  tokens.typography.weight.medium,
            color:       tokens.color.text.brand,
            background:  'none',
            border:      'none',
            padding:     0,
            cursor:      'pointer',
            gap:         4,
          }}
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp size={12} aria-hidden="true" />
            </>
          ) : (
            <>
              <span>Show Detail</span>
              <ChevronDown size={12} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// ─── Opportunity list (manages expand state) ──────────────────────────────────

function OpportunityList({ items }: { items: OpportunityItem[] }) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className="flex flex-col" style={{ gap: tokens.spacing.md }}>
      {items.map((item, i) => (
        <OpportunityActionItem
          key={i}
          item={item}
          isExpanded={!!expandedItems[i]}
          onToggle={() => toggleExpand(i)}
        />
      ))}
    </div>
  )
}

// ─── Recommendation group header ──────────────────────────────────────────────

function GroupHeader({ label }: { label: string }) {
  return (
    <div
      className="flex flex-row items-center"
      style={{ gap: tokens.spacing.sm, paddingTop: tokens.spacing.xs }}
    >
      <span
        style={{
          fontFamily:    FONT,
          fontSize:      tokens.typography.size['label-xs'],
          fontWeight:    tokens.typography.weight.semibold,
          color:         tokens.color.text.secondary,
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          whiteSpace:    'nowrap',
          flexShrink:    0,
        }}
      >
        {label}
      </span>
      {/* Thin divider line */}
      <div
        style={{
          flex:            1,
          height:          1,
          backgroundColor: tokens.color.border.secondary,
        }}
      />
    </div>
  )
}

// ─── Recommendation content ───────────────────────────────────────────────────

function RecommendationContent({ groups }: { groups: RecommendationGroup[] }) {
  return (
    <div className="flex flex-col" style={{ gap: tokens.spacing.md }}>
      {groups.map((group, gi) => (
        <div key={gi} className="flex flex-col" style={{ gap: tokens.spacing.sm }}>
          <GroupHeader label={group.label} />
          {group.items.map((item, ii) => (
            <ActionItem key={ii} {...item} />
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CommsActionsSection({ data }: CommsActionsSectionProps) {
  const [activeTab, setActiveTab] = useState<CommsTabId>('opportunities')
  const [, setChecklistModalOpen] = useState(false)

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
        className="flex flex-row items-start"
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
              fontSize:    tokens.typography.size['heading-sm'],
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
            AI-generated suggestions — Opportunities, Mitigation, Recommendation
          </span>
          <p
            style={{
              fontFamily: FONT,
              fontSize:   tokens.typography.size['body-sm'],
              color:      tokens.color.text.secondary,
              margin:     0,
              marginTop:  2,
              lineHeight: tokens.typography.lineHeight.normal,
            }}
          >
            You can create a checklist.{' '}
            <button
              type="button"
              onClick={() => setChecklistModalOpen(true)}
              style={{
                fontFamily:      FONT,
                fontSize:        tokens.typography.size['body-sm'],
                fontWeight:      tokens.typography.weight.medium,
                color:           tokens.color.text.brand,
                background:      'none',
                border:          'none',
                padding:         0,
                cursor:          'pointer',
                textDecoration:  'underline',
                textUnderlineOffset: '2px',
                transition:      'opacity 150ms ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.7' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
            >
              Go to Checklist
            </button>
          </p>
        </div>
        <TooltipIcon text="AI-generated communication recommendations based on latest media analysis." />
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

      {/* ── Scrollable content — 3 items visible, rest on scroll ── */}
      <div
        style={{
          height:         SCROLL_HEIGHT,
          overflowY:      'auto',
          scrollBehavior: 'smooth',
          padding:        tokens.spacing.default,
          flexShrink:     0,
        }}
      >
        {activeTab === 'opportunities' ? (
          <OpportunityList items={data.opportunities} />
        ) : activeTab === 'recommendation' ? (
          <RecommendationContent groups={data.recommendation} />
        ) : (
          <div className="flex flex-col" style={{ gap: tokens.spacing.md }}>
            {data.mitigation.map((action, i) => (
              <ActionItem key={i} {...action} />
            ))}
          </div>
        )}
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
