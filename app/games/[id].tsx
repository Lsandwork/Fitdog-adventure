import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LevelUpModal } from '@/components/LevelUpModal';
import { GAMES } from '@/lib/constants';
import { successTap } from '@/lib/haptics';
import { levelUpReward, useGameStore } from '@/lib/store';
import type { GameId } from '@/lib/types';

const BREEDS = ['Labrador', 'Poodle', 'Beagle', 'Husky', 'Corgi', 'Dachshund'];
const TRICKS = ['🐾 Sit', '🔄 Spin', '✋ Paw', '🛏 Down'];

export default function GameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const gameId = id as GameId;
  const game = GAMES.find((g) => g.id === gameId);
  const energy = useGameStore((s) => s.energy);
  const completeGame = useGameStore((s) => s.completeGame);

  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [rewards, setRewards] = useState({ coins: 0, xp: 0 });
  const [levelUp, setLevelUp] = useState<{ level: number; coins: number } | null>(null);

  const practice = energy < (game?.energyCost ?? 0);

  if (!game) {
    return (
      <View style={styles.center}>
        <Text>Unknown game</Text>
      </View>
    );
  }

  const finish = useCallback(
    (finalScore: number) => {
      const result = completeGame(gameId, finalScore, practice);
      setRewards({ coins: result.coins, xp: result.xp });
      setFinished(true);
      setPlaying(false);
      successTap();
      if (result.leveledUp) {
        const newLevel = useGameStore.getState().level;
        const bonus = levelUpReward(newLevel);
        useGameStore.setState({ coins: useGameStore.getState().coins + bonus });
        setLevelUp({ level: newLevel, coins: bonus });
      }
    },
    [completeGame, gameId, practice]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{game.emoji} {game.title}</Text>
      {practice && <Text style={styles.practice}>Practice mode — half rewards</Text>}
      <Text style={styles.score}>Score: {score}</Text>

      {!playing && !finished && (
        <Pressable style={styles.startBtn} onPress={() => { setPlaying(true); setScore(0); }}>
          <Text style={styles.startText}>Start</Text>
        </Pressable>
      )}

      {playing && gameId === 'treat-hunt' && <TreatHunt onScore={setScore} onEnd={finish} />}
      {playing && gameId === 'grooming' && <Grooming onScore={setScore} onEnd={finish} />}
      {playing && gameId === 'daycare-dash' && <DaycareDash onScore={setScore} onEnd={finish} />}
      {playing && gameId === 'training-quest' && <TrainingQuest onScore={setScore} onEnd={finish} />}
      {playing && gameId === 'guess-breed' && <GuessBreed onScore={setScore} onEnd={finish} />}
      {playing && gameId === 'beach-recall' && <BeachRecall onScore={setScore} onEnd={finish} />}

      {finished && (
        <View style={styles.results}>
          <Text style={styles.done}>Great job!</Text>
          <Text style={styles.rewardText}>+{rewards.coins} coins · +{rewards.xp} XP</Text>
          <Pressable style={styles.startBtn} onPress={() => router.back()}>
            <Text style={styles.startText}>Done</Text>
          </Pressable>
        </View>
      )}

      <LevelUpModal
        visible={!!levelUp}
        level={levelUp?.level ?? 1}
        rewardCoins={levelUp?.coins ?? 0}
        onClose={() => setLevelUp(null)}
      />
    </View>
  );
}

function TreatHunt({ onScore, onEnd }: { onScore: (n: number) => void; onEnd: (s: number) => void }) {
  const [treats, setTreats] = useState<{ id: number; x: number; y: number }[]>([]);
  const [hits, setHits] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let id = 0;
    timer.current = setInterval(() => {
      setTreats((t) => [...t.slice(-4), { id: id++, x: 10 + Math.random() * 70, y: 10 + Math.random() * 50 }]);
    }, 800);
    const end = setTimeout(() => {
      if (timer.current) clearInterval(timer.current);
      onEnd(Math.min(100, hits * 12));
    }, 12000);
    return () => {
      if (timer.current) clearInterval(timer.current);
      clearTimeout(end);
    };
  }, [hits, onEnd]);

  const tap = (tid: number) => {
    setTreats((t) => t.filter((x) => x.id !== tid));
    const next = hits + 1;
    setHits(next);
    onScore(Math.min(100, next * 12));
  };

  return (
    <View style={styles.gameArea}>
      <Text style={styles.hint}>Tap the treats!</Text>
      {treats.map((t) => (
        <Pressable key={t.id} style={[styles.treat, { left: `${t.x}%`, top: `${t.y}%` }]} onPress={() => tap(t.id)}>
          <Text style={{ fontSize: 28 }}>🦴</Text>
        </Pressable>
      ))}
    </View>
  );
}

function Grooming({ onScore, onEnd }: { onScore: (n: number) => void; onEnd: (s: number) => void }) {
  const [sparkle, setSparkle] = useState(0);
  return (
    <View style={styles.gameArea}>
      <Text style={styles.hint}>Tap to brush — reach 10 sparkles!</Text>
      <Pressable
        style={styles.bigBtn}
        onPress={() => {
          const next = sparkle + 1;
          setSparkle(next);
          onScore(Math.min(100, next * 10));
          if (next >= 10) onEnd(100);
        }}>
        <Text style={{ fontSize: 48 }}>🐕✨</Text>
        <Text>{sparkle}/10</Text>
      </Pressable>
    </View>
  );
}

