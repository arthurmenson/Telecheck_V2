import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from './Card';
import { Typography, BodyText, Caption, Heading3 } from './Typography';
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
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
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
  ];

  const Content = (
    <Card style={cardStyle} variant="elevated">
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${getStatusColor()}15` }]}>
          <Typography variant="h4" color={getStatusColor()}>
            {icon}
          </Typography>
        </View>
        {trend && trendValue && (
          <View style={[styles.trendContainer, { backgroundColor: `${getTrendColor()}10` }]}>
            <Caption color={getTrendColor()} style={styles.trendText}>
              {getTrendIcon()} {trendValue}
            </Caption>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Caption color={theme.colors.textSecondary} style={styles.title}>
          {title}
        </Caption>
        
        <View style={styles.valueContainer}>
          <Heading3 
            color={getStatusColor()}
            style={styles.value}
          >
            {value}
          </Heading3>
          {unit && (
            <BodyText 
              color={theme.colors.textSecondary}
              style={styles.unit}
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
    minHeight: 100,
    padding: theme.spacing.md,
  },
  md: {
    minHeight: 120,
    padding: theme.spacing.base,
  },
  lg: {
    minHeight: 140,
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendContainer: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.base,
  },
  trendText: {
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.medium,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    marginBottom: theme.spacing.xs,
    fontWeight: theme.typography.fontWeights.medium,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: theme.spacing.xs,
  },
  value: {
    lineHeight: undefined,
  },
  unit: {
    marginLeft: theme.spacing.xs,
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
  },
});