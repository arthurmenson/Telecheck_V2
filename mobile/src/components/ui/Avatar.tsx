import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { Typography } from './Typography';

interface AvatarProps {
  size?: keyof typeof theme.components.avatar.sizes;
  source?: { uri: string } | number;
  name?: string;
  onPress?: () => void;
  style?: any;
  showBadge?: boolean;
  badgeColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  source,
  name,
  onPress,
  style,
  showBadge = false,
  badgeColor = theme.colors.success,
}) => {
  const avatarSize = theme.components.avatar.sizes[size];
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarStyle = [
    styles.avatar,
    {
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarSize / 2,
    },
    style,
  ];

  const Content = (
    <View style={avatarStyle}>
      {source ? (
        <Image source={source} style={styles.image} />
      ) : (
        <View style={[styles.placeholder, avatarStyle]}>
          <Typography 
            variant={size === 'xs' || size === 'sm' ? 'caption' : 'body'}
            color={theme.colors.surface}
            weight="medium"
          >
            {name ? getInitials(name) : '👤'}
          </Typography>
        </View>
      )}
      
      {showBadge && (
        <View style={[styles.badge, { backgroundColor: badgeColor }]} />
      )}
    </View>
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
  avatar: {
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
});