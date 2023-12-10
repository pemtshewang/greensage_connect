import { View, Heading } from "native-base";
import { ScrollView } from "native-base";
import { Slot } from "expo-router";

export default function NewsFeedLayout() {
  return (
    <View>
      <View style={{
        backgroundColor: 'green',
        padding: 10,
        alignItems: 'left',
      }}
      >
        <Heading
          style={{
            color: 'white'
          }}
        >News Feed</Heading>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
      >
        <Slot />
      </ScrollView>
    </View >
  )
}
