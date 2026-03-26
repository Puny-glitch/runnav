import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../../constants/theme';

// TODO (Agent 2): implement sign-up form with Supabase auth
export default function SignupScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
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
    fontSize: 24,
    color: Theme.Colors.textPrimary,
  },
});
