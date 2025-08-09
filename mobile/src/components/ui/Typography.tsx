import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { theme } from '../../theme';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'overline';
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color,
  style,
  numberOfLines,
}) => {
  const textStyle = [
    styles[variant],
    color && { color },
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

export const BodyText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="body" {...props} />
);

export const Caption: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="caption" {...props} />
);

const styles = StyleSheet.create({
  h1: {
    fontSize: theme.typography.fontSizes['4xl'],
    fontWeight: theme.typography.fontWeights.bold,
    lineHeight: theme.typography.lineHeights.tight,
    color: theme.colors.text,
  },
  h2: {
    fontSize: theme.typography.fontSizes['3xl'],
    fontWeight: theme.typography.fontWeights.bold,
    lineHeight: theme.typography.lineHeights.tight,
    color: theme.colors.text,
  },
  h3: {
    fontSize: theme.typography.fontSizes['2xl'],
    fontWeight: theme.typography.fontWeights.semibold,
    lineHeight: theme.typography.lineHeights.normal,
    color: theme.colors.text,
  },
  h4: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.semibold,
    lineHeight: theme.typography.lineHeights.normal,
    color: theme.colors.text,
  },
  body: {
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.normal,
    lineHeight: theme.typography.lineHeights.normal,
    color: theme.colors.text,
  },
  caption: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.normal,
    lineHeight: theme.typography.lineHeights.normal,
    color: theme.colors.textSecondary,
  },
  overline: {
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.semibold,
    lineHeight: theme.typography.lineHeights.normal,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
