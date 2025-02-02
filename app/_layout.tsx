import React from "react";

import { Slot, Stack } from "expo-router";

import { View, Text } from "react-native";

import "../global.css";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="/search/[query]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
