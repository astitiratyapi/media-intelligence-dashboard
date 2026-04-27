import { Heart, ChevronRight, TrendingDown, TrendingUp } from 'lucide-react'
import { tokens, foundation } from '../tokens'

// ─── Gauge SVG ────────────────────────────────────────────────────────────────
// Resizing: fixed 160×160px (hug content)
// Auto Layout equivalent: self-contained visual, centered in card body

interface GaugeProps {
  score: number
  max?: number
  /** Gauge color tier: resolved by score range outside */
  color: string
}

function GaugeArc({ score, max = 100, color }: GaugeProps) {
  const RADIUS = 36
  const CX = 50
  const CY = 50
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS   // ≈226.19
  const GAUGE_DEGREES = 270
  const GAUGE_ARC = (GAUGE_DEGREES / 360) * CIRCUMFERENCE // ≈169.65
  const GAP = CIRCUMFERENCE - GAUGE_ARC         // ≈56.55

  const filled = Math.min(Math.max(score / max, 0), 1) * GAUGE_ARC

  // rotate(135) starts arc at 7:30 o'clock in SVG (y-axis down)
  // The 270° arc sweeps through 12 o'clock, ending at 4:30 o'clock
  const rotation = `rotate(135, ${CX}, ${CY})`

  return (
    <svg
      viewBox="0 0 100 100"
      width={96}
      height={96}
      aria-hidden="true"
    >
      {/* Background track */}
      <circle
        cx={CX} cy={CY} r={RADIUS}
        fill="none"
        stroke={foundation.color.neutral[200]}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${GAUGE_ARC} ${GAP}`}
        transform={rotation}
      />
      {/* Score fill */}
      <circle
        cx={CX} cy={CY} r={RADIUS}
        fill="none"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${filled} ${CIRCUMFERENCE - filled}`}
        transform={rotation}
        style={{ transition: 'stroke-dasharray 0.6s ease-out' }}
      />
    </svg>
  )
}

// ─── Score color helper ───────────────────────────────────────────────────────

function resolveScoreColor(score: number): { gauge: string; label: string; status: string } {
  if (score >= 70) {
    return {
      gauge: tokens.color.surface.success,
      label: tokens.color.text.success,
      status: 'Good',
    }
  }
  if (score >= 40) {
    return {
      gauge: foundation.color.yellow[500],   // warning / needs attention
      label: foundation.color.yellow[700],
      status: 'Needs Attention',
    }
  }
  return {
    gauge: tokens.color.surface.error,
    label: tokens.color.text.error,
    status: 'Critical',
  }
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ReputationHealthProps {
  score: number
  maxScore?: number
  previousScore: number
  onViewDrivers?: () => void
}

// ─── Component ────────────────────────────────────────────────────────────────
// Resizing: fill container horizontally (flex-1), hug content vertically
// Auto Layout: flex-col, gap = spacing/md (12px)

export function ReputationHealthCard({
  score,
  maxScore = 100,
  previousScore,
  onViewDrivers,
}: ReputationHealthProps) {
  const delta = score - previousScore
  const isPositive = delta >= 0
  const scoreStyle = resolveScoreColor(score)

  return (
    // Card container: fill × hug, flex-col, border, radius/default
    <article
      className="flex flex-col flex-1 bg-surface-primary border border-edge-primary rounded-token-default shadow-xs overflow-hidden"
      style={{ minWidth: 0 }}
    >
      {/* Card header: flex-row, gap/md, padding = headerPaddingX × headerPaddingTop */}
      <div
        className="flex flex-row items-center gap-2"
        style={{
          paddingLeft: tokens.component.card.headerPaddingX,
          paddingRight: tokens.component.card.headerPaddingX,
          paddingTop: tokens.component.card.headerPaddingTop,
          paddingBottom: tokens.component.card.headerPaddingBottom,
        }}
      >
        <Heart
          size={16}
          style={{ color: tokens.color.icon.error, flexShrink: 0 }}
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
          Reputation Health
        </h3>
      </div>

      {/* Card body: flex-col, centered, flex-1 so it grows to fill stretch height */}
      <div
        className="flex flex-col flex-1 items-center justify-center gap-2"
        style={{
          paddingLeft: tokens.component.card.contentPaddingX,
          paddingRight: tokens.component.card.contentPaddingX,
          paddingBottom: tokens.spacing.default,
        }}
      >
        {/* Previous score row: flex-row, gap/xs */}
        <div
          className="flex flex-row items-center gap-1 self-center"
          style={{
            fontSize: tokens.typography.size['body-sm'],
            color: tokens.color.text.tertiary,
          }}
        >
          <span>Previous: {previousScore}</span>
          {isPositive ? (
            <TrendingUp size={12} style={{ color: tokens.color.text.success }} />
          ) : (
            <TrendingDown size={12} style={{ color: tokens.color.text.error }} />
          )}
          <span style={{ color: isPositive ? tokens.color.text.success : tokens.color.text.error }}>
            {isPositive ? '+' : ''}{delta.toFixed(1)}
          </span>
        </div>

        {/* Gauge + score overlay: relative container, hug content */}
        <div className="relative flex items-center justify-center" style={{ width: 96, height: 96 }}>
          <GaugeArc score={score} max={maxScore} color={scoreStyle.gauge} />
          {/* Score label: absolute centered inside gauge */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="font-bold leading-none"
              style={{
                fontSize: tokens.typography.size['heading-lg'],
                color: tokens.color.text.primary,
              }}
            >
              {score}
            </span>
            <span
              style={{
                fontSize: tokens.typography.size['body-sm'],
                color: tokens.color.text.tertiary,
              }}
            >
              /{maxScore}
            </span>
          </div>
        </div>

        {/* Status label: hug content, centered */}
        <span
          className="font-semibold"
          style={{
            fontSize: tokens.typography.size['body-base'],
            color: scoreStyle.label,
          }}
        >
          {scoreStyle.status}
        </span>

        {/* View Drivers link: flex-row, gap/xs, inline */}
        <button
          onClick={onViewDrivers}
          className="flex flex-row items-center gap-1 hover:underline focus:outline-none"
          style={{
            fontSize: tokens.typography.size['body-sm'],
            color: tokens.color.text.brand,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          View Drivers
          <ChevronRight size={12} />
        </button>
      </div>
    </article>
  )
}
