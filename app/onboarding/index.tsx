import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Screen } from '@/components/Screen';
import { lightTap } from '@/lib/haptics';

export default function OnboardingName() {
  const [name, setName] = useState('');

  return (
    <Screen>
      <Text style={styles.emoji}>🐕</Text>
      <Text style={styles.title}>Welcome to Fitdog Adventure!</Text>
      <Text style={styles.sub}>Adopt your virtual pup and start exploring.</Text>
      <Text style={styles.label}>Name your dog</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Biscuit"
        value={name}
        onChangeText={setName}
        maxLength={20}
      />
      <Pressable
        style={styles.btn}
        onPress={() => {
          lightTap();
          router.push({ pathname: '/onboarding/style', params: { name: name.trim() || 'Buddy' } });
        }}>
        <Text style={styles.btnText}>Next</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  emoji: { fontSize: 64, textAlign: 'center', marginTop: 24 },
  title: { fontSize: 26, fontWeight: '800', color: '#FF8C42', textAlign: 'center', marginTop: 16 },
  sub: { fontSize: 15, color: '#666', textAlign: 'center', marginTop: 8, marginBottom: 32 },
  label: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 8 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  btn: {
    backgroundColor: '#FF8C42',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 17 },
});
