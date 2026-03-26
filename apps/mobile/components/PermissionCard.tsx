import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Theme from '../constants/theme';

interface PermissionCardProps {
  title: string;
  description: string;
  isGranted: boolean;
  onRequest: () => void;
}

// TODO (Agent 2): integrate with expo-location and expo-sensors permission APIs
export function PermissionCard({
  title,
  description,
  isGranted,
  onRequest,
}: PermissionCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      {!isGranted && (
        <Pressable
          style={styles.button}
          onPress={onRequest}
          accessibilityRole="button"
          accessibilityLabel={`Grant ${title} permission`}
        >
          <Text style={styles.buttonText}>Allow</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.Colors.surfaceCard,
    borderRadius: Theme.BorderRadius.md,
    padding: Theme.Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.Spacing.base,
    minHeight: Theme.MinTouchTarget,
  },
  textBlock: { flex: 1 },
  title: {
    fontFamily: Theme.Typography.fontHeading,
    fontSize: 15,
    color: Theme.Colors.textPrimary,
    marginBottom: Theme.Spacing.xs,
  },
  description: {
    fontFamily: Theme.Typography.fontBody,
    fontSize: 13,
    color: Theme.Colors.textSecondary,
  },
  button: {
    backgroundColor: Theme.Colors.brandPrimary,
    borderRadius: Theme.BorderRadius.sm,
    paddingHorizontal: Theme.Spacing.md,
    paddingVertical: Theme.Spacing.sm,
    minHeight: Theme.MinTouchTarget,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: Theme.Typography.fontBody,
    fontSize: 14,
    fontWeight: '600',
    color: Theme.Colors.surfaceDark,
  },
});
