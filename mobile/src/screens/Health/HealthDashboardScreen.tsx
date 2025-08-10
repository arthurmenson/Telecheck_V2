import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VictoryChart, VictoryLine, VictoryArea, VictoryAxis, VictoryTheme } from 'victory-native';
import { theme } from '../../theme';
import { 
  Heading1, 
  Heading3, 
  BodyText, 
  Caption 
} from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { HealthMetricCard } from '../../components/ui/HealthMetricCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { FadeInView } from '../../components/ui/FadeInView';
import { SlideInCard } from '../../components/ui/SlideInCard';
import { ProgressBar } from '../../components/ui/ProgressBar';

const { width } = Dimensions.get('window');

interface HealthGoal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
  color: string;
  icon: string;
}

interface HealthAlert {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  actionRequired: boolean;
}

export default function HealthDashboardScreen({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
  const [healthGoals] = useState<HealthGoal[]>([
    {
      id: '1',
      title: 'Blood Pressure Goal',
      current: 125,
      target: 120,
      unit: 'mmHg',
      progress: 85,
      color: theme.colors.bloodPressure,
      icon: '🩺',
    },
    {
      id: '2',
      title: 'Weight Goal',
      current: 142.8,
      target: 140,
      unit: 'lbs',
      progress: 92,
      color: theme.colors.weight,
      icon: '⚖️',
    },
    {
      id: '3',
      title: 'Exercise Goal',
      current: 4,
      target: 5,
      unit: 'days/week',
      progress: 80,
      color: theme.colors.success,
      icon: '🏃‍♀️',
    },
  ]);

  const [healthAlerts] = useState<HealthAlert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Blood Pressure Trend',
      message: 'Your readings have been slightly elevated this week. Consider reducing sodium intake.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      actionRequired: true,
    },
    {
      id: '2',
      type: 'success',
      title: 'Medication Adherence',
      message: 'Great job! You\'ve taken all medications on time this week.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      actionRequired: false,
    },
    {
      id: '3',
      type: 'info',
      title: 'Upcoming Appointment',
      message: 'Don\'t forget your follow-up appointment with Dr. Johnson tomorrow.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      actionRequired: true,
    },
  ]);

  const [weeklyTrend] = useState([
    { day: 'Mon', systolic: 118, diastolic: 76 },
    { day: 'Tue', systolic: 122, diastolic: 78 },
    { day: 'Wed', systolic: 125, diastolic: 82 },
    { day: 'Thu', systolic: 120, diastolic: 79 },
    { day: 'Fri', systolic: 119, diastolic: 77 },
    { day: 'Sat', systolic: 116, diastolic: 74 },
    { day: 'Sun', systolic: 121, diastolic: 80 },
  ]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return theme.colors.warning;
      case 'success': return theme.colors.success;
      case 'info': return theme.colors.info;
      default: return theme.colors.textSecondary;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      default: return '📋';
    }
  };

  const chartData = weeklyTrend.map((item, index) => ({
    x: index + 1,
    y: item.systolic,
    label: item.day,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
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
            <Heading1>Health Dashboard</Heading1>
            <BodyText color={theme.colors.textSecondary}>
              Your comprehensive health overview
            </BodyText>
          </View>
        </FadeInView>

        {/* Health Score */}
        <FadeInView delay={200} direction="up">
          <View style={styles.section}>
            <SlideInCard delay={300} direction="left" style={styles.scoreCard}>
              <View style={styles.scoreHeader}>
                <View style={styles.scoreIcon}>
                  <Heading3>💚</Heading3>
                </View>
                <View style={styles.scoreInfo}>
                  <Caption color={theme.colors.textSecondary}>Health Score</Caption>
                  <Heading1 color={theme.colors.success} style={styles.scoreValue}>
                    85
                  </Heading1>
                  <Caption color={theme.colors.success}>Good</Caption>
                </View>
                <View style={styles.scoreTrend}>
                  <Badge variant="success" size="sm">+3 this week</Badge>
                </View>
              </View>
              <ProgressBar 
                progress={85} 
                progressColor={theme.colors.success}
                height={8}
                animated
                duration={1500}
              />
            </SlideInCard>
          </View>
        </FadeInView>

        {/* Weekly Trend Chart */}
        <FadeInView delay={400} direction="up">
          <View style={styles.section}>
            <Heading3 style={styles.sectionTitle}>Blood Pressure Trend</Heading3>
            <SlideInCard delay={500} direction="left">
              <View style={styles.chartHeader}>
                <BodyText style={styles.chartTitle}>This Week</BodyText>
                <TouchableOpacity>
                  <Caption color={theme.colors.primary}>View Details</Caption>
                </TouchableOpacity>
              </View>
              <VictoryChart
                theme={VictoryTheme.material}
                width={width - 64}
                height={200}
                padding={{ left: 50, top: 20, right: 40, bottom: 50 }}
              >
                <VictoryAxis dependentAxis />
                <VictoryAxis 
                  tickFormat={(x) => weeklyTrend[x - 1]?.day || x}
                />
                <VictoryArea
                  data={chartData}
                  style={{
                    data: { 
                      fill: theme.colors.bloodPressure, 
                      fillOpacity: 0.3, 
                      stroke: theme.colors.bloodPressure, 
                      strokeWidth: 2 
                    }
                  }}
                  animate={{
                    duration: 1000,
                    onLoad: { duration: 500 }
                  }}
                />
                <VictoryLine
                  data={chartData}
                  style={{
                    data: { stroke: theme.colors.bloodPressure, strokeWidth: 3 }
                  }}
                  animate={{
                    duration: 1000,
                    onLoad: { duration: 500 }
                  }}
                />
              </VictoryChart>
            </SlideInCard>
          </View>
        </FadeInView>

        {/* Health Goals */}
        <FadeInView delay={600} direction="up">
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Heading3 style={styles.sectionTitle}>Health Goals</Heading3>
              <TouchableOpacity>
                <Caption color={theme.colors.primary}>Manage Goals</Caption>
              </TouchableOpacity>
            </View>
            {healthGoals.map((goal, index) => (
              <SlideInCard 
                key={goal.id} 
                delay={700 + index * 100} 
                direction="left"
                style={styles.goalCard}
              >
                <View style={styles.goalHeader}>
                  <View style={[styles.goalIcon, { backgroundColor: `${goal.color}15` }]}>
                    <BodyText>{goal.icon}</BodyText>
                  </View>
                  <View style={styles.goalInfo}>
                    <BodyText style={styles.goalTitle}>{goal.title}</BodyText>
                    <Caption color={theme.colors.textSecondary}>
                      {goal.current} / {goal.target} {goal.unit}
                    </Caption>
                  </View>
                  <View style={styles.goalProgress}>
                    <Caption color={goal.color} style={styles.goalPercentage}>
                      {goal.progress}%
                    </Caption>
                  </View>
                </View>
                <ProgressBar 
                  progress={goal.progress}
                  progressColor={goal.color}
                  height={6}
                  animated
                  delay={800 + index * 100}
                />
              </SlideInCard>
            ))}
          </View>
        </FadeInView>

        {/* Health Alerts */}
        <FadeInView delay={1000} direction="up">
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Heading3 style={styles.sectionTitle}>Health Alerts</Heading3>
              <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                <Caption color={theme.colors.primary}>View All</Caption>
              </TouchableOpacity>
            </View>
            {healthAlerts.slice(0, 3).map((alert, index) => (
              <SlideInCard 
                key={alert.id} 
                delay={1100 + index * 100} 
                direction="left"
                style={styles.alertCard}
              >
                <TouchableOpacity style={styles.alertContent}>
                  <View style={[styles.alertIcon, { backgroundColor: `${getAlertColor(alert.type)}15` }]}>
                    <BodyText>{getAlertIcon(alert.type)}</BodyText>
                  </View>
                  <View style={styles.alertInfo}>
                    <View style={styles.alertHeader}>
                      <BodyText style={styles.alertTitle}>{alert.title}</BodyText>
                      {alert.actionRequired && (
                        <Badge variant="warning" size="sm">Action Required</Badge>
                      )}
                    </View>
                    <BodyText 
                      color={theme.colors.textSecondary} 
                      style={styles.alertMessage}
                      numberOfLines={2}
                    >
                      {alert.message}
                    </BodyText>
                    <Caption color={theme.colors.textTertiary} style={styles.alertTime}>
                      {alert.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </Caption>
                  </View>
                </TouchableOpacity>
              </SlideInCard>
            ))}
          </View>
        </FadeInView>

        {/* Quick Actions */}
        <FadeInView delay={1400} direction="up">
          <View style={[styles.section, styles.lastSection]}>
            <Heading3 style={styles.sectionTitle}>Quick Actions</Heading3>
            <View style={styles.actionsGrid}>
              <Button
                title="Record Vitals"
                onPress={() => navigation.navigate('ManualEntry')}
                variant="primary"
                style={styles.actionButton}
              />
              <Button
                title="View Trends"
                onPress={() => navigation.navigate('TrendsTab')}
                variant="outline"
                style={styles.actionButton}
              />
            </View>
            <View style={styles.actionsGrid}>
              <Button
                title="Connect Device"
                onPress={() => navigation.navigate('DevicesTab')}
                variant="ghost"
                style={styles.actionButton}
              />
              <Button
                title="Message Doctor"
                onPress={() => navigation.navigate('MessagingTab')}
                variant="ghost"
                style={styles.actionButton}
              />
            </View>
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
  scoreCard: {
    padding: theme.spacing.base,
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.base,
  },
  scoreIcon: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.full,
    backgroundColor: `${theme.colors.success}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.base,
  },
  scoreInfo: {
    flex: 1,
  },
  scoreValue: {
    lineHeight: undefined,
    marginVertical: theme.spacing.xs,
  },
  scoreTrend: {
    marginLeft: theme.spacing.sm,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.base,
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing.base,
  },
  chartTitle: {
    fontWeight: theme.typography.fontWeights.semibold,
  },
  goalCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.base,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  goalIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontWeight: theme.typography.fontWeights.medium,
    marginBottom: theme.spacing.xs,
  },
  goalProgress: {
    marginLeft: theme.spacing.sm,
  },
  goalPercentage: {
    fontWeight: theme.typography.fontWeights.semibold,
  },
  alertCard: {
    marginBottom: theme.spacing.md,
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: theme.spacing.base,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  alertInfo: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  alertTitle: {
    fontWeight: theme.typography.fontWeights.semibold,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  alertMessage: {
    marginBottom: theme.spacing.xs,
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.base,
  },
  alertTime: {
    fontSize: theme.typography.fontSizes.xs,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
  },
});