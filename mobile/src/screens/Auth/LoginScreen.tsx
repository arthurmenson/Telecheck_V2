import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { StatusBar } from '../../components/ui/StatusBar';
import { Heading1, Heading3, BodyText, Caption } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { FadeInView } from '../../components/ui/FadeInView';

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
      Alert.alert('Welcome Back!', 'Login successful', [
        { text: 'Continue', onPress: () => navigation.replace('Home') }
      ]);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor={theme.colors.background} />
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <FadeInView delay={200} direction="down">
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <View style={styles.logo}>
                  <Heading1 color={theme.colors.primary}>🏥</Heading1>
                </View>
                <View style={styles.logoBg} />
              </View>
              <Heading1 style={styles.title}>Welcome Back</Heading1>
              <BodyText color={theme.colors.textSecondary} style={styles.subtitle}>
                Sign in to continue your health journey
              </BodyText>
            </View>
          </FadeInView>

          <FadeInView delay={400} direction="up">
            <View style={styles.form}>
              <Input
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors({...errors, email: undefined});
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={errors.email}
                leftIcon={
                  <View style={styles.inputIcon}>
                    <BodyText color={theme.colors.textSecondary}>📧</BodyText>
                  </View>
                }
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
                leftIcon={
                  <View style={styles.inputIcon}>
                    <BodyText color={theme.colors.textSecondary}>🔒</BodyText>
                  </View>
                }
              />

              <Button
                title="Sign In"
                onPress={handleLogin}
                loading={loading}
                fullWidth
                style={styles.loginButton}
              />

              <Button
                title="Forgot Password?"
                variant="ghost"
                onPress={() => Alert.alert('Coming Soon', 'Password reset feature coming soon!')}
                style={styles.forgotButton}
              />
            </View>
          </FadeInView>

          <FadeInView delay={600} direction="up">
            <View style={styles.footer}>
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Caption color={theme.colors.textTertiary} style={styles.dividerText}>
                  or
                </Caption>
                <View style={styles.dividerLine} />
              </View>

              <Button
                title="Create New Account"
                variant="outline"
                onPress={() => navigation.navigate('Register')}
                fullWidth
                style={styles.registerButton}
              />
            </View>
          </FadeInView>

          <FadeInView delay={800} direction="up">
            <Caption color={theme.colors.textTertiary} style={styles.disclaimer}>
              By signing in, you agree to our{' '}
              <Caption color={theme.colors.primary}>Terms of Service</Caption>
              {' '}and{' '}
              <Caption color={theme.colors.primary}>Privacy Policy</Caption>
            </Caption>
          </FadeInView>
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
    position: 'relative',
    marginBottom: theme.spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    ...theme.shadows.lg,
  },
  logoBg: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: `${theme.colors.primary}20`,
    zIndex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.base,
  },
  form: {
    marginBottom: theme.spacing['2xl'],
  },
  inputIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.base,
  },
  forgotButton: {
    alignSelf: 'center',
  },
  footer: {
    marginBottom: theme.spacing.xl,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    marginHorizontal: theme.spacing.base,
  },
  registerButton: {
    borderColor: theme.colors.border,
  },
  disclaimer: {
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.sm,
    paddingHorizontal: theme.spacing.lg,
  },
});