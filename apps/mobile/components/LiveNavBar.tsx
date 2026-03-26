import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../constants/theme';
import type { ETAResult } from '../types';

interface LiveNavBarProps {
  eta: ETAResult;
  distanceRemainingMeters: number;
}

// TODO (Agent 5): implement collapsible nav bar with swipe gestures and
//                 MapLibre camera follow toggle
export function LiveNavBar({
  eta,
  distanceRemainingMeters,
}: LiveNavBarProps): React.JSX.Element {
  const km = (distanceRemainingMeters / 1000).toFixed(2);

  return (
    <View style={styles.bar}>
      <Text style={styles.distance}>{km} km</Text>
      <Text style={styles.eta}>{Math.ceil(eta.totalEtaSeconds / 60)} min</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: Theme.Colors.surfaceCard,
    padding: Theme.Spacing.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: Theme.MinTouchTarget,
  },
  distance: {
    fontFamily: Theme.Typography.fontDisplay,
    fontSize: 20,
    color: Theme.Colors.textPrimary,
  },
  eta: {
    fontFamily: Theme.Typography.fontDisplay,
    fontSize: 20,
    color: Theme.Colors.brandPrimary,
  },
});
