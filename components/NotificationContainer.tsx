import { VStack, View, Pressable } from "native-base";
import Icons from "../assets/Icons/Icons";
import React, { useEffect, useState } from "react";
import { Text, Menu } from "native-base";
import { useNotificationStore } from "../zustand/store";
import { format } from "date-fns";

const NotificationContainer = ({
  id,
  title,
  message,
  dateTime,
  type,
  seen,
  footer,
}: {
  id: string;
  title: string;
  message: string;
  dateTime: Date;
  type: string;
  seen: boolean;
  footer: string;
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
      case "waterSchedule":
        setIcon(<Icons.waterTap height={32} width={32} />);
        break;
      case "soil_moisture":
        setIcon(<Icons.soilMoisture size={32} color="black" />);
        break;
      default:
    }
  }, [type]);

  return (
    <View
      marginTop="1"
      borderBottomWidth="1"
      borderColor="gray.100"
      style={{
        flexDirection: "row",
        padding: 5,
        gap: 5,
        backgroundColor: seen ? "white" : "lightgray", // Adjust background color based on seen state
      }}
    >
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
          <Text fontSize="sm" fontWeight="bold" width="100%">
            {title}
          </Text>
        </View>
        <View marginY="2">
          <Text fontSize="sm">{message}</Text>
        </View>
        <Text fontSize="xs" color="gray.500">
          Received on {format(new Date(dateTime), "HH:mm - dd/MM/yyyy")}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {footer}
        </Text>
      </VStack>
      <Menu
        w="24"
        placement="right bottom"
        trigger={(triggerProps) => {
          return (
            <Pressable marginRight="6" {...triggerProps}>
              <Icons.options size={24} color="black" />
            </Pressable>
          );
        }}
      >
        <Menu.Item
          accessibilityLabel="delete"
          _pressed={{
            backgroundColor: "coolGray.100",
          }}
          onPress={() => {
            store.deleteNotification(id);
          }}
        >
          Delete
        </Menu.Item>
      </Menu>
    </View>
  );
};

export default NotificationContainer;
