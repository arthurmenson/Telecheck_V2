import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function ManualEntryScreen() {
  const [bpSys, setBpSys] = useState('');
  const [bpDia, setBpDia] = useState('');
  const [glucose, setGlucose] = useState('');
  const [weight, setWeight] = useState('');
  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:20, fontWeight:'600' }}>Manual Vitals Entry</Text>
      <Text>BP Systolic</Text>
      <TextInput keyboardType='numeric' value={bpSys} onChangeText={setBpSys} style={{ borderWidth:1, padding:8, marginBottom:8 }} />
      <Text>BP Diastolic</Text>
      <TextInput keyboardType='numeric' value={bpDia} onChangeText={setBpDia} style={{ borderWidth:1, padding:8, marginBottom:8 }} />
      <Text>Glucose</Text>
      <TextInput keyboardType='numeric' value={glucose} onChangeText={setGlucose} style={{ borderWidth:1, padding:8, marginBottom:8 }} />
      <Text>Weight</Text>
      <TextInput keyboardType='numeric' value={weight} onChangeText={setWeight} style={{ borderWidth:1, padding:8, marginBottom:12 }} />
      <Button title='Submit' onPress={()=>{}} />
    </View>
  );
}


