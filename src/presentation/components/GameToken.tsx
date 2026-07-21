import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { playerColorHex } from '@presentation/theme/theme';
import { Token, FINISH, HOME_BASE } from '@domain/entities/Token';

interface Props {
  token: Token;
  movable: boolean;
  onPress: () => void;
}

export const GameToken: React.FC<Props> = ({ token, movable, onPress }) => {
  const label = token.position === HOME_BASE ? 'H' : token.position === FINISH ? '\u2605' : String(token.position);
  return (
    <Pressable onPress={onPress} disabled={!movable} style={[styles.token, { backgroundColor: playerColorHex[token.color] }, movable && styles.movable]}>
      <View style={styles.inner} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  token: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', margin: 4, borderWidth: 2, borderColor: '#ffffff55' },
  movable: { borderColor: '#fff', transform: [{ scale: 1.1 }] },
  inner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#ffffffcc' }
});
