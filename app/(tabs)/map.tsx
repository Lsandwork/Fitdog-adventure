import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { DogAvatar } from '@/components/DogAvatar';
import { Screen } from '@/components/Screen';
import { MAP_LOCATIONS } from '@/lib/constants';
import { errorTap, lightTap } from '@/lib/haptics';
import { useGameStore } from '@/lib/store';
import type { MapLocation } from '@/lib/types';

const MAP_POINTS: Record<string, { x: number; y: number; terrain: string; color: string }> = {
  backyard: { x: 18, y: 78, terrain: 'Home base', color: '#7BD389' },
  park: { x: 34, y: 54, terrain: 'Grasslands', color: '#4ECDC4' },
  beach: { x: 58, y: 68, terrain: 'Coast', color: '#5DADEC' },
  mountain: { x: 72, y: 36, terrain: 'Trail', color: '#C68E5C' },
  downtown: { x: 86, y: 20, terrain: 'City', color: '#9B5DE5' },
};

function trailPath() {
  const ordered = MAP_LOCATIONS.map((loc) => MAP_POINTS[loc.id]);
  return ordered.reduce((path, point, index) => {
    const command = index === 0 ? 'M' : 'L';
    return `${path} ${command}${point.x} ${point.y}`;
  }, '');
}

