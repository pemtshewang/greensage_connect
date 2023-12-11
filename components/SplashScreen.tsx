import React, { useCallback, useEffect, useState } from 'react';
import { Animated, Image, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();

const CustomSplashScreen = ({ children }: { children: React.ReactNode }) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const [animValue] = useState(new Animated.Value(0.8));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 0.8,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => Animated.loop(this.animation).start());
  }, []);

  const interpolatedScale = animValue.interpolate({
    inputRange: [0.8, 1.2],
    outputRange: [0.8, 1.2],
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <AnimatedImage
          source={require('../assets/logo.png')}
          style={{ transform: [{ scale: interpolatedScale }] }}
          resizeMode="contain"
        />
      </View>
    )
  }

  return (
    <View onLayout={onLayoutRootView}>
      {children}
    </View>
  );
}

export default CustomSplashScreen;
