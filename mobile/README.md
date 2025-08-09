# Telecheck Mobile App

A comprehensive React Native healthcare mobile application for Remote Patient Monitoring (RPM) and Chronic Care Management (CCM).

## ⚠️ Important Notes

### Expo Go Limitations

Some features are not fully supported in Expo Go and require a development build:

- **Push Notifications**: expo-notifications functionality was removed from Expo Go with SDK 53. Use a development build for full push notification support.
- **Bluetooth Low Energy**: Some BLE functionality may not work properly in Expo Go.

For full functionality, create a development build:
```bash
npx expo run:ios
# or
npx expo run:android
```

Learn more: [Development Builds Introduction](https://docs.expo.dev/develop/development-builds/introduction/)

## 🏥 Features

### 📱 Core Functionality
- **Authentication** - Secure login/register with token-based auth
- **Health Dashboard** - Real-time health metrics and trends
- **Device Integration** - Bluetooth LE health device connectivity
- **Messaging** - Real-time communication with healthcare providers
- **RPM/CCM Programs** - Complete care management workflows
- **Charts & Analytics** - Victory Native data visualization
- **Push Notifications** - Real-time health alerts and reminders

### 🎨 Modern UI/UX
- **Design System** - Consistent colors, typography, and spacing
- **Animations** - Smooth React Native Reanimated transitions
- **Accessibility** - WCAG compliant with proper touch targets
- **Health-focused** - Medical iconography and color-coded metrics
- **Responsive** - Works across different screen sizes

### 🔗 Device Support
- Blood Pressure Monitors (systolic/diastolic + HR)
- Glucose Meters (blood sugar)
- Weight Scales (body weight)
- Heart Rate Monitors (pulse/BPM)
- Pulse Oximeters (SpO2 + HR)

## 🛠 Tech Stack

### Core
- **React Native** with Expo SDK 49
- **TypeScript** for type safety
- **React Navigation** 6 (Stack + Bottom Tabs)
- **React Native Reanimated** 3 for animations

### Health & Device Integration
- **react-native-ble-plx** - Bluetooth Low Energy
- **victory-native** - Charts and data visualization
- **expo-notifications** - Push notifications
- **expo-secure-store** - Secure token storage

### UI/UX
- **Custom Design System** - Comprehensive theme and components
- **React Native Safe Area Context** - Handle device variations
- **Gesture Handler** - Touch interactions

## 📁 Project Structure

```
mobile/
├── src/
│   ├── components/
│   │   └── ui/              # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Typography.tsx
│   │       ├── HealthMetricCard.tsx
│   │       ├── FadeInView.tsx
│   │       ├── SlideInCard.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── ProgressBar.tsx
│   │       └── PulseAnimation.tsx
│   ├── screens/
│   │   ├── Auth/             # Authentication screens
│   │   ├── Home/             # Dashboard
│   │   ├── RPM/              # Remote Patient Monitoring
│   │   ├── CCM/              # Chronic Care Management
│   │   ├── Devices/          # BLE device management
│   │   ├── Communication/    # Messaging
│   │   ├── Monitoring/       # Manual data entry
│   │   └── Engagement/       # Education content
│   ├── services/
│   │   ├── api.ts            # API client
│   │   ├── auth.service.ts   # Authentication
│   │   ├── ble.service.ts    # Bluetooth LE
│   │   ├── messaging.service.ts
│   │   ├── notifications.service.ts
│   │   ├── rpm.service.ts
│   │   └── ccm.service.ts
│   ├── theme/
│   │   └── index.ts          # Design system
│   └── i18n/                 # Internationalization
│       ├── index.ts
│       └── locales/
│           ├── en.json
│           └── es.json
├── App.tsx                   # Main app component
├── app.json                  # Expo configuration
└── package.json
```

## 🎨 Design System

### Colors
```typescript
primary: '#007AFF'      // iOS Blue
success: '#34C759'      // Health Green
warning: '#FF9500'      // Alert Orange
error: '#FF3B30'        // Critical Red
heartRate: '#FF3B30'    // Heart Rate Red
glucose: '#FF9500'      // Glucose Orange
weight: '#32D74B'       // Weight Green
```

### Typography
- **Heading1-4** - Semantic heading components
- **BodyText** - Standard text content
- **Caption** - Supporting text and metadata

### Components
- **Card** - Container with shadow and variants
- **Button** - Multiple variants with loading states
- **Input** - Advanced form input with validation
- **HealthMetricCard** - Health data display with trends

## 🔄 Navigation Structure

```
Stack Navigator (Auth Flow)
├── Login Screen
├── Register Screen
└── Main App (Bottom Tabs)
    ├── Home Tab → Home Dashboard
    ├── Trends Tab → Health Charts
    ├── Devices Tab → BLE Device Management
    └── Messages Tab → Healthcare Communication

Modal Screens:
├── RPM Onboarding
├── RPM Calendar
├── CCM Onboarding
├── CCM Care Plan
├── Manual Entry
└── Education Content
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Expo CLI
- iOS Simulator / Android Emulator

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Development Scripts
```bash
npm start       # Start Expo development server
npm run ios     # Run on iOS simulator
npm run android # Run on Android emulator
npm run web     # Run in web browser
```

## 🔐 Authentication Flow

1. **Login/Register** - Token-based authentication
2. **Secure Storage** - Tokens stored in expo-secure-store
3. **Auth Guard** - Automatic routing based on auth state
4. **Push Token Registration** - Device registration for notifications

## 📊 Health Data Flow

1. **Device Pairing** - Bluetooth LE device discovery and connection
2. **Real-time Monitoring** - Automatic data collection from connected devices
3. **Data Visualization** - Charts and trends using Victory Native
4. **Backend Sync** - Automatic sync with RPM/CCM backend APIs
5. **Alerts & Notifications** - Threshold-based health alerts

## 🌍 Internationalization

Supports English and Spanish with easy extensibility:
```typescript
// Usage
const { t } = useTranslation();
<Text>{t('home.welcome')}</Text>
```

## 🔔 Push Notifications

- **Setup** - Automatic permission request and token registration
- **Health Alerts** - Critical value notifications
- **Medication Reminders** - Scheduled medication alerts
- **Provider Messages** - Real-time communication notifications

## 🎭 Animations

Powered by React Native Reanimated 3:
- **FadeInView** - Smooth fade in with directional slide
- **SlideInCard** - Staggered card animations
- **LoadingSpinner** - Rotating progress indicators
- **PulseAnimation** - Attention-grabbing pulse effects
- **ProgressBar** - Animated progress with easing

## 🏗 Architecture Patterns

### Component Structure
- **Atomic Design** - Reusable UI components
- **Container/Presenter** - Separation of logic and UI
- **Custom Hooks** - Shared logic extraction

### State Management
- **React Hooks** - Local component state
- **Context API** - Global auth and theme state
- **Service Layer** - API and business logic

### Type Safety
- **TypeScript** throughout the application
- **Shared Types** - Common interfaces with backend
- **Strict Mode** - Enhanced type checking

## 📱 Device Compatibility

### iOS
- iOS 13.0+
- iPhone and iPad support
- Health app integration ready

### Android
- API Level 21+ (Android 5.0)
- Bluetooth LE permissions
- Material Design compliance

## 🔒 Security

- **Secure Token Storage** - expo-secure-store encryption
- **HTTPS Only** - All API communications secured
- **Input Validation** - Client-side form validation
- **Health Data Compliance** - HIPAA-ready architecture

## 📈 Performance

- **Optimized Renders** - React.memo and useMemo usage
- **Lazy Loading** - Screen-based code splitting
- **Image Optimization** - Expo image caching
- **Animation Performance** - Native driver usage

## 🧪 Testing Strategy

### Unit Testing
- Component testing with React Native Testing Library
- Service layer testing
- Utility function testing

### Integration Testing
- API integration tests
- Authentication flow tests
- Navigation tests

### E2E Testing
- Critical user journey testing
- Device interaction testing
- Cross-platform compatibility

## 🚀 Deployment

### Development
```bash
expo start
```

### Production Build
```bash
# iOS
expo build:ios

# Android
expo build:android
```

### OTA Updates
```bash
expo publish
```

## 📋 Roadmap

### Phase 1 ✅
- Basic app structure and navigation
- Authentication flow
- Core UI components
- BLE device integration

### Phase 2 ✅
- Health data visualization
- Push notifications
- Messaging system
- Animation system

### Phase 3 (Next)
- Advanced analytics
- Machine learning insights
- Telemedicine integration
- Wearable device support

### Phase 4 (Future)
- AI health assistant
- Social features
- Care team collaboration
- Advanced reporting

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Follow TypeScript and ESLint rules
4. Add tests for new features
5. Submit pull request

## 📄 License

Private healthcare application - All rights reserved.

## 🔗 Related Projects

- **Backend API** - `/server` directory
- **Web Dashboard** - `/client` directory
- **Shared Types** - `/shared` directory

---

Built with ❤️ for healthcare innovation
