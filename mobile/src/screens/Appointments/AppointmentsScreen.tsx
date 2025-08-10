import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Alert,
  Calendar 
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
import { Tabs } from '../../components/ui/Tabs';

interface Appointment {
  id: string;
  title: string;
  doctor: string;
  specialty: string;
  date: Date;
  duration: number; // in minutes
  type: 'in-person' | 'telehealth' | 'phone';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  location?: string;
  notes?: string;
  preparation?: string[];
  color: string;
}

export default function AppointmentsScreen({ navigation }: any) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Follow-up Consultation',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      duration: 30,
      type: 'in-person',
      status: 'confirmed',
      location: 'Heart Center, Room 205',
      notes: 'Discuss recent blood pressure readings and medication adjustments',
      preparation: ['Bring medication list', 'Bring blood pressure log', 'Prepare questions'],
      color: theme.colors.bloodPressure,
    },
    {
      id: '2',
      title: 'Diabetes Check-up',
      doctor: 'Dr. Michael Smith',
      specialty: 'Endocrinology',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
      duration: 45,
      type: 'telehealth',
      status: 'scheduled',
      notes: 'Review A1C results and discuss diet modifications',
      preparation: ['Fast for 8 hours before lab work', 'Prepare glucose log'],
      color: theme.colors.glucose,
    },
    {
      id: '3',
      title: 'Annual Physical',
      doctor: 'Dr. Emily Davis',
      specialty: 'Primary Care',
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Two weeks
      duration: 60,
      type: 'in-person',
      status: 'scheduled',
      location: 'Main Clinic, Room 101',
      preparation: ['Complete health questionnaire', 'Bring insurance card', 'List of current medications'],
      color: theme.colors.primary,
    },
    {
      id: '4',
      title: 'Lab Results Review',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last week
      duration: 15,
      type: 'phone',
      status: 'completed',
      notes: 'Discussed cholesterol levels and lifestyle recommendations',
      color: theme.colors.success,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'scheduled': return 'warning';
      case 'completed': return 'info';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'telehealth': return '💻';
      case 'phone': return '📞';
      case 'in-person': return '🏥';
      default: return '📅';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getUpcomingAppointments = () => {
    const now = new Date();
    return appointments
      .filter(apt => apt.date > now && apt.status !== 'cancelled')
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const getPastAppointments = () => {
    const now = new Date();
    return appointments
      .filter(apt => apt.date <= now || apt.status === 'completed')
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const renderUpcoming = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {getUpcomingAppointments().length === 0 ? (
        <FadeInView delay={200} direction="up">
          <View style={styles.emptyState}>
            <BodyText style={styles.emptyIcon}>📅</BodyText>
            <Heading3 style={styles.emptyTitle}>No Upcoming Appointments</Heading3>
            <BodyText color={theme.colors.textSecondary} style={styles.emptyMessage}>
              Schedule your next appointment to stay on top of your health.
            </BodyText>
            <Button
              title="Schedule Appointment"
              onPress={() => Alert.alert('Coming Soon', 'Appointment scheduling coming soon!')}
              style={styles.emptyButton}
            />
          </View>
        </FadeInView>
      ) : (
        getUpcomingAppointments().map((appointment, index) => (
          <FadeInView key={appointment.id} delay={200 + index * 100} direction="up">
            <SlideInCard delay={300 + index * 100} direction="left" style={styles.appointmentCard}>
              <TouchableOpacity style={styles.appointmentContent}>
                <View style={styles.appointmentHeader}>
                  <View style={[styles.appointmentIcon, { backgroundColor: `${appointment.color}15` }]}>
                    <BodyText>{getTypeIcon(appointment.type)}</BodyText>
                  </View>
                  <View style={styles.appointmentInfo}>
                    <BodyText style={styles.appointmentTitle}>{appointment.title}</BodyText>
                    <Caption color={theme.colors.textSecondary}>
                      {appointment.doctor} • {appointment.specialty}
                    </Caption>
                  </View>
                  <Badge variant={getStatusColor(appointment.status) as any} size="sm">
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </Badge>
                </View>

                <View style={styles.appointmentDetails}>
                  <View style={styles.appointmentDateTime}>
                    <BodyText color={appointment.color} weight="semibold">
                      📅 {formatDate(appointment.date)}
                    </BodyText>
                    <BodyText color={appointment.color} weight="semibold">
                      🕐 {formatTime(appointment.date)} ({appointment.duration} min)
                    </BodyText>
                  </View>

                  {appointment.location && (
                    <BodyText color={theme.colors.textSecondary} style={styles.appointmentLocation}>
                      📍 {appointment.location}
                    </BodyText>
                  )}

                  {appointment.notes && (
                    <BodyText color={theme.colors.textSecondary} style={styles.appointmentNotes}>
                      📝 {appointment.notes}
                    </BodyText>
                  )}

                  {appointment.preparation && appointment.preparation.length > 0 && (
                    <View style={styles.preparationSection}>
                      <Caption color={theme.colors.textSecondary} weight="semibold">
                        Preparation:
                      </Caption>
                      {appointment.preparation.map((item, prepIndex) => (
                        <Caption key={prepIndex} color={theme.colors.textTertiary} style={styles.preparationItem}>
                          • {item}
                        </Caption>
                      ))}
                    </View>
                  )}
                </View>

                <View style={styles.appointmentActions}>
                  <Button
                    title="Reschedule"
                    onPress={() => Alert.alert('Coming Soon', 'Reschedule feature coming soon!')}
                    variant="outline"
                    size="sm"
                    style={styles.actionButton}
                  />
                  <Button
                    title="Join Call"
                    onPress={() => Alert.alert('Coming Soon', 'Video call feature coming soon!')}
                    variant={appointment.type === 'telehealth' ? 'primary' : 'ghost'}
                    size="sm"
                    style={styles.actionButton}
                  />
                </View>
              </TouchableOpacity>
            </SlideInCard>
          </FadeInView>
        ))
      )}
    </ScrollView>
  );

  const renderPast = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {getPastAppointments().map((appointment, index) => (
        <FadeInView key={appointment.id} delay={200 + index * 100} direction="up">
          <SlideInCard delay={300 + index * 100} direction="left" style={styles.appointmentCard}>
            <TouchableOpacity style={styles.appointmentContent}>
              <View style={styles.appointmentHeader}>
                <View style={[styles.appointmentIcon, { backgroundColor: `${appointment.color}15` }]}>
                  <BodyText>{getTypeIcon(appointment.type)}</BodyText>
                </View>
                <View style={styles.appointmentInfo}>
                  <BodyText style={styles.appointmentTitle}>{appointment.title}</BodyText>
                  <Caption color={theme.colors.textSecondary}>
                    {appointment.doctor} • {appointment.specialty}
                  </Caption>
                </View>
                <Badge variant={getStatusColor(appointment.status) as any} size="sm">
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </Badge>
              </View>

              <View style={styles.appointmentDetails}>
                <BodyText color={theme.colors.textSecondary}>
                  📅 {formatDate(appointment.date)} at {formatTime(appointment.date)}
                </BodyText>

                {appointment.notes && (
                  <BodyText color={theme.colors.textSecondary} style={styles.appointmentNotes}>
                    📝 {appointment.notes}
                  </BodyText>
                )}
              </View>

              <View style={styles.appointmentActions}>
                <Button
                  title="View Summary"
                  onPress={() => Alert.alert('Coming Soon', 'Appointment summary coming soon!')}
                  variant="ghost"
                  size="sm"
                  style={styles.actionButton}
                />
                <Button
                  title="Book Follow-up"
                  onPress={() => Alert.alert('Coming Soon', 'Follow-up booking coming soon!')}
                  variant="outline"
                  size="sm"
                  style={styles.actionButton}
                />
              </View>
            </TouchableOpacity>
          </SlideInCard>
        </FadeInView>
      ))}
    </ScrollView>
  );

  const appointmentTabs = [
    {
      key: 'upcoming',
      title: `Upcoming (${getUpcomingAppointments().length})`,
      content: renderUpcoming(),
    },
    {
      key: 'past',
      title: `Past (${getPastAppointments().length})`,
      content: renderPast(),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView delay={100} direction="down">
        <View style={styles.header}>
          <Heading1>Appointments</Heading1>
          <BodyText color={theme.colors.textSecondary}>
            Manage your healthcare appointments
          </BodyText>
        </View>
      </FadeInView>

      <Tabs
        tabs={appointmentTabs}
        defaultTab="upcoming"
      />
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
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing['4xl'],
    paddingHorizontal: theme.spacing.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.lg,
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  emptyMessage: {
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.base,
    marginBottom: theme.spacing.xl,
  },
  emptyButton: {
    minWidth: 200,
  },
  appointmentCard: {
    marginBottom: theme.spacing.base,
  },
  appointmentContent: {
    padding: theme.spacing.base,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.base,
  },
  appointmentIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentTitle: {
    fontWeight: theme.typography.fontWeights.semibold,
    marginBottom: theme.spacing.xs,
  },
  appointmentDetails: {
    marginBottom: theme.spacing.base,
    paddingVertical: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  appointmentDateTime: {
    marginBottom: theme.spacing.sm,
  },
  appointmentLocation: {
    marginBottom: theme.spacing.sm,
  },
  appointmentNotes: {
    marginBottom: theme.spacing.sm,
    fontStyle: 'italic',
  },
  preparationSection: {
    backgroundColor: `${theme.colors.info}10`,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.base,
  },
  preparationItem: {
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.sm,
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
  },
});