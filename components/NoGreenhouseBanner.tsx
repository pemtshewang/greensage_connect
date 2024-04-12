import React from "react";
import { View, Text } from "react-native";
import { Dimensions } from "react-native";

const Banner = ({ message, icon }: { message: string; icon: JSX.Element }) => {
  const { height } = Dimensions.get("window");
  return (
    <View
      style={{
        height,
        padding: 16,
        borderRadius: 8,
        margin: 16,
      }}
    >
      <Text
        style={{
          fontFamily: "OpenSans",
          fontSize: 13,
          color: "#999",
        }}
      >
        {message}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          padding: 10,
        }}
      >
        {icon}
      </View>
    </View>
  );
};

export default Banner;
