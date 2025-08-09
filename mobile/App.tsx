import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RPMOnboardingScreen from './src/screens/RPM/RPMOnboardingScreen';
import RPMCalendarScreen from './src/screens/RPM/RPMCalendarScreen';
import RPMTrendsScreen from './src/screens/RPM/RPMTrendsScreen';
import CCMOnboardingScreen from './src/screens/CCM/CCMOnboardingScreen';
import CCMCarePlanScreen from './src/screens/CCM/CCMCarePlanScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import ManualEntryScreen from './src/screens/Monitoring/ManualEntryScreen';
import EducationScreen from './src/screens/Engagement/EducationScreen';
import MessagingScreen from './src/screens/Communication/MessagingScreen';
import DevicesScreen from './src/screens/Devices/DevicesScreen';
import { View, Text } from 'react-native';
import HomeScreen from './src/screens/Home/HomeScreen';
import { getAuthState } from './src/services/auth.service';
import { notificationsService } from './src/services/notifications.service';
import * as Notifications from 'expo-notifications';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main Tab Navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          paddingBottom: 6,
          paddingTop: 6,
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="TrendsTab" 
        component={RPMTrendsScreen}
        options={{
          title: 'Trends',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>📊</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="DevicesTab" 
        component={DevicesScreen}
        options={{
          title: 'Devices',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>📱</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="MessagingTab" 
        component={MessagingScreen}
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>💬</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Loading() {
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
      <Text>Loading...</Text>
    </View>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [notificationListener, setNotificationListener] = useState<Notifications.Subscription>();
  const [responseListener, setResponseListener] = useState<Notifications.Subscription>();

  useEffect(() => {
    (async () => {
      try {
        const { token } = await getAuthState();
        setInitialRoute(token ? 'Home' : 'Login');
        
        // Setup push notifications if user is authenticated
        if (token) {
          const pushToken = await notificationsService.registerForPushNotifications();
          if (pushToken) {
            await notificationsService.sendTokenToServer(pushToken);
          }
        }
      } catch (error) {
        console.error('Error during app initialization:', error);
        setInitialRoute('Login'); // Default to login screen
      }
    })();

    // Setup notification listeners with error handling
    try {
      const notifListener = notificationsService.addNotificationReceivedListener(notification => {
        console.log('Notification received:', notification);
      });

      const responseListenerRef = notificationsService.addNotificationResponseReceivedListener(response => {
        console.log('Notification response:', response);
        // Handle notification tap - navigate to relevant screen
      });

      setNotificationListener(notifListener);
      setResponseListener(responseListenerRef);
    } catch (error) {
      console.error('Error setting up notification listeners:', error);
    }

    return () => {
      if (notificationListener) {
        notificationsService.removeNotificationSubscription(notificationListener);
      }
      if (responseListener) {
        notificationsService.removeNotificationSubscription(responseListener);
      }
    };
  }, []);

  if (!initialRoute) return <Loading />;

  return (
    <NavigationContainer>
        <Stack.Navigator 
          initialRouteName={initialRoute}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerTintColor: '#007AFF',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Home" 
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="RPMOnboarding" 
            component={RPMOnboardingScreen}
            options={{ title: 'RPM Setup' }}
          />
          <Stack.Screen 
            name="RPMCalendar" 
            component={RPMCalendarScreen}
            options={{ title: 'Calendar' }}
          />
          <Stack.Screen 
            name="CCMOnboarding" 
            component={CCMOnboardingScreen}
            options={{ title: 'CCM Setup' }}
          />
          <Stack.Screen 
            name="CCMCarePlan" 
            component={CCMCarePlanScreen}
            options={{ title: 'Care Plan' }}
          />
          <Stack.Screen 
            name="ManualEntry" 
            component={ManualEntryScreen}
            options={{ title: 'Manual Entry' }}
          />
          <Stack.Screen 
            name="Education" 
            component={EducationScreen}
            options={{ title: 'Education' }}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}


