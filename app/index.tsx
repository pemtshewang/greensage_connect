import { ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { getValueFor } from "../securestore";
import LoaderScreen from "../components/LoaderSplash";
import { Animated, Image, View } from "react-native";
import { useFonts } from "expo-font";
import Entypo from "@expo/vector-icons/Entypo";
import * as Font from "expo-font";

async function checkLogin() {
  const value = await getValueFor("token");
  if (value) {
    try {
      const parsedValue = JSON.parse(value as string);
      const token = parsedValue.accessToken?.token;
      if (token) {
        const expiresAt = new Date(parsedValue.accessToken.expiresAt);
        const currentTime = new Date();
        if (expiresAt > currentTime) {
          return true;
        } else {
          alert("Session Expired");
          return false;
        }
      }
    } catch (err) {
      return false;
    }
  }
  return false;
}

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
      source={require("../assets/splashscreenlogo.gif")}
      width={280}
      height={280}
      style={{
        opacity: interpolatedOpacity,
        transform: [{ scale: interpolatedScale }],
      }}
      resizeMode="contain"
    />
  );
};

export default function Page() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    OpenSans: require("../assets/OpenSans.ttf"),
  });
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise((resolve) => setTimeout(resolve, 4000));
        setAppIsReady(true);
        async function checkAuth() {
          const isLoggedIn = await checkLogin();
          setLoggedIn(isLoggedIn);
        }
        checkAuth();
        setTimeout(() => {
          setLoading(false);
        }, 1700);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);
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
  if (loading) {
    return <LoaderScreen message="Checking User Session" />;
  }
  if (loggedIn === null) {
    return <ActivityIndicator />;
  }
  if (!loggedIn) {
    return <Redirect href="/Auth/login" />;
  }
  return <Redirect href="/tabs/Home" />;
}
