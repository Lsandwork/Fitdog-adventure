import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/Screen';
import { MAP_LOCATIONS } from '@/lib/constants';
import { lightTap } from '@/lib/haptics';
import { useGameStore } from '@/lib/store';

export default function MapScreen() {
  const level = useGameStore((s) => s.level);
  const visited = useGameStore((s) => s.visitedLocations);
  const playStyle = useGameStore((s) => s.playStyle);

  return (
    <Screen>
      <Text style={styles.title}>Adventure Map</Text>
      <Text style={styles.sub}>
        {playStyle === 'explorer' ? '🗺️ Explorer bonus active on visits!' : 'Unlock new worlds as you level up.'}
      </Text>
      {MAP_LOCATIONS.map((loc) => {
        const unlocked = level >= loc.unlockLevel;
        const visitedFlag = visited.includes(loc.id);
        return (
          <Pressable
            key={loc.id}
            style={[styles.card, !unlocked && styles.locked]}
            disabled={!unlocked}
            onPress={() => {
              lightTap();
              router.push(`/location/${loc.id}`);
            }}>
            <Text style={styles.emoji}>{unlocked ? loc.emoji : '🔒'}</Text>
            <View style={styles.info}>
              <Text style={styles.name}>{loc.name}</Text>
              <Text style={styles.desc}>
                {unlocked ? loc.description : `Unlock at level ${loc.unlockLevel}`}
              </Text>
              {visitedFlag && <Text style={styles.visited}>✓ Visited</Text>}
            </View>
          </Pressable>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '800', color: '#333', marginBottom: 4 },
  sub: { fontSize: 13, color: '#888', marginBottom: 16 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
  },
  locked: { opacity: 0.55 },
  emoji: { fontSize: 36, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '700', color: '#222' },
  desc: { fontSize: 13, color: '#666', marginTop: 4 },
  visited: { fontSize: 12, color: '#4ECDC4', fontWeight: '600', marginTop: 4 },
});
