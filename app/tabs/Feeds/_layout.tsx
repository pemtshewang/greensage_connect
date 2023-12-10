import { View } from "native-base";
import { ScrollView } from "native-base";
import { Slot } from "expo-router";

export default function NewsFeedLayout() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
    >
      <View paddingX="0" >
        <Slot />
      </View>
    </ScrollView>
  )
}
