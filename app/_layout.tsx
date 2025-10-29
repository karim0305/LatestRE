// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0B1F3A' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
          headerShown: false,
        }}
      >
        {/* Only one screen, index */}
        <Stack.Screen
          name="index"
          options={{ title: 'Home' }}
        />
      </Stack>
    </>
  );
}
