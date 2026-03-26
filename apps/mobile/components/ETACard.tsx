import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../constants/theme';
import type { ETAResult } from '../types';

interface ETACardProps {
  eta: ETAResult;
}

// TODO (Agent 5): implement full ETACard with animated countdown, confidence badge,
//                 and segment breakdown
export function ETACard({ eta }: ETACardProps): React.JSX.Element {
  const minutes = Math.floor(eta.totalEtaSeconds / 60);
  const seconds = eta.totalEtaSeconds % 60;

  return (
    <View style={styles.card}>
      <Text style={styles.eta}>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.Colors.surfaceCard,
    borderRadius: Theme.BorderRadius.md,
    padding: Theme.Spacing.base,
    alignItems: 'center',
    minHeight: Theme.MinTouchTarget,
  },
  eta: {
    fontFamily: Theme.Typography.fontDisplay,
    fontSize: 48,
    color: Theme.Colors.textPrimary,
  },
});
