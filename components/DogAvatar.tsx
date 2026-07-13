import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { AccessoryOverlay, DogBodySvg } from '@/components/AccessoryOverlay';
import { ACCESSORY_META } from '@/lib/accessoryAnchors';
import { lightTap, successTap } from '@/lib/haptics';
import { playSound } from '@/lib/sounds';
import { useGameStore } from '@/lib/store';
import type { AccessoryId } from '@/lib/types';

export type AvatarMood = 'idle' | 'happy' | 'tired';

interface DogAvatarProps {
  size?: number;
  /** Preview an accessory without equipping (shop). */
  previewAccessory?: AccessoryId | null;
  interactive?: boolean;
  mood?: AvatarMood;
  showHint?: boolean;
}

export function DogAvatar({
  size = 100,
  previewAccessory,
  interactive = true,
  mood,
  showHint = false,
}: DogAvatarProps) {
  const dogStyle = useGameStore((s) => s.dogStyle);
  const furColor = useGameStore((s) => s.furColor);
  const equipped = useGameStore((s) => s.equippedAccessory);
  const energy = useGameStore((s) => s.energy);

  const accessory = previewAccessory !== undefined ? previewAccessory : equipped;
  const resolvedMood: AvatarMood = mood ?? (energy <= 2 ? 'tired' : 'idle');

  const breathe = useSharedValue(0);
  const bounce = useSharedValue(1);
  const wiggle = useSharedValue(0);
  const sparkle = useSharedValue(0);
  const prevAccessory = useRef(accessory);

  useEffect(() => {
    breathe.value = withRepeat(withSequence(withTiming(1, { duration: 1400 }), withTiming(0, { duration: 1400 })), -1, true);
  }, [breathe]);

  useEffect(() => {
    if (prevAccessory.current !== accessory) {
      sparkle.value = 0;
      sparkle.value = withSequence(withSpring(1.12), withSpring(1));
      if (accessory) successTap();
      prevAccessory.current = accessory;
    }
  }, [accessory, sparkle]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: breathe.value * -3 },
      { scale: bounce.value * sparkle.value },
      { rotate: `${wiggle.value}deg` },
    ],
  }));

  const onPress = () => {
    if (!interactive) return;
    lightTap();
    playSound('tap');
    bounce.value = withSequence(withSpring(1.08), withSpring(1));
    wiggle.value = withSequence(withTiming(-6, { duration: 80 }), withTiming(6, { duration: 80 }), withTiming(0, { duration: 80 }));
  };

  const inner = (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <LinearGradient colors={['#87CEEB', '#E8F4FC']} style={[styles.bg, { borderRadius: size / 2 }]}>
        <Animated.View style={[styles.dogWrap, animStyle]}>
          <View style={styles.layerStack}>
            {accessory && ACCESSORY_META[accessory].slot === 'back' && (
              <View style={styles.layer}>
                <AccessoryOverlay id={accessory} />
              </View>
            )}
            <View style={styles.layer}>
              <DogBodySvg furColor={furColor} style={dogStyle} mood={resolvedMood} />
            </View>
            {accessory && ACCESSORY_META[accessory].slot !== 'back' && (
              <View style={styles.layer}>
                <AccessoryOverlay id={accessory} />
              </View>
            )}
          </View>
        </Animated.View>
        {showHint && interactive && (
          <Text style={[styles.hint, { fontSize: size * 0.1 }]}>Tap me!</Text>
        )}
      </LinearGradient>
    </View>
  );

  if (!interactive) return inner;

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="Pet your dog">
      {inner}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  bg: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  dogWrap: { width: '78%', height: '78%' },
  layerStack: { flex: 1, position: 'relative' },
  layer: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  hint: { position: 'absolute', bottom: 6, color: '#5A8FA8', fontWeight: '600' },
});
