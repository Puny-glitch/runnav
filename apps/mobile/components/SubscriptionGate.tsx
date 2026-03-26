import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Theme from '../constants/theme';

interface SubscriptionGateProps {
  children: React.ReactNode;
  isPro: boolean;
  featureName: string;
  onUpgrade: () => void;
}

// TODO (Agent 4): wire onUpgrade to RevenueCat paywall presentation
export function SubscriptionGate({
  children,
  isPro,
  featureName,
  onUpgrade,
}: SubscriptionGateProps): React.JSX.Element {
  if (isPro) {
    return <>{children}</>;
  }

  return (
    <View style={styles.gate}>
      <Text style={styles.heading}>Pro Feature</Text>
      <Text style={styles.body}>{featureName} requires RunNav Pro.</Text>
      <Pressable
        style={styles.button}
        onPress={onUpgrade}
        accessibilityRole="button"
        accessibilityLabel="Upgrade to Pro"
      >
        <Text style={styles.buttonText}>Upgrade to Pro</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  gate: {
    backgroundColor: Theme.Colors.surfaceCard,
    borderRadius: Theme.BorderRadius.md,
    padding: Theme.Spacing.lg,
    alignItems: 'center',
    gap: Theme.Spacing.sm,
  },
  heading: {
    fontFamily: Theme.Typography.fontHeading,
    fontSize: 20,
    color: Theme.Colors.textPrimary,
  },
  body: {
    fontFamily: Theme.Typography.fontBody,
    fontSize: 14,
    color: Theme.Colors.textSecondary,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Theme.Colors.brandSecondary,
    borderRadius: Theme.BorderRadius.md,
    paddingHorizontal: Theme.Spacing.lg,
    paddingVertical: Theme.Spacing.sm,
    minHeight: Theme.MinTouchTarget,
    justifyContent: 'center',
    marginTop: Theme.Spacing.sm,
  },
  buttonText: {
    fontFamily: Theme.Typography.fontBody,
    fontSize: 15,
    fontWeight: '700',
    color: Theme.Colors.textPrimary,
  },
});
