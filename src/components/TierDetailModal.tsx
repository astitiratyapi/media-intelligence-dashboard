import { X } from 'lucide-react'
import { tokens } from '../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TierDetailItem {
  name:     string
  scope:    string
  mentions: number
}

export interface TierDetailModalProps {
  title:    string
  items:    TierDetailItem[]
  onClose:  () => void
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"

// ─── Component ────────────────────────────────────────────────────────────────

export function TierDetailModal({ title, items, onClose }: TierDetailModalProps) {
  return (
    /* Overlay */
    <div
      onClick={onClose}
      style={{
        position:       'fixed',
        inset:          0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex:         50,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
      }}
    >
      {/* Modal card — stop propagation so clicks inside don't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: tokens.component.card.bg,
          borderRadius:    16,
          boxShadow:       '0 20px 60px rgba(0,0,0,0.18)',
          width:           560,
          maxHeight:       600,
          display:         'flex',
          flexDirection:   'column',
          fontFamily:      FONT,
          overflow:        'hidden',
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            display:        'flex',
            flexDirection:  'row',
            alignItems:     'center',
            justifyContent: 'space-between',
            padding:        `${tokens.spacing.default} ${tokens.spacing.xl}`,
            flexShrink:     0,
          }}
        >
          <span
            style={{
              fontSize:   tokens.typography.size['heading-sm'],
              fontWeight: tokens.typography.weight.bold,
              color:      tokens.color.text.primary,
              lineHeight: tokens.typography.lineHeight.tight,
            }}
          >
            {title}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border:     'none',
              cursor:     'pointer',
              color:      tokens.color.text.tertiary,
              display:    'flex',
              alignItems: 'center',
              padding:    4,
              borderRadius: tokens.radius.sm,
              transition: 'color 120ms ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = tokens.color.text.primary }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = tokens.color.text.tertiary }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: tokens.color.border.secondary, flexShrink: 0 }} />

        {/* ── Column header ── */}
        <div
          style={{
            display:         'flex',
            flexDirection:   'row',
            alignItems:      'center',
            paddingLeft:     tokens.spacing.xl,
            paddingRight:    tokens.spacing.xl,
            paddingTop:      tokens.spacing.sm,
            paddingBottom:   tokens.spacing.sm,
            gap:             tokens.spacing.default,
            backgroundColor: tokens.color.surface.secondary,
            flexShrink:      0,
          }}
        >
          <span
            style={{
              width:      28,
              fontSize:   tokens.typography.size['label-xs'],
              fontWeight: tokens.typography.weight.semibold,
              color:      tokens.color.text.tertiary,
              flexShrink: 0,
            }}
          >
            #
          </span>
          <span
            style={{
              flex:       1,
              fontSize:   tokens.typography.size['label-xs'],
              fontWeight: tokens.typography.weight.semibold,
              color:      tokens.color.text.tertiary,
            }}
          >
            Media
          </span>
          <span
            style={{
              width:      72,
              fontSize:   tokens.typography.size['label-xs'],
              fontWeight: tokens.typography.weight.semibold,
              color:      tokens.color.text.tertiary,
              textAlign:  'right',
              flexShrink: 0,
            }}
          >
            Mention
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: tokens.color.border.secondary, flexShrink: 0 }} />

        {/* ── Scrollable table body ── */}
        <div style={{ overflowY: 'auto', maxHeight: 400, flexShrink: 1 }}>
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <div
                key={i}
                style={{
                  display:         'flex',
                  flexDirection:   'row',
                  alignItems:      'flex-start',
                  paddingLeft:     tokens.spacing.xl,
                  paddingRight:    tokens.spacing.xl,
                  paddingTop:      tokens.spacing.md,
                  paddingBottom:   tokens.spacing.md,
                  gap:             tokens.spacing.default,
                  borderBottom:    isLast ? 'none' : `1px solid ${tokens.color.border.secondary}`,
                  backgroundColor: 'transparent',
                  transition:      'background-color 120ms ease',
                  cursor:          'default',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = tokens.color.surface.secondary }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent' }}
              >
                {/* Row number */}
                <span
                  style={{
                    width:      28,
                    fontSize:   tokens.typography.size['body-sm'],
                    color:      tokens.color.text.tertiary,
                    flexShrink: 0,
                    paddingTop: 1,
                  }}
                >
                  {i + 1}
                </span>

                {/* Media name + scope */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                  <span
                    style={{
                      fontSize:   tokens.typography.size['body-sm'],
                      fontWeight: tokens.typography.weight.semibold,
                      color:      tokens.color.text.primary,
                      lineHeight: tokens.typography.lineHeight.tight,
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontSize:   tokens.typography.size['label-xs'],
                      color:      tokens.color.text.tertiary,
                      lineHeight: tokens.typography.lineHeight.normal,
                    }}
                  >
                    {item.scope}
                  </span>
                </div>

                {/* Mention count */}
                <span
                  style={{
                    width:      72,
                    fontSize:   tokens.typography.size['body-sm'],
                    fontWeight: tokens.typography.weight.bold,
                    color:      tokens.color.text.primary,
                    textAlign:  'right',
                    flexShrink: 0,
                  }}
                >
                  {item.mentions.toLocaleString()}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
