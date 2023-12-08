import { View } from "native-base";
import { ScrollView } from "native-base";
import { Slot, Stack } from "expo-router";

export default function NewsFeedLayout() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
      <View paddingX="0" >
        <View marginTop="4" >
          <Slot />
        </View >
      </View>
    </ScrollView>
  )
}
