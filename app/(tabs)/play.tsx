import { router } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { GameCard } from '@/components/GameCard';
import { Screen } from '@/components/Screen';
import { GAMES } from '@/lib/constants';
import { useGameStore } from '@/lib/store';

export default function PlayScreen() {
  const energy = useGameStore((s) => s.energy);
  const highScores = useGameStore((s) => s.highScores);

  return (
    <Screen>
      <Text style={styles.title}>Mini-Games</Text>
      <Text style={styles.sub}>
        Energy: {energy}/10 · Low energy? Practice mode still earns half rewards.
      </Text>
      {GAMES.map((game) => (
        <GameCard
          key={game.id}
          title={game.title}
          description={game.description}
          emoji={game.emoji}
          energyCost={game.energyCost}
          highScore={highScores[game.id]}
          onPress={() => router.push(`/games/${game.id}`)}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '800', color: '#333', marginBottom: 4 },
  sub: { fontSize: 13, color: '#888', marginBottom: 16 },
});
