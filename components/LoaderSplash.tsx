import React from "react";
import { Image, View, Box, Text } from "native-base";

const LoaderScreen = ({ message }: { message: string }) => {
  return (
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      <Image
        width={190}
        height={190}
        source={require("../assets/loader.gif")}
        alt="splash screen"
        resizeMode="contain"
      />
      <Box position="absolute" flex="1" top="67%">
        <Text color="#A0A0A0">{message}</Text>
      </Box>
    </View>
  );
};

export default LoaderScreen;
