import { View, Heading } from "native-base";
import { ScrollView } from "native-base";
import { Slot } from "expo-router";

export default function NewsFeedLayout() {
  return (
    <View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
        padding="2"
        marginTop="3"
      >
        <Slot />
      </ScrollView>
    </View >
  )
}
