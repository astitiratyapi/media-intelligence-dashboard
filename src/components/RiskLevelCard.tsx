import { AlertTriangle } from 'lucide-react'
import { tokens, foundation } from '../tokens'

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"

// ─── Solid filled badge ───────────────────────────────────────────────────────

type BadgeVariant = 'warning' | 'error' | 'success' | 'info' | 'default'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
}

function Badge({ label, variant = 'warning' }: BadgeProps) {
  // Solid filled pill — white text on colored background, no border
  const bgMap: Record<BadgeVariant, string> = {
    warning:  foundation.color.yellow[500],
    error:    tokens.color.surface.error,
    success:  tokens.color.surface.success,
    info:     tokens.color.surface.info,
    default:  foundation.color.neutral[400],
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: FONT,
        fontSize: tokens.typography.size['label-xs'],
        fontWeight: tokens.typography.weight.bold,
        letterSpacing: '0.07em',
        lineHeight: 1,
        color: '#FFFFFF',
        backgroundColor: bgMap[variant],
        borderRadius: tokens.radius.full,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        textTransform: 'uppercase',
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
    LOW:      'success',
    MEDIUM:   'warning',
    HIGH:     'error',
    CRITICAL: 'error',
  }
  return map[level]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RiskLevelCard({
  riskLevel,
  description,
  thresholds,
  negativeSentimentPct,
  totalMentions,
}: RiskLevelProps) {
  const isWarning  = riskLevel === 'MEDIUM' || riskLevel === 'HIGH' || riskLevel === 'CRITICAL'

  const bgColor     = isWarning ? tokens.color.surface.warningSubtle : tokens.color.surface.successSubtle
  const borderColor = isWarning ? tokens.color.border.warning        : tokens.color.border.success
  const iconColor   = isWarning ? foundation.color.yellow[500]       : tokens.color.icon.success
  const metricColor = isWarning ? foundation.color.yellow[700]       : tokens.color.text.success

  // Round negativeSentimentPct to nearest integer for display
  const pctDisplay = negativeSentimentPct !== undefined
    ? `${Math.round(negativeSentimentPct)}%`
    : null

  const mentionsDisplay = totalMentions !== undefined
    ? totalMentions.toLocaleString()
    : null

  return (
    <article
      className="flex flex-col flex-1"
      style={{
        backgroundColor: bgColor,
        border: `2px solid ${borderColor}`,
        borderRadius: tokens.component.card.radius,
        minWidth: 0,
      }}
    >
      {/* ── Card header: icon + title / badge ── */}
      <div
        className="flex flex-row items-center justify-between"
        style={{
          paddingLeft:   tokens.component.card.headerPaddingX,
          paddingRight:  tokens.component.card.headerPaddingX,
          paddingTop:    tokens.component.card.headerPaddingTop,
          paddingBottom: tokens.component.card.headerPaddingBottom,
          gap: tokens.spacing.sm,
        }}
      >
        {/* Left: icon + title */}
        <div className="flex flex-row items-center" style={{ gap: tokens.spacing.sm }}>
          <AlertTriangle
            size={16}
            style={{ color: iconColor, flexShrink: 0 }}
            aria-hidden="true"
          />
          <h3
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['heading-xs'],
              fontWeight: tokens.typography.weight.bold,
              lineHeight: tokens.typography.lineHeight.tight,
              color: tokens.color.text.primary,
              margin: 0,
            }}
          >
            Risk Level
          </h3>
        </div>

        {/* Right: solid filled badge */}
        <Badge label={riskLevel} variant={riskToBadgeVariant(riskLevel)} />
      </div>

      {/* ── Card body ── */}
      <div
        className="flex flex-col"
        style={{
          paddingLeft:   tokens.component.card.contentPaddingX,
          paddingRight:  tokens.component.card.contentPaddingX,
          paddingBottom: tokens.spacing.default,
          gap: tokens.spacing.sm,
        }}
      >
        {/* Large metric row */}
        {pctDisplay && mentionsDisplay && (
          <div
            className="flex flex-row items-baseline"
            style={{ gap: tokens.spacing.sm }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontSize: '2.25rem',   // ≈ text-4xl = 36px
                fontWeight: tokens.typography.weight.bold,
                lineHeight: 1,
                color: metricColor,
              }}
            >
              {pctDisplay}
            </span>
            <span
              style={{
                fontFamily: FONT,
                fontSize: tokens.typography.size['body-base'],
                fontWeight: tokens.typography.weight.medium,
                color: metricColor,
                opacity: 0.8,
              }}
            >
              of {mentionsDisplay} mentions
            </span>
          </div>
        )}

        {/* Description */}
        <p
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['body-sm'],
            lineHeight: tokens.typography.lineHeight.normal,
            color: tokens.color.text.primary,
            margin: 0,
          }}
        >
          {description}
        </p>

        {/* Thresholds section */}
        {thresholds.length > 0 && (
          <div className="flex flex-col" style={{ gap: tokens.spacing.xs }}>
            <span
              style={{
                fontFamily: FONT,
                fontSize: tokens.typography.size['label-xs'],
                fontWeight: tokens.typography.weight.semibold,
                color: tokens.color.text.tertiary,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Thresholds
            </span>
            <ul
              className="flex flex-col"
              style={{ paddingLeft: 0, listStyle: 'none', margin: 0, gap: tokens.spacing.xs }}
            >
              {thresholds.map((t, i) => (
                <li
                  key={i}
                  className="flex flex-row items-start"
                  style={{
                    gap: 4,
                    fontFamily: FONT,
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
      </div>
    </article>
  )
}
