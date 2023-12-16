import { View, Heading } from "native-base";
import { ScrollView } from "native-base";
import { Slot } from "expo-router";
import WeatherContainer from "../../../components/WeatherContainer";

export default function NewsFeedLayout() {
  return (
    <View>
      <View style={{
        padding: 10,
        alignItems: 'left',
      }}
      >
        <WeatherContainer />
      </View>
        <Slot />
    </View >
  )
}
