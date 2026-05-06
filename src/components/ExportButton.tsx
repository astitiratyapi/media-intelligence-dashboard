import { useRef, useState, useEffect } from 'react'
import { Download, Monitor, FileSpreadsheet } from 'lucide-react'
import { tokens, foundation } from '../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ExportButtonProps {
  onDownloadMonthlyPDF?:   () => void
  onDownloadMonthlyPPTX?:  () => void
  onDownloadRawDataXLSX?:  () => void
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"

const BTN_SECONDARY = {
  color:    '#0479CE',
  border:   '#0479CE',
  bgHover:  '#F1F4F6',
  radius:   tokens.component.button.primary.radius,
  height:   tokens.component.button.primary.height,
  paddingX: tokens.component.button.primary.paddingX,
  fontSize: tokens.component.button.primary.fontSize,
  fontWeight: tokens.component.button.primary.fontWeight,
}

// ─── Outlined action button (inside dropdown) ─────────────────────────────────

interface OutlineActionProps {
  label:    string
  icon?:    React.ReactNode
  onClick?: () => void
  style?:   React.CSSProperties
}

function OutlineAction({ label, icon, onClick, style }: OutlineActionProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-row items-center justify-center"
      style={{
        fontFamily:      FONT,
        fontSize:        12,
        fontWeight:      tokens.typography.weight.medium,
        color:           BTN_SECONDARY.color,
        backgroundColor: hovered ? BTN_SECONDARY.bgHover : 'transparent',
        border:          `1px solid ${BTN_SECONDARY.border}`,
        borderRadius:    tokens.radius.sm,
        paddingTop:      6,
        paddingBottom:   6,
        paddingLeft:     tokens.spacing.sm,
        paddingRight:    tokens.spacing.sm,
        gap:             5,
        cursor:          'pointer',
        transition:      'background-color 150ms ease',
        whiteSpace:      'nowrap',
        flex:            1,
        ...style,
      }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {label}
    </button>
  )
}

// ─── Section header (icon badge + title + subtitle) ───────────────────────────

function SectionHeader({
  icon, bg, iconColor, title, subtitle,
}: {
  icon:      React.ReactNode
  bg:        string
  iconColor: string
  title:     string
  subtitle:  string
}) {
  return (
    <div className="flex flex-row items-start" style={{ gap: tokens.spacing.sm }}>
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width:           32,
          height:          32,
          backgroundColor: bg,
          borderRadius:    tokens.radius.sm,
          color:           iconColor,
        }}
      >
        {icon}
      </div>
      <div className="flex flex-col" style={{ gap: 2 }}>
        <span
          style={{
            fontFamily:  FONT,
            fontSize:    tokens.typography.size['body-base'],
            fontWeight:  tokens.typography.weight.bold,
            color:       tokens.color.text.primary,
            lineHeight:  tokens.typography.lineHeight.tight,
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize:   tokens.typography.size['label-xs'],
            color:      tokens.color.text.tertiary,
          }}
        >
          {subtitle}
        </span>
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ExportButton({
  onDownloadMonthlyPDF,
  onDownloadMonthlyPPTX,
  onDownloadRawDataXLSX,
}: ExportButtonProps) {
  const [open, setOpen] = useState(false)
  const [triggerHovered, setTriggerHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div ref={containerRef} style={{ position: 'relative', flexShrink: 0 }}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setTriggerHovered(true)}
        onMouseLeave={() => setTriggerHovered(false)}
        className="flex flex-row items-center"
        style={{
          fontFamily:      FONT,
          height:          BTN_SECONDARY.height,
          paddingLeft:     BTN_SECONDARY.paddingX,
          paddingRight:    BTN_SECONDARY.paddingX,
          backgroundColor: triggerHovered ? BTN_SECONDARY.bgHover : 'transparent',
          color:           BTN_SECONDARY.color,
          border:          `1px solid ${BTN_SECONDARY.border}`,
          borderRadius:    BTN_SECONDARY.radius,
          fontSize:        BTN_SECONDARY.fontSize,
          fontWeight:      BTN_SECONDARY.fontWeight,
          gap:             tokens.spacing.xs,
          cursor:          'pointer',
          transition:      'background-color 150ms ease',
          whiteSpace:      'nowrap',
        }}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Download size={14} />
        Export
      </button>

      {/* Dropdown popover */}
      {open && (
        <div
          style={{
            position:        'absolute',
            top:             '100%',
            right:           0,
            marginTop:       tokens.spacing.xs,
            width:           280,
            backgroundColor: tokens.color.surface.primary,
            border:          `1px solid ${tokens.color.border.primary}`,
            borderRadius:    tokens.radius.default,
            boxShadow:       '0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
            overflow:        'hidden',
            zIndex:          50,
          }}
        >
          {/* ── Monthly Review ── */}
          <div
            className="flex flex-col"
            style={{ padding: tokens.spacing.default, gap: tokens.spacing.sm }}
          >
            <SectionHeader
              icon={<Monitor size={15} />}
              bg={foundation.color.orange[50]}
              iconColor={foundation.color.orange[500]}
              title="Monthly Review"
              subtitle="Full report deck"
            />
            <div className="flex flex-row" style={{ gap: tokens.spacing.xs }}>
              <OutlineAction
                label="PDF"
                icon={<Download size={12} />}
                onClick={() => { onDownloadMonthlyPDF?.(); setOpen(false) }}
              />
              <OutlineAction
                label="PPTX"
                icon={<Download size={12} />}
                onClick={() => { onDownloadMonthlyPPTX?.(); setOpen(false) }}
              />
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, backgroundColor: tokens.color.border.secondary }} />

          {/* ── Raw Data ── */}
          <div
            className="flex flex-col"
            style={{ padding: tokens.spacing.default, gap: tokens.spacing.sm }}
          >
            <SectionHeader
              icon={<FileSpreadsheet size={15} />}
              bg={foundation.color.green[50]}
              iconColor={foundation.color.green[600]}
              title="Raw Data"
              subtitle="Export all scraped data"
            />
            <OutlineAction
              label="XLSX"
              icon={<Download size={12} />}
              onClick={() => { onDownloadRawDataXLSX?.(); setOpen(false) }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
