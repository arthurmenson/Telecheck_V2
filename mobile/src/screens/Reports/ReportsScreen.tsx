import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Alert,
  Share 
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
import { Tabs } from '../../components/ui/Tabs';
import { FadeInView } from '../../components/ui/FadeInView';
import { SlideInCard } from '../../components/ui/SlideInCard';

interface HealthReport {
  id: string;
  title: string;
  type: 'weekly' | 'monthly' | 'quarterly' | 'annual';
  dateRange: string;
  generatedAt: Date;
  status: 'ready' | 'generating' | 'failed';
  summary: {
    totalReadings: number;
    averageBP: string;
    adherenceRate: number;
    keyInsights: string[];
  };
  sections: string[];
}

interface LabReport {
  id: string;
  testName: string;
  orderDate: Date;
  resultDate?: Date;
  status: 'ordered' | 'collected' | 'processing' | 'ready' | 'reviewed';
  provider: string;
  results?: {
    name: string;
    value: string;
    unit: string;
    range: string;
    status: 'normal' | 'high' | 'low' | 'critical';
  }[];
}

export default function ReportsScreen({ navigation }: any) {
  const [healthReports] = useState<HealthReport[]>([
    {
      id: '1',
      title: 'Weekly Health Summary',
      type: 'weekly',
      dateRange: 'Jan 1-7, 2024',
      generatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'ready',
      summary: {
        totalReadings: 14,
        averageBP: '122/78',
        adherenceRate: 95,
        keyInsights: [
          'Blood pressure trending downward',
          'Excellent medication adherence',
          'Weight stable within target range'
        ]
      },
      sections: ['Vital Signs', 'Medications', 'Goals Progress', 'Recommendations']
    },
    {
      id: '2',
      title: 'Monthly Health Report',
      type: 'monthly',
      dateRange: 'December 2023',
      generatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: 'ready',
      summary: {
        totalReadings: 58,
        averageBP: '125/80',
        adherenceRate: 88,
        keyInsights: [
          'Overall health improving',
          'Holiday period affected routine',
          'Exercise goals partially met'
        ]
      },
      sections: ['Monthly Overview', 'Trends Analysis', 'Doctor Notes', 'Action Items']
    },
    {
      id: '3',
      title: 'Quarterly Review',
      type: 'quarterly',
      dateRange: 'Q4 2023',
      generatedAt: new Date(),
      status: 'generating',
      summary: {
        totalReadings: 0,
        averageBP: '',
        adherenceRate: 0,
        keyInsights: []
      },
      sections: []
    }
  ]);

  const [labReports] = useState<LabReport[]>([
    {
      id: '1',
      testName: 'Comprehensive Metabolic Panel',
      orderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      resultDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'ready',
      provider: 'LabCorp',
      results: [
        { name: 'Glucose', value: '94', unit: 'mg/dL', range: '70-100', status: 'normal' },
        { name: 'Creatinine', value: '1.1', unit: 'mg/dL', range: '0.7-1.3', status: 'normal' },
        { name: 'Sodium', value: '142', unit: 'mEq/L', range: '136-145', status: 'normal' },
        { name: 'Potassium', value: '4.2', unit: 'mEq/L', range: '3.5-5.0', status: 'normal' }
      ]
    },
    {
      id: '2',
      testName: 'Lipid Panel',
      orderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      resultDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'reviewed',
      provider: 'Quest Diagnostics',
      results: [
        { name: 'Total Cholesterol', value: '185', unit: 'mg/dL', range: '<200', status: 'normal' },
        { name: 'LDL', value: '110', unit: 'mg/dL', range: '<100', status: 'high' },
        { name: 'HDL', value: '55', unit: 'mg/dL', range: '>40', status: 'normal' },
        { name: 'Triglycerides', value: '98', unit: 'mg/dL', range: '<150', status: 'normal' }
      ]
    },
    {
      id: '3',
      testName: 'HbA1c',
      orderDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'collected',
      provider: 'LabCorp'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': case 'reviewed': return 'success';
      case 'generating': case 'processing': case 'collected': return 'warning';
      case 'failed': return 'error';
      case 'ordered': return 'info';
      default: return 'default';
    }
  };

  const getResultStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return theme.colors.success;
      case 'high': case 'low': return theme.colors.warning;
      case 'critical': return theme.colors.error;
      default: return theme.colors.textSecondary;
    }
  };

  const handleShareReport = async (report: HealthReport) => {
    try {
      await Share.share({
        message: `Health Report: ${report.title}\nDate Range: ${report.dateRange}\nGenerated: ${report.generatedAt.toLocaleDateString()}`,
        title: report.title,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share report');
    }
  };

  const handleDownloadReport = (report: HealthReport) => {
    Alert.alert('Download Report', `Downloading ${report.title}...`);
  };

  const renderHealthReports = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {healthReports.map((report, index) => (
        <FadeInView key={report.id} delay={200 + index * 100} direction="up">
          <SlideInCard delay={300 + index * 100} direction="left" style={styles.reportCard}>
            <View style={styles.reportHeader}>
              <View style={styles.reportInfo}>
                <BodyText style={styles.reportTitle}>{report.title}</BodyText>
                <Caption color={theme.colors.textSecondary}>
                  {report.dateRange}
                </Caption>
                <Caption color={theme.colors.textTertiary}>
                  Generated: {report.generatedAt.toLocaleDateString()}
                </Caption>
              </View>
              <Badge variant={getStatusColor(report.status) as any} size="sm">
                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              </Badge>
            </View>

            {report.status === 'ready' && (
              <View style={styles.reportSummary}>
                <View style={styles.summaryStats}>
                  <View style={styles.statItem}>
                    <BodyText style={styles.statValue}>{report.summary.totalReadings}</BodyText>
                    <Caption color={theme.colors.textSecondary}>Readings</Caption>
                  </View>
                  <View style={styles.statItem}>
                    <BodyText style={styles.statValue}>{report.summary.averageBP}</BodyText>
                    <Caption color={theme.colors.textSecondary}>Avg BP</Caption>
                  </View>
                  <View style={styles.statItem}>
                    <BodyText style={styles.statValue}>{report.summary.adherenceRate}%</BodyText>
                    <Caption color={theme.colors.textSecondary}>Adherence</Caption>
                  </View>
                </View>

                <View style={styles.keyInsights}>
                  <Caption color={theme.colors.textSecondary} style={styles.insightsLabel}>
                    Key Insights:
                  </Caption>
                  {report.summary.keyInsights.map((insight, insightIndex) => (
                    <Caption key={insightIndex} color={theme.colors.textTertiary} style={styles.insightItem}>
                      • {insight}
                    </Caption>
                  ))}
                </View>

                <View style={styles.reportActions}>
                  <Button
                    title="View Report"
                    onPress={() => Alert.alert('Coming Soon', 'Full report view coming soon!')}
                    variant="primary"
                    size="sm"
                    style={styles.actionButton}
                  />
                  <Button
                    title="Share"
                    onPress={() => handleShareReport(report)}
                    variant="outline"
                    size="sm"
                    style={styles.actionButton}
                  />
                  <Button
                    title="Download"
                    onPress={() => handleDownloadReport(report)}
                    variant="ghost"
                    size="sm"
                    style={styles.actionButton}
                  />
                </View>
              </View>
            )}

            {report.status === 'generating' && (
              <View style={styles.generatingState}>
                <BodyText color={theme.colors.warning}>
                  🔄 Generating report... This may take a few minutes.
                </BodyText>
              </View>
            )}
          </SlideInCard>
        </FadeInView>
      ))}

      <FadeInView delay={800} direction="up">
        <View style={styles.generateSection}>
          <Button
            title="Generate New Report"
            onPress={() => Alert.alert('Coming Soon', 'Custom report generation coming soon!')}
            variant="outline"
            fullWidth
          />
        </View>
      </FadeInView>
    </ScrollView>
  );

  const renderLabReports = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {labReports.map((report, index) => (
        <FadeInView key={report.id} delay={200 + index * 100} direction="up">
          <SlideInCard delay={300 + index * 100} direction="left" style={styles.labCard}>
            <View style={styles.labHeader}>
              <View style={styles.labInfo}>
                <BodyText style={styles.labTitle}>{report.testName}</BodyText>
                <Caption color={theme.colors.textSecondary}>
                  Ordered: {report.orderDate.toLocaleDateString()}
                </Caption>
                {report.resultDate && (
                  <Caption color={theme.colors.textSecondary}>
                    Results: {report.resultDate.toLocaleDateString()}
                  </Caption>
                )}
                <Caption color={theme.colors.textTertiary}>
                  Provider: {report.provider}
                </Caption>
              </View>
              <Badge variant={getStatusColor(report.status) as any} size="sm">
                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              </Badge>
            </View>

            {report.results && (
              <View style={styles.labResults}>
                <Caption color={theme.colors.textSecondary} style={styles.resultsLabel}>
                  Test Results:
                </Caption>
                {report.results.map((result, resultIndex) => (
                  <View key={resultIndex} style={styles.resultItem}>
                    <View style={styles.resultInfo}>
                      <BodyText style={styles.resultName}>{result.name}</BodyText>
                      <Caption color={theme.colors.textSecondary}>
                        Range: {result.range}
                      </Caption>
                    </View>
                    <View style={styles.resultValue}>
                      <BodyText 
                        color={getResultStatusColor(result.status)}
                        style={styles.resultNumber}
                      >
                        {result.value} {result.unit}
                      </BodyText>
                      <Caption color={getResultStatusColor(result.status)}>
                        {result.status.toUpperCase()}
                      </Caption>
                    </View>
                  </View>
                ))}

                <View style={styles.labActions}>
                  <Button
                    title="View Full Report"
                    onPress={() => Alert.alert('Coming Soon', 'Full lab report coming soon!')}
                    variant="primary"
                    size="sm"
                    style={styles.actionButton}
                  />
                  <Button
                    title="Share with Doctor"
                    onPress={() => Alert.alert('Coming Soon', 'Share with doctor coming soon!')}
                    variant="outline"
                    size="sm"
                    style={styles.actionButton}
                  />
                </View>
              </View>
            )}
          </SlideInCard>
        </FadeInView>
      ))}
    </ScrollView>
  );

  const reportTabs = [
    {
      key: 'health',
      title: 'Health Reports',
      content: renderHealthReports(),
    },
    {
      key: 'lab',
      title: 'Lab Results',
      content: renderLabReports(),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView delay={100} direction="down">
        <View style={styles.header}>
          <Heading1>Reports</Heading1>
          <BodyText color={theme.colors.textSecondary}>
            Your health reports and lab results
          </BodyText>
        </View>
      </FadeInView>

      <Tabs
        tabs={reportTabs}
        defaultTab="health"
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
  reportCard: {
    marginBottom: theme.spacing.base,
    padding: theme.spacing.base,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.base,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontWeight: theme.typography.fontWeights.semibold,
    marginBottom: theme.spacing.xs,
  },
  reportSummary: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
    paddingTop: theme.spacing.base,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.base,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  keyInsights: {
    marginBottom: theme.spacing.base,
  },
  insightsLabel: {
    fontWeight: theme.typography.fontWeights.medium,
    marginBottom: theme.spacing.sm,
  },
  insightItem: {
    marginBottom: theme.spacing.xs,
    marginLeft: theme.spacing.sm,
  },
  reportActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  generatingState: {
    padding: theme.spacing.base,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  generateSection: {
    padding: theme.spacing.base,
  },
  labCard: {
    marginBottom: theme.spacing.base,
    padding: theme.spacing.base,
  },
  labHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.base,
  },
  labInfo: {
    flex: 1,
  },
  labTitle: {
    fontWeight: theme.typography.fontWeights.semibold,
    marginBottom: theme.spacing.xs,
  },
  labResults: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
    paddingTop: theme.spacing.base,
  },
  resultsLabel: {
    fontWeight: theme.typography.fontWeights.medium,
    marginBottom: theme.spacing.sm,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontWeight: theme.typography.fontWeights.medium,
    marginBottom: theme.spacing.xs,
  },
  resultValue: {
    alignItems: 'flex-end',
  },
  resultNumber: {
    fontWeight: theme.typography.fontWeights.bold,
    marginBottom: theme.spacing.xs,
  },
  labActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.base,
  },
});