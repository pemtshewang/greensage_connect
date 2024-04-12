import { View, Badge, Text } from "native-base";
import Icons from "../assets/Icons/Icons";
import { Easing, Switch } from "react-native";
import { Animated } from "react-native";
import { useEffect, useRef, useState } from "react";

export default function WaterValveControllerContainer({
  state,
  setState,
}: {
  state: boolean;
  setState: (state: boolean) => void;
}) {
  const [switchState, setSwitchState] = useState<boolean>(state as boolean);
  const toggleSwitchState = () => {
    setSwitchState(!switchState);
    setState(switchState);
  };
  const translation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const handleAnimation = () => {
      if (state) {
        startDropletAnimation();
      } else {
        stopDropletAnimation();
      }
    };
    const animationFrameId = requestAnimationFrame(handleAnimation);
    return () => cancelAnimationFrame(animationFrameId);
  }, [state]);

  const startDropletAnimation = () => {
    translation.setValue(0); // Reset the animation value before startingset
    Animated.loop(
      Animated.timing(translation, {
        toValue: 20,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  const stopDropletAnimation = () => {
    translation.stopAnimation((value) => {
      translation.setValue(value); // Set the current animation value when stopping
    });
  };

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          // box shadow
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          position: "relative",
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 8, // Required for Android
          backgroundColor: "#fff", // Add a background color if not already specified
          borderRadius: 20,
          padding: 10,
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <View
          w="10"
          marginRight="5"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          style={{
            gap: 4,
            position: "absolute",
          }}
        >
          <View
            style={{
              position: "relative",
            }}
          >
            <Icons.waterTap width={32} height={32} />
            {state ? (
              <Animated.View
                style={{
                  position: "absolute",
                  bottom: -5,
                  left: -2,
                  transform: [{ translateY: translation }],
                }}
              >
                <Icons.droplets width={16} height={16} fill="lightblue" />
              </Animated.View>
            ) : (
              <></>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Badge colorScheme="green">Water Valve Regulator</Badge>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Switch
              style={{
                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
              }}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={state ? "green" : "#f33"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchState}
              value={switchState}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
