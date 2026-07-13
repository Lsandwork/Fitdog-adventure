import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { successTap } from '@/lib/haptics';
import { playSound } from '@/lib/sounds';

interface LevelUpModalProps {
  visible: boolean;
  level: number;
  rewardCoins: number;
  onClose: () => void;
}

export function LevelUpModal({ visible, level, rewardCoins, onClose }: LevelUpModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.title}>Level Up!</Text>
          <Text style={styles.sub}>You reached level {level}</Text>
          <Text style={styles.reward}>+{rewardCoins} coins</Text>
          <Pressable
            style={styles.btn}
            onPress={() => {
              successTap();
              playSound('levelup');
              onClose();
            }}>
            <Text style={styles.btnText}>Awesome!</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 28, alignItems: 'center', width: '80%' },
  emoji: { fontSize: 48 },
  title: { fontSize: 24, fontWeight: '800', color: '#FF8C42', marginTop: 8 },
  sub: { fontSize: 16, color: '#444', marginTop: 4 },
  reward: { fontSize: 18, fontWeight: '700', color: '#4ECDC4', marginTop: 12 },
  btn: { backgroundColor: '#FF8C42', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 12, marginTop: 20 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
