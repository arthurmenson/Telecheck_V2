import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Alert,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { 
  Heading1, 
  Heading3, 
  BodyText, 
  Caption 
} from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { FadeInView } from '../../components/ui/FadeInView';
import { SlideInCard } from '../../components/ui/SlideInCard';

export default function ManualEntryScreen({ navigation }: any) {
  const [vitals, setVitals] = useState({
    systolic: '',
    diastolic: '',
    heartRate: '',
    weight: '',
    temperature: '',
    oxygenSaturation: '',
  });
  
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const vitalTypes = [
    {
      key: 'bloodPressure',
      title: 'Blood Pressure',
      icon: '🩺',
      color: theme.colors.bloodPressure,
      fields: [
        { key: 'systolic', label: 'Systolic', unit: 'mmHg', placeholder: '120' },
        { key: 'diastolic', label: 'Diastolic', unit: 'mmHg', placeholder: '80' },
      ]
    },
    {
      key: 'heartRate',
      title: 'Heart Rate',
      icon: '❤️',
      color: theme.colors.heartRate,
      fields: [
        { key: 'heartRate', label: 'Heart Rate', unit: 'bpm', placeholder: '72' },
      ]
    },
    {
      key: 'weight',
      title: 'Weight',
      icon: '⚖️',
      color: theme.colors.weight,
      fields: [
        { key: 'weight', label: 'Weight', unit: 'lbs', placeholder: '150' },
      ]
    },
    {
      key: 'temperature',
      title: 'Temperature',
      icon: '🌡️',
      color: theme.colors.temperature,
      fields: [
        { key: 'temperature', label: 'Temperature', unit: '°F', placeholder: '98.6' },
      ]
    },
    {
      key: 'oxygenSaturation',
      title: 'Oxygen Saturation',
      icon: '🫁',
      color: theme.colors.oxygen,
      fields: [
        { key: 'oxygenSaturation', label: 'SpO2', unit: '%', placeholder: '98' },
      ]
    },
  ];

  const validateVitals = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Blood pressure validation
    if (vitals.systolic && vitals.diastolic) {
      const sys = parseInt(vitals.systolic);
      const dia = parseInt(vitals.diastolic);
      
      if (sys < 70 || sys > 250) {
        newErrors.systolic = 'Systolic should be between 70-250 mmHg';
      }
      if (dia < 40 || dia > 150) {
        newErrors.diastolic = 'Diastolic should be between 40-150 mmHg';
      }
      if (sys <= dia) {
        newErrors.systolic = 'Systolic should be higher than diastolic';
      }
    }
    
    // Heart rate validation
    if (vitals.heartRate) {
      const hr = parseInt(vitals.heartRate);
      if (hr < 30 || hr > 220) {
        newErrors.heartRate = 'Heart rate should be between 30-220 bpm';
      }
    }
    
    // Weight validation
    if (vitals.weight) {
      const weight = parseFloat(vitals.weight);
      if (weight < 50 || weight > 800) {
        newErrors.weight = 'Weight should be between 50-800 lbs';
      }
    }
    
    // Temperature validation
    if (vitals.temperature) {
      const temp = parseFloat(vitals.temperature);
      if (temp < 90 || temp > 110) {
        newErrors.temperature = 'Temperature should be between 90-110°F';
      }
    }
    
    // Oxygen saturation validation
    if (vitals.oxygenSaturation) {
      const spo2 = parseInt(vitals.oxygenSaturation);
      if (spo2 < 70 || spo2 > 100) {
        newErrors.oxygenSaturation = 'SpO2 should be between 70-100%';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateVital = (key: string, value: string) => {
    setVitals(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
  };

  const hasAnyVitals = () => {
    return Object.values(vitals).some(value => value.trim() !== '');
  };

  const handleSubmit = async () => {
    if (!hasAnyVitals()) {
      Alert.alert('No Data', 'Please enter at least one vital sign measurement.');
      return;
    }
    
    if (!validateVitals()) {
      Alert.alert('Invalid Data', 'Please check your entries and try again.');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Success!', 
        'Your vital signs have been recorded successfully.',
        [
          { 
            text: 'View Trends', 
            onPress: () => navigation.navigate('TrendsTab') 
          },
          { 
            text: 'Done', 
            onPress: () => navigation.goBack() 
          }
        ]
      );
    }, 1500);
  };

  const clearAll = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to clear all entered data?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => {
            setVitals({
              systolic: '',
              diastolic: '',
              heartRate: '',
              weight: '',
              temperature: '',
              oxygenSaturation: '',
            });
            setNotes('');
            setErrors({});
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <FadeInView delay={100} direction="down">
            <View style={styles.header}>
              <Heading1>Record Vitals</Heading1>
              <BodyText color={theme.colors.textSecondary} style={styles.subtitle}>
                Enter your health measurements manually
              </BodyText>
            </View>
          </FadeInView>

          {/* Vital Signs Cards */}
          {vitalTypes.map((vitalType, index) => (
            <FadeInView key={vitalType.key} delay={300 + index * 100} direction="up">
              <View style={styles.section}>
                <SlideInCard delay={400 + index * 100} direction="left">
                  <View style={styles.vitalCard}>
                    <View style={styles.vitalHeader}>
                      <View style={[styles.vitalIcon, { backgroundColor: `${vitalType.color}15` }]}>
                        <BodyText>{vitalType.icon}</BodyText>
                      </View>
                      <Heading3 color={vitalType.color}>
                        {vitalType.title}
                      </Heading3>
                    </View>
                    
                    <View style={styles.vitalFields}>
                      {vitalType.fields.map((field) => (
                        <Input
                          key={field.key}
                          label={`${field.label} (${field.unit})`}
                          placeholder={field.placeholder}
                          value={vitals[field.key as keyof typeof vitals]}
                          onChangeText={(value) => updateVital(field.key, value)}
                          keyboardType="numeric"
                          error={errors[field.key]}
                          containerStyle={styles.inputContainer}
                        />
                      ))}
                    </View>
                  </View>
                </SlideInCard>
              </View>
            </FadeInView>
          ))}

          {/* Notes Section */}
          <FadeInView delay={800} direction="up">
            <View style={styles.section}>
              <SlideInCard delay={900} direction="left">
                <View style={styles.notesCard}>
                  <Heading3 style={styles.notesTitle}>Additional Notes</Heading3>
                  <Input
                    placeholder="Any symptoms, medications taken, or other relevant information..."
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                    numberOfLines={4}
                    containerStyle={styles.notesInput}
                  />
                </View>
              </SlideInCard>
            </View>
          </FadeInView>

          {/* Action Buttons */}
          <FadeInView delay={1000} direction="up">
            <View style={[styles.section, styles.lastSection]}>
              <View style={styles.buttonContainer}>
                <Button
                  title="Clear All"
                  variant="outline"
                  onPress={clearAll}
                  style={styles.clearButton}
                />
                <Button
                  title="Save Vitals"
                  onPress={handleSubmit}
                  loading={loading}
                  style={styles.saveButton}
                />
              </View>
            </View>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.base,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.base,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  section: {
    marginBottom: theme.spacing.base,
    paddingHorizontal: theme.spacing.base,
  },
  lastSection: {
    marginBottom: theme.spacing['2xl'],
  },
  vitalCard: {
    padding: theme.spacing.base,
  },
  vitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.base,
  },
  vitalIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  vitalFields: {
    gap: theme.spacing.sm,
  },
  inputContainer: {
    marginBottom: 0,
  },
  notesCard: {
    padding: theme.spacing.base,
  },
  notesTitle: {
    marginBottom: theme.spacing.base,
  },
  notesInput: {
    marginBottom: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  clearButton: {
    flex: 1,
  },
  saveButton: {
    flex: 2,
  },
});