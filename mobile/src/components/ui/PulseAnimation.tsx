import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface PulseAnimationProps {
  children: React.ReactNode;
  pulseColor?: string;
  duration?: number;
  maxScale?: number;
  enabled?: boolean;
}

export const PulseAnimation: React.FC<PulseAnimationProps> = ({
  children,
  pulseColor = 'rgba(0, 122, 255, 0.3)',
  duration = 2000,
  maxScale = 1.3,
  enabled = true,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.8);

  const pulseStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (enabled) {
      scale.value = withRepeat(
        withTiming(maxScale, {
          duration: duration / 2,
          easing: Easing.out(Easing.cubic),
        }),
        -1,
        true
      );

      opacity.value = withRepeat(
        withTiming(0, {
          duration: duration / 2,
          easing: Easing.out(Easing.cubic),
        }),
        -1,
        true
      );
    } else {
      scale.value = 1;
      opacity.value = 0;
    }
  }, [enabled, duration, maxScale]);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.pulse,
          {
            backgroundColor: pulseColor,
          },
          pulseStyle,
        ]}
      />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  content: {
    zIndex: 1,
  },
});
