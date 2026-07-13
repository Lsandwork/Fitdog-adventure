import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/Screen';
import { PLAY_STYLES } from '@/lib/constants';
import { lightTap, successTap } from '@/lib/haptics';
import { useGameStore } from '@/lib/store';
import type { DogStyle, PlayStyle } from '@/lib/types';

export default function OnboardingPlayStyle() {
  const { name, style } = useLocalSearchParams<{ name: string; style: string }>();
  const [selected, setSelected] = useState<PlayStyle>('explorer');
  const completeOnboarding = useGameStore((s) => s.completeOnboarding);

  return (
    <Screen>
      <Text style={styles.title}>How does {name} like to play?</Text>
      <View style={styles.grid}>
        {PLAY_STYLES.map((p) => (
          <Pressable
            key={p.id}
            style={[styles.card, selected === p.id && styles.selected]}
            onPress={() => {
              lightTap();
              setSelected(p.id);
            }}>
            <Text style={styles.emoji}>{p.emoji}</Text>
            <Text style={styles.label}>{p.label}</Text>
            <Text style={styles.bonus}>{p.bonus}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable
        style={styles.btn}
        onPress={() => {
          successTap();
          completeOnboarding(name, style as DogStyle, selected);
          router.replace('/(tabs)');
        }}>
        <Text style={styles.btnText}>Start Adventure!</Text>
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
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  selected: { borderColor: '#4ECDC4', borderWidth: 3 },
  emoji: { fontSize: 32 },
  label: { fontSize: 16, fontWeight: '700', marginTop: 6, color: '#333' },
  bonus: { fontSize: 12, color: '#888', marginTop: 4 },
  btn: {
    backgroundColor: '#4ECDC4',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 17 },
});
