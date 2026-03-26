import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Theme from '../../constants/theme';

// TODO (Agent 5): implement live navigation screen with MapLibre, real-time ETA,
//                 LiveNavBar, ETACard, and ConfidenceBadge
export default function NavigationScreen(): React.JSX.Element {
  const { routeId } = useLocalSearchParams<{ routeId: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Live Navigation — Route {routeId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.Colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    fontFamily: Theme.Typography.fontBody,
    color: Theme.Colors.textSecondary,
  },
});
