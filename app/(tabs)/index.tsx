import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DogAvatar } from '@/components/DogAvatar';
import { LevelUpModal } from '@/components/LevelUpModal';
import { Screen } from '@/components/Screen';
import { StatBar } from '@/components/StatBar';
import { xpProgressInLevel } from '@/lib/constants';
import { successTap } from '@/lib/haptics';
import { levelUpReward, useGameStore } from '@/lib/store';

export default function HomeScreen() {
  const dogName = useGameStore((s) => s.dogName);
  const coins = useGameStore((s) => s.coins);
  const xp = useGameStore((s) => s.xp);
  const energy = useGameStore((s) => s.energy);
  const maxEnergy = useGameStore((s) => s.maxEnergy);
  const dailyStreak = useGameStore((s) => s.dailyStreak);
  const quests = useGameStore((s) => s.quests);
  const canClaimDaily = useGameStore((s) => s.canClaimDaily);
  const claimDailyReward = useGameStore((s) => s.claimDailyReward);
  const claimQuest = useGameStore((s) => s.claimQuest);
  const refillEnergy = useGameStore((s) => s.refillEnergy);

  const [levelUp, setLevelUp] = useState<{ level: number; coins: number } | null>(null);
  const progress = xpProgressInLevel(xp);

  useEffect(() => {
    refillEnergy();
  }, [refillEnergy]);

  const claimableQuests = quests.filter((q) => !q.claimed && q.progress >= q.target);

  return (
    <Screen>
      <View style={styles.header}>
        <DogAvatar size={80} interactive={false} />
        <View style={styles.headerText}>
          <Text style={styles.greeting}>Hey, {dogName}!</Text>
          <Text style={styles.stats}>🪙 {coins} · Lv {progress.level} · 🔥 {dailyStreak}d streak</Text>
        </View>
      </View>

      <StatBar label="Energy" value={energy} max={maxEnergy} color="#4ECDC4" />
      <StatBar label="XP" value={progress.current} max={progress.needed} color="#FF8C42" />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Reward</Text>
        <Pressable
          style={[styles.dailyBtn, !canClaimDaily() && styles.dailyClaimed]}
          disabled={!canClaimDaily()}
          onPress={() => {
            const result = claimDailyReward();
            if (result.ok) {
              successTap();
            }
          }}>
          <Text style={styles.dailyText}>
            {canClaimDaily() ? '🎁 Claim Daily Reward' : '✅ Claimed today — come back tomorrow!'}
          </Text>
        </Pressable>
      </View>

      {claimableQuests.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quests Ready</Text>
          {claimableQuests.map((q) => (
            <Pressable
              key={q.id}
              style={styles.questCard}
              onPress={() => {
                if (claimQuest(q.id)) successTap();
              }}>
              <Text style={styles.questTitle}>{q.title}</Text>
              <Text style={styles.questReward}>+{q.rewardCoins} 🪙 +{q.rewardXp} XP</Text>
            </Pressable>
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Quests</Text>
        {quests
          .filter((q) => !q.claimed)
          .map((q) => (
            <View key={q.id} style={styles.questRow}>
              <Text style={styles.questLabel}>{q.title}</Text>
              <Text style={styles.questProgress}>
                {q.progress}/{q.target}
              </Text>
            </View>
          ))}
      </View>

      <LevelUpModal
        visible={!!levelUp}
        level={levelUp?.level ?? 1}
        rewardCoins={levelUp?.coins ?? 0}
        onClose={() => setLevelUp(null)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 14 },
  headerText: { flex: 1 },
  greeting: { fontSize: 22, fontWeight: '800', color: '#333' },
  stats: { fontSize: 14, color: '#666', marginTop: 4 },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#444', marginBottom: 10 },
  dailyBtn: { backgroundColor: '#FF8C42', padding: 14, borderRadius: 12, alignItems: 'center' },
  dailyClaimed: { backgroundColor: '#E8E8E8' },
  dailyText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  questCard: {
    backgroundColor: '#4ECDC4',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  questTitle: { color: '#fff', fontWeight: '700' },
  questReward: { color: '#fff', fontSize: 13, marginTop: 4 },
  questRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#EEE' },
  questLabel: { color: '#444' },
  questProgress: { color: '#FF8C42', fontWeight: '600' },
});
