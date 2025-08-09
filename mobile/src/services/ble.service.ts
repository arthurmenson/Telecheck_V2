import { BleManager, Device, BleError, Characteristic, Service } from 'react-native-ble-plx';
import { PermissionsAndroid, Platform } from 'react-native';

export interface HealthDevice {
  id: string;
  name: string;
  type: 'blood_pressure' | 'glucose' | 'weight' | 'heart_rate' | 'oximeter';
  isConnected: boolean;
  batteryLevel?: number;
}

export interface HealthReading {
  deviceId: string;
  deviceType: string;
  timestamp: Date;
  value: number;
  unit: string;
  systolic?: number;
  diastolic?: number;
  heartRate?: number;
  oxygenSaturation?: number;
}

// Common health device service UUIDs
const HEALTH_DEVICE_SERVICES = {
  BLOOD_PRESSURE: '00001810-0000-1000-8000-00805f9b34fb',
  GLUCOSE: '00001808-0000-1000-8000-00805f9b34fb',
  WEIGHT_SCALE: '0000181d-0000-1000-8000-00805f9b34fb',
  HEART_RATE: '0000180d-0000-1000-8000-00805f9b34fb',
  PULSE_OXIMETER: '00001822-0000-1000-8000-00805f9b34fb',
  BATTERY: '0000180f-0000-1000-8000-00805f9b34fb',
};

class BLEService {
  private bleManager: BleManager | null = null;
  private connectedDevices: Map<string, Device> = new Map();
  private scanningCallback?: (devices: HealthDevice[]) => void;
  private readingCallback?: (reading: HealthReading) => void;
  private initialized = false;

  constructor() {
    // Initialize manager lazily to avoid issues during app startup
  }

  private initializeManager() {
    if (!this.bleManager && !this.initialized) {
      try {
        this.bleManager = new BleManager();
        this.initialized = true;
      } catch (error) {
        console.warn('Failed to initialize BLE manager:', error);
        this.initialized = false;
      }
    }
  }

