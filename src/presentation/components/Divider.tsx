import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '@presentation/theme/theme';

export const Divider: React.FC = () => <View style={styles.line} />;

const styles = StyleSheet.create({
  line: { height: 1, backgroundColor: colors.surfaceAlt, marginVertical: spacing.md }
});
