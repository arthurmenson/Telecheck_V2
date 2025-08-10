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
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { FadeInView } from '../../components/ui/FadeInView';
import { SlideInCard } from '../../components/ui/SlideInCard';

export default function ProfileScreen({ navigation }: any) {
  const [user] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: 'March 15, 1985',
    emergencyContact: {
      name: 'John Johnson',
      phone: '+1 (555) 987-6543',
      relationship: 'Spouse'
    }
  });

  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
  });

  const [preferences, setPreferences] = useState({
    units: 'imperial', // imperial or metric
    language: 'English',
    timezone: 'EST',
  });

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => navigation.replace('Login')
        }
      ]
    );
  };

  const profileSections = [
    {
      title: 'Personal Information',
      items: [
        { label: 'Full Name', value: user.name, icon: '👤' },
        { label: 'Email', value: user.email, icon: '📧' },
        { label: 'Phone', value: user.phone, icon: '📱' },
        { label: 'Date of Birth', value: user.dateOfBirth, icon: '🎂' },
      ]
    },
    {
      title: 'Emergency Contact',
      items: [
        { label: 'Name', value: user.emergencyContact.name, icon: '🚨' },
        { label: 'Phone', value: user.emergencyContact.phone, icon: '📞' },
        { label: 'Relationship', value: user.emergencyContact.relationship, icon: '👥' },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <FadeInView delay={100} direction="down">
          <View style={styles.header}>
            <View style={styles.profileInfo}>
              <Avatar 
                size="xl" 
                name={user.name}
                showBadge
                badgeColor={theme.colors.success}
              />
              <View style={styles.userInfo}>
                <Heading1 style={styles.userName}>{user.name}</Heading1>
                <BodyText color={theme.colors.textSecondary}>
                  {user.email}
                </BodyText>
                <View style={styles.badges}>
                  <Badge variant="success" size="sm">Active Patient</Badge>
                  <Badge variant="info" size="sm">RPM Enrolled</Badge>
                </View>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => Alert.alert('Coming Soon', 'Profile editing coming soon!')}
            >
              <BodyText color={theme.colors.primary}>Edit</BodyText>
            </TouchableOpacity>
          </View>
        </FadeInView>

        {/* Profile Sections */}
        {profileSections.map((section, sectionIndex) => (
          <FadeInView key={section.title} delay={300 + sectionIndex * 200} direction="up">
            <View style={styles.section}>
              <Heading3 style={styles.sectionTitle}>{section.title}</Heading3>
              <SlideInCard delay={400 + sectionIndex * 200} direction="left">
                {section.items.map((item, index) => (
                  <View 
                    key={item.label} 
                    style={[
                      styles.infoItem,
                      index < section.items.length - 1 && styles.infoItemBorder
                    ]}
                  >
                    <View style={styles.infoIcon}>
                      <BodyText>{item.icon}</BodyText>
                    </View>
                    <View style={styles.infoContent}>
                      <Caption color={theme.colors.textSecondary}>
                        {item.label}
                      </Caption>
                      <BodyText style={styles.infoValue}>
                        {item.value}
                      </BodyText>
                    </View>
                  </View>
                ))}
              </SlideInCard>
            </View>
          </FadeInView>
        ))}

        {/* Notification Settings */}
        <FadeInView delay={700} direction="up">
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Notifications</Heading3>
            <SlideInCard delay={800} direction="left">
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <BodyText style={styles.settingLabel}>Push Notifications</BodyText>
                  <Caption color={theme.colors.textSecondary}>
                    Health alerts and reminders
                  </Caption>
                </View>
                <Switch
                  value={notifications.push}
                  onValueChange={(value) => 
                    setNotifications(prev => ({ ...prev, push: value }))
                  }
                  trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                />
              </View>
              
              <View style={[styles.settingItem, styles.settingItemBorder]}>
                <View style={styles.settingInfo}>
                  <BodyText style={styles.settingLabel}>Email Notifications</BodyText>
                  <Caption color={theme.colors.textSecondary}>
                    Weekly health reports
                  </Caption>
                </View>
                <Switch
                  value={notifications.email}
                  onValueChange={(value) => 
                    setNotifications(prev => ({ ...prev, email: value }))
                  }
                  trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                />
              </View>
              
              <View style={[styles.settingItem, styles.settingItemBorder]}>
                <View style={styles.settingInfo}>
                  <BodyText style={styles.settingLabel}>SMS Notifications</BodyText>
                  <Caption color={theme.colors.textSecondary}>
                    Critical health alerts only
                  </Caption>
                </View>
                <Switch
                  value={notifications.sms}
                  onValueChange={(value) => 
                    setNotifications(prev => ({ ...prev, sms: value }))
                  }
                  trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                />
              </View>
            </SlideInCard>
          </View>
        </FadeInView>

        {/* App Settings */}
        <FadeInView delay={900} direction="up">
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>App Settings</Heading3>
            <SlideInCard delay={1000} direction="left">
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <BodyText style={styles.settingLabel}>Units</BodyText>
                  <Caption color={theme.colors.textSecondary}>
                    {preferences.units === 'imperial' ? 'Imperial (lbs, °F)' : 'Metric (kg, °C)'}
                  </Caption>
                </View>
                <BodyText color={theme.colors.textTertiary}>→</BodyText>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.settingItem, styles.settingItemBorder]}>
                <View style={styles.settingInfo}>
                  <BodyText style={styles.settingLabel}>Language</BodyText>
                  <Caption color={theme.colors.textSecondary}>
                    {preferences.language}
                  </Caption>
                </View>
                <BodyText color={theme.colors.textTertiary}>→</BodyText>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.settingItem, styles.settingItemBorder]}>
                <View style={styles.settingInfo}>
                  <BodyText style={styles.settingLabel}>Privacy Settings</BodyText>
                  <Caption color={theme.colors.textSecondary}>
                    Data sharing and permissions
                  </Caption>
                </View>
                <BodyText color={theme.colors.textTertiary}>→</BodyText>
              </TouchableOpacity>
            </SlideInCard>
          </View>
        </FadeInView>

        {/* Support & Help */}
        <FadeInView delay={1100} direction="up">
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Support & Help</Heading3>
            <SlideInCard delay={1200} direction="left">
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <BodyText style={styles.settingLabel}>Help Center</BodyText>
                  <Caption color={theme.colors.textSecondary}>
                    FAQs and tutorials
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
                  <BodyText style={styles.settingLabel}>About Telecheck</BodyText>
                  <Caption color={theme.colors.textSecondary}>
                    Version 1.0.0
                  </Caption>
                </View>
                <BodyText color={theme.colors.textTertiary}>→</BodyText>
              </TouchableOpacity>
            </SlideInCard>
          </View>
        </FadeInView>

        {/* Logout Button */}
        <FadeInView delay={1300} direction="up">
          <View style={[styles.section, styles.lastSection]}>
            <Button
              title="Sign Out"
              variant="destructive"
              onPress={handleLogout}
              fullWidth
            />
            
            <TouchableOpacity 
              style={styles.settingsButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <BodyText color={theme.colors.primary}>App Settings</BodyText>
            </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: theme.spacing.base,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.base,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userInfo: {
    marginLeft: theme.spacing.base,
    flex: 1,
  },
  userName: {
    marginBottom: theme.spacing.xs,
  },
  badges: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  editButton: {
    padding: theme.spacing.sm,
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
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  infoItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.base,
    backgroundColor: `${theme.colors.primary}10`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoValue: {
    marginTop: theme.spacing.xs,
    fontWeight: theme.typography.fontWeights.medium,
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
  },
  settingLabel: {
    fontWeight: theme.typography.fontWeights.medium,
    marginBottom: theme.spacing.xs,
  },
  settingsButton: {
    alignSelf: 'center',
    marginTop: theme.spacing.base,
    padding: theme.spacing.sm,
  },
});