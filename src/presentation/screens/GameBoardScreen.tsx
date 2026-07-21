import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@presentation/navigation/types';
import { colors, spacing, typography, radius, playerColorHex } from '@presentation/theme/theme';
import { IconButton } from '@presentation/components/IconButton';
import { PlayerCard } from '@presentation/components/PlayerCard';
import { LudoBoard } from '@presentation/components/LudoBoard';
import { GameToken } from '@presentation/components/GameToken';
import { CoinBalancePill } from '@presentation/components/CoinBalancePill';
import { TurnDiceOverlay } from '@presentation/screens/TurnDiceOverlay';
import { useGameStore } from '@application/store/gameStore';
import { HOME_BASE } from '@domain/entities/Token';
import { canMoveToken } from '@domain/usecases/turnLogic';

type Props = NativeStackScreenProps<RootStackParamList, 'GameBoard'>;

export const GameBoardScreen: React.FC<Props> = ({ navigation }) => {
  const { game, currentPlayer, playToken } = useGameStore();
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    if (game && game.phase === 'finished') {
      navigation.replace('GameOver');
    }
  }, [game, navigation]);

  if (!game) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.loading}>Loading game\u2026</Text>
      </SafeAreaView>
    );
  }

  const active = currentPlayer();
  const dice = game.lastDiceValue;
  const opponents = game.players.filter((p) => p.id !== active?.id);

  const tokensHome = (color: string) => game.tokens.filter((t) => t.color === color && t.position === HOME_BASE).length;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <IconButton glyph='\u2190' label='home' onPress={() => navigation.navigate('Home')} />
        <CoinBalancePill amount={1250} />
        <IconButton glyph='\u2699' label='menu' onPress={() => {}} />
      </View>

      {/* Opponent Player Panels */}
      <View style={styles.opponents}>
        {opponents.map((p) => (
          <PlayerCard key={p.id} player={p} tokensHome={tokensHome(p.color)} />
        ))}
      </View>

      {/* Turn Indicator */}
      <View style={[styles.turnBanner, { borderColor: active ? playerColorHex[active.color] : colors.primary }]}>
        <Text style={styles.turnText}>{active ? `${active.name}'s turn` : 'Waiting\u2026'}</Text>
      </View>

      {/* Ludo Board + Token Layer */}
      <View style={styles.boardWrap}>
        <LudoBoard>
          <View style={styles.tokenLayer}>
            {game.tokens.map((t) => (
              <GameToken
                key={t.id}
                token={t}
                movable={t.color === active?.color && dice != null && canMoveToken(t, dice)}
                onPress={() => playToken(t.id)}
              />
            ))}
          </View>
        </LudoBoard>
      </View>

      {/* Bottom Player Bar + Dice & Action Zone */}
      <View style={styles.bottomBar}>
        {active && <PlayerCard player={active} active tokensHome={tokensHome(active.color)} />}
        <IconButton glyph='\u{1F3B2}' label='roll' onPress={() => setOverlayVisible(true)} />
      </View>

      {/* In-Game Overlay: Turn Indicator / Dice Roll */}
      <TurnDiceOverlay visible={overlayVisible} onClose={() => setOverlayVisible(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  loading: { color: colors.text, textAlign: 'center', marginTop: 80 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  opponents: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, paddingHorizontal: spacing.md },
  turnBanner: { marginHorizontal: spacing.md, marginTop: spacing.sm, padding: spacing.sm, borderRadius: radius.pill, borderWidth: 2, alignItems: 'center' },
  turnText: { color: colors.text, fontWeight: '800', fontSize: typography.body },
  boardWrap: { padding: spacing.md, flex: 1, justifyContent: 'center' },
  tokenLayer: { flexDirection: 'row', flexWrap: 'wrap' },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.surfaceAlt }
});
