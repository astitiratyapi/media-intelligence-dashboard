import { useState } from 'react'
import { Info } from 'lucide-react'
import { tokens } from '../tokens'

const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"

export interface TooltipIconProps {
  text: string
}

export function TooltipIcon({ text }: TooltipIconProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {/* Trigger icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 20,
          height: 20,
          borderRadius: '50%',
          border: `1px solid ${visible ? tokens.color.border.info : tokens.color.border.secondary}`,
          color: visible ? tokens.color.icon.info : tokens.color.text.tertiary,
          cursor: 'default',
          transition: 'color 150ms ease, border-color 150ms ease',
          flexShrink: 0,
        }}
        aria-label="More info"
      >
        <Info size={11} strokeWidth={2} aria-hidden="true" />
      </div>

      {/* Bubble */}
      {visible && (
        <div
          role="tooltip"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: 0,
            zIndex: 200,
            backgroundColor: '#ffffff',
            border: '1px solid #E5E7EB',
            borderRadius: 16,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)',
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 12,
            paddingBottom: 12,
            maxWidth: 240,
            fontFamily: FONT,
            fontSize: tokens.typography.size['body-sm'],
            fontWeight: tokens.typography.weight.regular,
            color: tokens.color.text.primary,
            lineHeight: tokens.typography.lineHeight.relaxed,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            pointerEvents: 'none',
          }}
        >
          {text}
        </div>
      )}
    </div>
  )
}
