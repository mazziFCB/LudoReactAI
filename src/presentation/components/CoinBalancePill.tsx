import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from '@presentation/theme/theme';

export const CoinBalancePill: React.FC<{ amount: number }> = ({ amount }) => (
  <View style={styles.pill}>
    <Text style={styles.coin}>\u{1F4B0}</Text>
    <Text style={styles.amount}>{amount.toLocaleString()}</Text>
  </View>
);

const styles = StyleSheet.create({
  pill: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceAlt, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 5 },
  coin: { marginRight: 6 },
  amount: { color: colors.primary, fontWeight: '800' }
});
