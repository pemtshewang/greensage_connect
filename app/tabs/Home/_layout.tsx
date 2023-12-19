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
            <SafeAreaView
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                }}
              >
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