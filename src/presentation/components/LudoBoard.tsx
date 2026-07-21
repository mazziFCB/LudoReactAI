import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, radius, playerColorHex } from '@presentation/theme/theme';

// Simplified visual board: four colored corner bases + a central cross.
export const LudoBoard: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <View style={styles.board}>
    <View style={styles.row}>
      <View style={[styles.base, { backgroundColor: playerColorHex.red }]} />
      <View style={styles.corridor} />
      <View style={[styles.base, { backgroundColor: playerColorHex.green }]} />
    </View>
    <View style={styles.row}>
      <View style={styles.corridor} />
      <View style={styles.center} />
      <View style={styles.corridor} />
    </View>
    <View style={styles.row}>
      <View style={[styles.base, { backgroundColor: playerColorHex.blue }]} />
      <View style={styles.corridor} />
      <View style={[styles.base, { backgroundColor: playerColorHex.yellow }]} />
    </View>
    <View style={styles.overlay} pointerEvents='box-none'>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  board: { aspectRatio: 1, width: '100%', backgroundColor: colors.surface, borderRadius: radius.md, overflow: 'hidden' },
  row: { flex: 1, flexDirection: 'row' },
  base: { flex: 1, margin: 4, borderRadius: radius.sm, opacity: 0.85 },
  corridor: { flex: 1, margin: 4, backgroundColor: colors.surfaceAlt, borderRadius: radius.sm },
  center: { flex: 1, margin: 4, backgroundColor: colors.primary, borderRadius: radius.sm },
  overlay: { ...StyleSheet.absoluteFillObject, padding: 8 }
});
