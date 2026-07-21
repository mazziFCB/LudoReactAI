import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { colors, radius, typography } from '@presentation/theme/theme';

interface Props {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

export const Toggle: React.FC<Props> = ({ label, value, onChange }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Pressable onPress={() => onChange(!value)} style={[styles.track, value && styles.trackOn]}>
      <View style={[styles.knob, value && styles.knobOn]} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
  label: { color: colors.text, fontSize: typography.body },
  track: { width: 48, height: 28, borderRadius: radius.pill, backgroundColor: colors.surfaceAlt, padding: 3 },
  trackOn: { backgroundColor: colors.green },
  knob: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#fff' },
  knobOn: { alignSelf: 'flex-end' }
});
