import { View, Badge } from "native-base"
import Icons from "../assets/Icons/Icons"
import { Easing, Switch } from "react-native";
import { Animated } from "react-native";
import { useEffect, useRef, useState } from "react";

export default function TemperatureControllerContainer({
  state,
  setState,
}: {
  state: boolean | undefined,
  setState: () => void,
}) {
  const [switchState, setSwitchState] = useState<boolean>(state as boolean);
  const toggleSwitchState = () => {
    setSwitchState(!switchState);
    setState();
  }
  const rotation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const handleAnimation = () => {
      if (state) {
        startRotationAnimation();
      } else {
        stopRotationAnimation();
      }
    }
    const animationFrameId = requestAnimationFrame(handleAnimation);
    return () => cancelAnimationFrame(animationFrameId);
  }, [state]);

  const startRotationAnimation = () => {
    rotation.setValue(0); // Reset the animation value before starting
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopRotationAnimation = () => {
    rotation.stopAnimation((value) => {
      rotation.setValue(value); // Set the current animation value when stopping
    });
  };

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View
      w="container"
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}>
      <View
        w="100%"
        style={{
          flexDirection: "row",
          gap: 4,
          // box shadow
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 8, // Required for Android
          backgroundColor: "#fff", // Add a background color if not already specified
          padding: 10, // Adjust padding as needed
          borderRadius: 20
        }}>
        <View
          w="10"
          marginRight="5"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          style={{
            gap: 4
          }}
        >
          <Icons.powerState color={state ? "green" : "red"} />
          <View
            style={{
              borderColor: "black",
              borderWidth: 1,
              padding: 2,
            }}
          >
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Icons.animatedFan width={32} height={32} color={switchState ? 'green' : 'red'} />
            </Animated.View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}>
          <Badge colorScheme="info">Manual On and Off</Badge>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 20
          }}>
            <Switch
              style={{
                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
              }}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={state ? 'green' : '#f33'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchState}
              value={switchState}
            />
          </View>
        </View>
      </View>
    </View >
  )
}
