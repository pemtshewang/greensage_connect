import Paho from "paho-mqtt";
import { useGreenhouseStore, useIrrigationControllerStore, useMQTTBrokerStore } from "../zustand/store";

const useGreenhouseMqtt = ({ id }: {
  id: string
}) => {
  const store = useMQTTBrokerStore();
  const client = new Paho.Client(store.brokerURL, store.brokerPort, id);
  const greenhouseStore = useGreenhouseStore();
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
          client.subscribe(id + "/#");
          client.onMessageArrived = (e) => {
            handleMessage(e.topic, e.payloadString)
          }
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
  const handleMessage = (topic: string, payloadString: string) => {
    const lastTopic = topic.split("/").pop();
    if (lastTopic === "readings") {
      const category = payloadString.split("|");
      category.map(item => {
        const [type, data] = item.split(":");
        switch (type) {
          case "temperature":
            greenhouseStore.updateGreenhouse(id, { temperature: Number(data) });
            break;
          case "humidity":
            greenhouseStore.updateGreenhouse(id, { humidity: Number(data) });
            break;
          case "soilMoisture":
            greenhouseStore.updateGreenhouse(id, { soil_moisture: Number(data) });
            break;
          case "light":
            greenhouseStore.updateGreenhouse(id, { ldrReading: Number(data) });
            break;
        }
      })
    }
  };
  return {
    connect,
    disconnect,
    sendMessage
  }
}

const useIrrigationMqtt = ({ id }: {
  id: string
}) => {
  const store = useMQTTBrokerStore();
  const client = new Paho.Client(store.brokerURL, store.brokerPort, id);
  const irrigationStore = useIrrigationControllerStore();
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
          client.subscribe(id + "/#");
          client.onMessageArrived = (e) => {
            handleMessage(e.topic, e.payloadString)
          }
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
  const handleMessage = (topic: string, payloadString: string) => {
    const lastTopic = topic.split("/").pop();
    if (lastTopic === "readings") {
      const soilMoisture = payloadString.split(":")[0];
      irrigationStore.updateIrrigationController(id, {
        soil_moisture: Number(soilMoisture)
      })
    }
  };
  return {
    connect,
    disconnect,
    sendMessage
  }
}

export { useGreenhouseMqtt, useIrrigationMqtt };
