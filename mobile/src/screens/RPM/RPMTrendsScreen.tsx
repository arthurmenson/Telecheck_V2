import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { VictoryChart, VictoryLine, VictoryArea, VictoryAxis, VictoryTheme } from 'victory-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { Heading1, Heading3, BodyText, Caption } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { Tabs } from '../../components/ui/Tabs';
import { FadeInView } from '../../components/ui/FadeInView';
import { SlideInCard } from '../../components/ui/SlideInCard';


interface TrendData {
  date: string;
  value: number;
  timestamp: Date;
}

export default function RPMTrendsScreen() {
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('bloodPressure');
  const [timeRange, setTimeRange] = useState('week'); // week, month, 3months

  useEffect(() => {
    loadTrends();
  }, []);

  const loadTrends = async () => {
    try {
      // Generate more comprehensive mock data based on selected metric and time range
      const mockData: TrendData[] = generateMockData(selectedMetric, timeRange);
      setTrends(mockData);
    } catch (error) {
      console.error('Failed to load trends:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = (metric: string, range: string): TrendData[] => {
    const now = new Date();
    const data: TrendData[] = [];
    let days = 7;
    
    if (range === 'month') days = 30;
    if (range === '3months') days = 90;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      let value = 120; // Default blood pressure systolic
      
      switch (metric) {
        case 'bloodPressure':
          value = 115 + Math.random() * 20; // 115-135 range
          break;
        case 'heartRate':
          value = 65 + Math.random() * 20; // 65-85 range
          break;
        case 'weight':
          value = 150 + Math.random() * 10 - 5; // 145-155 range
          break;
        case 'glucose':
          value = 90 + Math.random() * 30; // 90-120 range
          break;
      }
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.round(value),
        timestamp: date,
      });
    }
    
    return data;
  };

  const getMetricInfo = (metric: string) => {
    switch (metric) {
      case 'bloodPressure':
        return { title: 'Blood Pressure', unit: 'mmHg', color: theme.colors.bloodPressure, icon: '🩺' };
      case 'heartRate':
        return { title: 'Heart Rate', unit: 'bpm', color: theme.colors.heartRate, icon: '❤️' };
      case 'weight':
        return { title: 'Weight', unit: 'lbs', color: theme.colors.weight, icon: '⚖️' };
      case 'glucose':
        return { title: 'Blood Glucose', unit: 'mg/dL', color: theme.colors.glucose, icon: '🩸' };
      default:
        return { title: 'Health Metric', unit: '', color: theme.colors.primary, icon: '📊' };
    }
  };

  const metricInfo = getMetricInfo(selectedMetric);
  const chartData = (trends || []).map((trend, index) => ({
    x: index + 1,
    y: trend?.value || 0,
    label: trend?.date || ''
  }));

  const screenWidth = Dimensions.get('window').width;

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <BodyText>Loading trends...</BodyText>
        </View>
      </SafeAreaView>
    );
  }

  const metricTabs = [
    {
      key: 'bloodPressure',
      title: '🩺 Blood Pressure',
      content: renderChart(),
    },
    {
      key: 'heartRate',
      title: '❤️ Heart Rate',
      content: renderChart(),
    },
    {
      key: 'weight',
      title: '⚖️ Weight',
      content: renderChart(),
    },
    {
      key: 'glucose',
      title: '🩸 Glucose',
      content: renderChart(),
    },
  ];

  function renderChart() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <FadeInView delay={200} direction="up">
          <Card style={styles.chartContainer}>
            <View style={styles.chartHeader}>
              <View style={styles.chartTitleContainer}>
                <BodyText style={styles.chartIcon}>{metricInfo.icon}</BodyText>
                <Heading3 style={styles.chartTitle}>{metricInfo.title}</Heading3>
              </View>
              
              {/* Time Range Selector */}
              <View style={styles.timeRangeContainer}>
                {['week', 'month', '3months'].map((range) => (
                  <TouchableOpacity
                    key={range}
                    style={[
                      styles.timeRangeButton,
                      timeRange === range && styles.timeRangeButtonActive
                    ]}
                    onPress={() => {
                      setTimeRange(range);
                      setLoading(true);
                      loadTrends();
                    }}
                  >
                    <Caption 
                      color={timeRange === range ? theme.colors.surface : theme.colors.textSecondary}
                      weight={timeRange === range ? 'semibold' : 'normal'}
                    >
                      {range === '3months' ? '3M' : range === 'month' ? '1M' : '1W'}
                    </Caption>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <VictoryChart
              theme={VictoryTheme.material}
              width={screenWidth - 64}
              height={250}
              padding={{ left: 60, top: 20, right: 40, bottom: 60 }}
            >
              <VictoryAxis dependentAxis />
              <VictoryAxis 
                tickFormat={(x) => {
                  const trend = trends[x - 1];
                  if (!trend) return x;
                  const date = new Date(trend.date);
                  return timeRange === 'week' 
                    ? date.toLocaleDateString('en-US', { weekday: 'short' })
                    : date.getDate().toString();
                }}
              />
              <VictoryArea
                data={chartData}
                style={{
                  data: { 
                    fill: metricInfo.color, 
                    fillOpacity: 0.3, 
                    stroke: metricInfo.color, 
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
                  data: { stroke: metricInfo.color, strokeWidth: 3 }
                }}
                animate={{
                  duration: 1000,
                  onLoad: { duration: 500 }
                }}
              />
            </VictoryChart>
          </Card>
        </FadeInView>

        {/* Statistics Cards */}
        <FadeInView delay={400} direction="up">
          <View style={styles.statsContainer}>
            <Card style={styles.statCard}>
              <Caption color={theme.colors.textSecondary}>Average</Caption>
              <Heading3 color={metricInfo.color}>
                {trends && trends.length > 0 
                  ? Math.round(trends.reduce((sum, t) => sum + (t?.value || 0), 0) / trends.length)
                  : 0
                }
              </Heading3>
              <Caption color={theme.colors.textTertiary}>{metricInfo.unit}</Caption>
            </Card>
            
            <Card style={styles.statCard}>
              <Caption color={theme.colors.textSecondary}>Highest</Caption>
              <Heading3 color={theme.colors.warning}>
                {trends && trends.length > 0 ? Math.max(...trends.map(t => t?.value || 0)) : 0}
              </Heading3>
              <Caption color={theme.colors.textTertiary}>{metricInfo.unit}</Caption>
            </Card>
            
            <Card style={styles.statCard}>
              <Caption color={theme.colors.textSecondary}>Lowest</Caption>
              <Heading3 color={theme.colors.success}>
                {trends && trends.length > 0 ? Math.min(...trends.map(t => t?.value || 0)) : 0}
              </Heading3>
              <Caption color={theme.colors.textTertiary}>{metricInfo.unit}</Caption>
            </Card>
          </View>
        </FadeInView>

        {/* Recent Readings */}
        <FadeInView delay={600} direction="up">
          <Card style={styles.dataList}>
            <Heading3 style={styles.dataListTitle}>Recent Readings</Heading3>
            {(trends || []).slice(-5).reverse().map((trend, index) => (
              <View key={index} style={styles.dataItem}>
                <BodyText color={theme.colors.textSecondary}>
                  {new Date(trend.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </BodyText>
                <BodyText weight="semibold" color={metricInfo.color}>
                  {trend.value} {metricInfo.unit}
                </BodyText>
              </View>
            ))}
          </Card>
        </FadeInView>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView delay={100} direction="down">
        <View style={styles.header}>
          <Heading1>Health Trends</Heading1>
          <BodyText color={theme.colors.textSecondary}>
            Track your health metrics over time
          </BodyText>
        </View>
      </FadeInView>
      
      <Tabs
        tabs={metricTabs}
        defaultTab={selectedMetric}
        onTabChange={(tabKey) => {
          setSelectedMetric(tabKey);
          setLoading(true);
          loadTrends();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: theme.spacing.base,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  chartContainer: {
    marginBottom: theme.spacing.base,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.base,
  },
  chartTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartIcon: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  chartTitle: {
    color: theme.colors.text,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.borderLight,
    borderRadius: theme.borderRadius.base,
    padding: 2,
  },
  timeRangeButton: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.base - 2,
    marginHorizontal: 1,
  },
  timeRangeButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.base,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.base,
  },
  dataList: {
    marginBottom: theme.spacing.base,
  },
  dataListTitle: {
    marginBottom: theme.spacing.base,
  },
  dataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
});