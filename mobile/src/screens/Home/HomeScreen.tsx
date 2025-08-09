import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView,
  RefreshControl 
} from 'react-native';

import { theme } from '../../theme';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Typography, Heading1, Heading3, BodyText, Caption } from '../../components/ui/Typography';
import { HealthMetricCard } from '../../components/ui/HealthMetricCard';
import { FadeInView } from '../../components/ui/FadeInView';
import { SlideInCard } from '../../components/ui/SlideInCard';

export default function HomeScreen({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const [userName] = useState('John'); // Would come from auth context
  const [recentMetrics] = useState([
    {
      id: '1',
      title: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      icon: '🩺',
      color: theme.colors.heartRate,
      trend: 'stable' as const,
      trendValue: 'Normal',
      status: 'normal' as const,
    },
    {
      id: '2',
      title: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      icon: '❤️',
      color: theme.colors.heartRate,
      trend: 'down' as const,
      trendValue: '-2 from last',
      status: 'normal' as const,
    },
    {
      id: '3',
      title: 'Glucose',
      value: '98',
      unit: 'mg/dL',
      icon: '🩸',
      color: theme.colors.glucose,
      trend: 'up' as const,
      trendValue: '+5 from last',
      status: 'normal' as const,
    },
    {
      id: '4',
      title: 'Weight',
      value: '165.2',
      unit: 'lbs',
      icon: '⚖️',
      color: theme.colors.weight,
      trend: 'down' as const,
      trendValue: '-0.5 lbs',
      status: 'normal' as const,
    },
  ]);

  const quickActions = [
    {
      title: 'Calendar',
      icon: '📅',
      color: theme.colors.primary,
      onPress: () => navigation.navigate('RPMCalendar'),
    },
    {
      title: 'Trends',
      icon: '📊',
      color: theme.colors.secondary,
      onPress: () => navigation.navigate('RPMTrends'),
    },
    {
      title: 'Messages',
      icon: '💬',
      color: theme.colors.info,
      onPress: () => navigation.navigate('Messaging'),
    },
    {
      title: 'Devices',
      icon: '📱',
      color: theme.colors.success,
      onPress: () => navigation.navigate('Devices'),
    },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <FadeInView delay={100} direction="down">
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Caption color={theme.colors.textSecondary}>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </Caption>
              <Heading1 style={styles.welcomeText}>
                Good Morning, {userName}! 👋
              </Heading1>
            </View>
          </View>
        </FadeInView>

        {/* Health Summary */}
        <FadeInView delay={300} direction="up">
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Health Summary</Heading3>
            <View style={styles.metricsGrid}>
              {recentMetrics.map((metric, index) => (
                <SlideInCard 
                  key={metric.id} 
                  style={styles.metricItem}
                  delay={400 + (index * 100)}
                  direction="up"
                >
                  <HealthMetricCard
                    {...metric}
                    onPress={() => navigation.navigate('RPMTrends')}
                  />
                </SlideInCard>
              ))}
            </View>
          </View>
        </FadeInView>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Heading3 style={styles.sectionTitle}>Quick Actions</Heading3>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionCard, { borderColor: action.color }]}
                onPress={action.onPress}
                activeOpacity={0.8}
              >
                <View style={[styles.actionIcon, { backgroundColor: `${action.color}15` }]}>
                  <Typography variant="h3">{action.icon}</Typography>
                </View>
                <BodyText style={styles.actionTitle}>{action.title}</BodyText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <FadeInView delay={1200} direction="up">
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Recent Activity</Heading3>
            <SlideInCard delay={1300} direction="left">
              <View style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Typography variant="body">🩺</Typography>
                </View>
                <View style={styles.activityContent}>
                  <BodyText style={styles.activityTitle}>Blood pressure reading</BodyText>
                  <Caption>2 hours ago • 120/80 mmHg</Caption>
                </View>
              </View>
              
              <View style={[styles.activityItem, styles.activityItemBorder]}>
                <View style={styles.activityIcon}>
                  <Typography variant="body">💊</Typography>
                </View>
                <View style={styles.activityContent}>
                  <BodyText style={styles.activityTitle}>Medication reminder</BodyText>
                  <Caption>4 hours ago • Lisinopril taken</Caption>
                </View>
              </View>
              
              <View style={[styles.activityItem, styles.activityItemBorder]}>
                <View style={styles.activityIcon}>
                  <Typography variant="body">💬</Typography>
                </View>
                <View style={styles.activityContent}>
                  <BodyText style={styles.activityTitle}>Message from Dr. Smith</BodyText>
                  <Caption>Yesterday • "Your readings look great!"</Caption>
                </View>
              </View>
            </SlideInCard>
          </View>
        </FadeInView>

        {/* Program Enrollment */}
        <View style={styles.section}>
          <Heading3 style={styles.sectionTitle}>Care Programs</Heading3>
          <View style={styles.programsContainer}>
            <Button
              title="Join RPM Program"
              onPress={() => navigation.navigate('RPMOnboarding')}
              variant="outline"
              style={styles.programButton}
            />
            <Button
              title="View Care Plan"
              onPress={() => navigation.navigate('CCMCarePlan')}
              variant="ghost"
              style={styles.programButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing.base,
    paddingBottom: theme.spacing.lg,
  },
  headerText: {
    flex: 1,
  },
  welcomeText: {
    marginTop: theme.spacing.xs,
  },
  section: {
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.base,
  },
  sectionTitle: {
    marginBottom: theme.spacing.base,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  metricItem: {
    width: '47%',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  actionCard: {
    width: '47%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    alignItems: 'center',
    borderWidth: 1,
    ...theme.shadows.sm,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  actionTitle: {
    textAlign: 'center',
    fontWeight: theme.typography.fontWeights.medium,
  },
  activityCard: {
    padding: theme.spacing.base,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  activityItemBorder: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.base,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontWeight: theme.typography.fontWeights.medium,
    marginBottom: theme.spacing.xs,
  },
  programsContainer: {
    gap: theme.spacing.md,
  },
  programButton: {
    width: '100%',
  },
});


