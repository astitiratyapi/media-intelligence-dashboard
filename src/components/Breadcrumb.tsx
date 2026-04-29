import { tokens } from '../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"

// ─── Component ────────────────────────────────────────────────────────────────

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-row items-center"
      style={{ gap: 0 }}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1

        return (
          <span key={i} className="flex flex-row items-center">
            {/* Separator — skip for first item */}
            {i > 0 && (
              <span
                aria-hidden="true"
                style={{
                  fontFamily: FONT,
                  fontSize:   tokens.typography.size['body-sm'],
                  color:      tokens.color.text.tertiary,
                  marginLeft: 4,
                  marginRight: 4,
                  userSelect: 'none',
                }}
              >
                ›
              </span>
            )}

            {/* Last item — current page, no link */}
            {isLast ? (
              <span
                aria-current="page"
                style={{
                  fontFamily: FONT,
                  fontSize:   tokens.typography.size['body-sm'],
                  fontWeight: tokens.typography.weight.medium,
                  color:      tokens.color.text.primary,
                }}
              >
                {item.label}
              </span>
            ) : (
              /* Earlier items — clickable */
              <a
                href={item.href ?? '#'}
                style={{
                  fontFamily:     FONT,
                  fontSize:       tokens.typography.size['body-sm'],
                  fontWeight:     tokens.typography.weight.regular,
                  color:          tokens.color.text.secondary,
                  textDecoration: 'none',
                  cursor:         'pointer',
                  transition:     'color 150ms ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline'
                  ;(e.currentTarget as HTMLAnchorElement).style.color = tokens.color.text.primary
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none'
                  ;(e.currentTarget as HTMLAnchorElement).style.color = tokens.color.text.secondary
                }}
              >
                {item.label}
              </a>
            )}
          </span>
        )
      })}
    </nav>
  )
}
