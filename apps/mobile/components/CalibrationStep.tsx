import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../constants/theme';
import type { CarriageMode } from '../types';

interface CalibrationStepProps {
  mode: CarriageMode;
  stepNumber: number;
  totalSteps: number;
  instruction: string;
  onComplete?: () => void;
}

// TODO (Agent 3): implement animated progress, sensor visualisation, and step transitions
export function CalibrationStep({
  mode: _mode,
  stepNumber,
  totalSteps,
  instruction,
}: CalibrationStepProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.progress}>{stepNumber} / {totalSteps}</Text>
      <Text style={styles.instruction}>{instruction}</Text>
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
  progress: {
    fontFamily: Theme.Typography.fontBody,
    fontSize: 13,
    color: Theme.Colors.textSecondary,
  },
  instruction: {
    fontFamily: Theme.Typography.fontHeading,
    fontSize: 18,
    color: Theme.Colors.textPrimary,
  },
});
