import { AlertTriangle } from 'lucide-react'
import { tokens, foundation } from '../tokens'

// ─── Badge ────────────────────────────────────────────────────────────────────
// Resizing: hug content, inline-flex
// Auto Layout: flex-row, gap/xs, paddingX = badge.paddingX, paddingY = badge.paddingY

type BadgeVariant = 'warning' | 'error' | 'success' | 'info' | 'default'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
}

function Badge({ label, variant = 'warning' }: BadgeProps) {
  const v = tokens.component.badge.variants[variant]
  return (
    <span
      className="inline-flex items-center font-semibold tracking-wide uppercase"
      style={{
        fontSize: tokens.component.badge.fontSize,
        fontWeight: tokens.component.badge.fontWeight,
        lineHeight: 1,
        color: v.text,
        backgroundColor: v.bg,
        border: `${tokens.component.badge.borderWidth}px solid ${v.border}`,
        borderRadius: tokens.component.badge.radius,
        paddingLeft: tokens.component.badge.paddingX,
        paddingRight: tokens.component.badge.paddingX,
        paddingTop: tokens.component.badge.paddingY + 2,
        paddingBottom: tokens.component.badge.paddingY + 2,
        letterSpacing: '0.05em',
      }}
    >
      {label}
    </span>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface RiskLevelProps {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  description: string
  thresholds: string[]
  period: { from: string; to: string }
  negativeSentimentPct?: number
  totalMentions?: number
}

function riskToBadgeVariant(level: RiskLevelProps['riskLevel']): BadgeVariant {
  const map: Record<RiskLevelProps['riskLevel'], BadgeVariant> = {
    LOW: 'success',
    MEDIUM: 'warning',
    HIGH: 'error',
    CRITICAL: 'error',
  }
  return map[level]
}

// ─── Component ────────────────────────────────────────────────────────────────
// Resizing: fill container horizontally (flex-1), hug content vertically
// Auto Layout: flex-col, gap = spacing/md, background = surface/warning-subtle

export function RiskLevelCard({
  riskLevel,
  description,
  thresholds,
  period,
  negativeSentimentPct,
  totalMentions,
}: RiskLevelProps) {
  const isWarning = riskLevel === 'MEDIUM' || riskLevel === 'HIGH' || riskLevel === 'CRITICAL'

  const bgColor = isWarning
    ? tokens.color.surface.warningSubtle
    : tokens.color.surface.successSubtle

  const borderColor = isWarning
    ? tokens.color.border.warning
    : tokens.color.border.success

  const iconColor = isWarning
    ? foundation.color.yellow[500]
    : tokens.color.icon.success

  return (
    // Card container: fill × hug, flex-col, status-tinted background
    <article
      className="flex flex-col flex-1"
      style={{
        backgroundColor: bgColor,
        border: `${tokens.component.card.borderWidth}px solid ${borderColor}`,
        borderRadius: tokens.component.card.radius,
        minWidth: 0,
      }}
    >
      {/* Card header row: flex-row, space-between, align-center */}
      <div
        className="flex flex-row items-center justify-between gap-3"
        style={{
          paddingLeft: tokens.component.card.headerPaddingX,
          paddingRight: tokens.component.card.headerPaddingX,
          paddingTop: tokens.component.card.headerPaddingTop,
          paddingBottom: tokens.component.card.headerPaddingBottom,
        }}
      >
        {/* Left: icon + title */}
        <div className="flex flex-row items-center gap-2">
          <AlertTriangle
            size={16}
            style={{ color: iconColor, flexShrink: 0 }}
            aria-hidden="true"
          />
          <h3
            className="font-bold"
            style={{
              fontSize: tokens.typography.size['heading-xs'],
              lineHeight: tokens.typography.lineHeight.tight,
              color: tokens.color.text.primary,
            }}
          >
            Risk Level
          </h3>
        </div>

        {/* Right: risk badge */}
        <Badge label={riskLevel} variant={riskToBadgeVariant(riskLevel)} />
      </div>

      {/* Card body: flex-col, gap/md */}
      <div
        className="flex flex-col gap-3"
        style={{
          paddingLeft: tokens.component.card.contentPaddingX,
          paddingRight: tokens.component.card.contentPaddingX,
          paddingBottom: tokens.component.card.contentPaddingBottom,
        }}
      >
        {/* Description paragraph: body-base, primary text */}
        <p
          style={{
            fontSize: tokens.typography.size['body-base'],
            lineHeight: tokens.typography.lineHeight.normal,
            color: tokens.color.text.primary,
          }}
        >
          {description}
          {negativeSentimentPct !== undefined && totalMentions !== undefined && (
            <span>
              {' '}({negativeSentimentPct}% of {totalMentions.toLocaleString()} mentions)
            </span>
          )}
        </p>

        {/* Thresholds section: flex-col, gap/xs */}
        {thresholds.length > 0 && (
          <div className="flex flex-col gap-1">
            <span
              className="uppercase tracking-wide"
              style={{
                fontSize: tokens.typography.size['label-xs'],
                fontWeight: tokens.typography.weight.semibold,
                color: tokens.color.text.tertiary,
                letterSpacing: '0.06em',
              }}
            >
              Thresholds
            </span>
            {/* Threshold list: flex-col, gap/xs */}
            <ul className="flex flex-col gap-1" style={{ paddingLeft: 0, listStyle: 'none' }}>
              {thresholds.map((t, i) => (
                <li
                  key={i}
                  className="flex flex-row items-start gap-1"
                  style={{
                    fontSize: tokens.typography.size['body-sm'],
                    color: tokens.color.text.secondary,
                  }}
                >
                  <span style={{ color: tokens.color.text.tertiary, flexShrink: 0 }}>•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Period row: body-sm, tertiary text */}
        <p
          style={{
            fontSize: tokens.typography.size['body-sm'],
            color: tokens.color.text.tertiary,
          }}
        >
          Period: {period.from} to {period.to}
        </p>
      </div>
    </article>
  )
}
