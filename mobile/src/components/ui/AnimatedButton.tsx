import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Button } from './Button';
import type { ButtonProps } from './Button';

interface AnimatedButtonProps extends ButtonProps {
  hapticFeedback?: boolean;
  scaleAnimation?: boolean;
  pulseAnimation?: boolean;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onPress,
  hapticFeedback = true,
  scaleAnimation = true,
  pulseAnimation = false,
  disabled,
  loading,
  ...props
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    if (scaleAnimation && !disabled && !loading) {
      scale.value = withSpring(0.95, {
        damping: 15,
        stiffness: 300,
      });
    }
  };

  const handlePressOut = () => {
    if (scaleAnimation && !disabled && !loading) {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 300,
      });
    }
  };

  const handlePress = () => {
    if (disabled || loading) return;

    if (hapticFeedback) {
      // Note: Would need expo-haptics for actual haptic feedback
      // import * as Haptics from 'expo-haptics';
      // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    if (pulseAnimation) {
      opacity.value = withTiming(0.7, { duration: 100 }, () => {
        opacity.value = withTiming(1, { duration: 100 });
      });
    }

    runOnJS(onPress)();
  };

  return (
    <AnimatedTouchableOpacity
      style={animatedStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      activeOpacity={1}
      disabled={disabled || loading}
    >
      <Button
        {...props}
        onPress={() => {}} // Handled by parent
        disabled={disabled}
        loading={loading}
      />
    </AnimatedTouchableOpacity>
  );
};
