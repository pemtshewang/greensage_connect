import React, { useState } from "react";
import { AspectRatio, Box, Image, Stack, Heading, Text, HStack } from "native-base";
import { Pressable } from "react-native";
import type { PostType } from "../types";

const NewsContainer = (props: PostType) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "green.800" : isHovered ? "green.600" : "green.700",
          transform: [{ scale: pressed ? 0.96 : 1 }],
        },
      ]}
    >
      <Box
        marginTop={3}
        maxW="80"
        rounded="lg"
        overflow="hidden"
        background="green.100"
        borderColor="coolGray.200"
        borderWidth="2"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 8}>
            <Image
              source={{
                uri: props.image
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack p="3" space={1}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {props.title}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              Chilli Diseases in Bumthang
            </Text>
          </Stack>
          <Text fontWeight="400">
            {props.body}
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <Text color="red.700" fontWeight="400">
              6 mins ago
            </Text>
            <Text color="red.700" fontWeight="400">
              {props.createdAt}
            </Text>
          </HStack>
        </Stack>
      </Box>
    </Pressable>
  );
};

export default NewsContainer;
