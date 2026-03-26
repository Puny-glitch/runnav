import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../constants/theme';
import type { ConfidenceLevel } from '../types';

interface ConfidenceBadgeProps {
  confidence: ConfidenceLevel;
}

const confidenceColor: Record<ConfidenceLevel, string> = {
  high: Theme.Colors.confidenceHigh,
  medium: Theme.Colors.confidenceMid,
  low: Theme.Colors.confidenceLow,
};

// TODO (Agent 5): add animated pulse effect for live updates
export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps): React.JSX.Element {
  return (
    <View style={[styles.badge, { backgroundColor: confidenceColor[confidence] }]}>
      <Text style={styles.label}>{confidence.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: Theme.BorderRadius.xl,
    paddingHorizontal: Theme.Spacing.sm,
    paddingVertical: Theme.Spacing.xs,
    minHeight: Theme.MinTouchTarget / 2,
    justifyContent: 'center',
  },
  label: {
    fontFamily: Theme.Typography.fontBody,
    fontSize: 11,
    fontWeight: '700',
    color: Theme.Colors.surfaceDark,
    letterSpacing: 0.8,
  },
});
