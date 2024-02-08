import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { View } from "native-base";
import WeatherContainer from "../../../components/WeatherContainer";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        header: (props) => {
          return (
            <SafeAreaView>
              <View>
                <WeatherContainer />
              </View>
            </SafeAreaView>
          );
        },
      }}
    />
  );
};
export default Layout;
