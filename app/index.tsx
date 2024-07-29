import React, { useEffect, useState } from "react";
import { View, Animated, Image } from "react-native";
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
    ]);
    animation.start();
  }, [animValue]);

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

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [fontsLoaded] = useFonts({
    OpenSans: require("../assets/OpenSans.ttf"),
  });

  // necessary for loading animation
  useEffect(() => {
    async function prepare() {
      setTimeout(() => {
        setAppIsReady(true);
      }, 2000);
    }
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      // if app loaded all fonts, then start setLoading to true then to false based on the logged in information
      setLoading(true);
      async function checkSession() {
        const res = await checkLogin();
        setLoggedIn(res);
        setLoading(false);
      }
      checkSession();
    }
  }, [appIsReady]);

  if (!appIsReady || loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <AnimatedSpinner message="Please wait while the app loads your configs" />
        ) : (
          <AnimationComponent />
        )}
      </View>
    );
  }

  if (isLoggedIn === false && appIsReady) {
    return <Redirect href="/Auth/login" />;
  }

  if (isLoggedIn === true && appIsReady) {
    return <Redirect href="/tabs/Home" />;
  }

  return null;
}
