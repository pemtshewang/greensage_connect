import { Slot } from "expo-router";
import { NativeBaseProvider } from "native-base";
import CustomStatusBar from "../components/Statusbar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeLayout() {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <CustomStatusBar style="auto" />
        <Slot />
      </SafeAreaView>
    </NativeBaseProvider>
  )
}
