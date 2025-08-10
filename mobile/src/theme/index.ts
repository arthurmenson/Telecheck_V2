// Modern Design System - Enhanced Colors, Typography, Spacing, Components
export const theme = {
  colors: {
    // Modern brand colors - Sophisticated healthcare palette
    primary: '#6366f1', // Indigo-500 - Modern, trustworthy
    primaryDark: '#4f46e5', // Indigo-600
    primaryLight: '#a5b4fc', // Indigo-300
    
    // Secondary colors
    secondary: '#06b6d4', // Cyan-500 - Fresh, medical
    accent: '#f59e0b', // Amber-500 - Warm accent
    success: '#10b981', // Emerald-500 - Health green
    warning: '#f59e0b', // Amber-500
    error: '#ef4444', // Red-500
    info: '#3b82f6', // Blue-500
    
    // Health-specific colors - Modern palette
    heartRate: '#f43f5e', // Rose-500
    bloodPressure: '#8b5cf6', // Violet-500
    glucose: '#f97316', // Orange-500
    weight: '#22c55e', // Green-500
    oxygen: '#06b6d4', // Cyan-500
    temperature: '#ec4899', // Pink-500
    
    // Modern neutral colors - Refined gray scale
    background: '#fafafa', // Neutral-50
    backgroundSecondary: '#f4f4f5', // Neutral-100
    surface: '#ffffff',
    surfaceSecondary: '#f8fafc', // Slate-50
    card: '#ffffff',
    text: '#0a0a0a', // Neutral-950
    textSecondary: '#525252', // Neutral-600
    textTertiary: '#737373', // Neutral-500
    border: '#e4e4e7', // Neutral-200
    borderLight: '#f4f4f5', // Neutral-100
    placeholder: '#a3a3a3', // Neutral-400
    
    // Status colors
    online: '#22c55e',
    offline: '#6b7280',
    pending: '#f59e0b',
    
    // Semantic backgrounds with opacity
    successBg: '#ecfdf5', // Green-50
    warningBg: '#fffbeb', // Amber-50
    errorBg: '#fef2f2', // Red-50
    infoBg: '#eff6ff', // Blue-50
    primaryBg: '#eef2ff', // Indigo-50
  },
  
  typography: {
    // Modern font scale
    fontSizes: {
      xs: 11,
      sm: 13,
      base: 15,
      lg: 17,
      xl: 19,
      '2xl': 22,
      '3xl': 26,
      '4xl': 30,
      '5xl': 36,
      '6xl': 42,
    },
    
    // Enhanced font weights
    fontWeights: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    
    // Refined line heights
    lineHeights: {
      tight: 1.1,
      snug: 1.25,
      normal: 1.4,
      relaxed: 1.5,
      loose: 1.75,
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
    '3xl': 40,
    '4xl': 48,
    '5xl': 64,
    '6xl': 80,
  },
  
  borderRadius: {
    none: 0,
    xs: 2,
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
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
    xs: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.03,
      shadowRadius: 1,
      elevation: 1,
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
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 3,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 6,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
    '2xl': {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.18,
      shadowRadius: 24,
      elevation: 12,
    },
  },
  
  components: {
    button: {
      height: {
        sm: 36,
        md: 44,
        lg: 52,
        xl: 60,
      },
      borderRadius: 12,
      paddingHorizontal: {
        sm: 16,
        md: 20,
        lg: 24,
        xl: 28,
      },
    },
    card: {
      borderRadius: 20,
      padding: 24,
    },
    input: {
      height: 52,
      borderRadius: 16,
      paddingHorizontal: 20,
      borderWidth: 1.5,
    },
    avatar: {
      sizes: {
        xs: 24,
        sm: 32,
        md: 40,
        lg: 48,
        xl: 56,
        '2xl': 64,
        '3xl': 80,
      },
    },
  },
  
  // Animation durations
  animation: {
    fast: 150,
    normal: 250,
    slow: 400,
    slower: 600,
  },
  
  // Modern gradients
  gradients: {
    primary: ['#6366f1', '#8b5cf6'],
    secondary: ['#06b6d4', '#3b82f6'],
    success: ['#10b981', '#22c55e'],
    warm: ['#f59e0b', '#f97316'],
    cool: ['#06b6d4', '#0ea5e9'],
  },
}

export type Theme = typeof theme;