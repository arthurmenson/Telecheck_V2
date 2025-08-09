// Enhanced Design System - Colors, Typography, Spacing, Components
export const theme = {
  colors: {
    // Primary brand colors - Modern healthcare palette
    primary: '#0891b2', // Cyan-600 - Professional medical blue
    primaryDark: '#0e7490', // Cyan-700
    primaryLight: '#22d3ee', // Cyan-400
    
    // Secondary colors
    secondary: '#6366f1', // Indigo-500 - Modern purple
    accent: '#f59e0b', // Amber-500 - Warm accent
    success: '#10b981', // Emerald-500 - Health green
    warning: '#f59e0b', // Amber-500
    error: '#ef4444', // Red-500
    info: '#3b82f6', // Blue-500
    
    // Health-specific colors - More sophisticated palette
    heartRate: '#ef4444', // Red-500
    bloodPressure: '#f97316', // Orange-500
    glucose: '#f59e0b', // Amber-500
    weight: '#22c55e', // Green-500
    oxygen: '#06b6d4', // Cyan-500
    temperature: '#ec4899', // Pink-500
    
    // Neutral colors - Modern gray scale
    background: '#f8fafc', // Slate-50
    surface: '#ffffff',
    card: '#ffffff',
    text: '#0f172a', // Slate-900
    textSecondary: '#64748b', // Slate-500
    textTertiary: '#94a3b8', // Slate-400
    border: '#e2e8f0', // Slate-200
    borderLight: '#f1f5f9', // Slate-100
    placeholder: '#94a3b8', // Slate-400
    
    // Status colors
    online: '#10b981',
    offline: '#6b7280',
    pending: '#f59e0b',
    
    // Semantic backgrounds
    successBg: '#ecfdf5', // Green-50
    warningBg: '#fffbeb', // Amber-50
    errorBg: '#fef2f2', // Red-50
    infoBg: '#eff6ff', // Blue-50
  },
  
  typography: {
    // Font sizes - More refined scale
    fontSizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 28,
      '4xl': 32,
      '5xl': 36,
    },
    
    // Font weights
    fontWeights: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    
    // Line heights
    lineHeights: {
      tight: 1.2,
      snug: 1.3,
      normal: 1.4,
      relaxed: 1.6,
      loose: 1.8,
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    base: 16,
    lg: 20,
    xl: 24,
    '2xl': 32,
    '3xl': 48,
    '4xl': 64,
    '5xl': 80,
  },
  
  borderRadius: {
    none: 0,
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    full: 9999,
  },
  
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    base: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 6,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.18,
      shadowRadius: 16,
      elevation: 12,
    },
  },
  
  components: {
    button: {
      height: {
        sm: 36,
        md: 44,
        lg: 52,
      },
      borderRadius: 12,
      paddingHorizontal: {
        sm: 16,
        md: 20,
        lg: 24,
      },
    },
    card: {
      borderRadius: 16,
      padding: 20,
    },
    input: {
      height: 48,
      borderRadius: 12,
      paddingHorizontal: 16,
      borderWidth: 1,
    },
    avatar: {
      sizes: {
        xs: 24,
        sm: 32,
        md: 40,
        lg: 48,
        xl: 56,
        '2xl': 64,
      },
    },
  },
  
  // Animation durations
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
}

export type Theme = typeof theme;