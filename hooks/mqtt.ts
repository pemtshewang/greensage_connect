import Paho from "paho-mqtt";
import { useMQTTBrokerStore } from "../zustand/store";

const useMqtt = ({ id }: {
  id: string
}) => {
  const store = useMQTTBrokerStore();
  const client = new Paho.Client(store.brokerURL, store.brokerPort, id);
  const connect = () => {
    return new Promise((res, rej) => {
      client.connect({
        userName: store.brokerUsername,
        password: store.brokerPassword,
        cleanSession: true,
        onFailure: (err) => {
          console.log("ERROR", err);
          rej(err);
        },
        onSuccess: (data) => {
          console.log("SUCCESS", data);
          res(data);
        },
        reconnect: false,
        keepAliveInterval: 120
      });
    })
  }
  const sendMessage = (topic: string, message: string) => {
    if (client.isConnected() === false) {
      console.log("not connected");
      return;
    }
    console.log("sending message");
    client.send(topic, message)
  }
  const disconnect = () => {
    client.disconnect();
    console.log("disconnected");
  }
  const handleMessage = (e: MessageEvent) => {
    const [type, data] = e.data.split(":");
    switch (type) {
      case "temperature":
        // store.updateGreenhouse(id, { temperature: Number(data) });
        break;
      case "humidity":
        // store.updateGreenhouse(id, { humidity: Number(data) });
        break;
      case "soilMoisture":
        // store.updateGreenhouse(id, { soil_moisture: Number(data) });
        break;
      case "light":
        // store.updateGreenhouse(id, { ldrReading: Number(data) });
        break;
      default:
        break;
    }
  };
  return {
    connect,
    disconnect,
    sendMessage
  }
}

export default useMqtt;
