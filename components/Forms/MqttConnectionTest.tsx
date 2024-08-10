// MQTTConnectionTestForm.tsx
import React, { useEffect, useState } from "react";
import { Pressable, View, ActivityIndicator } from "react-native";
import CustomModal from "../ui/Modal";
import Icons from "../../assets/Icons/Icons";
import { Platform } from "react-native";
import { useRouter } from "expo-router";
import { Text } from "native-base";
import { useMqtt } from "../../hooks/mqtt";
import { BaseStore } from "../../zustand/store";
import {
  ConnectionType,
  GreenhouseState,
  IrrigationControllerState,
} from "../../zustand/state";
import { getValueFor } from "../../securestore";
import createToast from "../../hooks/toast";

type ConnectionMsgTypes = "Not Connected" | "Connection Failed" | "Connecting";

interface MQTTConnectionTestFormProps {
  id: string;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  store: BaseStore<GreenhouseState | IrrigationControllerState>; // Replace with the actual type of your store
  type: "Greenhouse" | "Irrigation";
}

const MQTTConnectionTestForm: React.FC<MQTTConnectionTestFormProps> = ({
  id,
  showForm,
  setShowForm,
  store,
  type,
}) => {
  const [connecting, setConnecting] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);
  const [conMsg, setConMsg] = useState<ConnectionMsgTypes>("Not Connected");
  const [mqttBroker, setMqttBroker] = useState({
    brokerURL: "",
    brokerPort: "",
    brokerUsername: "",
    brokerPassword: "",
  });
  const { toastMessage } = createToast();
  useEffect(() => {
    if (connected) {
      router.push(`/tabs/Home/${type}/${id}`);
    }
    getValueFor("token").then((res) => {
      const token = JSON.parse(res as string);
      console.log(token);
      setMqttBroker({
        brokerURL: token.brokerIp,
        brokerPort: token.brokerPort,
        brokerUsername: token.username,
        brokerPassword: token.password,
      });
    });
  }, [connected]);
  useEffect(() => {
    if (conMsg === "Connection Failed") {
      toastMessage({
        message: "Connection Failed, Please try again",
        type: "error",
      });
    }
  }, [conMsg]);
  const mqtt = useMqtt({ id: id });
  const router = useRouter();
  const testConnection = async () => {
    setConnecting(true);
    setConMsg("Connecting");
    try {
      await mqtt.connect();
      store.updateItem(id, {
        ...store.items.find((res) => res.id === id),
        ws: mqtt,
        connectionType: ConnectionType.MQTT,
        isConnected: true,
      });
      console.log(store.items.find(item => item.id === id))
      // set toast message here on successful
      setShowForm(false);
      toastMessage({
        message: "Connection established!",
        type: "success",
        duration: 3000,
      });
      router.push(`/tabs/Home/${type}/${id}`);
    } catch (error) {
      setConnected(false);
      setConMsg("Connection Failed");
    } finally {
      setConnecting(false);
    }
  };

  return (
    <CustomModal
      modalTitle={`MQTT Connection Test`}
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
            textAlign: "center",
            fontFamily: "OpenSans",
          }}
        >
          Connection Test for {mqttBroker.brokerURL}
        </Text>
        <Pressable
          disabled={connecting}
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
              : {},
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
              conMsg === "Not Connected" || conMsg === "Connection Failed"
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
            alignItems: "center",
            gap: 5,
          }}
        >
          <Icons.help size={16} color="#A0A0A0" />
          <Text
            style={{
              color: "#A0A0A0",
              fontFamily: "OpenSans",
            }}
          >
            Press the above button for connection
          </Text>
        </View>
      </View>
    </CustomModal>
  );
};

export default MQTTConnectionTestForm;
