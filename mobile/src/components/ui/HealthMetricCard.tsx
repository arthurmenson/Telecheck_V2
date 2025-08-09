import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from './Card';
import { Typography, BodyText, Caption } from './Typography';
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

  const Content = (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${getStatusColor()}20` }]}>
          <Typography variant="h3" color={getStatusColor()}>
            {icon}
          </Typography>
        </View>
        {trend && (
          <View style={styles.trendContainer}>
            <Typography variant="caption">
              {getTrendIcon()} {trendValue}
            </Typography>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Caption color={theme.colors.textSecondary}>{title}</Caption>
        <View style={styles.valueContainer}>
          <Typography 
            variant="h2" 
            color={getStatusColor()}
            style={styles.value}
          >
            {value}
          </Typography>
          {unit && (
            <BodyText 
              color={theme.colors.textSecondary}
              style={styles.unit}
            >
              {unit}
            </BodyText>
          )}
        </View>
      </View>
    </Card>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {Content}
      </TouchableOpacity>
    );
  }

  return Content;
};

const styles = StyleSheet.create({
  card: {
    minHeight: 120,
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
    borderRadius: theme.borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendContainer: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: theme.spacing.xs,
  },
  value: {
    lineHeight: undefined,
  },
  unit: {
    marginLeft: theme.spacing.xs,
    marginBottom: 2,
  },
});
