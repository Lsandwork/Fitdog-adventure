import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { ACCESSORIES } from '@/lib/constants';
import { useGameStore } from '@/lib/store';

const STYLE_EMOJI: Record<string, string> = {
  sporty: '🏃',
  fluffy: '🐩',
  adventurer: '🎒',
};

interface DogAvatarProps {
  size?: number;
}

export function DogAvatar({ size = 100 }: DogAvatarProps) {
  const dogStyle = useGameStore((s) => s.dogStyle);
  const furColor = useGameStore((s) => s.furColor);
  const accessory = useGameStore((s) => s.equippedAccessory);
  const accEmoji = ACCESSORIES.find((a) => a.id === accessory)?.emoji;

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <LinearGradient colors={['#87CEEB', '#E8F4FC']} style={[styles.bg, { borderRadius: size / 2 }]}>
        <View style={[styles.body, { backgroundColor: furColor, width: size * 0.55, height: size * 0.5 }]}>
          <Text style={{ fontSize: size * 0.22 }}>{STYLE_EMOJI[dogStyle] ?? '🐕'}</Text>
        </View>
        {accEmoji ? <Text style={[styles.acc, { fontSize: size * 0.2 }]}>{accEmoji}</Text> : null}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  bg: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' },
  body: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  acc: { position: 'absolute', top: 4, right: 4 },
});
