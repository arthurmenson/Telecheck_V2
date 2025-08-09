import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { StatusBar } from '../../components/ui/StatusBar';
import { Heading1, BodyText, Caption } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';


export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  
  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Login Success', 'Welcome back!', [
        { text: 'OK', onPress: () => navigation.replace('Home') }
      ]);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Heading1 color={theme.colors.primary}>🏥</Heading1>
            </View>
            <Heading1 style={styles.title}>Welcome</Heading1>
            <BodyText color={theme.colors.textSecondary} style={styles.subtitle}>
              Sign in to continue to Telecheck
            </BodyText>
          </View>

          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({...errors, email: undefined});
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              error={errors.email}
              leftIcon={<BodyText>📧</BodyText>}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({...errors, password: undefined});
              }}
              isPassword
              error={errors.password}
              leftIcon={<BodyText>🔒</BodyText>}
            />

            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />

            <Button
              title="Forgot Password?"
              variant="ghost"
              onPress={() => Alert.alert('Coming Soon', 'Password reset feature coming soon!')}
              style={styles.forgotButton}
            />
          </View>

          <View style={styles.footer}>
            <BodyText color={theme.colors.textSecondary} style={styles.footerText}>
              Don't have an account?{' '}
            </BodyText>
            <Button
              title="Create Account"
              variant="ghost"
              onPress={() => navigation.navigate('Register')}
              style={styles.registerButton}
            />
          </View>

          <Caption color={theme.colors.textTertiary} style={styles.disclaimer}>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </Caption>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing['2xl'],
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing['3xl'],
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: `${theme.colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.relaxed,
  },
  form: {
    marginBottom: theme.spacing['2xl'],
  },
  loginButton: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.base,
  },
  forgotButton: {
    alignSelf: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  footerText: {
    textAlign: 'center',
  },
  registerButton: {
    paddingHorizontal: 0,
    height: 'auto' as any,
  },
  disclaimer: {
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.relaxed,
    paddingHorizontal: theme.spacing.lg,
  },
});


