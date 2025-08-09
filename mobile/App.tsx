import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StatusBar } from 'react-native';

// Screens
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
import HomeScreen from './src/screens/Home/HomeScreen';

// Services
import { getAuthState } from './src/services/auth.service';
import { notificationsService } from './src/services/notifications.service';
import * as Notifications from 'expo-notifications';

// Theme
import { theme } from './src/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Enhanced Tab Navigator with better icons and styling
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.borderLight,
          paddingBottom: 8,
          paddingTop: 8,
          height: 68,
          ...theme.shadows.lg,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.fontSizes.xs,
          fontWeight: theme.typography.fontWeights.medium,
          marginTop: 4,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              backgroundColor: focused ? `${color}15` : 'transparent',
              borderRadius: 12,
              padding: 8,
              minWidth: 40,
              alignItems: 'center',
            }}>
              <Text style={{ fontSize: 20, color }}>🏠</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="TrendsTab" 
        component={RPMTrendsScreen}
        options={{
          title: 'Trends',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              backgroundColor: focused ? `${color}15` : 'transparent',
              borderRadius: 12,
              padding: 8,
              minWidth: 40,
              alignItems: 'center',
            }}>
              <Text style={{ fontSize: 20, color }}>📊</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="DevicesTab" 
        component={DevicesScreen}
        options={{
          title: 'Devices',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              backgroundColor: focused ? `${color}15` : 'transparent',
              borderRadius: 12,
              padding: 8,
              minWidth: 40,
              alignItems: 'center',
            }}>
              <Text style={{ fontSize: 20, color }}>📱</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="MessagingTab" 
        component={MessagingScreen}
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              backgroundColor: focused ? `${color}15` : 'transparent',
              borderRadius: 12,
              padding: 8,
              minWidth: 40,
              alignItems: 'center',
            }}>
              <Text style={{ fontSize: 20, color }}>💬</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function LoadingScreen() {
  return (
    <View style={{ 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    }}>
      <View style={{
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: theme.colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        ...theme.shadows.lg,
      }}>
        <Text style={{ fontSize: 32 }}>🏥</Text>
      </View>
      <Text style={{ 
        fontSize: theme.typography.fontSizes.lg,
        color: theme.colors.text,
        fontWeight: theme.typography.fontWeights.medium,
      }}>
        Loading Telecheck...
      </Text>
    </View>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [notificationListener, setNotificationListener] = useState<Notifications.Subscription>();
  const [responseListener, setResponseListener] = useState<Notifications.Subscription>();

  useEffect(() => {
    // Set status bar style
    StatusBar.setBarStyle('dark-content', true);
    
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

  if (!initialRoute) return <LoadingScreen />;

  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.surface,
          text: theme.colors.text,
          border: theme.colors.border,
          notification: theme.colors.error,
        },
      }}
    >
      <Stack.Navigator 
        initialRouteName={initialRoute}
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.surface,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.borderLight,
          },
          headerTintColor: theme.colors.primary,
          headerTitleStyle: {
            fontWeight: theme.typography.fontWeights.semibold,
            fontSize: theme.typography.fontSizes.lg,
            color: theme.colors.text,
          },
          headerBackTitleVisible: false,
          animation: 'slide_from_right',
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
          options={{ 
            title: 'RPM Setup',
            presentation: 'modal',
          }}
        />
        <Stack.Screen 
          name="RPMCalendar" 
          component={RPMCalendarScreen}
          options={{ title: 'Health Calendar' }}
        />
        <Stack.Screen 
          name="CCMOnboarding" 
          component={CCMOnboardingScreen}
          options={{ 
            title: 'Care Management',
            presentation: 'modal',
          }}
        />
        <Stack.Screen 
          name="CCMCarePlan" 
          component={CCMCarePlanScreen}
          options={{ title: 'Your Care Plan' }}
        />
        <Stack.Screen 
          name="ManualEntry" 
          component={ManualEntryScreen}
          options={{ 
            title: 'Record Vitals',
            presentation: 'modal',
          }}
        />
        <Stack.Screen 
          name="Education" 
          component={EducationScreen}
          options={{ title: 'Health Education' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}