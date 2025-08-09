import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

export default function CCMOnboardingScreen() {
  const [condition, setCondition] = useState('hypertension');
  const [consented, setConsented] = useState(false);
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 8 }}>CCM Enrollment</Text>
      <TextInput value={condition} onChangeText={setCondition} style={{ borderWidth: 1, padding: 8, marginBottom: 12 }} />
      <Button title={consented ? 'Enrolled' : 'Consent & Enroll'} onPress={() => setConsented(true)} />
    </View>
  );
}


