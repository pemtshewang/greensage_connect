import { View, Badge, HStack, Box, Text } from "native-base";
import Icons from "../assets/Icons/Icons";
import { Easing, TouchableOpacity } from "react-native";
import { Animated } from "react-native";
import { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function TemperatureControllerContainer({
  state,
  setState,
}: {
  state: boolean | undefined;
  setState: () => void;
}) {
  const [switchState, setSwitchState] = useState<boolean>(state as boolean);
  const toggleSwitchState = () => {
    setSwitchState(!switchState);
    setState();
  };
  const rotation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const handleAnimation = () => {
      if (state) {
        startRotationAnimation();
      } else {
        stopRotationAnimation();
      }
    };
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
    outputRange: ["0deg", "360deg"],
  });
  return (
    <View
      w="container"
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
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
          borderRadius: 20,
          position: "relative",
        }}
      >
        <View style={{
          position: "absolute",
          right: 6,
          top: 6
        }}>
          <View>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Icons.animatedFan
                width={32}
                height={32}
              />
            </Animated.View>
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
          <Badge colorScheme="green">Circulation Fan</Badge>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <View
              flexDirection="column"
              alignItems="center"
              style={{
                gap: 5,
              }}
            >
              <View
                padding={3}
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <TouchableOpacity onPress={toggleSwitchState}>
                  <HStack
                    flexDirection={state ? "row" : "row-reverse"}
                    bg={state ? "green.500" : "red.500"}
                    borderRadius="full"
                    justifyContent="space-between"
                    alignItems="center"
                    padding="1"
                    style={{
                      width: 74,
                    }}
                  >
                    <Box>
                      <Text
                        bold
                        textAlign={switchState ? "right" : "left"}
                        w="full"
                        color="white"
                        marginRight={1}
                      >
                        {switchState ? "ON" : "OFF"}
                      </Text>
                    </Box>
                    <Box borderRadius="full" bg="white" w="8" h="8"></Box>
                  </HStack>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
