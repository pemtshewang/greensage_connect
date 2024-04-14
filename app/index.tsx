import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Animated, Image } from "react-native";
import { useFonts } from "expo-font";
import { checkLogin } from "../utils/session";
import AnimatedSpinner from "../components/AnimatedSpinner";
import { Redirect } from "expo-router";

const AnimationComponent = () => {
  const [animValue] = useState(new Animated.Value(0));
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  useEffect(() => {
    const animation = Animated.sequence([
      Animated.timing(animValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 0.8,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 0.8,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);
    animation.start();
  }, []);

  const interpolatedOpacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const interpolatedScale = animValue.interpolate({
    inputRange: [0.5, 1.5],
    outputRange: [0.5, 1.0],
  });

  return (
    <AnimatedImage
      source={require("../assets/first.gif")}
      width={400}
      height={400}
      style={{
        opacity: interpolatedOpacity,
        transform: [{ scale: interpolatedScale }],
      }}
      resizeMode="contain"
    />
  );
};

// main app
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [fontsLoaded, fontError] = useFonts({
    OpenSans: require("../assets/OpenSans.ttf"),
  });

  async function checkAuth() {
    const isLoggedIn = await checkLogin();
    setLoggedIn(isLoggedIn);
    setLoading(false);
  }

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        if (fontsLoaded) {
          setAppIsReady(true);
        }
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      checkAuth();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AnimationComponent />
      </View>
    );
  }

  if (appIsReady && loading) {
    return (
      <AnimatedSpinner message="Please wait while the app loads your configs" />
    );
  }

  if (!loading && appIsReady && !isLoggedIn) {
    return <Redirect href="/Auth/login" />;
  }

  if (!loading && appIsReady && isLoggedIn) {
    return <Redirect href="/tabs/Home" />;
  }
}
