import React, { useState } from "react";
import { AspectRatio, Box, Image, Stack, Heading, Text, HStack } from "native-base";
import { Pressable } from "react-native";

const SingleNews = () => {
  const [isHovered, setIsHovered] = useState(false);


  const handleHoverIn = () => {
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
  };

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
                uri: "https://media.istockphoto.com/id/483451251/photo/fungal-attack.jpg?s=1024x1024&w=is&k=20&c=UvMU7lqTJw8AZCpKUJRGQOynHhGoiJgpcMk_HEP90Sw=",
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack p="3" space={1}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              New Vegetable Diseases
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
            The new chilli disease is first found in the Bumthang which most of the farmer are concerned about their income.
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <Text color="red.700" fontWeight="400">
              6 mins ago
            </Text>
            <Text color="red.700" fontWeight="400">
              12/12/2023
            </Text>
          </HStack>
        </Stack>
      </Box>
    </Pressable>
  );
};

export default SingleNews;
