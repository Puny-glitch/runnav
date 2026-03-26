import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../constants/theme';
import type { User, CalibrationProfile } from '../types';

interface ProfileCardProps {
  user: User;
  activeProfile: CalibrationProfile | null;
}

// TODO (Agent 2): implement full profile card with avatar, calibration badge,
//                 and navigation to settings
export function ProfileCard({ user, activeProfile }: ProfileCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{user.displayName}</Text>
      <Text style={styles.mode}>
        {activeProfile ? `Mode: ${activeProfile.carriageMode}` : 'Not calibrated'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.Colors.surfaceCard,
    borderRadius: Theme.BorderRadius.md,
    padding: Theme.Spacing.base,
    minHeight: Theme.MinTouchTarget,
    justifyContent: 'center',
  },
  name: {
    fontFamily: Theme.Typography.fontHeading,
    fontSize: 18,
    color: Theme.Colors.textPrimary,
  },
  mode: {
    fontFamily: Theme.Typography.fontBody,
    fontSize: 13,
    color: Theme.Colors.textSecondary,
    marginTop: Theme.Spacing.xs,
  },
});
