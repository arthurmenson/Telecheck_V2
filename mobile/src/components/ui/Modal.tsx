import React from 'react';
import { 
  Modal as RNModal, 
  View, 
  StyleSheet, 
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { Heading3, BodyText } from './Typography';
import { Button } from './Button';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'full';
  animationType?: 'slide' | 'fade' | 'none';
}

const { height: screenHeight } = Dimensions.get('window');

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  size = 'md',
  animationType = 'slide',
}) => {
  const getModalHeight = () => {
    switch (size) {
      case 'sm': return screenHeight * 0.4;
      case 'md': return screenHeight * 0.6;
      case 'lg': return screenHeight * 0.8;
      case 'full': return screenHeight;
      default: return screenHeight * 0.6;
    }
  };

  return (
    <RNModal
      visible={visible}
      animationType={animationType}
      transparent={size !== 'full'}
      onRequestClose={onClose}
    >
      {size === 'full' ? (
        <SafeAreaView style={styles.fullModal}>
          {title && (
            <View style={styles.header}>
              <Heading3>{title}</Heading3>
              {showCloseButton && (
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <BodyText color={theme.colors.primary}>✕</BodyText>
                </TouchableOpacity>
              )}
            </View>
          )}
          <View style={styles.content}>
            {children}
          </View>
        </SafeAreaView>
      ) : (
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.modal, { height: getModalHeight() }]}>
                {title && (
                  <View style={styles.header}>
                    <Heading3>{title}</Heading3>
                    {showCloseButton && (
                      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <BodyText color={theme.colors.primary}>✕</BodyText>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                <View style={styles.content}>
                  {children}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    ...theme.shadows.xl,
  },
  fullModal: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  closeButton: {
    padding: theme.spacing.sm,
  },
  content: {
    flex: 1,
    padding: theme.spacing.base,
  },
});