
import React from "react";
import { View, Text } from "react-native";

const Banner = ({ message,
  icon
}: {
  message: string,
  icon: JSX.Element
}) => {
  return (
    <View
      style={{
        backgroundColor: "#f0f0f0",
        padding: 16,
        borderRadius: 8,
        margin: 16,
      }}
    >
      <Text style={{
        fontSize: 11,
        color: '#999'
      }}>{message}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          padding: 10
        }}
      >
        {icon}
      </View>
    </View>
  );
};

export default Banner;
