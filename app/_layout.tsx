import { Stack } from 'expo-router';
import { useEffect } from 'react';

import { useGameStore } from '@/lib/store';

export default function RootLayout() {
  const hydrated = useGameStore((s) => s.hydrated);
  const refillEnergy = useGameStore((s) => s.refillEnergy);

  useEffect(() => {
    const interval = setInterval(() => refillEnergy(), 30000);
    return () => clearInterval(interval);
  }, [refillEnergy]);

  if (!hydrated) return null;

  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#FFF8F0' } }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="games/[id]" options={{ title: 'Mini-Game', presentation: 'modal' }} />
      <Stack.Screen name="location/[id]" options={{ title: 'Location' }} />
    </Stack>
  );
}
