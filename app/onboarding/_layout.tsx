import { Redirect, Stack } from 'expo-router';

import { useGameStore } from '@/lib/store';

export default function OnboardingLayout() {
  const complete = useGameStore((s) => s.onboardingComplete);
  const hydrated = useGameStore((s) => s.hydrated);

  if (hydrated && complete) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FFF8F0' } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="style" />
      <Stack.Screen name="play-style" />
    </Stack>
  );
}
