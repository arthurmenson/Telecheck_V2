import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from './Card';
import { Typography, BodyText, Caption, Heading3, Heading4 } from './Typography';
import { theme } from '../../theme';

interface HealthMetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: string;
  color?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  onPress?: () => void;
  status?: 'normal' | 'warning' | 'critical';
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'minimal';
}

export const HealthMetricCard: React.FC<HealthMetricCardProps> = ({
  title,
  value,
  unit,
  icon,
  color = theme.colors.primary,
  trend,
  trendValue,
  onPress,
  status = 'normal',
  subtitle,
  size = 'md',
  variant = 'default',
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      case 'stable': return '→';
      default: return '';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'warning': return theme.colors.warning;
      case 'critical': return theme.colors.error;
      default: return color;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return status === 'critical' ? theme.colors.error : theme.colors.success;
      case 'down': return status === 'critical' ? theme.colors.success : theme.colors.textSecondary;
      case 'stable': return theme.colors.textSecondary;
      default: return theme.colors.textSecondary;
    }
  };

  const cardStyle = [
    styles.card,
    styles[size],
    variant === 'gradient' && { backgroundColor: `${getStatusColor()}08` },
    variant === 'minimal' && { backgroundColor: theme.colors.backgroundSecondary },
  ];

  const Content = (
    <Card style={cardStyle} variant={variant === 'default' ? 'elevated' : 'outlined'} padding="lg" borderRadius="2xl">
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${getStatusColor()}15` }]}>
          <Typography variant="h4" color={getStatusColor()}>
            {icon}
          </Typography>
        </View>
        {trend && trendValue && (
          <View style={[styles.trendContainer, { backgroundColor: `${getTrendColor()}12` }]}>
            <Caption color={getTrendColor()} style={styles.trendText} weight="semibold">
              {getTrendIcon()} {trendValue}
            </Caption>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Caption color={theme.colors.textSecondary} style={styles.title} weight="medium">
          {title}
        </Caption>
        
        <View style={styles.valueContainer}>
          <Heading3 
            color={getStatusColor()}
            style={styles.value}
            weight="bold"
          >
            {value}
          </Heading3>
          {unit && (
            <BodyText 
              color={theme.colors.textSecondary}
              style={styles.unit}
              weight="medium"
            >
              {unit}
            </BodyText>
          )}
        </View>
        
        {subtitle && (
          <Caption color={theme.colors.textTertiary} style={styles.subtitle}>
            {subtitle}
          </Caption>
        )}
      </View>
      
      {status !== 'normal' && (
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
      )}
    </Card>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.touchable}>
        {Content}
      </TouchableOpacity>
    );
  }

  return Content;
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  card: {
    position: 'relative',
    overflow: 'hidden',
  },
  sm: {
    minHeight: 120,
  },
  md: {
    minHeight: 140,
  },
  lg: {
    minHeight: 160,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
  },
  trendText: {
    fontSize: theme.typography.fontSizes.xs,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    marginBottom: theme.spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: theme.spacing.sm,
  },
  value: {
    lineHeight: undefined,
  },
  unit: {
    marginLeft: theme.spacing.sm,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.xs,
  },
  statusIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 4,
    height: '100%',
    borderTopRightRadius: theme.borderRadius['2xl'],
    borderBottomRightRadius: theme.borderRadius['2xl'],
  },
});