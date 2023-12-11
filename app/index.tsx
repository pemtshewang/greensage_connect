import { View } from "react-native";
import { Heading } from "native-base";
import { Link } from "expo-router";
import { HomeStyles } from "../styles/styles";
import { VStack } from "native-base";

export default function Page() {
  return (
    <View style={HomeStyles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Heading>AMTC greenhouse application</Heading>
        <VStack space={5}>
          <Link
            href="/Auth/login"
            style={{ borderColor: "red", borderWidth: 1 }}
          >
            Go to Login Page
          </Link>
          <Link
            href="/Auth/register"
            style={{ borderColor: "red", borderWidth: 1 }}
          >
            Go to Register Page
          </Link>
          <Link
            href="/tabs"
            style={{ borderColor: "red", borderWidth: 1 }}
          >
            Go To Tabs
          </Link>
          <Link
            href="/Auth/splashscreen"
            style={{ borderColor: "red", borderWidth: 1 }}
          >
            Go To SplashScreen
          </Link>
        </VStack>
      </View>
    </View>
  );
}
