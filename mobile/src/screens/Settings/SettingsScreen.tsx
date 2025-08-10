import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  Switch 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { 
  Heading1, 
  Heading3, 
  BodyText, 
  Caption 
} from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FadeInView } from '../../components/ui/FadeInView';
import { SlideInCard } from '../../components/ui/SlideInCard';

export default function SettingsScreen({ navigation }: any) {
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: true,
      sms: false,
      healthAlerts: true,
      medicationReminders: true,
      appointmentReminders: true,
    },
    privacy: {
      shareData: false,
      allowAnalytics: true,
      biometricAuth: true,
    },
    preferences: {
      units: 'imperial', // imperial or metric
      language: 'English',
      timezone: 'EST',
      theme: 'light', // light, dark, system
    },
  });

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const settingSections = [
    {
      title: 'Notifications',
      items: [
        {
          key: 'push',
          label: 'Push Notifications',
          description: 'Receive notifications on your device',
          type: 'switch',
          value: settings.notifications.push,
          category: 'notifications',
        },
        {
          key: 'email',
          label: 'Email Notifications',
          description: 'Weekly health reports and updates',
          type: 'switch',
          value: settings.notifications.email,
          category: 'notifications',
        },
        {
          key: 'sms',
          label: 'SMS Notifications',
          description: 'Critical health alerts only',
          type: 'switch',
          value: settings.notifications.sms,
          category: 'notifications',
        },
        {
          key: 'healthAlerts',
          label: 'Health Alerts',
          description: 'Abnormal reading notifications',
          type: 'switch',
          value: settings.notifications.healthAlerts,
          category: 'notifications',
        },
        {
          key: 'medicationReminders',
          label: 'Medication Reminders',
          description: 'Daily medication schedule alerts',
          type: 'switch',
          value: settings.notifications.medicationReminders,
          category: 'notifications',
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          key: 'biometricAuth',
          label: 'Biometric Authentication',
          description: 'Use fingerprint or face ID to unlock',
          type: 'switch',
          value: settings.privacy.biometricAuth,
          category: 'privacy',
        },
        {
          key: 'shareData',
          label: 'Share Anonymous Data',
          description: 'Help improve healthcare research',
          type: 'switch',
          value: settings.privacy.shareData,
          category: 'privacy',
        },
        {
          key: 'allowAnalytics',
          label: 'Usage Analytics',
          description: 'Help us improve the app experience',
          type: 'switch',
          value: settings.privacy.allowAnalytics,
          category: 'privacy',
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          key: 'units',
          label: 'Measurement Units',
          description: settings.preferences.units === 'imperial' ? 'Imperial (lbs, °F)' : 'Metric (kg, °C)',
          type: 'select',
          value: settings.preferences.units,
          category: 'preferences',
        },
        {
          key: 'language',
          label: 'Language',
          description: settings.preferences.language,
          type: 'select',
          value: settings.preferences.language,
          category: 'preferences',
        },
        {
          key: 'theme',
          label: 'App Theme',
          description: settings.preferences.theme === 'light' ? 'Light Mode' : settings.preferences.theme === 'dark' ? 'Dark Mode' : 'System Default',
          type: 'select',
          value: settings.preferences.theme,
          category: 'preferences',
        },
      ],
    },
  ];

  const handleSelectSetting = (category: string, key: string, currentValue: string) => {
    if (key === 'units') {
      Alert.alert(
        'Measurement Units',
        'Choose your preferred units',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Imperial (lbs, °F)', 
            onPress: () => updateSetting(category, key, 'imperial')
          },
          { 
            text: 'Metric (kg, °C)', 
            onPress: () => updateSetting(category, key, 'metric')
          },
        ]
      );
    } else if (key === 'theme') {
      Alert.alert(
        'App Theme',
        'Choose your preferred theme',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Light Mode', 
            onPress: () => updateSetting(category, key, 'light')
          },
          { 
            text: 'Dark Mode', 
            onPress: () => updateSetting(category, key, 'dark')
          },
          { 
            text: 'System Default', 
            onPress: () => updateSetting(category, key, 'system')
          },
        ]
      );
    } else {
      Alert.alert('Coming Soon', 'This setting will be available in a future update.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <FadeInView delay={100} direction="down">
          <View style={styles.header}>
            <Heading1>Settings</Heading1>
            <BodyText color={theme.colors.textSecondary}>
              Customize your app experience
            </BodyText>
          </View>
        </FadeInView>

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <FadeInView key={section.title} delay={300 + sectionIndex * 200} direction="up">
            <View style={styles.section}>
              <Heading3 style={styles.sectionTitle}>{section.title}</Heading3>
              <SlideInCard delay={400 + sectionIndex * 200} direction="left">
                {section.items.map((item, index) => (
                  <View 
                    key={item.key} 
                    style={[
                      styles.settingItem,
                      index < section.items.length - 1 && styles.settingItemBorder
                    ]}
                  >
                    <View style={styles.settingInfo}>
                      <BodyText style={styles.settingLabel}>{item.label}</BodyText>
                      <Caption color={theme.colors.textSecondary}>
                        {item.description}
                      </Caption>
                    </View>
                    
                    {item.type === 'switch' ? (
                      <Switch
                        value={item.value as boolean}
                        onValueChange={(value) => updateSetting(item.category, item.key, value)}
                        trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                        thumbColor={item.value ? theme.colors.surface : theme.colors.textTertiary}
                      />
                    ) : (
                      <TouchableOpacity 
                        onPress={() => handleSelectSetting(item.category, item.key, item.value as string)}
                        style={styles.selectButton}
                      >
                        <BodyText color={theme.colors.textTertiary}>→</BodyText>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </SlideInCard>
            </View>
          </FadeInView>
        ))}

        {/* Support Section */}
        <FadeInView delay={1000} direction="up">
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Support & Information</Heading3>
            <SlideInCard delay={1100} direction="left">
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <BodyText style={styles.settingLabel}>Help Center</BodyText>
                  <Caption color={theme.colors.textSecondary}>
                    FAQs and user guides
                  </Caption>
                </View>
                <BodyText color={theme.colors.textTertiary}>→</BodyText>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.settingItem, styles.settingItemBorder]}>
                <View style={styles.settingInfo}>
                  <BodyText style={styles.settingLabel}>Contact Support</BodyText>
                  <Caption color={theme.colors.textSecondary}>
                    Get help from our team
                  </Caption>
                </View>
                <BodyText color={theme.colors.textTertiary}>→</BodyText>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.settingItem, styles.settingItemBorder]}>
                <View style={styles.settingInfo}>
                  <BodyText style={styles.settingLabel}>Privacy Policy</BodyText>
                  <Caption color={theme.colors.textSecondary}>
                    How we protect your data
                  </Caption>
                </View>
                <BodyText color={theme.colors.textTertiary}>→</BodyText>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.settingItem, styles.settingItemBorder]}>
                <View style={styles.settingInfo}>
                  <BodyText style={styles.settingLabel}>Terms of Service</BodyText>
                  <Caption color={theme.colors.textSecondary}>
                    App usage terms
                  </Caption>
                </View>
                <BodyText color={theme.colors.textTertiary}>→</BodyText>
              </TouchableOpacity>
              
              <View style={[styles.settingItem, styles.settingItemBorder]}>
                <View style={styles.settingInfo}>
                  <BodyText style={styles.settingLabel}>App Version</BodyText>
                  <Caption color={theme.colors.textSecondary}>
                    1.0.0 (Build 1)
                  </Caption>
                </View>
              </View>
            </SlideInCard>
          </View>
        </FadeInView>

        {/* Reset Section */}
        <FadeInView delay={1300} direction="up">
          <View style={[styles.section, styles.lastSection]}>
            <Button
              title="Reset All Settings"
              variant="outline"
              onPress={() => {
                Alert.alert(
                  'Reset Settings',
                  'This will reset all settings to their default values. This action cannot be undone.',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { 
                      text: 'Reset', 
                      style: 'destructive',
                      onPress: () => {
                        // Reset to default settings
                        setSettings({
                          notifications: {
                            push: true,
                            email: true,
                            sms: false,
                            healthAlerts: true,
                            medicationReminders: true,
                            appointmentReminders: true,
                          },
                          privacy: {
                            shareData: false,
                            allowAnalytics: true,
                            biometricAuth: true,
                          },
                          preferences: {
                            units: 'imperial',
                            language: 'English',
                            timezone: 'EST',
                            theme: 'light',
                          },
                        });
                        Alert.alert('Success', 'Settings have been reset to defaults.');
                      }
                    }
                  ]
                );
              }}
              fullWidth
            />
          </View>
        </FadeInView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.base,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.base,
  },
  section: {
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.base,
  },
  lastSection: {
    marginBottom: theme.spacing['2xl'],
  },
  sectionTitle: {
    marginBottom: theme.spacing.base,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
  },
  settingItemBorder: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  settingInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  settingLabel: {
    fontWeight: theme.typography.fontWeights.medium,
    marginBottom: theme.spacing.xs,
  },
  selectButton: {
    padding: theme.spacing.sm,
  },
});