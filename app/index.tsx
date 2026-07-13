import { Redirect } from 'expo-router';

import { useGameStore } from '@/lib/store';

export default function Index() {
  const onboardingComplete = useGameStore((s) => s.onboardingComplete);
  return <Redirect href={onboardingComplete ? '/(tabs)' : '/onboarding'} />;
}
