import Paho from "paho-mqtt";
import { useMQTTBrokerStore } from "../zustand/store";

const useMqtt = () => {
  const store = useMQTTBrokerStore();
  const client = new Paho.Client(store.brokerURL, store.brokerPort, Math.random().toString());
  const connectToBroker = () => {
    client.connect({
      useSSL: true,
      userName: store.brokerUsername,
      password: store.brokerPassword,
      cleanSession: true,
      onFailure: (err) => {
        console.log("ERROR", err);
      },
      onSuccess: (data) => {
        console.log("SUCCESS", data);
        console.log(data);
      },
      reconnect: false,
      keepAliveInterval: 120
    });
  }
  const sendMessage = (topic: string, message: string) => {
    if (client.isConnected() === false) {
      console.log("not connected");
      return;
    }
    console.log("sending message");
    client.send(topic, message)
  }
  const disconnectFromBroker = () => {
    client.disconnect();
    console.log("disconnected");
  }
  return {
    connectToBroker,
    disconnectFromBroker,
    sendMessage
  }
}

export default useMqtt;
