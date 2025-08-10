import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme';

export interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'gradient';
  padding?: keyof typeof theme.spacing;
  borderRadius?: keyof typeof theme.borderRadius;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  style, 
  variant = 'default',
  padding = 'xl',
  borderRadius = '2xl'
}) => {
  const cardStyle = [
    styles.base,
    styles[variant],
    { 
      padding: theme.spacing[padding],
      borderRadius: theme.borderRadius[borderRadius]
    },
    style
  ];

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.card,
    overflow: 'hidden',
  },
  default: {
    ...theme.shadows.sm,
  },
  elevated: {
    ...theme.shadows.lg,
    backgroundColor: theme.colors.surface,
  },
  outlined: {
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    ...theme.shadows.md,
  },
  gradient: {
    backgroundColor: theme.colors.primaryBg,
    ...theme.shadows.base,
  },
});