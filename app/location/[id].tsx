import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DogAvatar } from '@/components/DogAvatar';
import { Screen } from '@/components/Screen';
import { MAP_LOCATIONS, levelFromXp } from '@/lib/constants';
import { useGameStore } from '@/lib/store';

export default function LocationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const location = MAP_LOCATIONS.find((l) => l.id === id);
  const visitLocation = useGameStore((s) => s.visitLocation);
  const playStyle = useGameStore((s) => s.playStyle);

  useEffect(() => {
    if (id) {
      visitLocation(id);
      if (playStyle === 'explorer') {
        const { xp } = useGameStore.getState();
        const newXp = xp + 5;
        useGameStore.setState({ xp: newXp, level: levelFromXp(newXp) });
      }
    }
  }, [id, visitLocation, playStyle]);

  if (!location) {
    return (
      <View style={styles.center}>
        <Text>Location not found</Text>
      </View>
    );
  }

  return (
    <Screen>
      <Text style={styles.emoji}>{location.emoji}</Text>
      <Text style={styles.title}>{location.name}</Text>
      <DogAvatar size={100} />
      <Text style={styles.desc}>{location.description}</Text>
      {playStyle === 'explorer' && (
        <Text style={styles.bonus}>+5 XP explorer bonus for visiting!</Text>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emoji: { fontSize: 56, textAlign: 'center' },
  title: { fontSize: 24, fontWeight: '800', textAlign: 'center', marginVertical: 12, color: '#333' },
  desc: { fontSize: 15, color: '#555', lineHeight: 22, marginTop: 16, textAlign: 'center' },
  bonus: { marginTop: 16, color: '#4ECDC4', fontWeight: '600', textAlign: 'center' },
});
