import { Redirect, Link } from "expo-router";
import { View } from "native-base";

export default function Page() {
  return (
    <View>
      <Link href="/tabs">Home</Link>
      <Link href="/Auth/login">Login Page</Link>
    </View>
  );
}

