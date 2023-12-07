import { Slot } from "expo-router";
import { NativeBaseProvider } from "native-base";
import CustomStatusBar from "../components/Statusbar";

export default function HomeLayout() {
  return (
    <NativeBaseProvider>
      <CustomStatusBar style="inverted" />
      <Slot />
    </NativeBaseProvider>
  )
}
