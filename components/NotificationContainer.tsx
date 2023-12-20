import { VStack, View } from "native-base";
import Icons from "../assets/Icons/Icons";
import React, { useEffect, useState } from "react";
import { Text } from "native-base";
import { Pressable } from "react-native";

const NotificationContainer = ({
  name,
  title,
  message,
  dateTime,
  type,
}: {
  name: string;
  title: string;
  message: string;
  dateTime: Date;
  type: "temperature" | "humidity" | "soilMoisture" | "light" | "waterLevel";
}) => {
  const [icon, setIcon] = useState<React.ReactNode | null>(null);
  useEffect(() => {
    switch (type) {
      case "temperature":
        setIcon(<Icons.thermometer size={32} color="black" />);
        break;
      case "humidity":
        setIcon(<Icons.humid size={32} color="black" />);
        break;
      case "waterLevel":
        setIcon(<Icons.droplets size={32} color="black" />);
        break;
      default:
    }
  }, []);
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 5,
      }}
    >
      <View
        style={{
          borderRadius: 99,
          padding: 9,
          borderWidth: 2,
          width: 64,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>
      <VStack>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text fontSize="md" fontWeight="bold" width="50%">
            {title}
          </Text>
          <Pressable>
            <Icons.options size={24} color="black" />
          </Pressable>
        </View>
        <Text>{message}</Text>
        <Text fontSize="xs" color="gray.500">
          Received at {dateTime.toLocaleString()} from greenhouse {name}
        </Text>
      </VStack>
    </View>
  );
};
export default NotificationContainer;
