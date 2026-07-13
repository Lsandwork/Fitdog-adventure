import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DogAvatar } from '@/components/DogAvatar';
import { Screen } from '@/components/Screen';
import { FUR_COLORS } from '@/lib/constants';
import { lightTap } from '@/lib/haptics';
import { useGameStore } from '@/lib/store';

export default function ProfileScreen() {
  const dogName = useGameStore((s) => s.dogName);
  const dogStyle = useGameStore((s) => s.dogStyle);
  const playStyle = useGameStore((s) => s.playStyle);
  const furColor = useGameStore((s) => s.furColor);
  const badges = useGameStore((s) => s.badges);
  const setFurColor = useGameStore((s) => s.setFurColor);

  return (
    <Screen>
      <View style={styles.avatarWrap}>
        <DogAvatar size={120} />
        <Text style={styles.name}>{dogName}</Text>
        <Text style={styles.meta}>{dogStyle} · {playStyle}</Text>
      </View>

      <Text style={styles.sectionTitle}>Fur Color</Text>
      <View style={styles.colors}>
        {FUR_COLORS.map((c) => (
          <Pressable
            key={c}
            style={[styles.swatch, { backgroundColor: c }, furColor === c && styles.selected]}
            onPress={() => {
              lightTap();
              setFurColor(c);
            }}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Badges</Text>
      {badges.map((b) => (
        <View key={b.id} style={[styles.badge, !b.unlocked && styles.badgeLocked]}>
          <Text style={styles.badgeTitle}>{b.unlocked ? '🏅' : '🔒'} {b.title}</Text>
          <Text style={styles.badgeDesc}>{b.description}</Text>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatarWrap: { alignItems: 'center', marginBottom: 24 },
  name: { fontSize: 24, fontWeight: '800', color: '#333', marginTop: 12 },
  meta: { fontSize: 14, color: '#888', marginTop: 4, textTransform: 'capitalize' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#444', marginBottom: 10, marginTop: 8 },
  colors: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  swatch: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: 'transparent' },
  selected: { borderColor: '#FF8C42', borderWidth: 3 },
  badge: { backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 8 },
  badgeLocked: { opacity: 0.5 },
  badgeTitle: { fontWeight: '700', color: '#333' },
  badgeDesc: { fontSize: 12, color: '#888', marginTop: 2 },
});
