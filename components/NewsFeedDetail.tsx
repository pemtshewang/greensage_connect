import React from "react";
import { AspectRatio, View, Box, Image, Stack, Heading, Text, HStack } from "native-base";
import type { PostType } from "../types";
import { format } from "date-fns";

const NewsFeedDetail = ({
  id,
  title,
  content,
  createdAt,
  image,
  author
}: PostType) => {

  return (
    <View>
      <Box
        marginTop={3}
        maxW="80"
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
        <Stack p="3" space={1}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {title}
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
              {format(new Date(createdAt), "dd MMM yyyy hh:mm a")}
            </Text>
          </Stack>
          <View paddingTop="5">
            <Text fontWeight="400">
              {content}
            </Text>
          </View>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <Text color="red.700" fontWeight="400">
            </Text>
          </HStack>
          <Text color="coolGray.500">By {author}</Text>
        </Stack>
      </Box>
    </View >
  );
};

export default NewsFeedDetail;
