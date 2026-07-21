import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@presentation/navigation/types';
import { colors, spacing, typography, radius, playerColorHex } from '@presentation/theme/theme';
import { Button } from '@presentation/components/Button';
import { Card } from '@presentation/components/Card';
import { Avatar } from '@presentation/components/Avatar';
import { Badge } from '@presentation/components/Badge';
import { ProgressBar } from '@presentation/components/ProgressBar';
import { Divider } from '@presentation/components/Divider';
import { useGameStore } from '@application/store/gameStore';
import { PlayerColor } from '@domain/entities/Player';

type Props = NativeStackScreenProps<RootStackParamList, 'GameOver'>;

export const GameOverScreen: React.FC<Props> = ({ navigation }) => {
  const { game, reset } = useGameStore();

  const ranking: PlayerColor[] = game?.ranking ?? [];
  const orderedPlayers = game
    ? [...game.players].sort((a, b) => {
        const ai = ranking.indexOf(a.color);
        const bi = ranking.indexOf(b.color);
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      })
    : [];
  const winner = orderedPlayers[0];

  const goHome = async () => {
    await reset();
    navigation.navigate('Home');
  };

  const replay = async () => {
    await reset();
    navigation.navigate('GameSetup');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Victory Banner + Confetti placeholder */}
        <Text style={styles.confetti}>\u{1F389} \u{1F38A} \u{1F389}</Text>
        <Text style={styles.victory}>Victory!</Text>

        {/* Winner Spotlight */}
        {winner && (
          <Card style={styles.winnerCard}>
            <Text style={styles.trophy}>\u{1F3C6}</Text>
            <Avatar name={winner.name} color={winner.color} size={64} />
            <Text style={styles.winnerName}>{winner.name}</Text>
            <Badge text='CHAMPION' tone='gold' />
          </Card>
        )}

        {/* Final Rankings List */}
        <Card>
          <Text style={styles.section}>Final Rankings</Text>
          {orderedPlayers.map((p, i) => (
            <View key={p.id} style={styles.rankRow}>
              <View style={[styles.rankChip, { backgroundColor: playerColorHex[p.color] }]}>
                <Text style={styles.rankPos}>{i + 1}</Text>
              </View>
              <Avatar name={p.name} color={p.color} size={36} />
              <Text style={styles.rankName}>{p.name}</Text>
              {i === 0 && <Text style={styles.medal}>\u{1F947}</Text>}
            </View>
          ))}
        </Card>

        {/* Score Summary Stats */}
        <View style={styles.stats}>
          <View style={styles.statChip}><Text style={styles.statVal}>{orderedPlayers.length}</Text><Text style={styles.statLabel}>Players</Text></View>
          <View style={styles.statChip}><Text style={styles.statVal}>{ranking.length}</Text><Text style={styles.statLabel}>Finished</Text></View>
        </View>

        {/* Rewards & XP */}
        <Card>
          <Text style={styles.section}>XP Earned</Text>
          <ProgressBar value={0.7} />
          <Text style={styles.xp}>+120 XP \u2022 +50 coins</Text>
        </Card>

        <Divider />

        {/* Social Actions */}
        <Button label='Share Result' variant='secondary' onPress={() => {}} />
      </ScrollView>

      {/* Primary Actions Footer */}
      <View style={styles.footer}>
        <Button label='Play Again' onPress={replay} />
        <Button label='Home' variant='secondary' onPress={goHome} style={styles.homeBtn} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, alignItems: 'stretch' },
  confetti: { textAlign: 'center', fontSize: 28 },
  victory: { textAlign: 'center', color: colors.primary, fontSize: typography.title, fontWeight: '900' },
  winnerCard: { alignItems: 'center', gap: spacing.sm },
  trophy: { fontSize: 40 },
  winnerName: { color: colors.text, fontSize: typography.heading, fontWeight: '800' },
  section: { color: colors.text, fontWeight: '700', marginBottom: spacing.sm },
  rankRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: 6 },
  rankChip: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  rankPos: { color: '#fff', fontWeight: '800' },
  rankName: { color: colors.text, flex: 1 },
  medal: { fontSize: 18 },
  stats: { flexDirection: 'row', gap: spacing.md },
  statChip: { flex: 1, backgroundColor: colors.surfaceAlt, borderRadius: radius.md, padding: spacing.md, alignItems: 'center' },
  statVal: { color: colors.primary, fontSize: typography.heading, fontWeight: '900' },
  statLabel: { color: colors.textMuted, fontSize: typography.caption },
  xp: { color: colors.textMuted, marginTop: spacing.sm },
  footer: { padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.surfaceAlt },
  homeBtn: { marginTop: spacing.sm }
});
