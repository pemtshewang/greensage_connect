import { View, Badge, Box, Text, HStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Icons from "../../assets/Icons/Icons";
import { useGreenhouseStore } from "../../zustand/store";
import { getValueFor } from "../../securestore";
import { ConnectionType } from "../../zustand/state";

export default function LightControllerContainer({ id }: { id: String }) {
  const store = useGreenhouseStore();
  const controller = store.items.find((item) => item.id === id);
  const [userBrokerId, setBrokerId] = useState();
  useEffect(() => {
    getValueFor("token").then((res) => {
      const parsed = JSON.parse(res as string);
      setBrokerId(parsed.brokerId);
    });
  });
  const toggleState = () => {
    const topic = "user/" + userBrokerId + "/" + id + "/actuator" + "/light";
    console.log("publishing in", topic);
    if (controller?.lightState) {
      console.log("sending message off");
      if (controller?.connectionType === ConnectionType.MQTT) {
        controller?.ws?.sendMessage(topic, "off");
      } else {
        controller?.ws?.sendMessage("light:off");
      }
      store.updateItem(id as string, {
        ...controller,
        lightState: false,
      });
    } else {
      console.log("sending message on");
      if (controller?.connectionType === ConnectionType.MQTT) {
        controller?.ws?.sendMessage(topic, "on");
      } else {
        controller?.ws?.sendMessage("light:on");
      }
      store.updateItem(id as string, {
        ...controller,
        lightState: true,
      });
    }
  };
  return (
    <View
      w="container"
      marginX="4"
      marginY="4"
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <View
        w="100%"
        style={{
          flexDirection: "row",
          gap: 4,
          // box shadow
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 8, // Required for Android
          backgroundColor: "#fff", // Add a background color if not already specified
          padding: 10, // Adjust padding as needed
          borderRadius: 20,
          position: "relative",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Badge colorScheme="green">Light Switch</Badge>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <View
              flexDirection="column"
              alignItems="center"
              style={{
                gap: 5,
              }}
            >
              <View
                padding={3}
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <TouchableOpacity onPress={toggleState}>
                  <HStack
                    flexDirection={controller?.lightState ? "row" : "row-reverse"}
                    bg={controller?.lightState ? "green.500" : "red.500"}
                    borderRadius="full"
                    justifyContent="space-between"
                    alignItems="center"
                    padding="1"
                    style={{
                      width: 74,
                    }}
                  >
                    <Box>
                      <Text
                        bold
                        textAlign={controller?.lightState ? "right" : "left"}
                        w="full"
                        color="white"
                        marginRight={1}
                      >
                        {" "}
                        {controller?.lightState ? "ON" : "OFF"}
                      </Text>
                    </Box>
                    <Box borderRadius="full" bg="white" w="8" h="8"></Box>
                  </HStack>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
