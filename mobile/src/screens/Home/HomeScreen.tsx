import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  Dimensions 
} from 'react-native';

import { theme } from '../../theme';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Typography, Heading1, Heading3, BodyText, Caption, BodyLarge } from '../../components/ui/Typography';
import { HealthMetricCard } from '../../components/ui/HealthMetricCard';
import { FadeInView } from '../../components/ui/FadeInView';
import { SlideInCard } from '../../components/ui/SlideInCard';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const [userName] = useState('Sarah'); // Would come from auth context
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [recentMetrics] = useState([
    {
      id: '1',
      title: 'Blood Pressure',
      value: '118/76',
      unit: 'mmHg',
      icon: '🩺',
      color: theme.colors.bloodPressure,
      trend: 'stable' as const,
      trendValue: 'Normal',
      status: 'normal' as const,
      subtitle: 'Last reading 2h ago',
    },
    {
      id: '2',
      title: 'Heart Rate',
      value: '68',
      unit: 'bpm',
      icon: '❤️',
      color: theme.colors.heartRate,
      trend: 'down' as const,
      trendValue: '-4 from last',
      status: 'normal' as const,
      subtitle: 'Resting rate',
    },
    {
      id: '3',
      title: 'Blood Sugar',
      value: '94',
      unit: 'mg/dL',
      icon: '🩸',
      color: theme.colors.glucose,
      trend: 'stable' as const,
      trendValue: 'In range',
      status: 'normal' as const,
      subtitle: 'Fasting level',
    },
    {
      id: '4',
      title: 'Weight',
      value: '142.8',
      unit: 'lbs',
      icon: '⚖️',
      color: theme.colors.weight,
      trend: 'down' as const,
      trendValue: '-0.3 lbs',
      status: 'normal' as const,
      subtitle: 'Weekly average',
    },
  ]);

  const quickActions = [
    {
      title: 'Take Reading',
      subtitle: 'Manual entry',
      icon: '📝',
      color: theme.colors.primary,
      onPress: () => navigation.navigate('ManualEntry'),
    },
    {
      title: 'View Trends',
      subtitle: 'Analytics',
      icon: '📊',
      color: theme.colors.secondary,
      onPress: () => navigation.navigate('TrendsTab'),
    },
    {
      title: 'Messages',
      subtitle: 'Care team',
      icon: '💬',
      color: theme.colors.info,
      onPress: () => navigation.navigate('MessagingTab'),
    },
    {
      title: 'Devices',
      subtitle: 'Connect',
      icon: '📱',
      color: theme.colors.success,
      onPress: () => navigation.navigate('DevicesTab'),
    },
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      setCurrentTime(new Date());
    }, 1000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
      >
        {/* Header */}
        <FadeInView delay={100} direction="down">
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.headerText}>
                <Caption color={theme.colors.textSecondary}>
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Caption>
                <Heading1 style={styles.welcomeText}>
                  {getGreeting()}, {userName}! 👋
                </Heading1>
              </View>
              <TouchableOpacity style={styles.profileButton}>
                <View style={styles.avatar}>
                  <Typography variant="h4">👩‍⚕️</Typography>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </FadeInView>

        {/* Health Summary */}
        <FadeInView delay={300} direction="up">
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Heading3 style={styles.sectionTitle}>Health Overview</Heading3>
              <TouchableOpacity onPress={() => navigation.navigate('TrendsTab')}>
                <Caption color={theme.colors.primary} style={styles.seeAllText}>
                  View All
                </Caption>
              </TouchableOpacity>
            </View>
            
            <View style={styles.metricsGrid}>
              {recentMetrics.map((metric, index) => (
                <View key={metric.id} style={styles.metricItem}>
                  <SlideInCard 
                    delay={400 + (index * 100)}
                    direction="up"
                    style={styles.metricCard}
                  >
                    <HealthMetricCard
                      {...metric}
                      size="md"
                      onPress={() => navigation.navigate('TrendsTab')}
                    />
                  </SlideInCard>
                </View>
              ))}
            </View>
          </View>
        </FadeInView>

        {/* Quick Actions */}
        <FadeInView delay={800} direction="up">
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Quick Actions</Heading3>
            <View style={styles.actionsGrid}>
              {quickActions.map((action, index) => (
                <SlideInCard
                  key={index}
                  delay={900 + (index * 100)}
                  direction="left"
                  style={styles.actionCardContainer}
                >
                  <TouchableOpacity
                    style={styles.actionCard}
                    onPress={action.onPress}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.actionIcon, { backgroundColor: `${action.color}15` }]}>
                      <Typography variant="h4" color={action.color}>
                        {action.icon}
                      </Typography>
                    </View>
                    <View style={styles.actionContent}>
                      <BodyText style={styles.actionTitle}>{action.title}</BodyText>
                      <Caption color={theme.colors.textSecondary}>
                        {action.subtitle}
                      </Caption>
                    </View>
                    <View style={styles.actionArrow}>
                      <Typography variant="body" color={theme.colors.textTertiary}>
                        →
                      </Typography>
                    </View>
                  </TouchableOpacity>
                </SlideInCard>
              ))}
            </View>
          </View>
        </FadeInView>

        {/* Recent Activity */}
        <FadeInView delay={1200} direction="up">
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Recent Activity</Heading3>
            <SlideInCard delay={1300} direction="left" style={styles.activityCard}>
              <View style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: `${theme.colors.bloodPressure}15` }]}>
                  <Typography variant="body" color={theme.colors.bloodPressure}>🩺</Typography>
                </View>
                <View style={styles.activityContent}>
                  <BodyText style={styles.activityTitle}>Blood pressure reading</BodyText>
                  <Caption>2 hours ago • 118/76 mmHg • Normal</Caption>
                </View>
                <View style={styles.activityStatus}>
                  <View style={[styles.statusDot, { backgroundColor: theme.colors.success }]} />
                </View>
              </View>
              
              <View style={[styles.activityItem, styles.activityItemBorder]}>
                <View style={[styles.activityIcon, { backgroundColor: `${theme.colors.info}15` }]}>
                  <Typography variant="body" color={theme.colors.info}>💊</Typography>
                </View>
                <View style={styles.activityContent}>
                  <BodyText style={styles.activityTitle}>Medication taken</BodyText>
                  <Caption>4 hours ago • Lisinopril 10mg</Caption>
                </View>
                <View style={styles.activityStatus}>
                  <View style={[styles.statusDot, { backgroundColor: theme.colors.success }]} />
                </View>
              </View>
              
              <View style={[styles.activityItem, styles.activityItemBorder]}>
                <View style={[styles.activityIcon, { backgroundColor: `${theme.colors.secondary}15` }]}>
                  <Typography variant="body" color={theme.colors.secondary}>💬</Typography>
                </View>
                <View style={styles.activityContent}>
                  <BodyText style={styles.activityTitle}>Message from Dr. Johnson</BodyText>
                  <Caption>Yesterday • "Your readings look excellent!"</Caption>
                </View>
                <View style={styles.activityStatus}>
                  <View style={[styles.statusDot, { backgroundColor: theme.colors.warning }]} />
                </View>
              </View>
            </SlideInCard>
          </View>
        </FadeInView>

        {/* Care Programs */}
        <FadeInView delay={1500} direction="up">
          <View style={[styles.section, styles.lastSection]}>
            <Heading3 style={styles.sectionTitle}>Your Care Programs</Heading3>
            <SlideInCard delay={1600} direction="up" style={styles.programCard}>
              <View style={styles.programHeader}>
                <View style={styles.programIcon}>
                  <Typography variant="h3">🏥</Typography>
                </View>
                <View style={styles.programInfo}>
                  <BodyLarge style={styles.programTitle}>Hypertension Management</BodyLarge>
                  <Caption color={theme.colors.textSecondary}>
                    Active since March 2024
                  </Caption>
                </View>
                <View style={styles.programStatus}>
                  <View style={[styles.statusDot, { backgroundColor: theme.colors.success }]} />
                </View>
              </View>
              
              <View style={styles.programActions}>
                <Button
                  title="View Care Plan"
                  onPress={() => navigation.navigate('CCMCarePlan')}
                  variant="outline"
                  size="sm"
                  style={styles.programButton}
                />
                <Button
                  title="Join RPM"
                  onPress={() => navigation.navigate('RPMOnboarding')}
                  variant="ghost"
                  size="sm"
                  style={styles.programButton}
                />
              </View>
            </SlideInCard>
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing.base,
    paddingBottom: theme.spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
  },
  welcomeText: {
    marginTop: theme.spacing.xs,
  },
  profileButton: {
    marginLeft: theme.spacing.base,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    backgroundColor: `${theme.colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
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
  seeAllText: {
    fontWeight: theme.typography.fontWeights.medium,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  metricItem: {
    width: (width - theme.spacing.base * 2 - theme.spacing.md) / 2,
  },
  metricCard: {
    flex: 1,
  },
  actionsGrid: {
    gap: theme.spacing.md,
  },
  actionCardContainer: {
    width: '100%',
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    ...theme.shadows.sm,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontWeight: theme.typography.fontWeights.medium,
    marginBottom: theme.spacing.xs,
  },
  actionArrow: {
    marginLeft: theme.spacing.sm,
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
    borderTopColor: theme.colors.borderLight,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.base,
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
  activityStatus: {
    marginLeft: theme.spacing.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: theme.borderRadius.full,
  },
  programCard: {
    padding: theme.spacing.base,
  },
  programHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.base,
  },
  programIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  programInfo: {
    flex: 1,
  },
  programTitle: {
    fontWeight: theme.typography.fontWeights.semibold,
    marginBottom: theme.spacing.xs,
  },
  programStatus: {
    marginLeft: theme.spacing.sm,
  },
  programActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  programButton: {
    flex: 1,
  },
});