import React, { useEffect, useState } from "react";
import {
  View,
  Animated,
  Image,
  ImageBackground,
} from "react-native";
import { useFonts } from "expo-font";
import AnimatedSpinner from "../components/AnimatedSpinner";
import { Redirect, useRouter } from "expo-router";
import Onboarding from "react-native-onboarding-swiper";
import { getValueFor } from "../securestore";
import { save } from "../securestore";
import { Text } from "native-base";
import { ArrowRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

// Helper functions to interact with SecureStore

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

// Onboarding screens
const onboardingPages = [
  {
    image: (
      <Image
        source={require("../assets/logo.png")}
        style={{
          width: 250,
          height: 250,
          marginLeft: 25,
        }}
      />
    ),
    title: "Greensage Connect",
    subtitle: "An Innovative IoT mobile app to automate your greenhouse",
    titleStyles: {
      fontWeight: "bold"
    },
  },
  {
    image: <Image source={require('../assets/background/onboardsecond.png')} 
    style={{ 
          width: 250,
          height: 250,
      }} />,
    title: "Cultivate Smartly, Grow Effortlessly",
    titleStyles:{
      fontSize:22,
      fontWeight: 'bold'
    },
    subtitle: "Monitor soil moisture, adjust climate, and automate irrigation – all from your smartphone. Whether you're tending to tomatoes or cultivating cucumbers, our app puts expert-level control at your fingertips",
  },
  {
    image: <Image source={require('../assets/background/onboardthird.png')} 
    style={{ width: 250, height: 250 }} />,
    title: "Your Smart Greenhouse Awaits",
    titleStyles:{
      fontSize:22,
      fontWeight: 'bold'
    },
    subtitle: "Greenage Connect is ready to transform your greenhouse experience\nJoin thousands of smart gardeners and start cultivating success today.",
  },
];

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useFonts({
    OpenSans: require("../assets/OpenSans.ttf"),
  });
  const [onboardingCompleted, setOnboardingCompleted] = useState<
    boolean | null
  >(null);

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
      // Start loading and check session and onboarding status
      setLoading(true);
      async function checkSession() {
        try {
          const token = await getValueFor("token");
          setLoggedIn(!!token); // Set logged in status based on token presence
          const onboardingStatus = await getValueFor("onboardingCompleted");
          setOnboardingCompleted(onboardingStatus === "true");
        } catch (error) {
          console.error("Error fetching data from SecureStore", error);
          setLoggedIn(false);
        } finally {
          setLoading(false); // Stop loading once checks are complete
        }
      }
      checkSession();
    }
  }, [appIsReady]);
  const router = useRouter();

  const handleOnboardingFinish = async () => {
    await save("onboardingCompleted", "true");
    setOnboardingCompleted(true); router.replace("/Auth/register")
  };

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

  if (onboardingCompleted === false) {
    return (
      <ImageBackground
        style={{
          flex: 1,
          zIndex:1,
        }}
        source={require("../assets/background/onboardfirst.png")}
      >
        <Onboarding
          skipLabel={
            <LinearGradient
              style={{
                borderRadius: 5,
                padding: 10,
              }}
              colors={["#228929", "#6A4"]}
            >
              <Text color="#fff">Skip</Text>
            </LinearGradient>
          }
          nextLabel={
            <LinearGradient
              style={{
                borderRadius: 5,
                padding: 10,
              }}
              colors={["#228929", "#6A4"]}
            >
              <ArrowRight color="white" />
            </LinearGradient>
          }
          //@ts-ignore
          pages={onboardingPages}
          onDone={handleOnboardingFinish}
          bottomBarHighlight={false}
        />
      </ImageBackground>
    );
  }

  if (isLoggedIn === false && appIsReady) {
    return <Redirect href="/Auth/login" />;
  }

  if (isLoggedIn === true && appIsReady) {
    return <Redirect href="/tabs/Home" />;
  }

  return null; // Fallback in case none of the conditions match
}
