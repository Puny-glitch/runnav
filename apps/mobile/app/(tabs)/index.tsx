import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../../constants/theme';

// TODO (Agent 5): implement MapLibre GL map with Stadia tiles, route drawing,
//                 and ETA overlay
export default function MapScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Map / Home</Text>
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
