import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from './Avatar';
import { colors, radius, spacing, typography } from '@presentation/theme/theme';
import { Player } from '@domain/entities/Player';

interface Props {
  player: Player;
  active?: boolean;
  tokensHome: number;
}

export const PlayerCard: React.FC<Props> = ({ player, active, tokensHome }) => (
  <View style={[styles.card, active && styles.active]}>
    <Avatar name={player.name} color={player.color} size={36} />
    <View style={styles.meta}>
      <Text style={styles.name} numberOfLines={1}>{player.name}</Text>
      <Text style={styles.sub}>{tokensHome}/4 home</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.sm, minWidth: 130 },
  active: { borderWidth: 2, borderColor: colors.primary },
  meta: { marginLeft: spacing.sm, flexShrink: 1 },
  name: { color: colors.text, fontWeight: '700', fontSize: typography.body },
  sub: { color: colors.textMuted, fontSize: typography.caption }
});
