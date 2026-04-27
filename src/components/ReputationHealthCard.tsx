import { useState } from 'react'
import { Heart, ChevronRight, TrendingDown, TrendingUp, X } from 'lucide-react'
import { tokens, foundation } from '../tokens'

// ─── Gauge SVG ────────────────────────────────────────────────────────────────

interface GaugeProps {
  score: number
  max?: number
  color: string
}

function GaugeArc({ score, max = 100, color }: GaugeProps) {
  const RADIUS = 36
  const CX = 50
  const CY = 50
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS
  const GAUGE_DEGREES = 270
  const GAUGE_ARC = (GAUGE_DEGREES / 360) * CIRCUMFERENCE
  const GAP = CIRCUMFERENCE - GAUGE_ARC

  const filled = Math.min(Math.max(score / max, 0), 1) * GAUGE_ARC
  const rotation = `rotate(135, ${CX}, ${CY})`

  return (
    <svg viewBox="0 0 100 100" width={96} height={96} aria-hidden="true">
      <circle
        cx={CX} cy={CY} r={RADIUS}
        fill="none"
        stroke={foundation.color.neutral[200]}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${GAUGE_ARC} ${GAP}`}
        transform={rotation}
      />
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
  if (score >= 70) return { gauge: tokens.color.surface.success, label: tokens.color.text.success, status: 'Good' }
  if (score >= 40) return { gauge: foundation.color.yellow[500], label: foundation.color.yellow[700], status: 'Needs Attention' }
  return { gauge: tokens.color.surface.error, label: tokens.color.text.error, status: 'Critical' }
}

// ─── Score Drivers modal data ─────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"

const SCORE_DRIVERS = [
  { name: 'Sentiment Balance',  desc: '12% positive, 24% negative',          score: 44,   weight: 'w: 60%' },
  { name: 'Volume Volatility',  desc: 'Volatility index: 0.8',               score: 92.1, weight: 'w: 20%' },
  { name: 'Tier-1 Media Share', desc: '53% of mentions in Tier-1 outlets',   score: 100,  weight: 'w: 20%' },
]

// ─── Driver card ──────────────────────────────────────────────────────────────

function DriverCard({ name, desc, score, weight }: typeof SCORE_DRIVERS[0]) {
  const isHigh   = score >= 60
  const scoreColor = isHigh ? tokens.color.text.success : tokens.color.text.error

  return (
    <div
      style={{
        backgroundColor: tokens.color.surface.secondary,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.default,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: tokens.spacing.sm,
      }}
    >
      {/* Left: name + description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['body-base'],
            fontWeight: tokens.typography.weight.bold,
            color: tokens.color.text.primary,
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['body-sm'],
            color: tokens.color.text.tertiary,
          }}
        >
          {desc}
        </span>
      </div>

      {/* Right: score + weight */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 2,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['heading-md'],
            fontWeight: tokens.typography.weight.bold,
            color: scoreColor,
            lineHeight: 1,
          }}
        >
          {score}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: tokens.typography.size['body-sm'],
            color: tokens.color.text.tertiary,
          }}
        >
          {weight}
        </span>
      </div>
    </div>
  )
}

// ─── Score Drivers modal ──────────────────────────────────────────────────────

function ScoreDriversModal({ score, onClose }: { score: number; onClose: () => void }) {
  return (
    /* Overlay */
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      {/* Modal card — stop propagation so clicks inside don't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: tokens.color.surface.primary,
          borderRadius: tokens.radius.xl,
          padding: tokens.spacing.xl,
          width: 420,
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacing.default,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Header row: title + X */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2
            id="modal-title"
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['heading-sm'],
              fontWeight: tokens.typography.weight.bold,
              color: tokens.color.text.primary,
              margin: 0,
            }}
          >
            Score Drivers
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: tokens.color.icon.secondary,
              display: 'flex',
              alignItems: 'center',
              padding: 4,
              borderRadius: tokens.radius.sm,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: tokens.color.border.secondary }} />

        {/* Health score sub-label */}
        <p style={{ fontFamily: FONT, fontSize: tokens.typography.size['body-base'], color: tokens.color.text.secondary, margin: 0 }}>
          Health Score:{' '}
          <strong style={{ color: tokens.color.text.primary, fontWeight: tokens.typography.weight.bold }}>
            {score}
          </strong>
        </p>

        {/* Driver cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.sm }}>
          {SCORE_DRIVERS.map((d) => (
            <DriverCard key={d.name} {...d} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ReputationHealthProps {
  score: number
  maxScore?: number
  previousScore: number
  onViewDrivers?: () => void
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ReputationHealthCard({
  score,
  maxScore = 100,
  previousScore,
  onViewDrivers,
}: ReputationHealthProps) {
  const [isOpen, setIsOpen] = useState(false)

  const delta = score - previousScore
  const isPositive = delta >= 0
  const scoreStyle = resolveScoreColor(score)

  function handleViewDrivers() {
    setIsOpen(true)
    onViewDrivers?.()
  }

  return (
    <>
      <article
        className="flex flex-col flex-1"
        style={{
          backgroundColor: tokens.component.card.bg,
          border: `2px solid ${tokens.color.border.primary}`,
          borderRadius: tokens.component.card.radius,
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        {/* Card header */}
        <div
          className="flex flex-row items-center gap-2"
          style={{
            paddingLeft: tokens.component.card.headerPaddingX,
            paddingRight: tokens.component.card.headerPaddingX,
            paddingTop: tokens.component.card.headerPaddingTop,
            paddingBottom: tokens.component.card.headerPaddingBottom,
          }}
        >
          <Heart size={16} style={{ color: tokens.color.icon.error, flexShrink: 0 }} aria-hidden="true" />
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

        {/* Card body */}
        <div
          className="flex flex-col flex-1 items-center justify-center gap-2"
          style={{
            paddingLeft: tokens.component.card.contentPaddingX,
            paddingRight: tokens.component.card.contentPaddingX,
            paddingBottom: tokens.spacing.default,
          }}
        >
          {/* Previous score */}
          <div
            className="flex flex-row items-center gap-1 self-center"
            style={{ fontSize: tokens.typography.size['body-sm'], color: tokens.color.text.tertiary }}
          >
            <span>Previous: {previousScore}</span>
            {isPositive
              ? <TrendingUp size={12} style={{ color: tokens.color.text.success }} />
              : <TrendingDown size={12} style={{ color: tokens.color.text.error }} />}
            <span style={{ color: isPositive ? tokens.color.text.success : tokens.color.text.error }}>
              {isPositive ? '+' : ''}{delta.toFixed(1)}
            </span>
          </div>

          {/* Gauge */}
          <div className="relative flex items-center justify-center" style={{ width: 96, height: 96 }}>
            <GaugeArc score={score} max={maxScore} color={scoreStyle.gauge} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="font-bold leading-none"
                style={{ fontSize: tokens.typography.size['heading-lg'], color: tokens.color.text.primary }}
              >
                {score}
              </span>
              <span style={{ fontSize: tokens.typography.size['body-sm'], color: tokens.color.text.tertiary }}>
                /{maxScore}
              </span>
            </div>
          </div>

          {/* Status */}
          <span
            className="font-semibold"
            style={{ fontSize: tokens.typography.size['body-base'], color: scoreStyle.label }}
          >
            {scoreStyle.status}
          </span>

          {/* View Drivers link */}
          <button
            onClick={handleViewDrivers}
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

      {/* Score Drivers modal */}
      {isOpen && (
        <ScoreDriversModal score={score} onClose={() => setIsOpen(false)} />
      )}
    </>
  )
}
