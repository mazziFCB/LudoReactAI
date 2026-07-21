import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@presentation/navigation/types';
import { colors, spacing, typography, radius } from '@presentation/theme/theme';
import { Button } from '@presentation/components/Button';
import { IconButton } from '@presentation/components/IconButton';
import { Avatar } from '@presentation/components/Avatar';
import { Badge } from '@presentation/components/Badge';
import { Card } from '@presentation/components/Card';
import { Toggle } from '@presentation/components/Toggle';
import { ProgressBar } from '@presentation/components/ProgressBar';
import { Divider } from '@presentation/components/Divider';
import { useGameStore } from '@application/store/gameStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { hasSavedGame, refreshSaved, resumeGame } = useGameStore();
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    refreshSaved();
  }, [refreshSaved]);

  const onResume = async () => {
    const ok = await resumeGame();
    if (ok) navigation.navigate('GameBoard');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Background Layer */}
      <View style={styles.bgGlow} pointerEvents='none' />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header / Branding */}
        <View style={styles.header}>
          <Text style={styles.brand}>LUDO</Text>
          <IconButton glyph='\u2699' label='settings' onPress={() => {}} />
        </View>
        <Text style={styles.tagline}>Offline 4-player turn-based classic</Text>

        {/* Player Profile Strip */}
        <Card style={styles.profile}>
          <Avatar name='You' color='blue' />
          <View style={styles.profileMeta}>
            <Text style={styles.profileName}>Guest Player</Text>
            <ProgressBar value={0.4} />
            <Text style={styles.level}>Level 4</Text>
          </View>
          <Badge text='NEW' tone='gold' />
        </Card>

        {/* Primary Action Zone */}
        <View style={styles.actions}>
          <Button label='New Game' onPress={() => navigation.navigate('GameSetup')} />
          <Button label={hasSavedGame ? 'Resume Game' : 'No Saved Game'} variant='secondary' disabled={!hasSavedGame} onPress={onResume} style={styles.gap} />
        </View>

        <Divider />

        {/* Daily Rewards Banner */}
        <Card style={styles.rewards}>
          <Text style={styles.rewardTitle}>\u{1F381} Daily Reward Ready</Text>
          <Text style={styles.rewardSub}>Claim 200 coins for logging in today.</Text>
          <Button label='Claim' onPress={() => {}} style={styles.claim} />
        </Card>

        {/* Secondary Navigation + Settings */}
        <Card style={styles.settings}>
          <Toggle label='Sound Effects' value={soundOn} onChange={setSoundOn} />
        </Card>

        {/* Footer / System Info */}
        <Text style={styles.footer}>v1.0.0 \u2022 Offline Mode</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  bgGlow: { position: 'absolute', top: -80, right: -80, width: 260, height: 260, borderRadius: 130, backgroundColor: colors.primary, opacity: 0.15 },
  content: { padding: spacing.lg, gap: spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { color: colors.primary, fontSize: 40, fontWeight: '900', letterSpacing: 4 },
  tagline: { color: colors.textMuted, fontSize: typography.body },
  profile: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  profileMeta: { flex: 1, gap: 4 },
  profileName: { color: colors.text, fontWeight: '700', fontSize: typography.heading },
  level: { color: colors.textMuted, fontSize: typography.caption },
  actions: { marginTop: spacing.sm },
  gap: { marginTop: spacing.sm },
  rewards: { backgroundColor: colors.surfaceAlt, gap: 6 },
  rewardTitle: { color: colors.text, fontWeight: '800', fontSize: typography.heading },
  rewardSub: { color: colors.textMuted },
  claim: { marginTop: spacing.sm },
  settings: { borderRadius: radius.md },
  footer: { textAlign: 'center', color: colors.textMuted, fontSize: typography.caption, marginTop: spacing.md }
});
