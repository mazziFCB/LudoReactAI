import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, radius } from '@presentation/theme/theme';

export const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
  <View style={styles.track}>
    <View style={[styles.fill, { width: `${Math.max(0, Math.min(1, value)) * 100}%` }]} />
  </View>
);

const styles = StyleSheet.create({
  track: { height: 8, borderRadius: radius.pill, backgroundColor: colors.surfaceAlt, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: colors.primary }
});
