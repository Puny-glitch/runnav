import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../constants/theme';
import type { Run } from '../types';

interface PostRunSummaryProps {
  run: Run;
  etaDeltaSeconds: number; // positive = ran slower than predicted
}

// TODO (Agent 6): implement full post-run summary with pace chart, segment
//                 breakdown, and calibration improvement prompt
export function PostRunSummary({
  run,
  etaDeltaSeconds,
}: PostRunSummaryProps): React.JSX.Element {
  const accuracy = Math.abs(etaDeltaSeconds);
  const deltaSign = etaDeltaSeconds >= 0 ? '+' : '-';

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Run Complete</Text>
      <Text style={styles.delta}>
        ETA delta: {deltaSign}{accuracy}s
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.Colors.surfaceCard,
    borderRadius: Theme.BorderRadius.md,
    padding: Theme.Spacing.lg,
    gap: Theme.Spacing.sm,
  },
  heading: {
    fontFamily: Theme.Typography.fontHeading,
    fontSize: 22,
    color: Theme.Colors.textPrimary,
  },
  delta: {
    fontFamily: Theme.Typography.fontDisplay,
    fontSize: 18,
    color: Theme.Colors.brandSecondary,
  },
});
