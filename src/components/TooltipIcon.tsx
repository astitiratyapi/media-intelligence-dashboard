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
            top: '100%',
            right: 0,
            marginTop: 6,
            minWidth: 280,
            maxWidth: 320,
            width: 'auto',
            zIndex: 200,
            backgroundColor: '#ffffff',
            border: '0.5px solid #e5e7eb',
            borderRadius: 16,
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            padding: '12px 16px',
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: 400,
            color: tokens.color.text.primary,
            lineHeight: 1.5,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            pointerEvents: 'none',
          }}
        >
          {text}
        </div>
      )}
    </div>
  )
}
