import { Pressable, StyleSheet, Text, View } from 'react-native';

import { lightTap } from '@/lib/haptics';

interface GameCardProps {
  title: string;
  description: string;
  emoji: string;
  energyCost: number;
  highScore?: number;
  onPress: () => void;
  disabled?: boolean;
}

export function GameCard({ title, description, emoji, energyCost, highScore, onPress, disabled }: GameCardProps) {
  return (
    <Pressable
      style={[styles.card, disabled && styles.disabled]}
      onPress={() => {
        lightTap();
        onPress();
      }}
      disabled={disabled}>
      <Text style={styles.emoji}>{emoji}</Text>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{description}</Text>
        <Text style={styles.meta}>⚡ {energyCost} energy{highScore ? ` · Best: ${highScore}` : ''}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  disabled: { opacity: 0.5 },
  emoji: { fontSize: 36, marginRight: 12 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', color: '#222' },
  desc: { fontSize: 13, color: '#666', marginTop: 2 },
  meta: { fontSize: 12, color: '#FF8C42', marginTop: 6, fontWeight: '600' },
});
