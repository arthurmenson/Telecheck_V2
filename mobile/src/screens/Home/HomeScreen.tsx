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
import { useAuth } from '../Auth/AuthContext';

import { theme } from '../../theme';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Typography, Heading1, Heading3, Heading4, BodyText, Caption, BodyLarge } from '../../components/ui/Typography';
import { HealthMetricCard } from '../../components/ui/HealthMetricCard';
import { FadeInView } from '../../components/ui/FadeInView';
import { SlideInCard } from '../../components/ui/SlideInCard';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user } = useAuth();
  
  const userName = user?.name?.split(' ')[0] || 'User';
  
  const [recentMetrics] = useState([
    {
      id: '1',
      title: 'Blood Pressure',
      value: '118/76',
      unit: 'mmHg',
      icon: '🫀',
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
      icon: '💓',
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
      title: 'Record Vitals',
      subtitle: 'Quick entry',
      icon: '📊',
      color: theme.colors.primary,
      onPress: () => navigation.navigate('ManualEntry'),
    },
    {
      title: 'Emergency',
      subtitle: 'Quick access',
      icon: '🚨',
      color: theme.colors.error,
      onPress: () => navigation.navigate('Emergency'),
    },
    {
      title: 'Messages',
      subtitle: 'Care team',
      icon: '💬',
      color: theme.colors.info,
      onPress: () => navigation.navigate('MessagingTab'),
    },
    {
      title: 'Reports',
      subtitle: 'Health data',
      icon: '📈',
      color: theme.colors.success,
      onPress: () => navigation.navigate('Reports'),
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
        {/* Modern Header */}
        <FadeInView delay={100} direction="down">
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.headerText}>
                <Caption color={theme.colors.textSecondary} weight="medium">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Caption>
                <Heading3 style={styles.welcomeText} weight="bold">
                  {getGreeting()}, {userName}
                </Heading3>
              </View>
              <TouchableOpacity 
                style={styles.profileButton}
                onPress={() => navigation.navigate('ProfileTab')}
              >
                <View style={styles.avatar}>
                  <Typography variant="h4">
                    {user?.avatar || '👩‍⚕️'}
                  </Typography>
                </View>
                <View style={styles.onlineIndicator} />
              </TouchableOpacity>
            </View>
          </View>
        </FadeInView>

        {/* Health Score Card */}
        <FadeInView delay={200} direction="up">
          <View style={styles.section}>
            <SlideInCard delay={300} direction="up" style={styles.healthScoreCard}>
              <Card variant="gradient" padding="xl" borderRadius="3xl">
                <View style={styles.healthScoreContent}>
                  <View style={styles.scoreLeft}>
                    <View style={styles.scoreIconContainer}>
                      <Typography variant="h2">💚</Typography>
                    </View>
                    <View style={styles.scoreInfo}>
                      <Caption color={theme.colors.textSecondary} weight="semibold">
                        HEALTH SCORE
                      </Caption>
                      <Heading1 color={theme.colors.success} weight="black">
                        85
                      </Heading1>
                      <Caption color={theme.colors.success} weight="medium">
                        Excellent
                      </Caption>
                    </View>
                  </View>
                  <View style={styles.scoreRight}>
                    <View style={styles.scoreBadge}>
                      <Caption color={theme.colors.success} weight="bold">
                        +3 this week
                      </Caption>
                    </View>
                  </View>
                </View>
              </Card>
            </SlideInCard>
          </View>
        </FadeInView>

        {/* Health Metrics Grid */}
        <FadeInView delay={400} direction="up">
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Heading4 style={styles.sectionTitle} weight="bold">Health Overview</Heading4>
              <TouchableOpacity onPress={() => navigation.navigate('TrendsTab')}>
                <Caption color={theme.colors.primary} style={styles.seeAllText} weight="semibold">
                  View All →
                </Caption>
              </TouchableOpacity>
            </View>
            
            <View style={styles.metricsGrid}>
              {recentMetrics.map((metric, index) => (
                <View key={metric.id} style={styles.metricItem}>
                  <SlideInCard 
                    delay={500 + (index * 100)}
                    direction="up"
                    style={styles.metricCard}
                  >
                    <HealthMetricCard
                      {...metric}
                      size="md"
                      variant="default"
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
            <Heading4 style={styles.sectionTitle} weight="bold">Quick Actions</Heading4>
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
                    activeOpacity={0.8}
                  >
                    <View style={[styles.actionIcon, { backgroundColor: `${action.color}15` }]}>
                      <Typography variant="h5" color={action.color}>
                        {action.icon}
                      </Typography>
                    </View>
                    <View style={styles.actionContent}>
                      <BodyText style={styles.actionTitle} weight="semibold">{action.title}</BodyText>
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
            <Heading4 style={styles.sectionTitle} weight="bold">Recent Activity</Heading4>
            <SlideInCard delay={1300} direction="left" style={styles.activityCard}>
              <Card variant="elevated" padding="xl" borderRadius="2xl">
                <View style={styles.activityItem}>
                  <View style={[styles.activityIcon, { backgroundColor: `${theme.colors.bloodPressure}15` }]}>
                    <Typography variant="h6" color={theme.colors.bloodPressure}>🫀</Typography>
                  </View>
                  <View style={styles.activityContent}>
                    <BodyText style={styles.activityTitle} weight="semibold">Blood pressure reading</BodyText>
                    <Caption color={theme.colors.textSecondary}>2 hours ago • 118/76 mmHg • Normal</Caption>
                  </View>
                  <View style={styles.activityStatus}>
                    <View style={[styles.statusDot, { backgroundColor: theme.colors.success }]} />
                  </View>
                </View>
                
                <View style={[styles.activityItem, styles.activityItemBorder]}>
                  <View style={[styles.activityIcon, { backgroundColor: `${theme.colors.info}15` }]}>
                    <Typography variant="h6" color={theme.colors.info}>💊</Typography>
                  </View>
                  <View style={styles.activityContent}>
                    <BodyText style={styles.activityTitle} weight="semibold">Medication taken</BodyText>
                    <Caption color={theme.colors.textSecondary}>4 hours ago • Lisinopril 10mg</Caption>
                  </View>
                  <View style={styles.activityStatus}>
                    <View style={[styles.statusDot, { backgroundColor: theme.colors.success }]} />
                  </View>
                </View>
                
                <View style={[styles.activityItem, styles.activityItemBorder]}>
                  <View style={[styles.activityIcon, { backgroundColor: `${theme.colors.secondary}15` }]}>
                    <Typography variant="h6" color={theme.colors.secondary}>💬</Typography>
                  </View>
                  <View style={styles.activityContent}>
                    <BodyText style={styles.activityTitle} weight="semibold">Message from Dr. Johnson</BodyText>
                    <Caption color={theme.colors.textSecondary}>Yesterday • "Your readings look excellent!"</Caption>
                  </View>
                  <View style={styles.activityStatus}>
                    <View style={[styles.statusDot, { backgroundColor: theme.colors.warning }]} />
                  </View>
                </View>
              </Card>
            </SlideInCard>
          </View>
        </FadeInView>

        {/* Care Programs */}
        <FadeInView delay={1500} direction="up">
          <View style={[styles.section, styles.lastSection]}>
            <Heading4 style={styles.sectionTitle} weight="bold">Your Care Programs</Heading4>
            <SlideInCard delay={1600} direction="up" style={styles.programCard}>
              <Card variant="outlined" padding="xl" borderRadius="2xl">
                <View style={styles.programHeader}>
                  <View style={styles.programIcon}>
                    <Typography variant="h3">🏥</Typography>
                  </View>
                  <View style={styles.programInfo}>
                    <BodyLarge style={styles.programTitle} weight="bold">Hypertension Management</BodyLarge>
                    <Caption color={theme.colors.textSecondary} weight="medium">
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
                    variant="primary"
                    size="md"
                    style={styles.programButton}
                  />
                  <Button
                    title="Join RPM"
                    onPress={() => navigation.navigate('RPMOnboarding')}
                    variant="outline"
                    size="md"
                    style={styles.programButton}
                  />
                </View>
              </Card>
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
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing['2xl'],
    backgroundColor: theme.colors.surface,
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
    marginTop: theme.spacing.sm,
  },
  profileButton: {
    position: 'relative',
    marginLeft: theme.spacing.lg,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: `${theme.colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.base,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.success,
    borderWidth: 3,
    borderColor: theme.colors.surface,
  },
  section: {
    marginBottom: theme.spacing['3xl'],
    paddingHorizontal: theme.spacing.xl,
  },
  lastSection: {
    marginBottom: theme.spacing['5xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    marginBottom: theme.spacing.lg,
  },
  seeAllText: {
    letterSpacing: 0.3,
  },
  healthScoreCard: {
    width: '100%',
  },
  healthScoreContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreIconContainer: {
    marginRight: theme.spacing.lg,
  },
  scoreInfo: {
    alignItems: 'flex-start',
  },
  scoreRight: {
    alignItems: 'flex-end',
  },
  scoreBadge: {
    backgroundColor: `${theme.colors.success}15`,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
  },
  metricItem: {
    width: (width - theme.spacing.xl * 2 - theme.spacing.lg) / 2,
  },
  metricCard: {
    flex: 1,
  },
  actionsGrid: {
    gap: theme.spacing.lg,
  },
  actionCardContainer: {
    width: '100%',
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius['2xl'],
    padding: theme.spacing.xl,
    ...theme.shadows.base,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.lg,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    marginBottom: theme.spacing.xs,
  },
  actionArrow: {
    marginLeft: theme.spacing.md,
  },
  activityCard: {
    width: '100%',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  activityItemBorder: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.lg,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    marginBottom: theme.spacing.xs,
  },
  activityStatus: {
    marginLeft: theme.spacing.md,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: theme.borderRadius.full,
  },
  programCard: {
    width: '100%',
  },
  programHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  programIcon: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: `${theme.colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.lg,
  },
  programInfo: {
    flex: 1,
  },
  programTitle: {
    marginBottom: theme.spacing.xs,
  },
  programStatus: {
    marginLeft: theme.spacing.md,
  },
  programActions: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  programButton: {
    flex: 1,
  },
});