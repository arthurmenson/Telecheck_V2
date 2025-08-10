import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from './AuthContext';
import { theme } from '../../theme';
import { StatusBar } from '../../components/ui/StatusBar';
import { Heading1, BodyText, Caption } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { FadeInView } from '../../components/ui/FadeInView';

export default function RegisterScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { register, isLoading } = useAuth();
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    const success = await register(formData.firstName + ' ' + formData.lastName, formData.email, formData.password);
    if (success) {
      navigation.replace('Home');
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
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
              <Heading1 style={styles.title}>Create Account</Heading1>
              <BodyText color={theme.colors.textSecondary} style={styles.subtitle}>
                Join thousands taking control of their health
              </BodyText>
            </View>
          </FadeInView>

          <FadeInView delay={400} direction="up">
            <View style={styles.form}>
              <View style={styles.nameRow}>
                <Input
                  label="First Name"
                  placeholder="First name"
                  value={formData.firstName}
                  onChangeText={(text) => updateField('firstName', text)}
                  autoCapitalize="words"
                  error={errors.firstName}
                  containerStyle={styles.nameInput}
                />
                <Input
                  label="Last Name"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChangeText={(text) => updateField('lastName', text)}
                  autoCapitalize="words"
                  error={errors.lastName}
                  containerStyle={styles.nameInput}
                />
              </View>

              <Input
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(text) => updateField('email', text)}
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
                placeholder="Create a password"
                value={formData.password}
                onChangeText={(text) => updateField('password', text)}
                isPassword
                error={errors.password}
                hint="Must be 8+ characters with uppercase, lowercase, and number"
                leftIcon={
                  <View style={styles.inputIcon}>
                    <BodyText color={theme.colors.textSecondary}>🔒</BodyText>
                  </View>
                }
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(text) => updateField('confirmPassword', text)}
                isPassword
                error={errors.confirmPassword}
                leftIcon={
                  <View style={styles.inputIcon}>
                    <BodyText color={theme.colors.textSecondary}>🔒</BodyText>
                  </View>
                }
              />

              <Button
                title="Create Account"
                onPress={handleRegister}
                loading={isLoading}
                fullWidth
                style={styles.registerButton}
              />
            </View>
          </FadeInView>

          <FadeInView delay={600} direction="up">
            <View style={styles.footer}>
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Caption color={theme.colors.textTertiary} style={styles.dividerText}>
                  Already have an account?
                </Caption>
                <View style={styles.dividerLine} />
              </View>

              <Button
                title="Sign In Instead"
                variant="ghost"
                onPress={() => navigation.navigate('Login')}
                style={styles.loginButton}
              />
            </View>
          </FadeInView>

          <FadeInView delay={800} direction="up">
            <Caption color={theme.colors.textTertiary} style={styles.disclaimer}>
              By creating an account, you agree to our{' '}
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
  nameRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  nameInput: {
    flex: 1,
  },
  inputIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButton: {
    marginTop: theme.spacing.lg,
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
  loginButton: {
    alignSelf: 'center',
  },
  disclaimer: {
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.sm,
    paddingHorizontal: theme.spacing.lg,
  },
});