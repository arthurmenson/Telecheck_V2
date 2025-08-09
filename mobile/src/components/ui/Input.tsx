import React, { useState } from 'react';
import { 
  TextInput, 
  View, 
  StyleSheet, 
  TextInputProps,
  TouchableOpacity,
  ViewStyle 
} from 'react-native';
import { Typography, BodyText, Caption } from './Typography';
import { theme } from '../../theme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  containerStyle?: ViewStyle;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  variant = 'outline',
  size = 'md',
  containerStyle,
  isPassword = false,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!isPassword);

  const inputStyle = [
    styles.base,
    styles[variant],
    styles[size],
    isFocused && styles.focused,
    error && styles.error,
    leftIcon && styles.withLeftIcon,
    (rightIcon || isPassword) && styles.withRightIcon,
  ];

  const handlePasswordToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <BodyText style={styles.label}>
          {label}
        </BodyText>
      )}
      
      <View style={styles.inputContainer}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          {...textInputProps}
          style={inputStyle}
          onFocus={(e) => {
            setIsFocused(true);
            textInputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            textInputProps.onBlur?.(e);
          }}
          secureTextEntry={isPassword && !isPasswordVisible}
          placeholderTextColor={theme.colors.placeholder}
        />
        
        {isPassword && (
          <TouchableOpacity 
            style={styles.rightIconContainer}
            onPress={handlePasswordToggle}
          >
            <Typography variant="body">
              {isPasswordVisible ? '🙈' : '👁️'}
            </Typography>
          </TouchableOpacity>
        )}
        
        {rightIcon && !isPassword && (
          <View style={styles.rightIconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {error && (
        <Caption color={theme.colors.error} style={styles.errorText}>
          {error}
        </Caption>
      )}
      
      {hint && !error && (
        <Caption color={theme.colors.textSecondary} style={styles.hintText}>
          {hint}
        </Caption>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.base,
  },
  label: {
    marginBottom: theme.spacing.sm,
    fontWeight: theme.typography.fontWeights.medium,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  base: {
    flex: 1,
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text,
    borderRadius: theme.borderRadius.base,
    paddingHorizontal: theme.spacing.base,
  },
  
  // Variants
  default: {
    backgroundColor: theme.colors.surface,
    borderWidth: 0,
  },
  outline: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filled: {
    backgroundColor: theme.colors.background,
    borderWidth: 0,
  },
  
  // Sizes
  sm: {
    height: 36,
    fontSize: theme.typography.fontSizes.sm,
  },
  md: {
    height: 44,
  },
  lg: {
    height: 52,
    fontSize: theme.typography.fontSizes.lg,
  },
  
  // States
  focused: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  error: {
    borderColor: theme.colors.error,
    borderWidth: 1,
  },
  
  // Icon spacing
  withLeftIcon: {
    paddingLeft: 48,
  },
  withRightIcon: {
    paddingRight: 48,
  },
  
  leftIconContainer: {
    position: 'absolute',
    left: theme.spacing.md,
    zIndex: 1,
  },
  rightIconContainer: {
    position: 'absolute',
    right: theme.spacing.md,
    zIndex: 1,
  },
  
  errorText: {
    marginTop: theme.spacing.xs,
  },
  hintText: {
    marginTop: theme.spacing.xs,
  },
});
