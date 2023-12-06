import React from "react";
import {
  Box,
  Center,
  NativeBaseProvider,
  Pressable,
  HStack,
  Badge,
  Spacer,
  Text,
  Flex,
} from "native-base";
import { Stack } from "native-base/lib/typescript/components/primitives";

export default function GreenhouseStatus({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "Valve" | "Exhaust Fan";
}) {
  const handlePress = () => {
    // Implement your press logic here
    console.log("Box pressed!");
  };

  return (
    <Pressable onPress={handlePress}>
      {({ isHovered, isPressed }) => (
        <Box
          bg={isPressed ? "green.900" : isHovered ? "green.500" : "green.700"}
          p="5"
          rounded="xl"
          shadow={20}
          _text={{
            fontSize: "md",
            fontWeight: "medium",
            color: "warmGray.50",
            textAlign: "center",
          }}
          style={{
            transform: [{ scale: isPressed ? 0.96 : 1 }],
          }}
        >
          {children}
          <Text>{type.toString()}</Text>
        </Box>
      )}
    </Pressable>
  );
}
