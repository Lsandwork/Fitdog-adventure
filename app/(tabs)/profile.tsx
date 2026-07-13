import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DogAvatar } from '@/components/DogAvatar';
import { Screen } from '@/components/Screen';
import { ACCESSORIES, FUR_COLORS } from '@/lib/constants';
import { lightTap, successTap } from '@/lib/haptics';
import { useGameStore } from '@/lib/store';
import type { AccessoryId } from '@/lib/types';

export default function ProfileScreen() {
  const dogName = useGameStore((s) => s.dogName);
  const dogStyle = useGameStore((s) => s.dogStyle);
  const playStyle = useGameStore((s) => s.playStyle);
  const furColor = useGameStore((s) => s.furColor);
  const badges = useGameStore((s) => s.badges);
  const owned = useGameStore((s) => s.ownedAccessories);
  const equipped = useGameStore((s) => s.equippedAccessory);
  const setFurColor = useGameStore((s) => s.setFurColor);
  const equipAccessory = useGameStore((s) => s.equipAccessory);

  const toggleAccessory = (id: AccessoryId) => {
    lightTap();
    equipAccessory(equipped === id ? null : id);
    successTap();
  };

  return (
    <Screen>
      <View style={styles.avatarWrap}>
        <DogAvatar size={150} interactive showHint />
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

      <Text style={styles.sectionTitle}>My Accessories</Text>
      {owned.length === 0 ? (
        <Text style={styles.empty}>No accessories yet — visit the Shop!</Text>
      ) : (
        <View style={styles.accessoryRow}>
          {owned.map((id) => {
            const item = ACCESSORIES.find((a) => a.id === id)!;
            const isEquipped = equipped === id;
            return (
              <Pressable
                key={id}
                style={[styles.accChip, isEquipped && styles.accChipActive]}
                onPress={() => toggleAccessory(id)}>
                <Text style={styles.accEmoji}>{item.emoji}</Text>
                <Text style={styles.accName}>{isEquipped ? 'On' : 'Off'}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
      {equipped && (
        <Pressable style={styles.unequipBtn} onPress={() => { lightTap(); equipAccessory(null); }}>
          <Text style={styles.unequipText}>Remove accessory</Text>
        </Pressable>
      )}

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
  empty: { color: '#888', fontSize: 14, marginBottom: 12 },
  accessoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 12 },
  accChip: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E8E8E8',
    minWidth: 72,
  },
  accChipActive: { borderColor: '#4ECDC4', backgroundColor: '#E8FAF8' },
  accEmoji: { fontSize: 24 },
  accName: { fontSize: 11, fontWeight: '700', color: '#666', marginTop: 4 },
  unequipBtn: { alignSelf: 'flex-start', marginBottom: 16 },
  unequipText: { color: '#FF8C42', fontWeight: '600', fontSize: 14 },
  badge: { backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 8 },
  badgeLocked: { opacity: 0.5 },
  badgeTitle: { fontWeight: '700', color: '#333' },
  badgeDesc: { fontSize: 12, color: '#888', marginTop: 2 },
});
