import Paho from "paho-mqtt";
import { BaseStore, useGreenhouseStore, useIrrigationControllerStore, useMQTTBrokerStore } from "../zustand/store";
import { GreenhouseState, IrrigationControllerState } from "../zustand/state";
import { getRandomColor } from "./wsservice";
import { useAnalyticsStore } from "../zustand/store";

const createMqttClient = (id: string) => {
  const store = useMQTTBrokerStore();
  const client = new Paho.Client(store.brokerURL, store.brokerPort, id);
  return client;
};

const handleMessage = ({
  id,
  topic,
  payloadString,
  store
}: {
  id: string;
  topic: string;
  payloadString: string;
  type: "Greenhouse" | "Irrigation";
  store: BaseStore<GreenhouseState | IrrigationControllerState>;
}) => {
  const analyticsStore = useAnalyticsStore();
  const device = store.items.find((d) => d.id === id);
  console.log(payloadString)
  const lastTopic = topic.split("/").pop();
  if (lastTopic === "readings") {
    const category = payloadString.split("|");
    console.log(category)
    category.forEach(item => {
      const [dataType, dataValue] = item.split(":");
      switch (dataType) {
        case "temperature":
          store.updateItem(id, { temperature: Number(dataValue) });
          analyticsStore.addTempHumidData({
            id,
            name: device?.name || "",
            data: {
              temperature: [
                { time: new Date().toISOString(), value: Number(dataValue) },
              ],
              humidity: [],
            },
            legend: {
              name: device?.name || "",
              symbol: {
                fill: getRandomColor(),
                type: "circle",
              },
            },
          });
          break;
        case "humidity":
          store.updateItem(id, { humidity: Number(dataValue) });
          analyticsStore.addTempHumidData({
            id,
            name: device?.name || "",
            data: {
              temperature: [],
              humidity: [
                { time: new Date().toISOString(), value: Number(dataValue) },
              ],
            },
            legend: {
              name: device?.name || "",
              symbol: {
                fill: getRandomColor(),
                type: "circle",
              },
            },
          });
          break;
        case "soilMoisture":
          store.updateItem(id, { soil_moisture: Number(dataValue) });
          analyticsStore.addSoilMoistureData({
            id,
            name: device?.name || "",
            data: [{ timestamp: new Date().toISOString(), moisture: Number(dataValue) }],
            legend: {
              name: device?.name || "",
              symbol: {
                fill: getRandomColor(),
                type: "circle",
              },
            },
          });
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
  const client = createMqttClient(id);
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
          client.subscribe(id + "/#");
          client.onMessageArrived = (msg) => {
            console.log("Message has arrived", msg.payloadString)
            try {
              handleMessage({
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