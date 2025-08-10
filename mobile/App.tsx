import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/screens/Auth/AuthContext';

// Import screens
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import HealthDashboardScreen from './src/screens/Health/HealthDashboardScreen';
import RPMTrendsScreen from './src/screens/RPM/RPMTrendsScreen';
import DevicesScreen from './src/screens/Devices/DevicesScreen';
import MessagingScreen from './src/screens/Communication/MessagingScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import SettingsScreen from './src/screens/Settings/SettingsScreen';
import NotificationsScreen from './src/screens/Notifications/NotificationsScreen';
import ManualEntryScreen from './src/screens/Monitoring/ManualEntryScreen';
import MedicationsScreen from './src/screens/Medications/MedicationsScreen';
import AppointmentsScreen from './src/screens/Appointments/AppointmentsScreen';
import RPMOnboardingScreen from './src/screens/RPM/RPMOnboardingScreen';
import RPMCalendarScreen from './src/screens/RPM/RPMCalendarScreen';
import CCMOnboardingScreen from './src/screens/CCM/CCMOnboardingScreen';
import CCMCarePlanScreen from './src/screens/CCM/CCMCarePlanScreen';
import EducationScreen from './src/screens/Education/EducationScreen';
import EmergencyScreen from './src/screens/Emergency/EmergencyScreen';
import ReportsScreen from './src/screens/Reports/ReportsScreen';

import { theme } from './src/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.borderLight,
          paddingBottom: 12,
          paddingTop: 12,
          height: 88,
          borderTopWidth: 0,
          ...theme.shadows.lg,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <span style={{ fontSize: 22, color }}>🏠</span>,
        }}
      />
      <Tab.Screen 
        name="HealthTab" 
        component={HealthDashboardScreen}
        options={{
          title: 'Health',
          tabBarIcon: ({ color }) => <span style={{ fontSize: 22, color }}>💚</span>,
        }}
      />
      <Tab.Screen 
        name="TrendsTab" 
        component={RPMTrendsScreen}
        options={{
          title: 'Trends',
          tabBarIcon: ({ color }) => <span style={{ fontSize: 22, color }}>📊</span>,
        }}
      />
      <Tab.Screen 
        name="DevicesTab" 
        component={DevicesScreen}
        options={{
          title: 'Devices',
          tabBarIcon: ({ color }) => <span style={{ fontSize: 22, color }}>📱</span>,
        }}
      />
      <Tab.Screen 
        name="MessagingTab" 
        component={MessagingScreen}
        options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => <span style={{ fontSize: 22, color }}>💬</span>,
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <span style={{ fontSize: 22, color }}>👤</span>,
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Navigator
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Auth Screens */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          
          {/* Main App */}
          <Stack.Screen name="Home" component={MainTabs} />
          
          {/* Modal Screens */}
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen 
            name="Notifications" 
            component={NotificationsScreen}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen 
            name="ManualEntry" 
            component={ManualEntryScreen}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen 
            name="Medications" 
            component={MedicationsScreen}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen 
            name="Appointments" 
            component={AppointmentsScreen}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen 
            name="Education" 
            component={EducationScreen}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen 
            name="Emergency" 
            component={EmergencyScreen}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen 
            name="Reports" 
            component={ReportsScreen}
            options={{ presentation: 'modal' }}
          />
          
          {/* RPM Screens */}
          <Stack.Screen 
            name="RPMOnboarding" 
            component={RPMOnboardingScreen}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen 
            name="RPMCalendar" 
            component={RPMCalendarScreen}
            options={{ presentation: 'modal' }}
          />
          
          {/* CCM Screens */}
          <Stack.Screen 
            name="CCMOnboarding" 
            component={CCMOnboardingScreen}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen 
            name="CCMCarePlan" 
            component={CCMCarePlanScreen}
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}