import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/Screen';
import { DOG_STYLES } from '@/lib/constants';
import { lightTap } from '@/lib/haptics';
import type { DogStyle } from '@/lib/types';

export default function OnboardingStyle() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [selected, setSelected] = useState<DogStyle>('sporty');

  return (
    <Screen>
      <Text style={styles.title}>Pick a style for {name}</Text>
      <View style={styles.grid}>
        {DOG_STYLES.map((s) => (
          <Pressable
            key={s.id}
            style={[styles.card, selected === s.id && { borderColor: s.color, borderWidth: 3 }]}
            onPress={() => {
              lightTap();
              setSelected(s.id);
            }}>
            <Text style={styles.emoji}>{s.emoji}</Text>
            <Text style={styles.label}>{s.label}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable
        style={styles.btn}
        onPress={() => {
          lightTap();
          router.push({ pathname: '/onboarding/play-style', params: { name, style: selected } });
        }}>
        <Text style={styles.btnText}>Next</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: '#333', marginBottom: 20 },
  grid: { gap: 12 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  emoji: { fontSize: 40 },
  label: { fontSize: 16, fontWeight: '700', marginTop: 8, color: '#333' },
  btn: {
    backgroundColor: '#FF8C42',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 17 },
});
