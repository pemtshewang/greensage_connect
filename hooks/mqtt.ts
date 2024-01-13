import Paho from "paho-mqtt";

const useMqtt = () => {
  const client = new Paho.Client("d4aedf513f114236aedd2023e7bff5cd.s2.eu.hivemq.cloud", 8884, Math.random().toString());
  const connectToBroker = () => {
    client.connect({
      useSSL: true,
      userName: "pemtshewang",
      password: "$10Bpemtshewang",
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
