import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { VictoryChart, VictoryLine, VictoryArea, VictoryAxis, VictoryTheme } from 'victory-native';


interface TrendData {
  date: string;
  value: number;
  timestamp: Date;
}

export default function RPMTrendsScreen() {
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrends();
  }, []);

  const loadTrends = async () => {
    try {
      // Simulate API call - replace with actual RPM service call
      const mockData: TrendData[] = [
        { date: '2024-01-01', value: 120, timestamp: new Date('2024-01-01') },
        { date: '2024-01-02', value: 118, timestamp: new Date('2024-01-02') },
        { date: '2024-01-03', value: 122, timestamp: new Date('2024-01-03') },
        { date: '2024-01-04', value: 115, timestamp: new Date('2024-01-04') },
        { date: '2024-01-05', value: 119, timestamp: new Date('2024-01-05') },
        { date: '2024-01-06', value: 121, timestamp: new Date('2024-01-06') },
        { date: '2024-01-07', value: 117, timestamp: new Date('2024-01-07') },
      ];
      setTrends(mockData);
    } catch (error) {
      console.error('Failed to load trends:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = (trends || []).map((trend, index) => ({
    x: index + 1,
    y: trend?.value || 0,
    label: trend?.date || ''
  }));

  const screenWidth = Dimensions.get('window').width;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>RPM Trends</Text>
      
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Blood Pressure (Systolic)</Text>
        <VictoryChart
          theme={VictoryTheme.material}
          width={screenWidth - 32}
          height={250}
          padding={{ left: 60, top: 20, right: 40, bottom: 60 }}
        >
          <VictoryAxis dependentAxis />
          <VictoryAxis 
            tickFormat={(x) => trends[x - 1]?.date.split('-')[2] || x}
          />
          <VictoryArea
            data={chartData}
            style={{
              data: { fill: "#c43a31", fillOpacity: 0.3, stroke: "#c43a31", strokeWidth: 2 }
            }}
            animate={{
              duration: 1000,
              onLoad: { duration: 500 }
            }}
          />
          <VictoryLine
            data={chartData}
            style={{
              data: { stroke: "#c43a31", strokeWidth: 3 }
            }}
            animate={{
              duration: 1000,
              onLoad: { duration: 500 }
            }}
          />
        </VictoryChart>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Average</Text>
          <Text style={styles.statValue}>
            {trends && trends.length > 0 
              ? Math.round(trends.reduce((sum, t) => sum + (t?.value || 0), 0) / trends.length)
              : 0
            }
          </Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Highest</Text>
          <Text style={styles.statValue}>
            {trends && trends.length > 0 ? Math.max(...trends.map(t => t?.value || 0)) : 0}
          </Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Lowest</Text>
          <Text style={styles.statValue}>
            {trends && trends.length > 0 ? Math.min(...trends.map(t => t?.value || 0)) : 0}
          </Text>
        </View>
      </View>

      <View style={styles.dataList}>
        <Text style={styles.dataListTitle}>Recent Readings</Text>
        {(trends || []).slice(-5).reverse().map((trend, index) => (
          <View key={index} style={styles.dataItem}>
            <Text style={styles.dataDate}>{trend.date}</Text>
            <Text style={styles.dataValue}>{trend.value} mmHg</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  chartContainer: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c43a31',
  },
  dataList: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dataListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dataDate: {
    fontSize: 14,
    color: '#666',
  },
  dataValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});


