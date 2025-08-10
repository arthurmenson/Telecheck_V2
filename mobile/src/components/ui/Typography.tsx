import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { theme } from '../../theme';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'bodyLarge' | 'bodySmall' | 'caption' | 'overline' | 'label';
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
  weight?: keyof typeof theme.typography.fontWeights;
  align?: 'left' | 'center' | 'right';
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color,
  style,
  numberOfLines,
  weight,
  align = 'left',
}) => {
  const textStyle = [
    styles[variant],
    color && { color },
    weight && { fontWeight: theme.typography.fontWeights[weight] },
    align !== 'left' && { textAlign: align },
    style,
  ];

  return (
    <Text style={textStyle} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

// Individual components for better DX
export const Heading1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h1" {...props} />
);

export const Heading2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h2" {...props} />
);

export const Heading3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h3" {...props} />
);

export const Heading4: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h4" {...props} />
);

export const Heading5: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h5" {...props} />
);

export const Heading6: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h6" {...props} />
);

export const BodyText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="body" {...props} />
);

export const BodyLarge: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="bodyLarge" {...props} />
);

export const BodySmall: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="bodySmall" {...props} />
);

export const Caption: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="caption" {...props} />
);

export const Label: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="label" {...props} />
);

const styles = StyleSheet.create({
  h1: {
    fontSize: theme.typography.fontSizes['6xl'],
    fontWeight: theme.typography.fontWeights.black,
    lineHeight: theme.typography.lineHeights.tight * theme.typography.fontSizes['6xl'],
    color: theme.colors.text,
    letterSpacing: -1,
  },
  h2: {
    fontSize: theme.typography.fontSizes['5xl'],
    fontWeight: theme.typography.fontWeights.extrabold,
    lineHeight: theme.typography.lineHeights.tight * theme.typography.fontSizes['5xl'],
    color: theme.colors.text,
    letterSpacing: -0.8,
  },
  h3: {
    fontSize: theme.typography.fontSizes['4xl'],
    fontWeight: theme.typography.fontWeights.bold,
    lineHeight: theme.typography.lineHeights.snug * theme.typography.fontSizes['4xl'],
    color: theme.colors.text,
    letterSpacing: -0.5,
  },
  h4: {
    fontSize: theme.typography.fontSizes['3xl'],
    fontWeight: theme.typography.fontWeights.bold,
    lineHeight: theme.typography.lineHeights.snug * theme.typography.fontSizes['3xl'],
    color: theme.colors.text,
    letterSpacing: -0.3,
  },
  h5: {
    fontSize: theme.typography.fontSizes['2xl'],
    fontWeight: theme.typography.fontWeights.semibold,
    lineHeight: theme.typography.lineHeights.normal * theme.typography.fontSizes['2xl'],
    color: theme.colors.text,
  },
  h6: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.semibold,
    lineHeight: theme.typography.lineHeights.normal * theme.typography.fontSizes.xl,
    color: theme.colors.text,
  },
  bodyLarge: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.normal,
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.lg,
    color: theme.colors.text,
  },
  body: {
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.normal,
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.base,
    color: theme.colors.text,
  },
  bodySmall: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.normal,
    lineHeight: theme.typography.lineHeights.normal * theme.typography.fontSizes.sm,
    color: theme.colors.text,
  },
  caption: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium,
    lineHeight: theme.typography.lineHeights.normal * theme.typography.fontSizes.sm,
    color: theme.colors.textSecondary,
  },
  label: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.semibold,
    lineHeight: theme.typography.lineHeights.normal * theme.typography.fontSizes.sm,
    color: theme.colors.text,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  overline: {
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.bold,
    lineHeight: theme.typography.lineHeights.normal * theme.typography.fontSizes.xs,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});