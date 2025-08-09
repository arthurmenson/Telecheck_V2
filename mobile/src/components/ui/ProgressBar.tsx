import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { theme } from '../../theme';
import { BodyText, Caption } from './Typography';

interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  showPercentage?: boolean;
  label?: string;
  animated?: boolean;
  duration?: number;
  delay?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  backgroundColor = theme.colors.border,
  progressColor = theme.colors.primary,
  showPercentage = false,
  label,
  animated = true,
  duration = 1000,
  delay = 0,
}) => {
  const progressWidth = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
    };
  });

  useEffect(() => {
    if (animated) {
      progressWidth.value = withDelay(
        delay,
        withTiming(progress, {
          duration,
          easing: Easing.out(Easing.cubic),
        })
      );
    } else {
      progressWidth.value = progress;
    }
  }, [progress, animated, duration, delay]);

  return (
    <View style={styles.container}>
      {(label || showPercentage) && (
        <View style={styles.header}>
          {label && (
            <BodyText style={styles.label}>{label}</BodyText>
          )}
          {showPercentage && (
            <Caption color={theme.colors.textSecondary}>
              {Math.round(progress)}%
            </Caption>
          )}
        </View>
      )}
      
      <View 
        style={[
          styles.track,
          {
            height,
            backgroundColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.progress,
            {
              height,
              backgroundColor: progressColor,
            },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  label: {
    fontWeight: theme.typography.fontWeights.medium,
  },
  track: {
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progress: {
    borderRadius: theme.borderRadius.full,
  },
});
