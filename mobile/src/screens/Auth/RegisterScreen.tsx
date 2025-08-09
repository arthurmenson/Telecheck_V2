import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:22, fontWeight:'700', marginBottom:12 }}>Register</Text>
      <Text>Name</Text>
      <TextInput value={name} onChangeText={setName} style={{ borderWidth:1, padding:8, marginBottom:8 }} />
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize='none' style={{ borderWidth:1, padding:8, marginBottom:8 }} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth:1, padding:8, marginBottom:12 }} />
      <Button title='Create Account' onPress={()=>navigation.replace('Home')} />
    </View>
  );
}


