import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/Screen';
import { ACCESSORIES } from '@/lib/constants';
import { lightTap, successTap, errorTap } from '@/lib/haptics';
import { useGameStore } from '@/lib/store';
import type { AccessoryId } from '@/lib/types';

export default function ShopScreen() {
  const coins = useGameStore((s) => s.coins);
  const owned = useGameStore((s) => s.ownedAccessories);
  const equipped = useGameStore((s) => s.equippedAccessory);
  const buyAccessory = useGameStore((s) => s.buyAccessory);
  const equipAccessory = useGameStore((s) => s.equipAccessory);

  return (
    <Screen>
      <Text style={styles.title}>Accessory Shop</Text>
      <Text style={styles.sub}>Coin-only shop — no real money, no loot boxes. 🪙 {coins}</Text>
      {ACCESSORIES.map((item) => {
        const isOwned = owned.includes(item.id);
        const isEquipped = equipped === item.id;
        return (
          <View key={item.id} style={styles.card}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{isOwned ? 'Owned' : `${item.price} coins`}</Text>
            </View>
            <Pressable
              style={[styles.btn, isEquipped && styles.equipped]}
              onPress={() => {
                lightTap();
                if (isOwned) {
                  equipAccessory(isEquipped ? null : (item.id as AccessoryId));
                  successTap();
                } else if (buyAccessory(item.id as AccessoryId, item.price)) {
                  successTap();
                } else {
                  errorTap();
                }
              }}>
              <Text style={styles.btnText}>
                {isEquipped ? 'Equipped' : isOwned ? 'Equip' : 'Buy'}
              </Text>
            </Pressable>
          </View>
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
  emoji: { fontSize: 32, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '700' },
  price: { fontSize: 13, color: '#FF8C42', marginTop: 2 },
  btn: { backgroundColor: '#FF8C42', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  equipped: { backgroundColor: '#4ECDC4' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
