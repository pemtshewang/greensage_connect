import { View, Badge, VStack, Box, Text, HStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Icons from "../assets/Icons/Icons";

export default function RollerShutterController({
  leftRollerShutterState,
  rightRollerShutterState,
  setLeftRollerShutterState,
  setRightRollerShutterState,
}: {
  leftRollerShutterState: boolean | undefined;
  rightRollerShutterState: boolean | undefined;
  setLeftRollerShutterState: () => void;
  setRightRollerShutterState: () => void;
}) {
  const [rightSwitchState, setRightSwitchState] = useState<boolean>(
    rightRollerShutterState as boolean,
  );
  const [leftSwitchState, setLeftSwitchState] = useState<boolean>(
    leftRollerShutterState as boolean,
  );
  const toggleRightSwitchState = () => {
    setRightSwitchState(!rightSwitchState);
    setRightRollerShutterState();
  };
  const toggleLeftSwitchState = () => {
    setLeftSwitchState(!leftSwitchState);
    setLeftRollerShutterState();
  };
  return (
    <View marginTop="5">
      <View
        w="full"
        style={{
          flexDirection: "column",
          alignItems: "center",
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
          borderRadius: 20,
          paddingTop: 10,
        }}
      >
        <Badge colorScheme="green">Side Ventilators</Badge>
        <View
          paddingY="3"
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* For left */}
          <VStack space={2} alignItems="center">
            <Badge colorScheme="info">Left</Badge>
            <View
              padding={3}
              style={{
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
              }}
            >
              <TouchableOpacity onPress={toggleLeftSwitchState}>
                <HStack
                  flexDirection={leftSwitchState ? "row" : "row-reverse"}
                  bg={leftSwitchState ? "green.500" : "red.500"}
                  borderRadius="full"
                  justifyContent="space-between"
                  alignItems="center"
                  padding="1"
                  style={{
                    width: 92,
                  }}
                >
                  <Box>
                    <Text
                      bold
                      textAlign={leftSwitchState ? "right" : "left"}
                      w="full"
                      color="white"
                      marginRight={1}
                    >
                      {leftSwitchState ? "OPEN" : "CLOSE"}
                    </Text>
                  </Box>
                  <Box borderRadius="full" bg="white" w="8" h="8"></Box>
                </HStack>
              </TouchableOpacity>
            </View>
          </VStack>
          {/* For left */}
          <VStack space={2} alignItems="center">
            <Badge colorScheme="info">Right</Badge>
            <View
              padding={3}
              style={{
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
              }}
            >
              <TouchableOpacity onPress={toggleRightSwitchState}>
                <HStack
                  flexDirection={rightSwitchState ? "row" : "row-reverse"}
                  bg={rightSwitchState ? "green.500" : "red.500"}
                  borderRadius="full"
                  justifyContent="space-between"
                  alignItems="center"
                  padding="1"
                  style={{
                    width: 92,
                  }}
                >
                  <Box>
                    <Text
                      bold
                      textAlign={rightSwitchState ? "right" : "left"}
                      w="full"
                      color="white"
                      marginRight={1}
                    >
                      {rightSwitchState ? "OPEN" : "CLOSE"}
                    </Text>
                  </Box>
                  <Box borderRadius="full" bg="white" w="8" h="8"></Box>
                </HStack>
              </TouchableOpacity>
            </View>
          </VStack>
        </View>
      </View>
    </View>
  );
}
