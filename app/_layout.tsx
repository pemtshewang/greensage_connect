import { Slot } from "expo-router";
import { NativeBaseProvider } from "native-base";
import CustomStatusBar from "../components/Statusbar";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Animated, Image, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as Font from "expo-font";
import * as Notifications from "expo-notifications";
import { useFonts } from "expo-font";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function HomeLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const [fontsLoaded, fontError] = useFonts({
    OpenSans: require("../assets/OpenSans.ttf"),
  });
  const [animValue] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 1, // Fade in
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 0.8, // Enlarge
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 0.8, // Shrink
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => Animated.loop(this.animation).start());
  }, []);

  const interpolatedOpacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const interpolatedScale = animValue.interpolate({
    inputRange: [0.5, 1.5],
    outputRange: [0.5, 1.0], // Adjust scale range here
  });

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate loading
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  if (!appIsReady && !fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AnimatedImage
          source={require("../assets/splashscreenlogo.gif")}
          width={280}
          height={280}
          style={{
            opacity: interpolatedOpacity,
            transform: [{ scale: interpolatedScale }],
          }}
          resizeMode="contain"
        />
      </View>
    );
  }
  return (
    <NativeBaseProvider>
      <CustomStatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <Slot />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
