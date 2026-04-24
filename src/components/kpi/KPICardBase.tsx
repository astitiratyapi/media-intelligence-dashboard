import { tokens } from '../../tokens'
import type { LucideIcon } from 'lucide-react'

// ─── KPI card design tokens ───────────────────────────────────────────────────

export const kpiCard = {
  radius: 10,                                   // card/radius → theme/radius/container
  padding: tokens.spacing.xl,                   // card/stat/padding → spacing/xl = 24px
  gap: tokens.spacing.md,                       // card/content/gap → 12px
  bg: tokens.component.card.bg,                 // white
  bgHover: tokens.color.surface.secondary,      // #F9FAFB
  border: `1px solid ${tokens.component.card.border}`,  // 1px #D1D5DB
  fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  value: {
    fontSize: tokens.typography.size['heading-xl'], // 30px
    weight: tokens.typography.weight.bold,
    color: tokens.color.text.primary,           // #111827
  },
  label: {
    fontSize: tokens.typography.size['body-sm'], // 12px
    weight: tokens.typography.weight.medium,
    color: tokens.color.text.secondary,          // #4B5563
  },
  sublabel: {
    fontSize: tokens.typography.size['body-sm'], // 12px
    color: tokens.color.text.tertiary,           // #9CA3AF
  },
}

// ─── Icon badge ───────────────────────────────────────────────────────────────

export interface IconBadgeProps {
  icon: LucideIcon
  bg: string
  color: string
  size?: number
}

export function IconBadge({ icon: Icon, bg, color, size = 16 }: IconBadgeProps) {
  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{
        width: 36,
        height: 36,
        backgroundColor: bg,
        borderRadius: tokens.radius.default,
        color,
      }}
      aria-hidden="true"
    >
      <Icon size={size} strokeWidth={2} />
    </div>
  )
}

// ─── KPI card shell ───────────────────────────────────────────────────────────

export interface KPICardBaseProps {
  children: React.ReactNode
  onClick?: () => void
  style?: React.CSSProperties
}

export function KPICardBase({ children, onClick, style }: KPICardBaseProps) {
  const isClickable = Boolean(onClick)

  return (
    <div
      className="flex flex-col flex-1"
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.() } : undefined}
      style={{
        backgroundColor: kpiCard.bg,
        border: kpiCard.border,
        borderRadius: kpiCard.radius,
        padding: kpiCard.padding,
        gap: kpiCard.gap,
        fontFamily: kpiCard.fontFamily,
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'background-color 150ms ease',
        minWidth: 0,
        ...style,
      }}
      onMouseEnter={isClickable ? (e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = kpiCard.bgHover } : undefined}
      onMouseLeave={isClickable ? (e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = kpiCard.bg } : undefined}
    >
      {children}
    </div>
  )
}