function DaycareDash({ onScore, onEnd }: { onScore: (n: number) => void; onEnd: (s: number) => void }) {
  const zones = ['🎾 Play', '😴 Nap', '🍖 Snack'];
  const [round, setRound] = useState(0);
  const [target, setTarget] = useState(zones[0]);
  const [correct, setCorrect] = useState(0);

  const nextRound = () => {
    const t = zones[Math.floor(Math.random() * zones.length)];
    setTarget(t);
    setRound((r) => r + 1);
  };

  useEffect(() => { nextRound(); }, []);

  const pick = (z: string) => {
    const hit = z === target;
    const c = correct + (hit ? 1 : 0);
    setCorrect(c);
    onScore(Math.min(100, c * 20));
    if (round >= 5) onEnd(Math.min(100, c * 20));
    else nextRound();
  };

  return (
    <View style={styles.gameArea}>
      <Text style={styles.hint}>Send pup to: {target}</Text>
      {zones.map((z) => (
        <Pressable key={z} style={styles.zoneBtn} onPress={() => pick(z)}>
          <Text style={styles.zoneText}>{z}</Text>
        </Pressable>
      ))}
      <Text>Round {round}/5</Text>
    </View>
  );
}

function TrainingQuest({ onScore, onEnd }: { onScore: (n: number) => void; onEnd: (s: number) => void }) {
  const [sequence, setSequence] = useState<string[]>([]);
  const [input, setInput] = useState<string[]>([]);
  const [round, setRound] = useState(0);

  const startRound = useCallback(() => {
    const trick = TRICKS[Math.floor(Math.random() * TRICKS.length)];
    setSequence((s) => [...s, trick].slice(-4));
    setInput([]);
    setRound((r) => r + 1);
  }, []);

  useEffect(() => { startRound(); }, [startRound]);

  const tap = (trick: string) => {
    const next = [...input, trick];
    setInput(next);
    const idx = next.length - 1;
    if (sequence[idx] !== trick) {
      onEnd(Math.min(100, round * 15));
      return;
    }
    onScore(Math.min(100, round * 20));
    if (next.length === sequence.length) {
      if (round >= 3) onEnd(Math.min(100, round * 25));
      else startRound();
    }
  };

  return (
    <View style={styles.gameArea}>
      <Text style={styles.hint}>Repeat: {sequence.join(' → ')}</Text>
      {TRICKS.map((t) => (
        <Pressable key={t} style={styles.zoneBtn} onPress={() => tap(t)}>
          <Text>{t}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function GuessBreed({ onScore, onEnd }: { onScore: (n: number) => void; onEnd: (s: number) => void }) {
  const [round, setRound] = useState(0);
  const [answer, setAnswer] = useState(BREEDS[0]);
  const [correct, setCorrect] = useState(0);
  const options = [...BREEDS].sort(() => Math.random() - 0.5).slice(0, 3);

  useEffect(() => {
    setAnswer(BREEDS[Math.floor(Math.random() * BREEDS.length)]);
  }, [round]);

  const pick = (b: string) => {
    const c = correct + (b === answer ? 1 : 0);
    setCorrect(c);
    onScore(Math.min(100, c * 25));
    if (round >= 3) onEnd(Math.min(100, c * 25));
    else setRound((r) => r + 1);
  };

  return (
    <View style={styles.gameArea}>
      <Text style={styles.hint}>What breed is this 🐕?</Text>
      <Text style={styles.breedHint}>(It's a {answer})</Text>
      {options.map((b) => (
        <Pressable key={b} style={styles.zoneBtn} onPress={() => pick(b)}>
          <Text>{b}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function BeachRecall({ onScore, onEnd }: { onScore: (n: number) => void; onEnd: (s: number) => void }) {
  const [distance, setDistance] = useState(100);
  const [recalls, setRecalls] = useState(0);

  useEffect(() => {
    const drift = setInterval(() => setDistance((d) => Math.min(100, d + 4)), 500);
    return () => clearInterval(drift);
  }, []);

  const recall = () => {
    const next = recalls + 1;
    setRecalls(next);
    setDistance((d) => Math.max(0, d - 25));
    onScore(Math.min(100, next * 25));
    if (distance <= 25 || next >= 4) onEnd(Math.min(100, next * 25));
  };

  return (
    <View style={styles.gameArea}>
      <Text style={styles.hint}>🏖️ Dog is {distance}m away — tap Recall!</Text>
      <Pressable style={styles.bigBtn} onPress={recall}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>📣 Recall!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFF8F0' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '800', textAlign: 'center' },
  practice: { textAlign: 'center', color: '#FF8C42', marginTop: 4 },
  score: { textAlign: 'center', fontSize: 18, fontWeight: '600', marginVertical: 12 },
  startBtn: { backgroundColor: '#FF8C42', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  startText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  gameArea: { flex: 1, minHeight: 280, position: 'relative' },
  hint: { textAlign: 'center', color: '#666', marginBottom: 12 },
  treat: { position: 'absolute' },
  bigBtn: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  zoneBtn: { backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 8, alignItems: 'center' },
  zoneText: { fontSize: 16, fontWeight: '600' },
  breedHint: { textAlign: 'center', fontSize: 11, color: '#aaa', marginBottom: 8 },
  results: { alignItems: 'center', marginTop: 20 },
  done: { fontSize: 20, fontWeight: '800', color: '#4ECDC4' },
  rewardText: { fontSize: 16, marginTop: 8, color: '#444' },
});
