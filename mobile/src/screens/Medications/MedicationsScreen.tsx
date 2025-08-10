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
import { Badge } from '../../components/ui/Badge';
import { FadeInView } from '../../components/ui/FadeInView';
import { SlideInCard } from '../../components/ui/SlideInCard';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timeSlots: string[];
  prescribedBy: string;
  startDate: string;
  endDate?: string;
  instructions?: string;
  sideEffects?: string[];
  isActive: boolean;
  adherenceRate: number;
  nextDose?: Date;
  color: string;
}

interface MedicationLog {
  id: string;
  medicationId: string;
  scheduledTime: Date;
  takenTime?: Date;
  status: 'taken' | 'missed' | 'pending';
  notes?: string;
}

export default function MedicationsScreen({ navigation }: any) {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      timeSlots: ['08:00'],
      prescribedBy: 'Dr. Johnson',
      startDate: '2024-01-15',
      instructions: 'Take with or without food. Avoid potassium supplements.',
      sideEffects: ['Dry cough', 'Dizziness', 'Fatigue'],
      isActive: true,
      adherenceRate: 95,
      nextDose: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      color: theme.colors.bloodPressure,
    },
    {
      id: '2',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      timeSlots: ['08:00', '20:00'],
      prescribedBy: 'Dr. Smith',
      startDate: '2024-02-01',
      instructions: 'Take with meals to reduce stomach upset.',
      sideEffects: ['Nausea', 'Diarrhea', 'Metallic taste'],
      isActive: true,
      adherenceRate: 88,
      nextDose: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
      color: theme.colors.glucose,
    },
    {
      id: '3',
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily',
      timeSlots: ['22:00'],
      prescribedBy: 'Dr. Johnson',
      startDate: '2024-01-20',
      instructions: 'Take in the evening. Avoid grapefruit juice.',
      sideEffects: ['Muscle pain', 'Liver problems'],
      isActive: true,
      adherenceRate: 92,
      nextDose: new Date(Date.now() + 14 * 60 * 60 * 1000), // 14 hours from now
      color: theme.colors.secondary,
    },
  ]);

  const [todayLogs] = useState<MedicationLog[]>([
    {
      id: '1',
      medicationId: '1',
      scheduledTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      takenTime: new Date(Date.now() - 2 * 60 * 60 * 1000 + 15 * 60 * 1000),
      status: 'taken',
    },
    {
      id: '2',
      medicationId: '2',
      scheduledTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      takenTime: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000),
      status: 'taken',
    },
    {
      id: '3',
      medicationId: '2',
      scheduledTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
      status: 'pending',
    },
    {
      id: '4',
      medicationId: '3',
      scheduledTime: new Date(Date.now() + 14 * 60 * 60 * 1000),
      status: 'pending',
    },
  ]);

  const [remindersEnabled, setRemindersEnabled] = useState(true);

  const toggleMedication = (medicationId: string) => {
    setMedications(prev =>
      prev.map(med =>
        med.id === medicationId
          ? { ...med, isActive: !med.isActive }
          : med
      )
    );
  };

  const markAsTaken = (medicationId: string) => {
    Alert.alert(
      'Mark as Taken',
      'Did you take your medication?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Yes, taken', 
          onPress: () => {
            // Update medication log
            Alert.alert('Success', 'Medication marked as taken!');
          }
        }
      ]
    );
  };

  const getAdherenceColor = (rate: number) => {
    if (rate >= 95) return theme.colors.success;
    if (rate >= 80) return theme.colors.warning;
    return theme.colors.error;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'taken': return theme.colors.success;
      case 'missed': return theme.colors.error;
      case 'pending': return theme.colors.warning;
      default: return theme.colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'taken': return '✅';
      case 'missed': return '❌';
      case 'pending': return '⏰';
      default: return '💊';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getNextDoseText = (nextDose?: Date) => {
    if (!nextDose) return 'No upcoming dose';
    
    const now = new Date();
    const diffInHours = Math.floor((nextDose.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((nextDose.getTime() - now.getTime()) / (1000 * 60));
      return `Next dose in ${diffInMinutes} minutes`;
    } else if (diffInHours < 24) {
      return `Next dose in ${diffInHours} hours`;
    } else {
      return `Next dose at ${formatTime(nextDose)}`;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <FadeInView delay={100} direction="down">
          <View style={styles.header}>
            <Heading1>Medications</Heading1>
            <BodyText color={theme.colors.textSecondary}>
              Manage your medication schedule
            </BodyText>
          </View>
        </FadeInView>

        {/* Reminder Settings */}
        <FadeInView delay={200} direction="up">
          <View style={styles.section}>
            <SlideInCard delay={300} direction="left">
              <View style={styles.reminderCard}>
                <View style={styles.reminderHeader}>
                  <View style={styles.reminderIcon}>
                    <BodyText>🔔</BodyText>
                  </View>
                  <View style={styles.reminderInfo}>
                    <BodyText style={styles.reminderTitle}>Medication Reminders</BodyText>
                    <Caption color={theme.colors.textSecondary}>
                      Get notified when it's time to take your medications
                    </Caption>
                  </View>
                  <Switch
                    value={remindersEnabled}
                    onValueChange={setRemindersEnabled}
                    trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                  />
                </View>
              </View>
            </SlideInCard>
          </View>
        </FadeInView>

        {/* Today's Schedule */}
        <FadeInView delay={400} direction="up">
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Today's Schedule</Heading3>
            {todayLogs.map((log, index) => {
              const medication = medications.find(med => med.id === log.medicationId);
              if (!medication) return null;

              return (
                <SlideInCard 
                  key={log.id} 
                  delay={500 + index * 100} 
                  direction="left"
                  style={styles.scheduleCard}
                >
                  <TouchableOpacity 
                    style={styles.scheduleItem}
                    onPress={() => log.status === 'pending' && markAsTaken(medication.id)}
                  >
                    <View style={[styles.scheduleIcon, { backgroundColor: `${medication.color}15` }]}>
                      <BodyText>{getStatusIcon(log.status)}</BodyText>
                    </View>
                    <View style={styles.scheduleInfo}>
                      <BodyText style={styles.scheduleMedication}>
                        {medication.name} {medication.dosage}
                      </BodyText>
                      <Caption color={theme.colors.textSecondary}>
                        Scheduled: {formatTime(log.scheduledTime)}
                        {log.takenTime && ` • Taken: ${formatTime(log.takenTime)}`}
                      </Caption>
                    </View>
                    <View style={styles.scheduleStatus}>
                      <Badge 
                        variant={log.status === 'taken' ? 'success' : log.status === 'missed' ? 'error' : 'warning'}
                        size="sm"
                      >
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </Badge>
                    </View>
                  </TouchableOpacity>
                </SlideInCard>
              );
            })}
          </View>
        </FadeInView>

        {/* Active Medications */}
        <FadeInView delay={800} direction="up">
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Heading3 style={styles.sectionTitle}>Active Medications</Heading3>
              <TouchableOpacity>
                <Caption color={theme.colors.primary}>Add New</Caption>
              </TouchableOpacity>
            </View>
            {medications.filter(med => med.isActive).map((medication, index) => (
              <SlideInCard 
                key={medication.id} 
                delay={900 + index * 100} 
                direction="left"
                style={styles.medicationCard}
              >
                <View style={styles.medicationHeader}>
                  <View style={[styles.medicationIcon, { backgroundColor: `${medication.color}15` }]}>
                    <BodyText color={medication.color}>💊</BodyText>
                  </View>
                  <View style={styles.medicationInfo}>
                    <BodyText style={styles.medicationName}>
                      {medication.name} {medication.dosage}
                    </BodyText>
                    <Caption color={theme.colors.textSecondary}>
                      {medication.frequency} • Prescribed by {medication.prescribedBy}
                    </Caption>
                    <Caption color={theme.colors.textTertiary}>
                      {getNextDoseText(medication.nextDose)}
                    </Caption>
                  </View>
                  <TouchableOpacity 
                    style={styles.medicationToggle}
                    onPress={() => toggleMedication(medication.id)}
                  >
                    <BodyText color={theme.colors.textTertiary}>⋮</BodyText>
                  </TouchableOpacity>
                </View>

                <View style={styles.medicationStats}>
                  <View style={styles.adherenceContainer}>
                    <Caption color={theme.colors.textSecondary}>Adherence Rate</Caption>
                    <View style={styles.adherenceValue}>
                      <BodyText 
                        color={getAdherenceColor(medication.adherenceRate)}
                        weight="semibold"
                      >
                        {medication.adherenceRate}%
                      </BodyText>
                    </View>
                  </View>
                  <View style={styles.timeSlotsContainer}>
                    <Caption color={theme.colors.textSecondary}>Daily Times</Caption>
                    <View style={styles.timeSlots}>
                      {medication.timeSlots.map((time, timeIndex) => (
                        <View key={timeIndex} style={styles.timeSlot}>
                          <Caption color={medication.color} weight="medium">
                            {time}
                          </Caption>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>

                {medication.instructions && (
                  <View style={styles.medicationInstructions}>
                    <Caption color={theme.colors.textSecondary} style={styles.instructionsText}>
                      💡 {medication.instructions}
                    </Caption>
                  </View>
                )}

                <View style={styles.medicationActions}>
                  <Button
                    title="Mark as Taken"
                    onPress={() => markAsTaken(medication.id)}
                    variant="outline"
                    size="sm"
                    style={styles.actionButton}
                  />
                  <Button
                    title="View Details"
                    onPress={() => Alert.alert('Coming Soon', 'Medication details coming soon!')}
                    variant="ghost"
                    size="sm"
                    style={styles.actionButton}
                  />
                </View>
              </SlideInCard>
            ))}
          </View>
        </FadeInView>

        {/* Quick Actions */}
        <FadeInView delay={1200} direction="up">
          <View style={[styles.section, styles.lastSection]}>
            <Heading3 style={styles.sectionTitle}>Quick Actions</Heading3>
            <View style={styles.actionsGrid}>
              <Button
                title="Add Medication"
                onPress={() => Alert.alert('Coming Soon', 'Add medication feature coming soon!')}
                variant="primary"
                style={styles.actionButton}
              />
              <Button
                title="Medication History"
                onPress={() => Alert.alert('Coming Soon', 'Medication history coming soon!')}
                variant="outline"
                style={styles.actionButton}
              />
            </View>
            <Button
              title="Share with Doctor"
              onPress={() => Alert.alert('Coming Soon', 'Share medication list coming soon!')}
              variant="ghost"
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.base,
  },
  sectionTitle: {
    marginBottom: theme.spacing.base,
  },
  reminderCard: {
    padding: theme.spacing.base,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.base,
    backgroundColor: `${theme.colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontWeight: theme.typography.fontWeights.medium,
    marginBottom: theme.spacing.xs,
  },
  scheduleCard: {
    marginBottom: theme.spacing.md,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.base,
  },
  scheduleIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleMedication: {
    fontWeight: theme.typography.fontWeights.medium,
    marginBottom: theme.spacing.xs,
  },
  scheduleStatus: {
    marginLeft: theme.spacing.sm,
  },
  medicationCard: {
    marginBottom: theme.spacing.base,
    padding: theme.spacing.base,
  },
  medicationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.base,
  },
  medicationIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontWeight: theme.typography.fontWeights.semibold,
    marginBottom: theme.spacing.xs,
  },
  medicationToggle: {
    padding: theme.spacing.sm,
  },
  medicationStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.base,
    paddingVertical: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  adherenceContainer: {
    alignItems: 'center',
  },
  adherenceValue: {
    marginTop: theme.spacing.xs,
  },
  timeSlotsContainer: {
    alignItems: 'center',
  },
  timeSlots: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  timeSlot: {
    backgroundColor: `${theme.colors.primary}10`,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  medicationInstructions: {
    backgroundColor: `${theme.colors.info}10`,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.base,
    marginBottom: theme.spacing.base,
  },
  instructionsText: {
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.sm,
  },
  medicationActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
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