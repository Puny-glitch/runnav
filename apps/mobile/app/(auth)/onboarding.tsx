import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../../constants/theme';

// TODO (Agent 2): implement onboarding carousel with permissions flow
export default function OnboardingScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to RunNav</Text>
      <Text style={styles.subtitle}>Personalised ETAs for every run</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.Colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.Spacing.base,
  },
  title: {
    fontFamily: Theme.Typography.fontHeading,
    fontSize: 28,
    color: Theme.Colors.textPrimary,
    marginBottom: Theme.Spacing.sm,
  },
  subtitle: {
    fontFamily: Theme.Typography.fontBody,
    fontSize: 16,
    color: Theme.Colors.textSecondary,
  },
});
