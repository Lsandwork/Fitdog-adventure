import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { AccessoryOverlay, DogBodySvg, type DogPose } from '@/components/AccessoryOverlay';
import { ACCESSORY_META } from '@/lib/accessoryAnchors';
import { lightTap, successTap } from '@/lib/haptics';
import { playSound } from '@/lib/sounds';
import { useGameStore } from '@/lib/store';
import type { AccessoryId } from '@/lib/types';

export type AvatarMood = 'idle' | 'happy' | 'tired' | 'curious';

interface DogAvatarProps {
  size?: number;
  /** Preview an accessory without equipping (shop). */
  previewAccessory?: AccessoryId | null;
  interactive?: boolean;
  mood?: AvatarMood;
  showHint?: boolean;
  pose?: DogPose;
}

export function DogAvatar({
  size = 100,
  previewAccessory,
  interactive = true,
  mood,
  showHint = false,
  pose = 'front',
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
  const sparkle = useSharedValue(1);
  const heartLift = useSharedValue(0);
  const prevAccessory = useRef(accessory);
  const reactionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [reaction, setReaction] = useState<string | null>(null);

  useEffect(() => {
    breathe.value = withRepeat(withSequence(withTiming(1, { duration: 1400 }), withTiming(0, { duration: 1400 })), -1, true);
  }, [breathe]);

  useEffect(() => {
    return () => {
      if (reactionTimer.current) clearTimeout(reactionTimer.current);
    };
  }, []);

  useEffect(() => {
    if (prevAccessory.current !== accessory) {
      sparkle.value = 1;
      sparkle.value = withSequence(withSpring(1.12), withSpring(1));
      heartLift.value = 0;
      heartLift.value = withTiming(1, { duration: 900 });
      if (accessory) successTap();
      prevAccessory.current = accessory;
    }
  }, [accessory, heartLift, sparkle]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: breathe.value * -3 },
      { scale: bounce.value * sparkle.value },
      { rotate: `${wiggle.value}deg` },
    ],
  }));

  const heartStyle = useAnimatedStyle(() => ({
    opacity: heartLift.value,
    transform: [
      { translateY: heartLift.value * -24 },
      { scale: 0.8 + heartLift.value * 0.3 },
    ],
  }));

  const onPress = () => {
    if (!interactive) return;
    lightTap();
    playSound('tap');
    if (reactionTimer.current) clearTimeout(reactionTimer.current);
    const reactions = ['Good pup!', 'Woof!', 'Ready to play?', 'Let’s explore!'];
    setReaction(reactions[Math.floor(Math.random() * reactions.length)]);
    reactionTimer.current = setTimeout(() => setReaction(null), 1600);
    bounce.value = withSequence(withSpring(1.08), withSpring(1));
    heartLift.value = 0;
    heartLift.value = withTiming(1, { duration: 900 });
    wiggle.value = withSequence(withTiming(-6, { duration: 80 }), withTiming(6, { duration: 80 }), withTiming(0, { duration: 80 }));
  };

  const inner = (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <LinearGradient colors={['#87CEEB', '#E8F4FC']} style={[styles.bg, { borderRadius: size / 2 }]}>
        <Animated.View style={[styles.dogWrap, animStyle]}>
          <View style={styles.layerStack}>
            {accessory && ACCESSORY_META[accessory].slot === 'back' && (
              <View style={styles.layer}>
                <AccessoryOverlay id={accessory} pose={pose} />
              </View>
            )}
            <View style={styles.layer}>
              <DogBodySvg furColor={furColor} style={dogStyle} mood={resolvedMood} pose={pose} />
            </View>
            {accessory && ACCESSORY_META[accessory].slot !== 'back' && (
              <View style={styles.layer}>
                <AccessoryOverlay id={accessory} pose={pose} />
              </View>
            )}
          </View>
        </Animated.View>
        {reaction && (
          <View style={[styles.bubble, { maxWidth: size * 0.8 }]}>
            <Text style={[styles.bubbleText, { fontSize: size * 0.1 }]}>{reaction}</Text>
          </View>
        )}
        <Animated.Text style={[styles.hearts, { fontSize: size * 0.18 }, heartStyle]}>💕</Animated.Text>
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
  dogWrap: { width: '86%', height: '86%' },
  layerStack: { flex: 1, position: 'relative' },
  layer: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  bubble: {
    position: 'absolute',
    top: 6,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,140,66,0.25)',
  },
  bubbleText: { color: '#3A2A1A', fontWeight: '700', textAlign: 'center' },
  hearts: { position: 'absolute', right: 12, top: 18 },
  hint: { position: 'absolute', bottom: 6, color: '#5A8FA8', fontWeight: '600' },
});
