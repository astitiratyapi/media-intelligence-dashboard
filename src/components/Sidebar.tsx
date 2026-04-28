import { useState } from 'react'
import {
  LayoutDashboard,
  Database,
  FileText,
  ClipboardList,
  ArrowLeft,
  User,
  type LucideIcon,
} from 'lucide-react'

// ─── Sidebar Design Tokens ────────────────────────────────────────────────────
// Source: A'raf DS - Development → Component collection → sidebar/*
// All values are RESOLVED from Figma variable aliases (dark variant)
//
// Light variant tokens (for reference):
//   sidebar/bg             → surface/default/primary    → #FFFFFF
// Dark variant tokens (used here — matches screenshot):
//   sidebar/bg-dark        → surface/default/inverse    → #111827

const sidebarTokens = {
  // ── Layout ────────────────────────────────────────────────────────────────
  width: 256,                  // fixed sidebar width (px)

  // ── Colors — light variant ────────────────────────────────────────────────
  bg: '#F9FAFB',               // surface/default/secondary → neutral/50
  borderRight: '#E5E7EB',      // border/default/secondary → neutral/200

  // ── Font — explicitly set by Figma ───────────────────────────────────────
  fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    paddingX: 16,
    paddingY: 20,
    borderBottom: '#E5E7EB',   // border/default/secondary → neutral/200
  },

  // ── Nav section wrapper ───────────────────────────────────────────────────
  section: {
    paddingX: 8,
    paddingY: 8,
    labelText: '#6B7280',      // text/default/tertiary → neutral/500
    labelSize: 11,
  },

  // ── Nav items ─────────────────────────────────────────────────────────────
  item: {
    paddingX: 8,
    paddingY: 8,
    gap: 8,
    radius: 8,
    minHeight: 36,

    // Default state
    text: '#374151',           // text/default/primary → neutral/700 (readable on light bg)
    icon: '#6B7280',           // icon/default/secondary → neutral/500
    textDisabled: '#9CA3AF',   // text/state/disabled → neutral/400

    // Active state — soft blue on light bg
    bgActive: 'rgba(2, 135, 245, 0.08)',   // brand blue tint on light bg
    bgActiveSolid: '#EFF6FF',              // blue/50 — info-subtle surface
    textActive: '#004990',                 // text/default/brand → polynesianBlue/800
    iconActive: '#0069D2',                 // brand/polynesianBlue/600

    // Hover state
    bgHover: 'rgba(0, 0, 0, 0.04)',        // subtle dark tint on light bg

    // Active left-edge indicator
    activeIndicatorColor: '#0287F5',       // brand/polynesianBlue/500
    activeIndicatorWidth: 2,
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    paddingX: 16,
    paddingY: 16,
    borderTop: '#E5E7EB',      // border/default/secondary → neutral/200
    poweredByText: '#9CA3AF',  // text/default/tertiary → neutral/400
    poweredBySize: 11,
    brandText: '#374151',      // text/default/secondary → neutral/700
    brandSize: 12,
  },

  // ── Logo area ─────────────────────────────────────────────────────────────
  logo: {
    badrText: '#111827',        // text/default/primary → neutral/900
    badrSize: 18,
    badrWeight: 700,
    interactiveText: '#6B7280', // text/default/tertiary → neutral/500
    interactiveSize: 10,
    dividerColor: '#E5E7EB',    // border/default/secondary → neutral/200
    pageTitleText: '#111827',   // text/default/primary → neutral/900
    pageTitleSize: 14,
    pageTitleWeight: 600,
    pageSubtitleText: '#9CA3AF', // text/default/tertiary → neutral/400
    pageSubtitleSize: 11,
  },
} as const

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  id: string
  label: string
  /** Lucide icon component */
  icon: LucideIcon
  href?: string
  disabled?: boolean
}

export interface SidebarProps {
  /** Main navigation items rendered in the middle section */
  navItems: NavItem[]
  /** ID of the currently active nav item */
  activeItemId: string
  /** Callback when a nav item is clicked */
  onNavigate: (id: string) => void
  /** Page title shown in the logo area header (e.g. "Dashboard") */
  currentPageTitle: string
  /** Page subtitle shown in the logo area header (e.g. "Media Intelligence") */
  currentPageSubtitle: string
  /** Callback for the "Back to Programs" bottom action */
  onBackToPrograms?: () => void
}

// ─── NavItemRow ───────────────────────────────────────────────────────────────
// Resizing: fill sidebar width (w-full), hug content vertically
// Auto Layout: flex-row, gap = item.gap, padding = item.paddingX × item.paddingY

interface NavItemRowProps {
  item: NavItem
  isActive: boolean
  onClick: () => void
}

