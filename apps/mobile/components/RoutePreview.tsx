import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../constants/theme';
import type { RouteSegment } from '../types';

interface RoutePreviewProps {
  segments: RouteSegment[];
  totalDistanceMeters: number;
}

// TODO (Agent 5): render MapLibre static preview of the route polyline
export function RoutePreview({
  segments,
  totalDistanceMeters,
}: RoutePreviewProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.distance}>{(totalDistanceMeters / 1000).toFixed(2)} km</Text>
      <Text style={styles.segments}>{segments.length} segments</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.Colors.surfaceCard,
    borderRadius: Theme.BorderRadius.md,
    padding: Theme.Spacing.base,
    minHeight: 160,
    justifyContent: 'flex-end',
  },
  distance: {
    fontFamily: Theme.Typography.fontDisplay,
    fontSize: 24,
    color: Theme.Colors.textPrimary,
  },
  segments: {
    fontFamily: Theme.Typography.fontBody,
    fontSize: 13,
    color: Theme.Colors.textSecondary,
  },
});
