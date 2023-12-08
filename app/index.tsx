import { Text, View } from "react-native";
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
            href="/NewsFeeds/News"
            style={{ borderColor: "red", borderWidth: 1 }}
          >
            Go to News Feeds Page
          </Link>
          <Link
            href="/GreenHouse/data"
            style={{ borderColor: "red", borderWidth: 1 }}
          >
            Go to Display
          </Link>
        </VStack>
      </View>
    </View>
  );
}
