import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../../constants/theme';

// TODO (Agent 6): implement run history list with post-run summaries
export default function HistoryScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Run History</Text>
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
