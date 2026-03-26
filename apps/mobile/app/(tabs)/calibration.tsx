import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../../constants/theme';

// TODO (Agent 3): implement full calibration hub — mode selection, rep recording,
//                 quality score display, profile management
export default function CalibrationScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Calibration Hub</Text>
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
