import Paho from "paho-mqtt";
import { BaseStore, useGreenhouseStore, useIrrigationControllerStore, useMQTTBrokerStore } from "../zustand/store";
import { GreenhouseState, IrrigationControllerState } from "../zustand/state";
import { getValueFor } from "../securestore";
import { useEffect, useState } from "react";

const createMqttClient = (id: string) => {
  const store = useMQTTBrokerStore();
  const client = new Paho.Client(store.brokerURL, store.brokerPort, id);
  return client;
};


const handleMessage = ({
  brokerId,
  id,
  topic,
  payloadString,
  store,
}: {
  brokerId: string,
  id: string;
  topic: string;
  payloadString: string;
  type: "Greenhouse" | "Irrigation";
  store: BaseStore<GreenhouseState | IrrigationControllerState>;
}) => {
  const lastTopic = topic.split("/").pop();
  if (lastTopic === "readings") {
    const category = payloadString.split("|");
    console.log(category)
    category.forEach(item => {
      const [dataType, dataValue] = item.split(":");
      switch (dataType) {
        case "temperature":
          store.updateItem(id, { temperature: Number(dataValue) });
          break;
        case "humidity":
          store.updateItem(id, { humidity: Number(dataValue) });
          break;
        case "soilMoisture":
          store.updateItem(id, { soil_moisture: Number(dataValue) });
          break;
        case "light":
          store.updateItem(id, { ldrReading: Number(dataValue) });
          break;
      }
    });
  } else if (lastTopic === "readings") {
    const soilMoisture = payloadString.split(":")[1];
    store.updateItem(id, { soil_moisture: Number(soilMoisture) });
  }
};

const useMqtt = ({ id, type }: { id: string; type: "Greenhouse" | "Irrigation" }) => {
  const [brokerId, setBrokerId] = useState("");
  const client = createMqttClient(id);
  useEffect(() => {
    getValueFor("token").then((token) => {
      setBrokerId(JSON.parse(token as string)?.brokerId);
    })
  }, [])
  const store = useMQTTBrokerStore();
  const storeType = type === "Greenhouse" ? useGreenhouseStore() : useIrrigationControllerStore();
  const connect = () => {
    return new Promise((res, rej) => {
      client.connect({
        userName: store.brokerUsername,
        password: store.brokerPassword,
        cleanSession: false,
        onFailure: (err) => {
          console.error(`MQTT connection failed for ${id}:`, err);
          rej(err);
        },
        onSuccess: (data) => {
          client.subscribe(brokerId + "/#");
          client.onMessageArrived = (msg) => {
            console.log("Message has arrived", msg.payloadString)
            try {
              handleMessage({
                brokerId,
                id,
                topic: msg.topic,
                payloadString: msg.payloadString,
                store: storeType,
              });
            } catch (err) {
              console.log(err)
            }
          }
          res(data);
        },
        reconnect: true,
      });
    });
  };
  const sendMessage = (topic: string, message: string) => {
    if (!client.isConnected()) {
      console.log("MQTT client not connected");
      return;
    }
    console.log(`Sending MQTT message to topic: ${topic}, message: ${message}`);
    client.send(topic, message);
  };

  const disconnect = () => {
    client.disconnect();
    console.log("Disconnected MQTT client");
  };

  return {
    connect,
    disconnect,
    sendMessage
  };
};

export { useMqtt };
