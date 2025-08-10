import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { Caption } from './Typography';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  style?: any;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  style,
}) => {
  const badgeStyle = [
    styles.base,
    styles[variant],
    styles[size],
    style,
  ];

  const textColor = variant === 'default' ? theme.colors.textSecondary : theme.colors.surface;

  return (
    <View style={badgeStyle}>
      <Caption color={textColor} weight="medium">
        {children}
      </Caption>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    alignSelf: 'flex-start',
  },
  
  // Variants
  default: {
    backgroundColor: theme.colors.border,
  },
  success: {
    backgroundColor: theme.colors.success,
  },
  warning: {
    backgroundColor: theme.colors.warning,
  },
  error: {
    backgroundColor: theme.colors.error,
  },
  info: {
    backgroundColor: theme.colors.info,
  },
  
  // Sizes
  sm: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
  },
  md: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
});