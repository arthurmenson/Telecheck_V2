import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  ActivityIndicator,
  View 
} from 'react-native';
import { theme } from '../../theme';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
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
  iconPosition = 'left',
  fullWidth = false,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
    style,
  ];

  const buttonTextStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    (disabled || loading) && styles.disabledText,
    textStyle,
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="small" 
            color={variant === 'primary' || variant === 'destructive' || variant === 'gradient' ? theme.colors.surface : theme.colors.primary} 
          />
          <Text style={[buttonTextStyle, styles.loadingText]}>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.contentContainer}>
        {icon && iconPosition === 'left' && (
          <View style={styles.iconLeft}>{icon}</View>
        )}
        <Text style={buttonTextStyle}>{title}</Text>
        {icon && iconPosition === 'right' && (
          <View style={styles.iconRight}>{icon}</View>
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.components.button.borderRadius,
    borderWidth: 0,
  },
  
  fullWidth: {
    width: '100%',
  },
  
  // Modern variants
  primary: {
    backgroundColor: theme.colors.primary,
    ...theme.shadows.base,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
    ...theme.shadows.base,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.border,
    borderWidth: 1.5,
  },
  ghost: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
  destructive: {
    backgroundColor: theme.colors.error,
    ...theme.shadows.base,
  },
  gradient: {
    backgroundColor: theme.colors.primary,
    ...theme.shadows.lg,
  },
  
  // Enhanced sizes
  sm: {
    height: theme.components.button.height.sm,
    paddingHorizontal: theme.components.button.paddingHorizontal.sm,
    borderRadius: theme.borderRadius.md,
  },
  md: {
    height: theme.components.button.height.md,
    paddingHorizontal: theme.components.button.paddingHorizontal.md,
    borderRadius: theme.borderRadius.lg,
  },
  lg: {
    height: theme.components.button.height.lg,
    paddingHorizontal: theme.components.button.paddingHorizontal.lg,
    borderRadius: theme.borderRadius.xl,
  },
  xl: {
    height: theme.components.button.height.xl,
    paddingHorizontal: theme.components.button.paddingHorizontal.xl,
    borderRadius: theme.borderRadius.xl,
  },
  
  // States
  disabled: {
    opacity: 0.5,
  },
  
  // Content
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  iconLeft: {
    marginRight: theme.spacing.sm,
  },
  
  iconRight: {
    marginLeft: theme.spacing.sm,
  },
  
  // Enhanced text styles
  text: {
    fontWeight: theme.typography.fontWeights.semibold,
    textAlign: 'center',
    letterSpacing: 0.3,
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
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.base,
  },
  ghostText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSizes.base,
  },
  destructiveText: {
    color: theme.colors.surface,
    fontSize: theme.typography.fontSizes.base,
  },
  gradientText: {
    color: theme.colors.surface,
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
  xlText: {
    fontSize: theme.typography.fontSizes.xl,
  },
  
  disabledText: {
    opacity: 0.7,
  },
  
  loadingText: {
    marginLeft: theme.spacing.sm,
  },
});