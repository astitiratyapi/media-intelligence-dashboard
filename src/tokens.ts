// ─── Figma Design System Tokens ─────────────────────────────────────────────
// Source: A'raf DS - Development (Kb4Va8rKGfmwiLfDmdsawq)
// Collections: Foundation (colors, spacing, radius, typography) + Token (semantic)

// ── Foundation ────────────────────────────────────────────────────────────────

export const foundation = {
  color: {
    brand: {
      pictonBlue: {
        50: '#F1F9FE', 100: '#E2F3FC', 200: '#BEE7F9', 300: '#84D3F5',
        400: '#43BEED', 500: '#1BA8DF', 600: '#0D85BC', 700: '#0C6A98',
        800: '#0E5A7E', 900: '#124B68', 950: '#0C3045',
      },
      polynesianBlue: {
        50: '#EFF7FF', 100: '#DEEDFF', 200: '#B6DCFF', 300: '#76C1FF',
        400: '#2DA3FF', 500: '#0287F5', 600: '#0069D2', 700: '#0054AA',
        800: '#004990', 900: '#073B73', 950: '#04254D',
      },
    },
    neutral: {
      white: '#FFFFFF',
      50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB', 300: '#D1D5DB',
      400: '#9CA3AF', 500: '#6B7280', 600: '#4B5563', 700: '#374151',
      800: '#1F2937', 900: '#111827', 950: '#030712',
      black: '#000000',
    },
    red: {
      50: '#FEF2F2', 100: '#FEE2E2', 200: '#FECACA', 300: '#FCA5A5',
      400: '#F87171', 500: '#EF4444', 600: '#DC2626', 700: '#B91C1C',
      800: '#991B1B', 900: '#7F1D1D',
    },
    orange: {
      50: '#FFF7ED', 100: '#FFEDD5', 200: '#FED7AA', 300: '#FDBA74', 400: '#FB923C',
      500: '#F97316', 600: '#EA580C', 700: '#C2410C', 800: '#9A3412', 900: '#7C2D12',
    },
    yellow: {
      50: '#FEFCE8', 100: '#FEF9C3', 200: '#FEF08A', 300: '#FDE047',
      400: '#FACC15', 500: '#EAB308', 600: '#CA8A04', 700: '#A16207',
      800: '#854D0E', 900: '#713F12', 950: '#422006',
    },
    green: {
      50: '#F0FDF4', 100: '#DCFCE7', 200: '#BBF7D0', 300: '#86EFAC',
      400: '#4ADE80', 500: '#22C55E', 600: '#16A34A', 700: '#15803D',
      800: '#166534', 900: '#14532D',
    },
    blue: {
      50: '#EFF6FF', 100: '#DBEAFE', 200: '#BFDBFE', 300: '#93C5FD',
      400: '#60A5FA', 500: '#3B82F6', 600: '#2563EB', 700: '#1D4ED8',
      800: '#1E40AF', 900: '#1E3A8A',
    },
  },

  // numbers/spacing/* → maps 1:1 to Tailwind × 4px
  spacing: {
    0: 0,      // Tailwind: 0
    0.5: 2,    // Tailwind: 0.5
    1: 4,      // Tailwind: 1
    1.5: 6,    // Tailwind: 1.5
    2: 8,      // Tailwind: 2
    2.5: 10,   // Tailwind: 2.5
    3: 12,     // Tailwind: 3
    3.5: 14,   // Tailwind: 3.5
    4: 16,     // Tailwind: 4
    5: 20,     // Tailwind: 5
    6: 24,     // Tailwind: 6
    7: 28,     // Tailwind: 7
    8: 32,     // Tailwind: 8
    9: 36,     // Tailwind: 9
    10: 40,    // Tailwind: 10
    11: 44,    // Tailwind: 11
    12: 48,    // Tailwind: 12
    14: 56,    // Tailwind: 14
    16: 64,    // Tailwind: 16
    20: 80,    // Tailwind: 20
    24: 96,    // Tailwind: 24
  },

  // numbers/radius/*
  radius: {
    none: 0,   // rounded-none
    xs: 2,     // rounded-sm (Tailwind)
    sm: 4,     // rounded
    md: 6,     // rounded-md
    lg: 8,     // rounded-lg
    xl: 12,    // rounded-xl
    '2xl': 16, // rounded-2xl
    '3xl': 24, // rounded-3xl
    full: 9999, // rounded-full
  },

  // numbers/font-size/*
  fontSize: {
    xs: 11,   // label-xs
    sm: 12,   // label-sm / body-sm
    base: 14, // body-base
    md: 16,   // body-md / heading-xs
    lg: 18,   // heading-sm
    xl: 20,   // heading-md
    '2xl': 24, // heading-lg
    '3xl': 30, // heading-xl
    '4xl': 36, // display-sm
    '5xl': 48, // display-lg
  },

  // numbers/font-weight/*
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // numbers/line-height/*
  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // numbers/border-width/*
  borderWidth: {
    none: 0,
    sm: 1,
    md: 2,
  },
} as const;

