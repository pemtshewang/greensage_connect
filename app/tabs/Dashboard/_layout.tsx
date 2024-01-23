import { View } from "native-base";
import { ScrollView } from "native-base";
import { Slot } from "expo-router";

export default function NewsFeedLayout() {
  return (
    <View>
      <ScrollView>
        <Slot />
      </ScrollView>
    </View >
  )
}