export default function MapScreen() {
  const level = useGameStore((s) => s.level);
  const visited = useGameStore((s) => s.visitedLocations);
  const playStyle = useGameStore((s) => s.playStyle);
  const [selectedId, setSelectedId] = useState(() => {
    const firstUnvisited = MAP_LOCATIONS.find((loc) => level >= loc.unlockLevel && !visited.includes(loc.id));
    return firstUnvisited?.id ?? visited[visited.length - 1] ?? 'backyard';
  });

  const selected = MAP_LOCATIONS.find((loc) => loc.id === selectedId) ?? MAP_LOCATIONS[0];
  const selectedUnlocked = level >= selected.unlockLevel;
  const selectedVisited = visited.includes(selected.id);
  const progress = Math.round((visited.length / MAP_LOCATIONS.length) * 100);
  const nextStop = useMemo(
    () => MAP_LOCATIONS.find((loc) => level >= loc.unlockLevel && !visited.includes(loc.id)) ?? MAP_LOCATIONS.find((loc) => level < loc.unlockLevel),
    [level, visited]
  );

  const selectLocation = (loc: MapLocation) => {
    const unlocked = level >= loc.unlockLevel;
    setSelectedId(loc.id);
    if (unlocked) {
      lightTap();
    } else {
      errorTap();
    }
  };

  return (
    <Screen>
      <Text style={styles.title}>Adventure Map</Text>
      <Text style={styles.sub}>
        {playStyle === 'explorer' ? '🗺️ Explorer bonus active on visits!' : 'Unlock new worlds as you level up.'}
      </Text>

      <View style={styles.progressCard}>
        <View style={styles.progressTop}>
          <Text style={styles.progressLabel}>World progress</Text>
          <Text style={styles.progressValue}>{visited.length}/{MAP_LOCATIONS.length} visited</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <View style={styles.mapCard}>
        <View style={styles.mapBackdrop}>
          <Text style={styles.sun}>☀️</Text>
          <Text style={styles.cloudOne}>☁️</Text>
          <Text style={styles.cloudTwo}>☁️</Text>
          <Text style={styles.wave}>〰️〰️</Text>
          <Svg width="100%" height="100%" viewBox="0 0 100 100" style={styles.trailSvg}>
            <Path d={trailPath()} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity="0.82" />
            <Path d={trailPath()} stroke="#FF8C42" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 3" />
            {MAP_LOCATIONS.map((loc) => {
              const p = MAP_POINTS[loc.id];
              const unlocked = level >= loc.unlockLevel;
              const isVisited = visited.includes(loc.id);
              return (
                <Circle
                  key={loc.id}
                  cx={p.x}
                  cy={p.y}
                  r={isVisited ? 4.6 : 3.8}
                  fill={unlocked ? p.color : '#A9A9A9'}
                  stroke="#fff"
                  strokeWidth="1.4"
                />
              );
            })}
          </Svg>

          {MAP_LOCATIONS.map((loc) => {
            const p = MAP_POINTS[loc.id];
            const unlocked = level >= loc.unlockLevel;
            const isSelected = selectedId === loc.id;
            const isVisited = visited.includes(loc.id);
            return (
              <Pressable
                key={loc.id}
                accessibilityRole="button"
                accessibilityLabel={`${loc.name} map pin`}
                style={[
                  styles.pin,
                  { left: `${p.x - 6}%`, top: `${p.y - 7}%` },
                  isSelected && styles.pinSelected,
                  !unlocked && styles.pinLocked,
                ]}
                onPress={() => selectLocation(loc)}>
                <Text style={styles.pinEmoji}>{unlocked ? loc.emoji : '🔒'}</Text>
                {isVisited && <Text style={styles.pinCheck}>✓</Text>}
              </Pressable>
            );
          })}

          <View style={styles.mapDog}>
            <DogAvatar size={58} mood="curious" interactive={false} />
          </View>
        </View>
      </View>

      <View style={styles.detailCard}>
        <View style={styles.detailHeader}>
          <Text style={styles.detailEmoji}>{selectedUnlocked ? selected.emoji : '🔒'}</Text>
          <View style={styles.detailInfo}>
            <Text style={styles.name}>{selected.name}</Text>
            <Text style={styles.terrain}>{MAP_POINTS[selected.id].terrain}</Text>
          </View>
          {selectedVisited && <Text style={styles.badge}>Visited</Text>}
        </View>
        <Text style={styles.desc}>
          {selectedUnlocked ? selected.description : `Reach level ${selected.unlockLevel} to unlock this adventure.`}
        </Text>
        <View style={styles.actions}>
          <Pressable
            style={[styles.travelBtn, !selectedUnlocked && styles.travelDisabled]}
            disabled={!selectedUnlocked}
            onPress={() => {
              lightTap();
              router.push(`/location/${selected.id}`);
            }}>
            <Text style={styles.travelText}>{selectedVisited ? 'Visit Again' : 'Travel Here'}</Text>
          </Pressable>
          {nextStop && (
            <Pressable
              style={styles.nextBtn}
              onPress={() => {
                lightTap();
                setSelectedId(nextStop.id);
              }}>
              <Text style={styles.nextText}>Next Stop</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '800', color: '#333', marginBottom: 4 },
  sub: { fontSize: 13, color: '#888', marginBottom: 16 },
  progressCard: { backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 12 },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { color: '#444', fontWeight: '700' },
  progressValue: { color: '#FF8C42', fontWeight: '700' },
  progressTrack: { height: 8, borderRadius: 999, backgroundColor: '#F0E6D8', overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#4ECDC4', borderRadius: 999 },
  mapCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  mapBackdrop: {
    height: 360,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#BCE7F7',
    position: 'relative',
  },
  trailSvg: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  sun: { position: 'absolute', right: 22, top: 18, fontSize: 34 },
  cloudOne: { position: 'absolute', left: 20, top: 28, fontSize: 24 },
  cloudTwo: { position: 'absolute', right: 82, top: 72, fontSize: 20 },
  wave: { position: 'absolute', left: '48%', bottom: 68, fontSize: 22, color: '#2C7BB6' },
  pin: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 2,
    borderColor: '#fff',
  },
  pinSelected: { borderColor: '#FF8C42', transform: [{ scale: 1.1 }] },
  pinLocked: { opacity: 0.72 },
  pinEmoji: { fontSize: 24 },
  pinCheck: {
    position: 'absolute',
    right: 1,
    top: 0,
    backgroundColor: '#4ECDC4',
    color: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 4,
  },
  mapDog: { position: 'absolute', left: '6%', bottom: 12 },
  detailCard: { backgroundColor: '#fff', borderRadius: 18, padding: 16 },
  detailHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  detailEmoji: { fontSize: 34, marginRight: 10 },
  detailInfo: { flex: 1 },
  name: { fontSize: 16, fontWeight: '700', color: '#222' },
  terrain: { fontSize: 12, color: '#888', marginTop: 2 },
  badge: {
    backgroundColor: '#E8FAF8',
    color: '#12877A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    fontWeight: '700',
    fontSize: 12,
  },
  desc: { fontSize: 13, color: '#666', marginTop: 4 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 14 },
  travelBtn: { flex: 1, backgroundColor: '#FF8C42', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  travelDisabled: { backgroundColor: '#D7D7D7' },
  travelText: { color: '#fff', fontWeight: '800' },
  nextBtn: { paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: '#4ECDC4', justifyContent: 'center' },
  nextText: { color: '#12877A', fontWeight: '800' },
});