// ── Semantic Tokens (Token collection, Light mode) ────────────────────────────

export const tokens = {
  color: {
    surface: {
      primary: foundation.color.neutral.white,           // surface/default/primary
      secondary: foundation.color.neutral[50],           // surface/default/secondary
      tertiary: foundation.color.neutral[100],           // surface/default/tertiary
      brand: foundation.color.brand.polynesianBlue[800], // surface/default/brand
      brandSecondary: foundation.color.brand.pictonBlue[500], // surface/default/brand-secondary
      inverse: foundation.color.neutral[900],            // surface/default/inverse
      // Status
      warning: foundation.color.yellow[500],             // surface/status/warning
      warningSubtle: foundation.color.yellow[50],        // surface/status/warning-subtle
      error: foundation.color.red[600],                  // surface/status/error
      errorSubtle: foundation.color.red[50],             // surface/status/error-subtle
      success: foundation.color.green[700],              // surface/status/success
      successSubtle: foundation.color.green[50],         // surface/status/success-subtle
      info: foundation.color.blue[500],                  // surface/status/info
      infoSubtle: foundation.color.blue[50],             // surface/status/info-subtle
    },
    text: {
      primary: foundation.color.neutral[900],            // text/default/primary
      secondary: foundation.color.neutral[600],          // text/default/secondary
      tertiary: foundation.color.neutral[400],           // text/default/tertiary
      brand: foundation.color.brand.polynesianBlue[800], // text/default/brand
      onBrand: foundation.color.neutral.white,           // text/default/on-brand
      inverse: foundation.color.neutral.white,           // text/default/inverse
      disabled: foundation.color.neutral[400],           // text/state/disabled
      destructive: foundation.color.red[600],            // text/state/destructive
      // Status
      warning: foundation.color.yellow[700],             // text/status/warning
      error: foundation.color.red[600],                  // text/status/error
      success: foundation.color.green[700],              // text/status/success
      info: foundation.color.blue[700],                  // text/status/info
    },
    border: {
      primary: foundation.color.neutral[300],            // border/default/primary
      secondary: foundation.color.neutral[200],          // border/default/secondary
      brand: foundation.color.brand.polynesianBlue[800], // border/default/brand
      // Status
      warning: foundation.color.yellow[500],             // border/status/warning
      error: foundation.color.red[500],                  // border/status/error
      success: foundation.color.green[600],              // border/status/success
      info: foundation.color.blue[500],                  // border/status/info
    },
    icon: {
      primary: foundation.color.neutral[800],            // icon/default/primary
      secondary: foundation.color.neutral[500],          // icon/default/secondary
      brand: foundation.color.brand.polynesianBlue[800], // icon/default/brand
      onBrand: foundation.color.neutral.white,           // icon/default/on-brand
      // Status
      warning: foundation.color.yellow[500],             // icon/status/warning
      error: foundation.color.red[600],                  // icon/status/error
      success: foundation.color.green[600],              // icon/status/success
      info: foundation.color.blue[500],                  // icon/status/info
    },
  },

  // Token/spacing (named scale)
  spacing: {
    none: 0,     // spacing/none → 0
    xs: 4,       // spacing/xs  → 1 (4px)
    sm: 8,       // spacing/sm  → 2 (8px)
    md: 12,      // spacing/md  → 3 (12px)
    default: 16, // spacing/default → 4 (16px)
    lg: 20,      // spacing/lg  → 5 (20px)
    xl: 24,      // spacing/xl  → 6 (24px)
    '2xl': 32,   // spacing/2xl → 8 (32px)
    '3xl': 40,   // spacing/3xl → 10 (40px)
    '4xl': 48,   // spacing/4xl → 12 (48px)
    '5xl': 64,   // spacing/5xl → 16 (64px)
    '6xl': 80,   // spacing/6xl → 20 (80px)
    '7xl': 96,   // spacing/7xl → 24 (96px)
  },

  // Token/border radius (named scale)
  radius: {
    none: 0,      // border/radius/none
    sm: 4,        // border/radius/sm
    md: 6,        // border/radius/md
    default: 8,   // border/radius/default → rounded-lg
    lg: 12,       // border/radius/lg
    xl: 16,       // border/radius/xl
    full: 9999,   // border/radius/full → rounded-full
  },

  // Token/typography
  typography: {
    family: {
      body: "'Inter', system-ui, -apple-system, sans-serif",
      heading: "'Inter', system-ui, -apple-system, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },
    size: {
      'label-xs': 11,   // typography/size/label-xs
      'label-sm': 12,   // typography/size/label-sm
      'body-sm': 12,    // typography/size/body-sm
      'body-base': 14,  // typography/size/body-base
      'body-md': 16,    // typography/size/body-md
      'heading-xs': 16, // typography/size/heading-xs
      'heading-sm': 18, // typography/size/heading-sm
      'heading-md': 20, // typography/size/heading-md
      'heading-lg': 24, // typography/size/heading-lg
      'heading-xl': 30, // typography/size/heading-xl
      'display-sm': 36, // typography/size/display-sm
      'display-lg': 48, // typography/size/display-lg
    },
    weight: {
      regular: 400,  // typography/weight/regular
      medium: 500,   // typography/weight/medium
      semibold: 600, // typography/weight/semibold
      bold: 700,     // typography/weight/bold
    },
    lineHeight: {
      tight: 1.25,   // typography/line-height/tight
      normal: 1.5,   // typography/line-height/normal
      relaxed: 1.75, // typography/line-height/relaxed
    },
  },

  // Component-level tokens (card)
  component: {
    card: {
      bg: foundation.color.neutral.white,           // component/card/bg
      border: foundation.color.neutral[300],        // component/card/border
      borderWidth: 1,                               // component/card/border-width
      radius: 8,                                    // component/card/radius
      headerPaddingX: 24,                           // component/card/header/padding-x
      headerPaddingTop: 20,                         // component/card/header/padding-top
      headerPaddingBottom: 16,                      // component/card/header/padding-bottom
      contentPaddingX: 24,                          // component/card/content/padding-x
      contentPaddingBottom: 24,                     // component/card/content/padding-bottom
      gap: 0,                                       // component/card/gap
    },
    badge: {
      radius: 9999,    // component/badge/radius
      fontSize: 11,    // component/badge/font-size
      fontWeight: 500, // component/badge/font-weight
      borderWidth: 1,  // component/badge/border-width
      paddingX: 8,     // component/badge/md/padding-x (approx)
      paddingY: 2,     // component/badge/md/padding-y (approx)
      variants: {
        warning: {
          bg: foundation.color.yellow[50],          // component/badge/warning/bg
          border: foundation.color.yellow[500],     // component/badge/warning/border
          text: foundation.color.yellow[700],       // component/badge/warning/text
        },
        error: {
          bg: foundation.color.red[50],             // component/badge/destructive/bg
          border: foundation.color.red[500],        // component/badge/destructive/border
          text: foundation.color.red[600],          // component/badge/destructive/text
        },
        success: {
          bg: foundation.color.green[50],           // component/badge/success/bg
          border: foundation.color.green[600],      // component/badge/success/border
          text: foundation.color.green[700],        // component/badge/success/text
        },
        info: {
          bg: foundation.color.blue[50],            // component/badge/info/bg
          border: foundation.color.blue[500],       // component/badge/info/border
          text: foundation.color.blue[700],         // component/badge/info/text
        },
        default: {
          bg: foundation.color.neutral[100],        // component/badge/default/bg
          border: foundation.color.neutral[300],    // component/badge/default/border
          text: foundation.color.neutral[700],      // component/badge/default/text
        },
      },
    },
    button: {
      primary: {
        bg: foundation.color.brand.polynesianBlue[800],    // component/button/default/bg
        bgHover: foundation.color.brand.polynesianBlue[700], // component/button/default/bg-hover
        text: foundation.color.neutral.white,              // component/button/default/text
        radius: 8,                                         // component/button/radius
        fontSize: 14,                                      // component/button/font-size
        fontWeight: 500,                                   // component/button/font-weight
        height: 36,                                        // component/button/height/md
        paddingX: 16,                                      // component/button/padding-x
      },
    },
    input: {
      bg: foundation.color.neutral.white,               // component/input/bg
      border: foundation.color.neutral[300],            // component/input/border
      borderHover: foundation.color.neutral[400],       // component/input/border-hover
      text: foundation.color.neutral[900],              // component/input/text
      placeholder: foundation.color.neutral[400],       // component/input/text-placeholder
      radius: 8,                                        // component/input/radius
      height: 36,                                       // component/input/height
      fontSize: 14,                                     // component/input/font-size
      paddingX: 12,                                     // component/input/padding-x
    },
  },
} as const;

export type FoundationTokens = typeof foundation;
export type SemanticTokens = typeof tokens;
