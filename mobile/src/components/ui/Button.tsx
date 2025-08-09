import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  ActivityIndicator 
} from 'react-native';
import { theme } from '../../theme';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const buttonTextStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? theme.colors.surface : theme.colors.primary} 
        />
      ) : (
        <>
          {icon}
          <Text style={buttonTextStyle}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.base,
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  
  // Variants
  primary: {
    backgroundColor: theme.colors.primary,
    ...theme.shadows.sm,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
    ...theme.shadows.sm,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  
  // Sizes
  sm: {
    height: 36,
    paddingHorizontal: theme.spacing.base,
  },
  md: {
    height: 44,
    paddingHorizontal: theme.spacing.lg,
  },
  lg: {
    height: 52,
    paddingHorizontal: theme.spacing.xl,
  },
  
  // States
  disabled: {
    opacity: 0.5,
  },
  
  // Text styles
  text: {
    fontWeight: theme.typography.fontWeights.semibold,
    textAlign: 'center',
  },
  primaryText: {
    color: theme.colors.surface,
    fontSize: theme.typography.fontSizes.base,
  },
  secondaryText: {
    color: theme.colors.surface,
    fontSize: theme.typography.fontSizes.base,
  },
  outlineText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSizes.base,
  },
  ghostText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSizes.base,
  },
  
  smText: {
    fontSize: theme.typography.fontSizes.sm,
  },
  mdText: {
    fontSize: theme.typography.fontSizes.base,
  },
  lgText: {
    fontSize: theme.typography.fontSizes.lg,
  },
  
  disabledText: {
    opacity: 0.7,
  },
});
