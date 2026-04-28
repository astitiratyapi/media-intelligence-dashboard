import { useState, type ReactNode } from 'react'
import { MessageSquare } from 'lucide-react'
import { tokens } from '../tokens'
import { AccountCard, type Account } from './AccountCard'
import { TooltipIcon } from './TooltipIcon'

// ─── Types ────────────────────────────────────────────────────────────────────

export type PlatformId = 'facebook' | 'instagram' | 'tiktok'

export interface Platform {
  id: PlatformId
  label: string
  icon: ReactNode
  accounts: Account[]
}

export interface ChannelPerformanceSectionProps {
  platforms: Platform[]
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
const CARD_RADIUS = 10
const CARD_PADDING = tokens.spacing.xl  // 24px

// ─── Tab bar ──────────────────────────────────────────────────────────────────

function PlatformTab({
  platform,
  isActive,
  onClick,
}: {
  platform: Platform
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-row items-center"
      style={{
        fontFamily: FONT,
        fontSize: tokens.typography.size['body-sm'],
        fontWeight: isActive ? tokens.typography.weight.bold : tokens.typography.weight.medium,
        color: isActive ? tokens.color.text.brand : tokens.color.text.secondary,
        background: 'none',
        border: 'none',
        borderBottom: isActive
          ? `2px solid ${tokens.color.surface.brand}`
          : '2px solid transparent',
        marginBottom: -1,
        paddingLeft: tokens.spacing.md,
        paddingRight: tokens.spacing.md,
        paddingTop: tokens.spacing.default,
        paddingBottom: tokens.spacing.default,
        cursor: 'pointer',
        gap: tokens.spacing.xs,
        whiteSpace: 'nowrap',
        transition: 'color 150ms ease',
      }}
    >
      {platform.icon}
      {platform.label}
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ChannelPerformanceSection({ platforms }: ChannelPerformanceSectionProps) {
  const [activeId, setActiveId] = useState<PlatformId>(platforms[0]?.id ?? 'facebook')
  const activePlatform = platforms.find((p) => p.id === activeId)

  return (
    <section
      className="flex flex-col w-full"
      style={{ gap: tokens.spacing.lg }}
      aria-labelledby="channel-perf-heading"
    >
      {/* Section header */}
      <div className="flex flex-row items-center" style={{ gap: tokens.spacing.md }}>
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 32,
            height: 32,
            backgroundColor: tokens.color.surface.infoSubtle,
            borderRadius: tokens.radius.lg,
            color: tokens.color.icon.info,
          }}
          aria-hidden="true"
        >
          <MessageSquare size={16} />
        </div>
        <div className="flex flex-col flex-1" style={{ gap: 2 }}>
          <h2
            id="channel-perf-heading"
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['heading-sm'],
              fontWeight: tokens.typography.weight.bold,
              color: tokens.color.text.primary,
              margin: 0,
              lineHeight: tokens.typography.lineHeight.tight,
            }}
          >
            Channel Performance
          </h2>
          <p
            style={{
              fontFamily: FONT,
              fontSize: tokens.typography.size['body-sm'],
              color: tokens.color.text.tertiary,
              margin: 0,
            }}
          >
            Live engagement metrics &amp; top content from your key accounts
          </p>
        </div>
        <TooltipIcon text="Engagement metrics and top content from monitored social media accounts." />
      </div>

      {/* Card shell */}
      <div
        className="flex flex-col"
        style={{
          backgroundColor: tokens.component.card.bg,
          border: `1px solid ${tokens.component.card.border}`,
          borderRadius: CARD_RADIUS,
          overflow: 'hidden',
        }}
      >
        {/* Tab bar */}
        <div
          className="flex flex-row items-center"
          style={{
            paddingLeft: tokens.spacing.sm,
            paddingRight: tokens.spacing.sm,
            borderBottom: `1px solid ${tokens.color.border.secondary}`,
          }}
        >
          {platforms.map((platform) => (
            <PlatformTab
              key={platform.id}
              platform={platform}
              isActive={platform.id === activeId}
              onClick={() => setActiveId(platform.id)}
            />
          ))}
        </div>

        {/* Account cards — 3-column grid, each card fills one column */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            padding: CARD_PADDING,
            gap: tokens.spacing.default,
          }}
        >
          {activePlatform?.accounts.map((account) => (
            <AccountCard key={account.handle} {...account} />
          ))}

          {(!activePlatform || activePlatform.accounts.length === 0) && (
            <p
              style={{
                fontFamily: FONT,
                fontSize: tokens.typography.size['body-sm'],
                color: tokens.color.text.tertiary,
              }}
            >
              No accounts available for this platform.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
