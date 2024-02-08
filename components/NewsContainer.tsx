import React, { useState } from "react";
import { AspectRatio, View, Box, Image, Stack, Text, HStack } from "native-base";
import { Pressable } from "react-native";
import type { PostType } from "../types";
import { useRouter } from "expo-router";
import { format } from "date-fns";

const NewsContainer = ({
  id,
  title,
  content,
  createdAt,
  image,
  author
}: PostType) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "green.800" : isHovered ? "green.600" : "green.700",
          transform: [{ scale: pressed ? 0.96 : 1 }],
        },
      ]}
      onPress={() => {
        router.push(`/tabs/Feeds/Post/${id}`);
      }}
    >
      <Box
        marginTop={3}
        rounded="lg"
        overflow="hidden"
        background="green.100"
        borderColor="coolGray.200"
        borderWidth="2"
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 8}>
            <Image
              source={{
                uri: image
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack space={1}>
          <Stack space={2}>
            <Text fontSize="md" bold padding="2">
              {title}
            </Text>
            <Text
              fontSize="xs"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              paddingX="2"
            >
              {format(new Date(createdAt), "dd MMM yyyy hh:mm a")}
            </Text>
          </Stack>
          <View paddingTop="5">
            <Text fontWeight="400" paddingX="2">
              {content.slice(0, 200)}...<Text italic>Click to continue reading</Text>
            </Text>
          </View>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <Text color="red.700" fontWeight="400">
            </Text>
          </HStack>
          <Text color="coolGray.500" paddingX="2">By {author}</Text>
        </Stack>
      </Box>
    </Pressable >
  );
};

export default NewsContainer;
