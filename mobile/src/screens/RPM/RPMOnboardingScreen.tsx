import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function RPMOnboardingScreen() {
  const [deviceType, setDeviceType] = useState('BP');
  const [consented, setConsented] = useState(false);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 8 }}>RPM Onboarding</Text>
      <Text style={{ marginBottom: 8 }}>Select device type:</Text>
      <TextInput value={deviceType} onChangeText={setDeviceType} style={{ borderWidth: 1, padding: 8, marginBottom: 12 }} />
      <Button title={consented ? 'Consented' : 'Consent to Program'} onPress={() => setConsented(true)} />
    </View>
  );
}


