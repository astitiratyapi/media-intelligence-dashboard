import { useState, useRef, useEffect, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { tokens, foundation } from '../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FilterOption {
  value: string
  label: string
}

export interface FilterDropdownProps {
  label:     string
  options:   FilterOption[]
  value:     string
  onChange:  (value: string) => void
  icon?:     ReactNode
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"

// ─── Component ────────────────────────────────────────────────────────────────

export function FilterDropdown({ label, options, value, onChange, icon }: FilterDropdownProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const selectedLabel = options.find((o) => o.value === value)?.label ?? label

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
      {/* ── Trigger button ── */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex flex-row items-center"
        style={{
          height:          tokens.component.input.height,
          paddingLeft:     tokens.component.input.paddingX,
          paddingRight:    tokens.component.input.paddingX,
          backgroundColor: open ? tokens.color.surface.infoSubtle : tokens.component.input.bg,
          border:          open
            ? `${foundation.borderWidth.sm}px solid ${tokens.color.border.info}`
            : `${foundation.borderWidth.sm}px solid ${tokens.component.input.border}`,
          borderRadius:    tokens.component.input.radius,
          cursor:          'pointer',
          gap:             tokens.spacing.xs,
          fontFamily:      FONT,
          fontSize:        tokens.typography.size['body-sm'],
          color:           open ? tokens.color.text.brand : tokens.color.text.primary,
          fontWeight:      tokens.typography.weight.regular,
          whiteSpace:      'nowrap',
          transition:      'all 150ms ease',
        }}
      >
        {icon && (
          <span
            style={{
              display:    'flex',
              alignItems: 'center',
              color:      open ? tokens.color.icon.info : tokens.color.icon.secondary,
            }}
          >
            {icon}
          </span>
        )}
        <span>{selectedLabel}</span>
        <ChevronDown
          size={14}
          style={{
            color:     open ? tokens.color.icon.info : tokens.color.icon.secondary,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition:'transform 150ms ease',
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
      </button>

      {/* ── Dropdown panel ── */}
      {open && (
        <div
          role="listbox"
          aria-label={label}
          style={{
            position:        'absolute',
            top:             'calc(100% + 4px)',
            left:            0,
            zIndex:          50,
            backgroundColor: '#ffffff',
            border:          `1px solid ${tokens.color.border.secondary}`,
            borderRadius:    tokens.radius.lg,   // rounded-xl
            boxShadow:       '0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)',
            padding:         '4px 0',
            minWidth:        160,
          }}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => { onChange(opt.value); setOpen(false) }}
                style={{
                  fontFamily:      FONT,
                  fontSize:        tokens.typography.size['body-sm'],
                  fontWeight:      isSelected ? tokens.typography.weight.semibold : tokens.typography.weight.regular,
                  color:           isSelected ? tokens.color.text.brand : tokens.color.text.primary,
                  backgroundColor: isSelected ? tokens.color.surface.infoSubtle : 'transparent',
                  paddingLeft:     16,
                  paddingRight:    16,
                  paddingTop:      8,
                  paddingBottom:   8,
                  cursor:          'pointer',
                  whiteSpace:      'nowrap',
                  transition:      'background-color 100ms ease',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) (e.currentTarget as HTMLDivElement).style.backgroundColor = tokens.color.surface.secondary
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent'
                }}
              >
                {opt.label}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
