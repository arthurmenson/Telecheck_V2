import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  Linking 
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

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

interface MedicalInfo {
  allergies: string[];
  medications: string[];
  conditions: string[];
  bloodType: string;
  emergencyNotes: string;
}

export default function EmergencyScreen({ navigation }: any) {
  const [emergencyContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'John Johnson',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543',
      isPrimary: true,
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      relationship: 'Primary Care Doctor',
      phone: '+1 (555) 123-4567',
      isPrimary: false,
    },
    {
      id: '3',
      name: 'Mary Johnson',
      relationship: 'Sister',
      phone: '+1 (555) 456-7890',
      isPrimary: false,
    },
  ]);

  const [medicalInfo] = useState<MedicalInfo>({
    allergies: ['Penicillin', 'Shellfish'],
    medications: ['Lisinopril 10mg', 'Metformin 500mg'],
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    bloodType: 'A+',
    emergencyNotes: 'Patient has history of heart palpitations. Prefers to be contacted in English.',
  });

  const emergencyServices = [
    {
      name: '911 Emergency',
      description: 'Police, Fire, Medical Emergency',
      phone: '911',
      color: theme.colors.error,
      icon: '🚨',
    },
    {
      name: 'Poison Control',
      description: '24/7 Poison Emergency Hotline',
      phone: '1-800-222-1222',
      color: theme.colors.warning,
      icon: '☠️',
    },
    {
      name: 'Crisis Hotline',
      description: 'Mental Health Crisis Support',
      phone: '988',
      color: theme.colors.info,
      icon: '🧠',
    },
    {
      name: 'Telehealth Urgent Care',
      description: 'Virtual urgent care consultation',
      phone: '+1 (555) URGENT1',
      color: theme.colors.primary,
      icon: '💻',
    },
  ];

  const handleCall = (phone: string, name: string) => {
    Alert.alert(
      `Call ${name}?`,
      `This will call ${phone}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call', 
          onPress: () => {
            Linking.openURL(`tel:${phone.replace(/[^\d+]/g, '')}`);
          }
        }
      ]
    );
  };

  const handleEmergencyCall = (phone: string, name: string) => {
    Alert.alert(
      `Emergency Call`,
      `Calling ${name} at ${phone}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call Now', 
          style: 'destructive',
          onPress: () => {
            Linking.openURL(`tel:${phone.replace(/[^\d+]/g, '')}`);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <FadeInView delay={100} direction="down">
          <View style={styles.header}>
            <Heading1 color={theme.colors.error}>Emergency</Heading1>
            <BodyText color={theme.colors.textSecondary}>
              Quick access to emergency services and contacts
            </BodyText>
          </View>
        </FadeInView>

        {/* Emergency Services */}
        <FadeInView delay={200} direction="up">
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Emergency Services</Heading3>
            {emergencyServices.map((service, index) => (
              <SlideInCard 
                key={service.name} 
                delay={300 + index * 100} 
                direction="left"
                style={styles.emergencyCard}
              >
                <TouchableOpacity
                  style={styles.emergencyService}
                  onPress={() => handleEmergencyCall(service.phone, service.name)}
                >
                  <View style={[styles.serviceIcon, { backgroundColor: `${service.color}15` }]}>
                    <BodyText>{service.icon}</BodyText>
                  </View>
                  <View style={styles.serviceInfo}>
                    <BodyText style={styles.serviceName} color={service.color}>
                      {service.name}
                    </BodyText>
                    <Caption color={theme.colors.textSecondary}>
                      {service.description}
                    </Caption>
                    <Caption color={theme.colors.textTertiary} style={styles.servicePhone}>
                      {service.phone}
                    </Caption>
                  </View>
                  <View style={styles.callButton}>
                    <Button
                      title="Call"
                      onPress={() => handleEmergencyCall(service.phone, service.name)}
                      variant={service.name.includes('911') ? 'destructive' : 'primary'}
                      size="sm"
                    />
                  </View>
                </TouchableOpacity>
              </SlideInCard>
            ))}
          </View>
        </FadeInView>

        {/* Emergency Contacts */}
        <FadeInView delay={600} direction="up">
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Emergency Contacts</Heading3>
            {emergencyContacts.map((contact, index) => (
              <SlideInCard 
                key={contact.id} 
                delay={700 + index * 100} 
                direction="left"
                style={styles.contactCard}
              >
                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={() => handleCall(contact.phone, contact.name)}
                >
                  <View style={styles.contactIcon}>
                    <BodyText>{contact.isPrimary ? '⭐' : '👤'}</BodyText>
                  </View>
                  <View style={styles.contactInfo}>
                    <BodyText style={styles.contactName}>
                      {contact.name}
                      {contact.isPrimary && (
                        <Caption color={theme.colors.warning}> (Primary)</Caption>
                      )}
                    </BodyText>
                    <Caption color={theme.colors.textSecondary}>
                      {contact.relationship}
                    </Caption>
                    <Caption color={theme.colors.textTertiary}>
                      {contact.phone}
                    </Caption>
                  </View>
                  <TouchableOpacity
                    style={styles.phoneButton}
                    onPress={() => handleCall(contact.phone, contact.name)}
                  >
                    <BodyText color={theme.colors.primary}>📞</BodyText>
                  </TouchableOpacity>
                </TouchableOpacity>
              </SlideInCard>
            ))}
          </View>
        </FadeInView>

        {/* Medical Information */}
        <FadeInView delay={1000} direction="up">
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Medical Information</Heading3>
            <SlideInCard delay={1100} direction="left">
              <View style={styles.medicalCard}>
                <View style={styles.medicalSection}>
                  <BodyText style={styles.medicalLabel}>Blood Type</BodyText>
                  <BodyText style={styles.medicalValue} color={theme.colors.error}>
                    {medicalInfo.bloodType}
                  </BodyText>
                </View>

                <View style={[styles.medicalSection, styles.medicalSectionBorder]}>
                  <BodyText style={styles.medicalLabel}>Allergies</BodyText>
                  <View style={styles.medicalList}>
                    {medicalInfo.allergies.map((allergy, index) => (
                      <View key={index} style={styles.medicalTag}>
                        <Caption color={theme.colors.error}>⚠️ {allergy}</Caption>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={[styles.medicalSection, styles.medicalSectionBorder]}>
                  <BodyText style={styles.medicalLabel}>Current Medications</BodyText>
                  <View style={styles.medicalList}>
                    {medicalInfo.medications.map((medication, index) => (
                      <View key={index} style={styles.medicalTag}>
                        <Caption color={theme.colors.info}>💊 {medication}</Caption>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={[styles.medicalSection, styles.medicalSectionBorder]}>
                  <BodyText style={styles.medicalLabel}>Medical Conditions</BodyText>
                  <View style={styles.medicalList}>
                    {medicalInfo.conditions.map((condition, index) => (
                      <View key={index} style={styles.medicalTag}>
                        <Caption color={theme.colors.warning}>🏥 {condition}</Caption>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={[styles.medicalSection, styles.medicalSectionBorder]}>
                  <BodyText style={styles.medicalLabel}>Emergency Notes</BodyText>
                  <BodyText color={theme.colors.textSecondary} style={styles.emergencyNotes}>
                    {medicalInfo.emergencyNotes}
                  </BodyText>
                </View>
              </View>
            </SlideInCard>
          </View>
        </FadeInView>

        {/* Quick Actions */}
        <FadeInView delay={1300} direction="up">
          <View style={[styles.section, styles.lastSection]}>
            <Heading3 style={styles.sectionTitle}>Quick Actions</Heading3>
            <View style={styles.actionsGrid}>
              <Button
                title="Share Medical Info"
                onPress={() => Alert.alert('Coming Soon', 'Medical info sharing coming soon!')}
                variant="outline"
                style={styles.actionButton}
              />
              <Button
                title="Update Contacts"
                onPress={() => Alert.alert('Coming Soon', 'Contact management coming soon!')}
                variant="ghost"
                style={styles.actionButton}
              />
            </View>
            <Button
              title="Medical ID Card"
              onPress={() => Alert.alert('Coming Soon', 'Digital medical ID coming soon!')}
              variant="primary"
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
  emergencyCard: {
    marginBottom: theme.spacing.md,
  },
  emergencyService: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.base,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontWeight: theme.typography.fontWeights.semibold,
    marginBottom: theme.spacing.xs,
  },
  servicePhone: {
    marginTop: theme.spacing.xs,
    fontFamily: 'monospace',
  },
  callButton: {
    marginLeft: theme.spacing.sm,
  },
  contactCard: {
    marginBottom: theme.spacing.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.base,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.base,
    backgroundColor: `${theme.colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontWeight: theme.typography.fontWeights.semibold,
    marginBottom: theme.spacing.xs,
  },
  phoneButton: {
    padding: theme.spacing.sm,
  },
  medicalCard: {
    padding: theme.spacing.base,
  },
  medicalSection: {
    paddingVertical: theme.spacing.md,
  },
  medicalSectionBorder: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  medicalLabel: {
    fontWeight: theme.typography.fontWeights.semibold,
    marginBottom: theme.spacing.sm,
  },
  medicalValue: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.bold,
  },
  medicalList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  medicalTag: {
    backgroundColor: `${theme.colors.info}10`,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.base,
  },
  emergencyNotes: {
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.base,
    fontStyle: 'italic',
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.base,
  },
  actionButton: {
    flex: 1,
  },
});