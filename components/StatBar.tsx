import { StyleSheet, Text, View } from 'react-native';

interface StatBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
}

export function StatBar({ label, value, max, color }: StatBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}/{max}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginVertical: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  label: { fontSize: 13, fontWeight: '600', color: '#444' },
  value: { fontSize: 12, color: '#666' },
  track: { height: 8, backgroundColor: '#E8E8E8', borderRadius: 4, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
});
