import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, radius } from '@presentation/theme/theme';

interface Props {
  glyph: string;
  onPress: () => void;
  label?: string;
}

export const IconButton: React.FC<Props> = ({ glyph, onPress, label }) => (
  <Pressable accessibilityRole='button' accessibilityLabel={label} onPress={onPress} style={styles.btn}>
    <Text style={styles.glyph}>{glyph}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  btn: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center'
  },
  glyph: { fontSize: 20, color: colors.text }
});
