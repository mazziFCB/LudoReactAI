import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, typography } from '@presentation/theme/theme';

export const Badge: React.FC<{ text: string; tone?: 'default' | 'danger' | 'gold' }> = ({ text, tone = 'default' }) => {
  const bg = tone === 'danger' ? colors.danger : tone === 'gold' ? colors.primary : colors.surfaceAlt;
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: radius.pill, alignSelf: 'flex-start' },
  text: { color: '#1b1035', fontWeight: '700', fontSize: typography.caption }
});
