import { API_URL } from './api';

export interface HealthReading {
  id: string;
  userId: string;
  type: 'blood_pressure' | 'heart_rate' | 'weight' | 'glucose' | 'temperature' | 'oxygen_saturation';
  value: number;
  unit: string;
  systolic?: number;
  diastolic?: number;
  heartRate?: number;
  oxygenSaturation?: number;
  timestamp: Date;
  source: 'manual' | 'device' | 'imported';
  deviceId?: string;
  notes?: string;
}

export interface HealthGoal {
  id: string;
  userId: string;
  type: string;
  target: number;
  current: number;
  unit: string;
  deadline?: Date;
  isActive: boolean;
  progress: number;
}

export interface HealthInsight {
  id: string;
  userId: string;
  type: 'recommendation' | 'alert' | 'insight' | 'warning';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  confidence: number;
  actionRequired: boolean;
  dismissed: boolean;
  createdAt: Date;
}

class HealthService {
  private baseUrl = API_URL;

  // Health Readings
  async getHealthReadings(userId: string, type?: string, limit = 50): Promise<HealthReading[]> {
    try {
      const params = new URLSearchParams({
        userId,
        limit: limit.toString(),
        ...(type && { type }),
      });
      
      const response = await fetch(`${this.baseUrl}/health/readings?${params}`);
      if (!response.ok) throw new Error('Failed to fetch health readings');
      
      const data = await response.json();
      return data.map((reading: any) => ({
        ...reading,
        timestamp: new Date(reading.timestamp),
      }));
    } catch (error) {
      console.error('Error fetching health readings:', error);
      // Return mock data for development
      return this.getMockHealthReadings(type);
    }
  }

  async addHealthReading(reading: Omit<HealthReading, 'id' | 'timestamp'>): Promise<HealthReading> {
    try {
      const response = await fetch(`${this.baseUrl}/health/readings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...reading,
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) throw new Error('Failed to add health reading');
      
      const data = await response.json();
      return {
        ...data,
        timestamp: new Date(data.timestamp),
      };
    } catch (error) {
      console.error('Error adding health reading:', error);
      // Return mock success for development
      return {
        id: Date.now().toString(),
        ...reading,
        timestamp: new Date(),
      };
    }
  }

  // Health Goals
  async getHealthGoals(userId: string): Promise<HealthGoal[]> {
    try {
      const response = await fetch(`${this.baseUrl}/health/goals?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch health goals');
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching health goals:', error);
      return this.getMockHealthGoals();
    }
  }

  async updateHealthGoal(goalId: string, updates: Partial<HealthGoal>): Promise<HealthGoal> {
    try {
      const response = await fetch(`${this.baseUrl}/health/goals/${goalId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) throw new Error('Failed to update health goal');
      
      return await response.json();
    } catch (error) {
      console.error('Error updating health goal:', error);
      throw error;
    }
  }

  // Health Insights
  async getHealthInsights(userId: string): Promise<HealthInsight[]> {
    try {
      const response = await fetch(`${this.baseUrl}/health/insights?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch health insights');
      
      const data = await response.json();
      return data.map((insight: any) => ({
        ...insight,
        createdAt: new Date(insight.createdAt),
      }));
    } catch (error) {
      console.error('Error fetching health insights:', error);
      return this.getMockHealthInsights();
    }
  }

  async dismissInsight(insightId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/health/insights/${insightId}/dismiss`, {
        method: 'POST',
      });
      
      if (!response.ok) throw new Error('Failed to dismiss insight');
    } catch (error) {
      console.error('Error dismissing insight:', error);
    }
  }

  // Analytics
  async getHealthTrends(userId: string, type: string, period: '7d' | '30d' | '90d' = '30d') {
    try {
      const response = await fetch(
        `${this.baseUrl}/health/trends?userId=${userId}&type=${type}&period=${period}`
      );
      if (!response.ok) throw new Error('Failed to fetch health trends');
      
      const data = await response.json();
      return data.map((point: any) => ({
        ...point,
        date: new Date(point.date),
      }));
    } catch (error) {
      console.error('Error fetching health trends:', error);
      return this.getMockTrendData(type, period);
    }
  }

  // Mock data for development
  private getMockHealthReadings(type?: string): HealthReading[] {
    const readings: HealthReading[] = [];
    const now = new Date();
    
    for (let i = 0; i < 10; i++) {
      const timestamp = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      
      if (!type || type === 'blood_pressure') {
        readings.push({
          id: `bp-${i}`,
          userId: 'user-1',
          type: 'blood_pressure',
          value: 120 + Math.random() * 20,
          unit: 'mmHg',
          systolic: 120 + Math.random() * 20,
          diastolic: 80 + Math.random() * 10,
          heartRate: 70 + Math.random() * 20,
          timestamp,
          source: 'manual',
        });
      }
      
      if (!type || type === 'weight') {
        readings.push({
          id: `weight-${i}`,
          userId: 'user-1',
          type: 'weight',
          value: 150 + Math.random() * 10 - 5,
          unit: 'lbs',
          timestamp,
          source: 'manual',
        });
      }
    }
    
    return readings;
  }

  private getMockHealthGoals(): HealthGoal[] {
    return [
      {
        id: '1',
        userId: 'user-1',
        type: 'blood_pressure',
        target: 120,
        current: 125,
        unit: 'mmHg',
        isActive: true,
        progress: 85,
      },
      {
        id: '2',
        userId: 'user-1',
        type: 'weight',
        target: 140,
        current: 142.8,
        unit: 'lbs',
        isActive: true,
        progress: 92,
      },
    ];
  }

  private getMockHealthInsights(): HealthInsight[] {
    return [
      {
        id: '1',
        userId: 'user-1',
        type: 'warning',
        title: 'Blood Pressure Trend',
        description: 'Your readings have been slightly elevated this week.',
        priority: 'medium',
        category: 'cardiovascular',
        confidence: 0.85,
        actionRequired: true,
        dismissed: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
    ];
  }

  private getMockTrendData(type: string, period: string) {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      let value = 120;
      if (type === 'heart_rate') value = 70;
      if (type === 'weight') value = 150;
      if (type === 'glucose') value = 95;
      
      data.push({
        date,
        value: value + Math.random() * 20 - 10,
      });
    }
    
    return data;
  }
}

export const healthService = new HealthService();