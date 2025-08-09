import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Switch,
  ActivityIndicator,
} from 'react-native';

import { bleService, HealthDevice, HealthReading } from '../../services/ble.service';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { FadeInView } from '../../components/ui/FadeInView';
import { PulseAnimation } from '../../components/ui/PulseAnimation';

export default function DevicesScreen() {
  const [devices, setDevices] = useState<HealthDevice[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [latestReadings, setLatestReadings] = useState<Map<string, HealthReading>>(new Map());

  useEffect(() => {
    initializeBLE();
    
    // Setup reading callback
    bleService.setReadingCallback((reading) => {
      setLatestReadings(prev => new Map(prev.set(reading.deviceId, reading)));
      
      // Show notification for new reading
      Alert.alert(
        'New Reading',
        `${getDeviceTypeLabel(reading.deviceType)}: ${formatReading(reading)}`,
        [{ text: 'OK' }]
      );
    });

    return () => {
      bleService.stopScanning();
    };
  }, []);

  const initializeBLE = async () => {
    try {
      const initialized = await bleService.initialize();
      setIsInitialized(initialized);
      
      if (!initialized) {
        Alert.alert(
          'Bluetooth Required',
          'Please enable Bluetooth and grant permissions to connect to health devices.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('BLE initialization failed:', error);
      Alert.alert('Error', 'Failed to initialize Bluetooth');
    }
  };

  const startScanning = () => {
    if (!isInitialized) {
      Alert.alert('Error', 'Bluetooth not initialized');
      return;
    }

    setIsScanning(true);
    setDevices([]);
    
    bleService.startScanning((discoveredDevices) => {
      setDevices(discoveredDevices);
    });

    // Stop scanning after 30 seconds
    setTimeout(() => {
      stopScanning();
    }, 30000);
  };

  const stopScanning = () => {
    setIsScanning(false);
    bleService.stopScanning();
  };

  const connectToDevice = async (device: HealthDevice) => {
    try {
      const connected = await bleService.connectToDevice(device.id);
      
      if (connected) {
        // Update device status
        setDevices(prev =>
          prev.map(d =>
            d.id === device.id ? { ...d, isConnected: true } : d
          )
        );

        // Get battery level
        const batteryLevel = await bleService.getBatteryLevel(device.id);
        if (batteryLevel !== null) {
          setDevices(prev =>
            prev.map(d =>
              d.id === device.id ? { ...d, batteryLevel } : d
            )
          );
        }

        Alert.alert('Success', `Connected to ${device.name}`);
      } else {
        Alert.alert('Error', 'Failed to connect to device');
      }
    } catch (error) {
      console.error('Connection error:', error);
      Alert.alert('Error', 'Connection failed');
    }
  };

  const disconnectDevice = async (device: HealthDevice) => {
    try {
      await bleService.disconnectDevice(device.id);
      setDevices(prev =>
        prev.map(d =>
          d.id === device.id ? { ...d, isConnected: false } : d
        )
      );
      Alert.alert('Success', `Disconnected from ${device.name}`);
    } catch (error) {
      console.error('Disconnection error:', error);
      Alert.alert('Error', 'Disconnection failed');
    }
  };

  const getDeviceTypeLabel = (type: HealthDevice['type']): string => {
    switch (type) {
      case 'blood_pressure': return 'Blood Pressure';
      case 'glucose': return 'Glucose';
      case 'weight': return 'Weight Scale';
      case 'heart_rate': return 'Heart Rate';
      case 'oximeter': return 'Pulse Oximeter';
      default: return 'Health Device';
    }
  };

  const getDeviceIcon = (type: HealthDevice['type']): string => {
    switch (type) {
      case 'blood_pressure': return '🩺';
      case 'glucose': return '🩸';
      case 'weight': return '⚖️';
      case 'heart_rate': return '❤️';
      case 'oximeter': return '🫁';
      default: return '📱';
    }
  };

  const formatReading = (reading: HealthReading): string => {
    switch (reading.deviceType) {
      case 'blood_pressure':
        return `${reading.systolic}/${reading.diastolic} ${reading.unit}${reading.heartRate ? ` (HR: ${reading.heartRate} bpm)` : ''}`;
      case 'oximeter':
        return `${reading.oxygenSaturation}% SpO2${reading.heartRate ? ` (HR: ${reading.heartRate} bpm)` : ''}`;
      default:
        return `${reading.value} ${reading.unit}`;
    }
  };

  const renderDevice = ({ item }: { item: HealthDevice }) => {
    const latestReading = latestReadings.get(item.id);
    
    return (
      <View style={styles.deviceCard}>
        <View style={styles.deviceHeader}>
          <View style={styles.deviceInfo}>
            <Text style={styles.deviceIcon}>{getDeviceIcon(item.type)}</Text>
            <View style={styles.deviceDetails}>
              <Text style={styles.deviceName}>{item.name}</Text>
              <Text style={styles.deviceType}>{getDeviceTypeLabel(item.type)}</Text>
              {item.batteryLevel !== undefined && (
                <Text style={styles.batteryLevel}>Battery: {item.batteryLevel}%</Text>
              )}
            </View>
          </View>
          
          <View style={styles.deviceActions}>
            <View style={styles.connectionStatus}>
              <Text style={[
                styles.statusText,
                { color: item.isConnected ? '#4CAF50' : '#666' }
              ]}>
                {item.isConnected ? 'Connected' : 'Disconnected'}
              </Text>
              <Switch
                value={item.isConnected}
                onValueChange={item.isConnected ? () => disconnectDevice(item) : () => connectToDevice(item)}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={item.isConnected ? '#4CAF50' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>
        
        {latestReading && (
          <View style={styles.latestReading}>
            <Text style={styles.readingLabel}>Latest Reading:</Text>
            <Text style={styles.readingValue}>{formatReading(latestReading)}</Text>
            <Text style={styles.readingTime}>
              {latestReading.timestamp.toLocaleTimeString()}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Health Devices</Text>
        <TouchableOpacity
          style={[styles.scanButton, isScanning && styles.scanButtonActive]}
          onPress={isScanning ? stopScanning : startScanning}
          disabled={!isInitialized}
        >
          {isScanning ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.scanButtonText}>
              {devices.length > 0 ? 'Scan Again' : 'Scan for Devices'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {!isInitialized && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Bluetooth not available. Please check your device settings.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={initializeBLE}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {isScanning && (
        <FadeInView direction="none" style={styles.scanningContainer}>
          <PulseAnimation pulseColor="rgba(0, 122, 255, 0.2)" enabled={isScanning}>
            <LoadingSpinner size="large" text="Scanning for health devices..." />
          </PulseAnimation>
        </FadeInView>
      )}

      {devices.length === 0 && !isScanning && isInitialized && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No devices found. Make sure your health devices are in pairing mode and tap "Scan for Devices".
          </Text>
        </View>
      )}

      <FlatList
        data={devices}
        renderItem={renderDevice}
        keyExtractor={(item) => item.id}
        style={styles.devicesList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scanButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  scanButtonActive: {
    backgroundColor: '#FF3B30',
  },
  scanButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  scanningContainer: {
    padding: 40,
    alignItems: 'center',
  },
  scanningText: {
    marginTop: 16,
    color: '#666',
    fontSize: 16,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
  devicesList: {
    flex: 1,
    padding: 16,
  },
  deviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  deviceDetails: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  deviceType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  batteryLevel: {
    fontSize: 12,
    color: '#4CAF50',
  },
  deviceActions: {
    alignItems: 'flex-end',
  },
  connectionStatus: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: '500',
  },
  latestReading: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  readingLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  readingValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 2,
  },
  readingTime: {
    fontSize: 11,
    color: '#999',
  },
});
