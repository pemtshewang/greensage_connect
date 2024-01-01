import Paho from "paho-mqtt";
import { useRef } from "react";

const useMqtt = () => {
  const mqttClient = useRef<Paho.Client | null>(null);
  const client = new Paho.Client("192.168.0.122", 8083, Math.random().toString());
  const connectToBroker = () => {
    client.connect({
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
