import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { theme } from '../../theme';
import { Typography } from './Typography';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  style?: any;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = theme.colors.primary,
  text,
  style,
}) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  const sizes = {
    small: 20,
    medium: 32,
    large: 48,
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    );

    scale.value = withRepeat(
      withTiming(1.1, {
        duration: 800,
        easing: Easing.inOut(Easing.sine),
      }),
      -1,
      true
    );
  }, []);

  return (
    <View style={[styles.container, style]}>
      <Animated.View 
        style={[
          styles.spinner,
          {
            width: sizes[size],
            height: sizes[size],
            borderColor: `${color}30`,
            borderTopColor: color,
          },
          animatedStyle,
        ]}
      />
      {text && (
        <Typography 
          variant="caption" 
          color={theme.colors.textSecondary}
          style={styles.text}
        >
          {text}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    borderWidth: 2,
    borderRadius: 50,
  },
  text: {
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
});
