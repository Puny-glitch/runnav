import React from 'react';
import { Tabs } from 'expo-router';
import Theme from '../../constants/theme';

// TODO (Agent 2): add tab icons (using expo/vector-icons or custom SVGs)
export default function TabsLayout(): React.JSX.Element {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Theme.Colors.surfaceCard,
          borderTopColor: '#2A2A2A',
        },
        tabBarActiveTintColor: Theme.Colors.brandPrimary,
        tabBarInactiveTintColor: Theme.Colors.textSecondary,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Map' }} />
      <Tabs.Screen name="calibration" options={{ title: 'Calibrate' }} />
      <Tabs.Screen name="history" options={{ title: 'History' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
