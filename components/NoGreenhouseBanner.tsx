
import React from "react";
import { View, Text } from "react-native";
import Icons from "../assets/Icons/Icons";

const Banner = ({ message }: { message: string }) => {
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
        fontSize: 14,
        color: '#999'
      }}>{message}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          padding: 10
        }}
      >
        <Icons.greenhouseAddIcon fill="#999" width={32} height={32} />
      </View>
    </View>
  );
};

export default Banner;
