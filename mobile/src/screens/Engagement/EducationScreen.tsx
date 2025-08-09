import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function EducationScreen() {
  return (
    <ScrollView style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:20, fontWeight:'600' }}>Education</Text>
      <Text>Provider-approved content and AI-personalized tips will be listed here.</Text>
    </ScrollView>
  );
}


