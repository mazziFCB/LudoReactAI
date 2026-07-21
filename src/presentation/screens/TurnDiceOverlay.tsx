import React, { useEffect, useRef, useState } from 'react';
import { Modal, View, Text, StyleSheet, Animated, Easing, Pressable } from 'react-native';
import { colors, spacing, typography, radius, playerColorHex } from '@presentation/theme/theme';
import { DiceButton } from '@presentation/components/DiceButton';
import { Avatar } from '@presentation/components/Avatar';
import { Button } from '@presentation/components/Button';
import { useGameStore } from '@application/store/gameStore';
import { canMoveToken } from '@domain/usecases/turnLogic';

interface Props {
  visible: boolean;
  onClose: () => void;
}

// Turn Indicator / Dice Roll in-game overlay.
export const TurnDiceOverlay: React.FC<Props> = ({ visible, onClose }) => {
  const { game, currentPlayer, roll, skipTurn } = useGameStore();
  const [result, setResult] = useState<number | null>(null);
  const [soundOn, setSoundOn] = useState(true);
  const [timer, setTimer] = useState(15);
  const spin = useRef(new Animated.Value(0)).current;

  const active = currentPlayer();

  useEffect(() => {
    if (!visible) return;
    setTimer(15);
    setResult(game?.lastDiceValue ?? null);
    const id = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [visible, game]);

  const doRoll = () => {
    Animated.timing(spin, { toValue: 1, duration: 500, easing: Easing.out(Easing.quad), useNativeDriver: true }).start(() => spin.setValue(0));
    const value = roll();
    setResult(value);
  };

  const hasMove = !!game && result != null && active != null && game.tokens.some((t) => t.color === active.color && canMoveToken(t, result));

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  if (!game || !active) return null;

  return (
    <Modal visible={visible} transparent animationType='fade'>
      {/* Game Overlay Backdrop */}
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          {/* Turn Indicator Banner */}
          <View style={[styles.banner, { backgroundColor: playerColorHex[active.color] }]}>
            <Text style={styles.bannerText}>{active.name}, it's your turn!</Text>
          </View>

          {/* Player Order Strip */}
          <View style={styles.orderStrip}>
            {game.players.map((p, i) => (
              <View key={p.id} style={[styles.orderItem, i === game.currentTurnIndex && styles.orderActive]}>
                <Avatar name={p.name} color={p.color} size={34} />
              </View>
            ))}
          </View>

          {/* Dice Display Area */}
          <Animated.View style={[styles.diceArea, { transform: [{ rotate }] }]}>
            <DiceButton value={result} onPress={doRoll} disabled={result != null && !hasMove ? false : false} />
          </Animated.View>

          {/* Turn Timer (ring simulated with text) */}
          <Text style={styles.timer}>\u23F1 {timer}s</Text>

          {/* Result Feedback */}
          {result != null && (
            <Text style={styles.result}>{hasMove ? `Rolled ${result} \u2014 tap a token to move.` : `Rolled ${result} \u2014 no valid moves.`}</Text>
          )}

          {/* Roll Action Zone */}
          <Button label={result == null ? 'Roll Dice' : hasMove ? 'Play' : 'Continue'} onPress={result == null ? doRoll : onClose} style={styles.rollBtn} />

          {/* Utility Controls */}
          <View style={styles.utils}>
            <Pressable onPress={() => setSoundOn((s) => !s)}><Text style={styles.util}>{soundOn ? '\u{1F50A} Sound' : '\u{1F507} Muted'}</Text></Pressable>
            <Pressable onPress={() => { skipTurn(); onClose(); }}><Text style={styles.util}>\u23ED Skip Turn</Text></Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: '#00000099', justifyContent: 'center', padding: spacing.lg },
  sheet: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, alignItems: 'center', gap: spacing.md },
  banner: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, borderRadius: radius.pill },
  bannerText: { color: '#fff', fontWeight: '800', fontSize: typography.heading },
  orderStrip: { flexDirection: 'row', gap: spacing.sm },
  orderItem: { opacity: 0.5 },
  orderActive: { opacity: 1, transform: [{ scale: 1.15 }] },
  diceArea: { padding: spacing.sm },
  timer: { color: colors.textMuted, fontSize: typography.body },
  result: { color: colors.text, textAlign: 'center' },
  rollBtn: { alignSelf: 'stretch' },
  utils: { flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch' },
  util: { color: colors.textMuted, fontWeight: '700' }
});
