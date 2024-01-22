import { VStack, View, Pressable } from "native-base";
import Icons from "../assets/Icons/Icons";
import React, { useEffect, useState } from "react";
import { Text, Menu } from "native-base";
import { useNotificationStore } from "../zustand/store";
import { format } from "date-fns";
import { Box } from "lucide-react-native";

const NotificationContainer = ({
  id,
  name,
  title,
  message,
  dateTime,
  type,
  seen,
}: {
  id: string;
  name: string;
  title: string;
  message: string;
  dateTime: Date;
  type: "temperature" | "humidity" | "soilMoisture" | "light" | "waterLevel" | "irrigation_schedule";
  seen: boolean;
}) => {
  const [icon, setIcon] = useState<React.ReactNode | null>(null);
  const store = useNotificationStore();
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
  }, [type]);

  return (
    <View
      style={{
        flexDirection: "row",
        padding: 5,
        gap: 5,
        backgroundColor: seen ? "white" : "lightgray", // Adjust background color based on seen state
      }}
    >
      <Menu w="24" placement="bottom right" trigger={triggerProps => {
        return <Pressable padding="2" position="absolute" right="0" accessibilityLabel="More options menu" {...triggerProps}>
          <Icons.options size={24} color="black" />
        </Pressable>;
      }}>
        <Menu.Item accessibilityLabel="delete"
          _pressed={{
            backgroundColor: "coolGray.100"
          }}
          onPress={() => {
            store.deleteNotification(id);
          }}>Delete</Menu.Item>
      </Menu>
      <View alignItems="center" alignSelf="center" padding="2">
        <View borderWidth="1" padding="1" borderRadius="full">
          {icon}
        </View>
      </View>
      <VStack flex="1">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text fontSize="md" fontWeight="bold" width="50%">
            {title}
          </Text>
        </View>
        <View marginY="2">
          <Text>{message}</Text>
        </View>
        <Text fontSize="xs" color="gray.500">
          Received on {format(new Date(dateTime), "HH:mm - dd/MM/yyyy")}
        </Text>
      </VStack >
    </View >
  );
};

export default NotificationContainer;
