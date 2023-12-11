import { View } from "react-native";
import { HomeStyles } from "../styles/styles";
import { Redirect } from "expo-router";

export default function Page() {
  return (
    <Redirect href="/Auth/login" />
  );
}

