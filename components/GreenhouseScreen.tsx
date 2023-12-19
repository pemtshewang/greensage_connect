import React from "react";
import { Text, View } from "react-native";
import { useGreenhouseStore } from "./store";

const GreenhouseScreen = ({
  route,
}: {
  route: {
    params: {
      id: string;
    };
  };
}) => {
  const { id } = route.params;
  const greenhouse = useGreenhouseStore
    .getState()
    .greenhouses.find((g) => g.id === id);

  return (
    <View>
      <Text>Name: {greenhouse.name}</Text>
      <Text>IP Address: {greenhouse.ipAddress}</Text>
    </View>
  );
};

export default GreenhouseScreen;