  async requestPermissions(): Promise<boolean> {
    this.initializeManager();
    if (!this.bleManager) return false;
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        return Object.values(granted).every(
          permission => permission === PermissionsAndroid.RESULTS.GRANTED
        );
      } catch (error) {
        console.error('Permission request failed:', error);
        return false;
      }
    }
    return true; // iOS handles permissions automatically
  }

  async initialize(): Promise<boolean> {
    this.initializeManager();
    if (!this.bleManager) return false;
    
    try {
      const hasPermissions = await this.requestPermissions();
      if (!hasPermissions) {
        throw new Error('Bluetooth permissions not granted');
      }

      const state = await this.bleManager.state();
      if (state !== 'PoweredOn') {
        throw new Error(`Bluetooth is ${state}`);
      }

      return true;
    } catch (error) {
      console.error('BLE initialization failed:', error);
      return false;
    }
  }

  startScanning(callback: (devices: HealthDevice[]) => void): void {
    this.initializeManager();
    if (!this.bleManager) {
      console.warn('BLE manager not initialized');
      return;
    }
    
    this.scanningCallback = callback;
    const discoveredDevices: Map<string, HealthDevice> = new Map();

    this.bleManager.startDeviceScan(
      Object.values(HEALTH_DEVICE_SERVICES),
      null,
      (error: BleError | null, device: Device | null) => {
        if (error) {
          console.error('Scan error:', error);
          return;
        }

        if (device && device.name) {
          const deviceType = this.determineDeviceType(device);
          
          const healthDevice: HealthDevice = {
            id: device.id,
            name: device.name,
            type: deviceType,
            isConnected: false,
          };

          discoveredDevices.set(device.id, healthDevice);
          callback(Array.from(discoveredDevices.values()));
        }
      }
    );
  }

  stopScanning(): void {
    if (this.bleManager) {
      this.bleManager.stopDeviceScan();
    }
  }

  async connectToDevice(deviceId: string): Promise<boolean> {
    if (!this.bleManager) {
      console.warn('BLE manager not initialized');
      return false;
    }
    
    try {
      const device = await this.bleManager.connectToDevice(deviceId);
      await device.discoverAllServicesAndCharacteristics();
      
      this.connectedDevices.set(deviceId, device);
      
      // Setup notifications for health data
      await this.setupDeviceNotifications(device);
      
      return true;
    } catch (error) {
      console.error('Connection failed:', error);
      return false;
    }
  }

  async disconnectDevice(deviceId: string): Promise<void> {
    const device = this.connectedDevices.get(deviceId);
    if (device) {
      await device.cancelConnection();
      this.connectedDevices.delete(deviceId);
    }
  }

  async getBatteryLevel(deviceId: string): Promise<number | null> {
    const device = this.connectedDevices.get(deviceId);
    if (!device) return null;

    try {
      const batteryService = await device.servicesForDevice();
      const batteryServiceUUID = HEALTH_DEVICE_SERVICES.BATTERY;
      
      const service = batteryService.find(s => s.uuid === batteryServiceUUID);
      if (!service) return null;

      const characteristics = await device.characteristicsForService(batteryServiceUUID);
      const batteryChar = characteristics.find(c => c.uuid.includes('2a19'));
      
      if (batteryChar) {
        const reading = await batteryChar.read();
        return reading.value ? parseInt(reading.value, 16) : null;
      }
    } catch (error) {
      console.error('Battery reading failed:', error);
    }
    
    return null;
  }

  setReadingCallback(callback: (reading: HealthReading) => void): void {
    this.readingCallback = callback;
  }

  private determineDeviceType(device: Device): HealthDevice['type'] {
    const name = device.name?.toLowerCase() || '';
    
    if (name.includes('blood') || name.includes('bp')) return 'blood_pressure';
    if (name.includes('glucose') || name.includes('sugar')) return 'glucose';
    if (name.includes('scale') || name.includes('weight')) return 'weight';
    if (name.includes('heart') || name.includes('hr')) return 'heart_rate';
    if (name.includes('oximeter') || name.includes('spo2')) return 'oximeter';
    
    return 'heart_rate'; // Default fallback
  }

  private async setupDeviceNotifications(device: Device): Promise<void> {
    try {
      const services = await device.servicesForDevice();
      
      for (const service of services) {
        const characteristics = await device.characteristicsForService(service.uuid);
        
        for (const char of characteristics) {
          if (char.isNotifiable || char.isIndicatable) {
            char.monitor((error, characteristic) => {
              if (error) {
                console.error('Monitoring error:', error);
                return;
              }
              
              if (characteristic?.value && this.readingCallback) {
                const reading = this.parseHealthData(device, characteristic);
                if (reading) {
                  this.readingCallback(reading);
                }
              }
            });
          }
        }
      }
    } catch (error) {
      console.error('Setup notifications failed:', error);
    }
  }

  private parseHealthData(device: Device, characteristic: Characteristic): HealthReading | null {
    if (!characteristic.value) return null;

    try {
      const data = Buffer.from(characteristic.value, 'base64');
      const deviceType = this.determineDeviceType(device);
      
      // Basic parsing - would need device-specific implementations
      switch (deviceType) {
        case 'blood_pressure':
          return this.parseBloodPressureData(device.id, data);
        case 'glucose':
          return this.parseGlucoseData(device.id, data);
        case 'weight':
          return this.parseWeightData(device.id, data);
        case 'heart_rate':
          return this.parseHeartRateData(device.id, data);
        case 'oximeter':
          return this.parseOximeterData(device.id, data);
        default:
          return null;
      }
    } catch (error) {
      console.error('Data parsing failed:', error);
      return null;
    }
  }

  private parseBloodPressureData(deviceId: string, data: Buffer): HealthReading {
    // Simplified parsing - real implementation would follow BLE health standards
    const systolic = data.readUInt16LE(1);
    const diastolic = data.readUInt16LE(3);
    const heartRate = data.length > 5 ? data.readUInt16LE(5) : undefined;

    return {
      deviceId,
      deviceType: 'blood_pressure',
      timestamp: new Date(),
      value: systolic,
      unit: 'mmHg',
      systolic,
      diastolic,
      heartRate,
    };
  }

  private parseGlucoseData(deviceId: string, data: Buffer): HealthReading {
    const value = data.readUInt16LE(1) / 1000; // Convert from mg/dL

    return {
      deviceId,
      deviceType: 'glucose',
      timestamp: new Date(),
      value,
      unit: 'mg/dL',
    };
  }

  private parseWeightData(deviceId: string, data: Buffer): HealthReading {
    const value = data.readUInt16LE(1) / 200; // Convert to kg

    return {
      deviceId,
      deviceType: 'weight',
      timestamp: new Date(),
      value,
      unit: 'kg',
    };
  }

  private parseHeartRateData(deviceId: string, data: Buffer): HealthReading {
    const value = data.readUInt8(1);

    return {
      deviceId,
      deviceType: 'heart_rate',
      timestamp: new Date(),
      value,
      unit: 'bpm',
      heartRate: value,
    };
  }

  private parseOximeterData(deviceId: string, data: Buffer): HealthReading {
    const oxygenSaturation = data.readUInt8(1);
    const heartRate = data.length > 2 ? data.readUInt8(2) : undefined;

    return {
      deviceId,
      deviceType: 'oximeter',
      timestamp: new Date(),
      value: oxygenSaturation,
      unit: '%',
      oxygenSaturation,
      heartRate,
    };
  }

  destroy(): void {
    this.stopScanning();
    this.connectedDevices.forEach(device => device.cancelConnection());
    this.connectedDevices.clear();
    this.bleManager.destroy();
  }
}

export const bleService = new BLEService();