function NavItemRow({ item, isActive, onClick }: NavItemRowProps) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = item.icon

  const bgColor = isActive
    ? sidebarTokens.item.bgActive
    : isHovered && !item.disabled
    ? sidebarTokens.item.bgHover
    : 'transparent'

  const textColor = item.disabled
    ? sidebarTokens.item.textDisabled
    : isActive
    ? sidebarTokens.item.textActive
    : sidebarTokens.item.text

  const iconColor = item.disabled
    ? sidebarTokens.item.textDisabled
    : isActive
    ? sidebarTokens.item.iconActive
    : sidebarTokens.item.icon

  return (
    // Item row: flex-row, align-center, gap = item.gap (8px), fill width
    <button
      type="button"
      disabled={item.disabled}
      onClick={!item.disabled ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-current={isActive ? 'page' : undefined}
      className="w-full text-left"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: sidebarTokens.item.gap,
        paddingLeft: sidebarTokens.item.paddingX,
        paddingRight: sidebarTokens.item.paddingX,
        paddingTop: sidebarTokens.item.paddingY,
        paddingBottom: sidebarTokens.item.paddingY,
        minHeight: sidebarTokens.item.minHeight,
        borderRadius: sidebarTokens.item.radius,
        backgroundColor: bgColor,
        border: 'none',
        cursor: item.disabled ? 'not-allowed' : 'pointer',
        fontFamily: sidebarTokens.fontFamily,
        transition: 'background-color 120ms ease, color 120ms ease',
        // Active left-edge indicator via box-shadow (no layout shift)
        boxShadow: isActive
          ? `inset ${sidebarTokens.item.activeIndicatorWidth}px 0 0 0 ${sidebarTokens.item.activeIndicatorColor}`
          : 'none',
        position: 'relative',
      }}
    >
      {/* Icon: flex-shrink-0, sized to icon/size/sm */}
      <Icon
        size={16}
        strokeWidth={isActive ? 2.5 : 2}
        style={{
          color: iconColor,
          flexShrink: 0,
          transition: 'color 120ms ease',
        }}
        aria-hidden="true"
      />

      {/* Label: body-base, truncate overflow */}
      <span
        className="truncate"
        style={{
          fontSize: 14,              // typography/size/body-base
          fontWeight: isActive ? 600 : 400, // semibold active, regular default
          lineHeight: 1.5,
          color: textColor,
          transition: 'color 120ms ease',
        }}
      >
        {item.label}
      </span>
    </button>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
// Resizing: fixed width (256px), fill height (h-screen)
// Auto Layout: flex-col, no gap between sections (sections handle own spacing)

