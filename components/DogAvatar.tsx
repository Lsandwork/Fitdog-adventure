import { useEffect, useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { lightTap } from '@/lib/haptics';
import { playSound } from '@/lib/sounds';

/**
 * Exact Fitdog avatar asset — do not replace with SVG/emoji/generated art.
 * Public web path: /assets/avatar/fitdog-avatar.png
 * Bundled native path: assets/avatar/fitdog-avatar.png
 */
export const FITDOG_AVATAR = require('../assets/avatar/fitdog-avatar.png');
export const FITDOG_AVATAR_PUBLIC_PATH = '/assets/avatar/fitdog-avatar.png';

interface DogAvatarProps {
  size?: number;
  interactive?: boolean;
  showHint?: boolean;
  /** Kept for call-site compatibility; ignored — exact PNG only. */
  previewAccessory?: unknown;
  mood?: unknown;
  pose?: unknown;
}

export function DogAvatar({
  size = 100,
  interactive = true,
  showHint = false,
}: DogAvatarProps) {
  const bounce = useSharedValue(1);
  const breathe = useSharedValue(0);
  const reactionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [reaction, setReaction] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    breathe.value = withRepeat(
      withSequence(withTiming(1, { duration: 1400 }), withTiming(0, { duration: 1400 })),
      -1,
      true
    );
  }, [breathe]);

  useEffect(() => {
    return () => {
      if (reactionTimer.current) clearTimeout(reactionTimer.current);
    };
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: breathe.value * -2 }, { scale: bounce.value }],
  }));

  const onPress = () => {
    if (!interactive) return;
    lightTap();
    playSound('tap');
    if (reactionTimer.current) clearTimeout(reactionTimer.current);
    const reactions = ['Good pup!', 'Woof!', 'Ready to play?', 'Let’s explore!'];
    setReaction(reactions[Math.floor(Math.random() * reactions.length)]);
    reactionTimer.current = setTimeout(() => setReaction(null), 1600);
    bounce.value = withSequence(withSpring(1.06), withSpring(1));
  };

  const content = (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Animated.View style={[styles.imageWrap, animStyle]}>
        {failed ? (
          <View style={styles.empty} accessibilityLabel="Avatar placeholder" />
        ) : (
          <Image
            source={FITDOG_AVATAR}
            accessibilityLabel="Fitdog avatar"
            style={{ width: size, height: size }}
            resizeMode="contain"
            onError={() => setFailed(true)}
          />
        )}
      </Animated.View>
      {reaction ? (
        <View style={[styles.bubble, { maxWidth: size * 0.85 }]}>
          <Text style={[styles.bubbleText, { fontSize: Math.max(11, size * 0.1) }]}>{reaction}</Text>
        </View>
      ) : null}
      {showHint && interactive ? (
        <Text style={[styles.hint, { fontSize: Math.max(10, size * 0.1) }]}>Tap me!</Text>
      ) : null}
    </View>
  );

  if (!interactive) return content;

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="Pet your dog">
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  imageWrap: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  empty: { width: '100%', height: '100%', backgroundColor: 'transparent' },
  bubble: {
    position: 'absolute',
    top: 4,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,140,66,0.25)',
  },
  bubbleText: { color: '#3A2A1A', fontWeight: '700', textAlign: 'center' },
  hint: { position: 'absolute', bottom: 4, color: '#5A8FA8', fontWeight: '600' },
});
