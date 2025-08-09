// Design System - Colors, Typography, Spacing
export const theme = {
  colors: {
    // Primary brand colors
    primary: '#007AFF',
    primaryDark: '#0051D5',
    primaryLight: '#66B2FF',
    
    // Secondary colors
    secondary: '#5856D6',
    accent: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    
    // Health-specific colors
    heartRate: '#FF3B30',
    bloodPressure: '#FF6B35',
    glucose: '#FF9500',
    weight: '#32D74B',
    oxygen: '#5AC8FA',
    
    // Neutral colors
    background: '#F2F2F7',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    text: '#000000',
    textSecondary: '#8E8E93',
    textTertiary: '#C7C7CC',
    border: '#E5E5EA',
    placeholder: '#C7C7CC',
    
    // Semantic colors
    info: '#007AFF',
    offline: '#8E8E93',
    online: '#34C759',
  },
  
  typography: {
    // Font sizes
    fontSizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    
    // Font weights
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    
    // Line heights
    lineHeights: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
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
  },
  
  borderRadius: {
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
  
  shadows: {
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
      shadowRadius: 3.84,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6.27,
      elevation: 8,
    },
  },
  
  components: {
    button: {
      height: 48,
      borderRadius: 12,
      paddingHorizontal: 24,
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
  },
}

export type Theme = typeof theme;
