import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../../constants/theme';

// TODO (Agent 7): implement settings — account, subscription management,
//                 carriage mode default, data export (GDPR)
export default function SettingsScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Settings</Text>
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
