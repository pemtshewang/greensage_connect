// WebSocketConnectionTest.tsx
import React, { useState } from "react";
import { Pressable, View, ActivityIndicator } from "react-native";
import CustomModal from "../ui/Modal";
import Icons from "../../assets/Icons/Icons";
import { Platform } from "react-native";
import { useRouter } from "expo-router";
import { Text } from "native-base";
import { BaseStore } from "../../zustand/store";
import { ConnectionType, GreenhouseState, IrrigationControllerState } from "../../zustand/state";
import useWebSocket from "../../hooks/wsservice";

type ConnectionMsgTypes =
  | "Connected"
  | "Not Connected"
  | "Connection Failed"
  | "Connecting";

interface WebSocketConnectionTestFormProps {
  id: string;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  store: BaseStore<GreenhouseState | IrrigationControllerState>; // Replace with the actual type of your store
  type: "Greenhouse" | "Irrigation";
}

const MQTTConnectionTestForm: React.FC<WebSocketConnectionTestFormProps> = ({
  id,
  showForm,
  setShowForm,
  store,
  type,
}) => {
  const [connecting, setConnecting] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);
  const [conMsg, setConMsg] = useState<ConnectionMsgTypes>("Not Connected");
  const websocketObj = useWebSocket({ id: id, type });
  const router = useRouter();
  const testConnection = async () => {
    setConnecting(true);
    setConMsg("Connecting");
    try {
      await websocketObj.connect();
      store.updateItem(id, {
        ...store.items.find((res) => res.id === id),
        ws: websocketObj,
        connectionType: ConnectionType.MQTT,
        isConnected: true,
      });
      setConnected(true);
      setConMsg("Connected");
      router.push(`/tabs/Home/${type}/${id}`)
    } catch (error) {
      setConnected(false);
      setConMsg("Connection Failed");
    } finally {
      setConnecting(false);
    }
  };

  return (
    <CustomModal
      modalTitle={`WebSocket Connection Test`}
      modalVisible={showForm}
      setModalVisible={setShowForm}
    >
      <View
        style={{
          flexDirection: "column",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Text
          style={{
            width: "100%",
            textAlign: "center"
          }}
        >
          Testing connection with {store.items.find((res) => res.id === id)?.ipAddress as string}
        </Text>
        <Pressable
          disabled={connecting || connected}
          onPress={testConnection}
          style={({ pressed }) => [
            {
              flexDirection: "row",
              justifyContent: "center",
              backgroundColor: "#E0E0E0",
              padding: 15,
              width: 100,
              height: 100,
              borderRadius: 999,
              alignItems: "center",
              elevation: pressed ? 10 : 5, // Change the elevation on press for an interactive effect
              borderWidth: connected ? 2 : 0,
              borderColor: connected ? "green" : "red",
            },
            Platform.OS === "ios"
              ? {
                shadowColor: "#000",
                shadowOffset: {
                  width: 4,
                  height: 9,
                },
                shadowOpacity: 1,
                shadowRadius: 3,
              }
              : {}, // Android might not need these shadow properties if elevation is set
          ]}
        >
          {connected ? (
            <Icons.passedConnection size={32} />
          ) : connecting ? (
            <ActivityIndicator size="large" color="yellowgreen" />
          ) : (
            <Icons.failedConnection size={32} />
          )}
        </Pressable>
        <Text
          style={{
            color:
              conMsg === "Connected"
                ? "green"
                : conMsg === "Not Connected" || conMsg === "Connection Failed"
                  ? "red"
                  : conMsg === "Connecting"
                    ? "orange"
                    : "black", // Default color
          }}
        >
          {conMsg}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 5,
          }}
        >
          <Icons.help size={16} color="#A0A0A0" />
          <Text
            style={{
              color: "#A0A0A0",
            }}
          >
            Press the button for connection
          </Text>
        </View>
      </View>
    </CustomModal>
  );
};

export default MQTTConnectionTestForm;

