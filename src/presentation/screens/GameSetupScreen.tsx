import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@presentation/navigation/types';
import { colors, spacing, typography, radius, playerColorHex } from '@presentation/theme/theme';
import { IconButton } from '@presentation/components/IconButton';
import { Button } from '@presentation/components/Button';
import { Card } from '@presentation/components/Card';
import { Divider } from '@presentation/components/Divider';
import { Toggle } from '@presentation/components/Toggle';
import { PLAYER_COLORS, Player, PlayerColor } from '@domain/entities/Player';
import { useGameStore } from '@application/store/gameStore';

type Props = NativeStackScreenProps<RootStackParamList, 'GameSetup'>;

interface Draft { name: string; color: PlayerColor; isBot: boolean; }

const DEFAULT_NAMES = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];

export const GameSetupScreen: React.FC<Props> = ({ navigation }) => {
  const startGame = useGameStore((s) => s.startGame);
  const [count, setCount] = useState(2);
  const [autoFill, setAutoFill] = useState(true);
  const [drafts, setDrafts] = useState<Draft[]>(
    PLAYER_COLORS.map((c, i) => ({ name: DEFAULT_NAMES[i], color: c, isBot: i > 0 }))
  );

  const active = useMemo(() => drafts.slice(0, count), [drafts, count]);

  const setName = (idx: number, name: string) =>
    setDrafts((d) => d.map((p, i) => (i === idx ? { ...p, name } : p)));

  const setColor = (idx: number, color: PlayerColor) =>
    setDrafts((d) => d.map((p, i) => (i === idx ? { ...p, color } : (p.color === color ? { ...p, color: d[idx].color } : p))));

  const start = async () => {
    const players: Player[] = active.map((p, i) => ({ id: String(i), name: p.name.trim() || DEFAULT_NAMES[i], color: p.color, isBot: p.isBot }));
    await startGame(players);
    navigation.navigate('GameBoard');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton glyph='\u2190' label='back' onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Game Setup</Text>
        <View style={{ width: 42 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Intro Prompt */}
        <Text style={styles.intro}>Choose how many players will join this offline match.</Text>

        {/* Player Count Selector (SegmentedControl / Stepper) */}
        <Card>
          <Text style={styles.label}>Number of Players</Text>
          <View style={styles.segment}>
            {[2, 3, 4].map((n) => (
              <Pressable key={n} onPress={() => setCount(n)} style={[styles.segItem, count === n && styles.segActive]}>
                <Text style={[styles.segText, count === n && styles.segTextActive]}>{n}</Text>
              </Pressable>
            ))}
          </View>
        </Card>

        {/* Player List & Color Assignment */}
        <Card style={styles.gap}>
          <Text style={styles.label}>Players</Text>
          {active.map((p, idx) => (
            <View key={idx} style={styles.playerRow}>
              <View style={[styles.swatch, { backgroundColor: playerColorHex[p.color] }]} />
              <TextInput
                value={p.name}
                onChangeText={(t) => setName(idx, t)}
                placeholder={DEFAULT_NAMES[idx]}
                placeholderTextColor={colors.textMuted}
                style={styles.input}
              />
              {/* Color Palette Picker */}
              <View style={styles.palette}>
                {PLAYER_COLORS.map((c) => (
                  <Pressable key={c} onPress={() => setColor(idx, c)} style={[styles.dot, { backgroundColor: playerColorHex[c] }, p.color === c && styles.dotActive]} />
                ))}
              </View>
            </View>
          ))}
        </Card>

        {/* Game Options */}
        <Card style={styles.gap}>
          <Text style={styles.label}>Game Options</Text>
          <Toggle label='Auto-fill empty seats with bots' value={autoFill} onChange={setAutoFill} />
        </Card>

        <Divider />

        {/* Summary Bar */}
        <View style={styles.summary}>
          <Text style={styles.summaryText}>{count} players \u2022 turn-based \u2022 offline</Text>
        </View>
      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <Button label='Start Match' onPress={start} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md },
  title: { color: colors.text, fontSize: typography.heading, fontWeight: '800' },
  content: { padding: spacing.md, gap: spacing.sm },
  intro: { color: colors.textMuted, fontSize: typography.body, marginBottom: spacing.sm },
  label: { color: colors.text, fontWeight: '700', marginBottom: spacing.sm },
  segment: { flexDirection: 'row', backgroundColor: colors.surfaceAlt, borderRadius: radius.pill, padding: 4 },
  segItem: { flex: 1, paddingVertical: 10, borderRadius: radius.pill, alignItems: 'center' },
  segActive: { backgroundColor: colors.primary },
  segText: { color: colors.textMuted, fontWeight: '700' },
  segTextActive: { color: colors.background },
  gap: { marginTop: spacing.sm },
  playerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  swatch: { width: 24, height: 24, borderRadius: 6 },
  input: { flex: 1, backgroundColor: colors.surfaceAlt, borderRadius: radius.sm, paddingHorizontal: 12, paddingVertical: 8, color: colors.text },
  palette: { flexDirection: 'row', gap: 4 },
  dot: { width: 22, height: 22, borderRadius: 11, opacity: 0.5 },
  dotActive: { opacity: 1, borderWidth: 2, borderColor: '#fff' },
  summary: { alignItems: 'center' },
  summaryText: { color: colors.textMuted },
  footer: { padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.surfaceAlt }
});
