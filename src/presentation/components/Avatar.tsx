import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, playerColorHex } from '@presentation/theme/theme';

interface Props {
  name: string;
  color?: string;
  size?: number;
}

export const Avatar: React.FC<Props> = ({ name, color, size = 44 }) => {
  const bg = color ? playerColorHex[color] ?? color : colors.surfaceAlt;
  const initial = name.trim().charAt(0).toUpperCase() || '?';
  return (
    <View style={[styles.wrap, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg }]}>
      <Text style={[styles.initial, { fontSize: size * 0.4 }]}>{initial}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.background, borderRadius: radius.pill },
  initial: { color: '#fff', fontWeight: '800' }
});
