import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Theme from '../../constants/theme';

// TODO (Agent 6): implement post-run summary with PostRunSummary component,
//                 ETA accuracy delta, and run persistence
export default function PostRunScreen(): React.JSX.Element {
  const { runId } = useLocalSearchParams<{ runId: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Post-Run Summary — {runId}</Text>
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
