import { Slot } from "expo-router";
import { NativeBaseProvider } from "native-base";
import CustomStatusBar from "../components/Statusbar";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { useFonts } from "expo-font";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function HomeLayout() {
  return (
    <NativeBaseProvider>
      <CustomStatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <Slot />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
