import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, radius } from '@presentation/theme/theme';

const FACES = ['', '\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];

interface Props {
  value: number | null;
  onPress: () => void;
  disabled?: boolean;
}

export const DiceButton: React.FC<Props> = ({ value, onPress, disabled }) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    style={({ pressed }) => [styles.dice, pressed && styles.pressed, disabled && styles.disabled]}
  >
    <Text style={styles.face}>{value ? FACES[value] : '\u2680'}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  dice: {
    width: 88,
    height: 88,
    borderRadius: radius.lg,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.5 },
  face: { fontSize: 64, color: colors.background, lineHeight: 70 }
});
