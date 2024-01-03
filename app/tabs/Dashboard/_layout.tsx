import { View } from "native-base";
import { ScrollView } from "native-base";
import { Slot } from "expo-router";

export default function NewsFeedLayout() {
  return (
    <View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
      >
        <Slot />
      </ScrollView>
    </View >
  )
}
