import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DogAvatar } from '@/components/DogAvatar';
import { Screen } from '@/components/Screen';
import { MAP_LOCATIONS, levelFromXp } from '@/lib/constants';
import { lightTap, successTap } from '@/lib/haptics';
import { useGameStore } from '@/lib/store';

const LOCATION_ACTIVITIES: Record<string, { label: string; emoji: string; reaction: string }[]> = {
  backyard: [
    { label: 'Sniff flowers', emoji: '🌼', reaction: 'Found a sunny patch!' },
    { label: 'Practice fetch', emoji: '🎾', reaction: 'Perfect catch!' },
  ],
  park: [
    { label: 'Meet pups', emoji: '🐾', reaction: 'Made a new friend!' },
    { label: 'Chase squirrels', emoji: '🐿️', reaction: 'So fast!' },
  ],
  beach: [
    { label: 'Splash waves', emoji: '🌊', reaction: 'Sandy paws!' },
    { label: 'Recall drill', emoji: '📣', reaction: 'Came right back!' },
  ],
  mountain: [
    { label: 'Scout trail', emoji: '🥾', reaction: 'Trail marked!' },
    { label: 'Lookout photo', emoji: '📸', reaction: 'What a view!' },
  ],
  downtown: [
    { label: 'Daycare hello', emoji: '🏫', reaction: 'Tail wags everywhere!' },
    { label: 'Agility cones', emoji: '🚧', reaction: 'Clean run!' },
  ],
};

export default function LocationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const location = MAP_LOCATIONS.find((l) => l.id === id);
  const visitLocation = useGameStore((s) => s.visitLocation);
  const playStyle = useGameStore((s) => s.playStyle);
  const visited = useGameStore((s) => s.visitedLocations);
  const [reaction, setReaction] = useState('Tap an activity to explore.');
  const awardedVisit = useRef(false);

  useEffect(() => {
    const wasVisited = id ? visited.includes(id) : true;
    if (id && !awardedVisit.current) {
      visitLocation(id);
      if (playStyle === 'explorer' && !wasVisited) {
        const { xp } = useGameStore.getState();
        const newXp = xp + 5;
        useGameStore.setState({ xp: newXp, level: levelFromXp(newXp) });
      }
      awardedVisit.current = true;
    }
  }, [id, visitLocation, playStyle, visited]);

  if (!location) {
    return (
      <View style={styles.center}>
        <Text>Location not found</Text>
      </View>
    );
  }

  return (
    <Screen>
      <View style={styles.scene}>
        <Text style={styles.emoji}>{location.emoji}</Text>
        <DogAvatar size={136} mood="curious" />
        <View style={styles.reactionBubble}>
          <Text style={styles.reaction}>{reaction}</Text>
        </View>
      </View>
      <Text style={styles.title}>{location.name}</Text>
      <Text style={styles.desc}>{location.description}</Text>
      {playStyle === 'explorer' && (
        <Text style={styles.bonus}>+5 XP explorer bonus for visiting!</Text>
      )}

      <Text style={styles.sectionTitle}>Explore here</Text>
      <View style={styles.activities}>
        {(LOCATION_ACTIVITIES[location.id] ?? []).map((activity) => (
          <Pressable
            key={activity.label}
            style={styles.activity}
            onPress={() => {
              lightTap();
              successTap();
              setReaction(activity.reaction);
            }}>
            <Text style={styles.activityEmoji}>{activity.emoji}</Text>
            <Text style={styles.activityText}>{activity.label}</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scene: {
    minHeight: 220,
    borderRadius: 26,
    backgroundColor: '#DDF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  emoji: { fontSize: 56, textAlign: 'center' },
  title: { fontSize: 24, fontWeight: '800', textAlign: 'center', marginVertical: 12, color: '#333' },
  desc: { fontSize: 15, color: '#555', lineHeight: 22, marginTop: 16, textAlign: 'center' },
  bonus: { marginTop: 16, color: '#4ECDC4', fontWeight: '600', textAlign: 'center' },
  reactionBubble: {
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#BCE7F7',
  },
  reaction: { color: '#3A2A1A', fontWeight: '700' },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#444', marginTop: 24, marginBottom: 10 },
  activities: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  activity: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0E6D8',
  },
  activityEmoji: { fontSize: 28 },
  activityText: { color: '#333', fontWeight: '700', marginTop: 6, textAlign: 'center' },
});
