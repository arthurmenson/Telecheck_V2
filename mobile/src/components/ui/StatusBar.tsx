import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { theme } from '../../theme';

interface StatusBarProps {
  style?: 'auto' | 'light' | 'dark';
  backgroundColor?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ 
  style = 'dark',
  backgroundColor = theme.colors.background 
}) => {
  const insets = useSafeAreaInsets();
  
  return (
    <>
      <ExpoStatusBar style={style} backgroundColor={backgroundColor} />
      <View 
        style={{ 
          height: insets.top, 
          backgroundColor 
        }} 
      />
    </>
  );
};