export function Sidebar({
  navItems,
  activeItemId,
  onNavigate,
  currentPageTitle,
  currentPageSubtitle,
  onBackToPrograms,
}: SidebarProps) {
  return (
    // Sidebar shell: flex-col, fixed width, full height, dark bg, right border
    <aside
      style={{
        width: sidebarTokens.width,
        minWidth: sidebarTokens.width,
        maxWidth: sidebarTokens.width,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: sidebarTokens.bg,
        borderRight: `1px solid ${sidebarTokens.borderRight}`,
        fontFamily: sidebarTokens.fontFamily,
        flexShrink: 0,
        overflowY: 'auto',
        scrollbarWidth: 'none',
      }}
      aria-label="Primary navigation"
    >
      {/* ── Logo / Header area ──────────────────────────────────────────── */}
      {/* Resizing: fill width, hug height */}
      {/* Auto Layout: flex-row, align-center, gap/sm, padding header.paddingX × header.paddingY */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          paddingLeft: sidebarTokens.header.paddingX,
          paddingRight: sidebarTokens.header.paddingX,
          paddingTop: sidebarTokens.header.paddingY,
          paddingBottom: sidebarTokens.header.paddingY,
          borderBottom: `1px solid ${sidebarTokens.header.borderBottom}`,
          flexShrink: 0,
        }}
      >
        {/* Brand wordmark: flex-col, gap 0, hug content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            flexShrink: 0,
          }}
        >
          {/* "BADR" — bold wordmark */}
          <span
            style={{
              fontSize: sidebarTokens.logo.badrSize,
              fontWeight: sidebarTokens.logo.badrWeight,
              lineHeight: 1.2,
              color: sidebarTokens.logo.badrText,
              letterSpacing: '-0.01em',
              fontFamily: sidebarTokens.fontFamily,
            }}
          >
            BADR
          </span>
          {/* "interactive" — tagline below */}
          <span
            style={{
              fontSize: sidebarTokens.logo.interactiveSize,
              fontWeight: 400,
              lineHeight: 1.2,
              color: sidebarTokens.logo.interactiveText,
              fontFamily: sidebarTokens.fontFamily,
              letterSpacing: '0.02em',
              textTransform: 'lowercase',
            }}
          >
            interactive
          </span>
        </div>

        {/* Vertical divider between logo and page title */}
        <div
          aria-hidden="true"
          style={{
            width: 1,
            height: 28,
            backgroundColor: sidebarTokens.logo.dividerColor,
            flexShrink: 0,
          }}
        />

        {/* Page context: flex-col, gap 1, min-w-0 for truncation */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            minWidth: 0,
            flex: 1,
          }}
        >
          {/* Page title — e.g. "Dashboard" */}
          <span
            className="truncate"
            style={{
              fontSize: sidebarTokens.logo.pageTitleSize,
              fontWeight: sidebarTokens.logo.pageTitleWeight,
              lineHeight: 1.25,
              color: sidebarTokens.logo.pageTitleText,
              fontFamily: sidebarTokens.fontFamily,
            }}
          >
            {currentPageTitle}
          </span>
          {/* Page subtitle — e.g. "Media Intelligence" */}
          <span
            className="truncate"
            style={{
              fontSize: sidebarTokens.logo.pageSubtitleSize,
              lineHeight: 1.2,
              color: sidebarTokens.logo.pageSubtitleText,
              fontFamily: sidebarTokens.fontFamily,
            }}
          >
            {currentPageSubtitle}
          </span>
        </div>
      </div>

      {/* ── Main navigation section ─────────────────────────────────────── */}
      {/* Resizing: fill width, hug height. flex-col, gap 0 between items */}
      {/* Auto Layout: flex-col, paddingX = section.paddingX, paddingY = section.paddingY */}
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,                              // 2px between items — tight rhythm
          paddingLeft: sidebarTokens.section.paddingX,
          paddingRight: sidebarTokens.section.paddingX,
          paddingTop: sidebarTokens.section.paddingY,
          paddingBottom: sidebarTokens.section.paddingY,
          flex: 1,                             // fills remaining vertical space
        }}
        aria-label="Main menu"
      >
        {navItems.map((item) => (
          <NavItemRow
            key={item.id}
            item={item}
            isActive={item.id === activeItemId}
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </nav>

      {/* ── Back to Programs ────────────────────────────────────────────── */}
      {/* Resizing: fill width, hug height */}
      {/* Auto Layout: fill-width, flex-row, separate action at bottom of nav */}
      <div
        style={{
          paddingLeft: sidebarTokens.section.paddingX,
          paddingRight: sidebarTokens.section.paddingX,
          paddingBottom: 4,
          flexShrink: 0,
        }}
      >
        <NavItemRow
          item={{
            id: '__back',
            label: 'Back to Programs',
            icon: ArrowLeft,
          }}
          isActive={false}
          onClick={() => onBackToPrograms?.()}
        />
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      {/* Resizing: fill width, hug content vertically */}
      {/* Auto Layout: flex-col, gap/xs, paddingX = footer.paddingX, paddingY = footer.paddingY */}
      <footer
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingLeft: sidebarTokens.footer.paddingX,
          paddingRight: sidebarTokens.footer.paddingX,
          paddingTop: sidebarTokens.footer.paddingY,
          paddingBottom: sidebarTokens.footer.paddingY,
          borderTop: `1px solid ${sidebarTokens.footer.borderTop}`,
          flexShrink: 0,
        }}
      >
        {/* Avatar placeholder */}
        <div
          aria-hidden="true"
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            backgroundColor: '#E5E7EB',
            border: '1px solid #D1D5DB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <User size={14} style={{ color: '#9CA3AF' }} />
        </div>

        {/* "Powered by" + brand: flex-col, gap 0 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontSize: sidebarTokens.footer.poweredBySize,
              color: sidebarTokens.footer.poweredByText,
              fontFamily: sidebarTokens.fontFamily,
              lineHeight: 1.3,
            }}
          >
            Powered by
          </span>
          <span
            style={{
              fontSize: sidebarTokens.footer.brandSize,
              fontWeight: 600,
              color: sidebarTokens.footer.brandText,
              fontFamily: sidebarTokens.fontFamily,
              lineHeight: 1.3,
            }}
          >
            BADR Interactive
          </span>
        </div>
      </footer>
    </aside>
  )
}

// ─── Default nav items ────────────────────────────────────────────────────────
// Export for use in App.tsx — icons map to screenshot reference

export const defaultNavItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'data-sources',
    label: 'Data Sources',
    icon: Database,
  },
  {
    id: 'ai-reports',
    label: 'AI Reports',
    icon: FileText,
  },
  {
    id: 'custom-report',
    label: 'Custom Report',
    icon: ClipboardList,
  },
]
