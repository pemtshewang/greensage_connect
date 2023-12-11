import { Text, View } from "react-native";
import { Heading } from "native-base";
import { Link } from "expo-router";
import { HomeStyles, notification } from "../styles/styles";
import { VStack } from "native-base";
import { Image } from "native-base";

export default function Page() {
  return (
    <View style={HomeStyles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Heading>AMTC greenhouse application</Heading>
        <Image source={{}}
            style= {notification.imageView}

        />
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
            href="/Auth/notification"
            style={{ borderColor: "red", borderWidth: 1 }}
          >
            Go To Notification
          </Link>


          <Link
            href="/tabs"
            style={{ borderColor: "red", borderWidth: 1 }}
          >
            Go To Tabs
          </Link>
        </VStack>
      </View>
    </View>
  );
}
