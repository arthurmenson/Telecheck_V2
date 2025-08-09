import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { Card } from './Card';
import type { CardProps } from './Card';

interface SlideInCardProps extends CardProps {
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  distance?: number;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const SlideInCard: React.FC<SlideInCardProps> = ({
  children,
  delay = 0,
  direction = 'up',
  distance,
  ...cardProps
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  // Set initial position based on direction
  useEffect(() => {
    const defaultDistance = direction === 'left' || direction === 'right' 
      ? screenWidth * 0.3 
      : screenHeight * 0.1;
    
    const moveDistance = distance || defaultDistance;

    switch (direction) {
      case 'left':
        translateX.value = -moveDistance;
        break;
      case 'right':
        translateX.value = moveDistance;
        break;
      case 'up':
        translateY.value = moveDistance;
        break;
      case 'down':
        translateY.value = -moveDistance;
        break;
    }
  }, [direction, distance]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    const springConfig = {
      damping: 20,
      stiffness: 100,
      mass: 1,
    };

    opacity.value = withDelay(delay, withSpring(1, springConfig));
    translateX.value = withDelay(delay, withSpring(0, springConfig));
    translateY.value = withDelay(delay, withSpring(0, springConfig));
  }, [delay]);

  return (
    <Animated.View style={animatedStyle}>
      <Card {...cardProps}>
        {children}
      </Card>
    </Animated.View>
  );
};
