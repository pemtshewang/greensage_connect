// import Paho from "paho-mqtt";
// import { useGreenhouseStore, useIrrigationControllerStore, useMQTTBrokerStore } from "../zustand/store";
//
// const useGreenhouseMqtt = ({ id }: {
//   id: string
// }) => {
// const store = useMQTTBrokerStore();
//   const client = new Paho.Client(store.brokerURL, store.brokerPort, id);
//   const greenhouseStore = useGreenhouseStore();
//   const connect = () => {
//     return new Promise((res, rej) => {
//       client.connect({
//         userName: store.brokerUsername,
//         password: store.brokerPassword,
//         cleanSession: true,
//         onFailure: (err) => {
//           console.log("ERROR", err);
//           rej(err);
//         },
//         onSuccess: (data) => {
//           console.log("SUCCESS", data);
//           client.subscribe(id + "/#");
//           client.onMessageArrived = (e) => {
//             handleMessage(e.topic, e.payloadString)
//           }
//           res(data);
//         },
//         reconnect: false,
//         keepAliveInterval: 120
//       });
//     })
//   }
//   const sendMessage = (topic: string, message: string) => {
//     if (client.isConnected() === false) {
//       console.log("not connected");
//       return;
//     }
//     console.log("sending message");
//     client.send(topic, message)
//   }
//   const disconnect = () => {
//     client.disconnect();
//     console.log("disconnected");
//   }
//   const handleMessage = (topic: string, payloadString: string) => {
//     const lastTopic = topic.split("/").pop();
//     if (lastTopic === "readings") {
//       const category = payloadString.split("|");
//       category.map(item => {
//         const [type, data] = item.split(":");
//         switch (type) {
//           case "temperature":
//             greenhouseStore.updateGreenhouse(id, { temperature: Number(data) });
//             break;
//           case "humidity":
//             greenhouseStore.updateGreenhouse(id, { humidity: Number(data) });
//             break;
//           case "soilMoisture":
//             greenhouseStore.updateGreenhouse(id, { soil_moisture: Number(data) });
//             break;
//           case "light":
//             greenhouseStore.updateGreenhouse(id, { ldrReading: Number(data) });
//             break;
//         }
//       })
//     }
//   };
//   return {
//     connect,
//     disconnect,
//     sendMessage
//   }
// }
//
// const useIrrigationMqtt = ({ id }: {
//   id: string
// }) => {
//   const store = useMQTTBrokerStore();
//   const client = new Paho.Client(store.brokerURL, store.brokerPort, id);
//   const irrigationStore = useIrrigationControllerStore();
//   const connect = () => {
//     return new Promise((res, rej) => {
//       client.connect({
//         userName: store.brokerUsername,
//         password: store.brokerPassword,
//         cleanSession: true,
//         onFailure: (err) => {
//           console.log("ERROR", err);
//           rej(err);
//         },
//         onSuccess: (data) => {
//           console.log("SUCCESS", data);
//           client.subscribe(id + "/#");
//           client.onMessageArrived = (e) => {
//             handleMessage(e.topic, e.payloadString)
//           }
//           res(data);
//         },
//         reconnect: false,
//         keepAliveInterval: 120
//       });
//     })
//   }
//   const sendMessage = (topic: string, message: string) => {
//     if (client.isConnected() === false) {
//       console.log("not connected");
//       return;
//     }
//     console.log("sending message");
//     client.send(topic, message)
//   }
//   const disconnect = () => {
//     client.disconnect();
//     console.log("disconnected");
//   }
//   const handleMessage = (topic: string, payloadString: string) => {
//     const lastTopic = topic.split("/").pop();
//     if (lastTopic === "readings") {
//       const soilMoisture = payloadString.split(":")[0];
//       irrigationStore.updateIrrigationController(id, {
//         soil_moisture: Number(soilMoisture)
//       })
//     }
//   };
//   return {
//     connect,
//     disconnect,
//     sendMessage
//   }
// }
// export { useGreenhouseMqtt, useIrrigationMqtt };

// import Paho from "paho-mqtt";
// import { useGreenhouseStore, useIrrigationControllerStore, useMQTTBrokerStore } from "../zustand/store";
//
// const createMqttClient = (id: string) => {
//   const store = useMQTTBrokerStore();
//   const client = new Paho.Client(store.brokerURL, store.brokerPort, id);
//   return client;
// };
//
// const handleMessage = (id: string, payloadString: string) => {
//   const lastTopic = payloadString.split(":")[0];
//
//   if (lastTopic === "readings") {
//     const category = payloadString.split("|");
//     category.forEach(item => {
//       const [type, data] = item.split(":");
//       switch (type) {
//         case "temperature":
//           useGreenhouseStore().updateItem(id, { temperature: Number(data) });
//           break;
//         case "humidity":
//           useGreenhouseStore().updateItem(id, { humidity: Number(data) });
//           break;
//         case "soilMoisture":
//           useGreenhouseStore().updateItem(id, { soil_moisture: Number(data) });
//           break;
//         case "light":
//           useGreenhouseStore().updateItem(id, { ldrReading: Number(data) });
//           break;
//       }
//     });
//   } else if (lastTopic === "readings") {
//     const soilMoisture = payloadString.split(":")[1];
//     useIrrigationControllerStore().updateItem(id, {
//       soil_moisture: Number(soilMoisture)
//     });
//   }
// };
//
// const useMqtt = ({ id }: { id: string }) => {
//   const client = createMqttClient(id);
//   const store = useMQTTBrokerStore();
//   const connect = () => {
//     return new Promise((res, rej) => {
//       client.connect({
//         userName: store.brokerUsername,
//         password: store.brokerPassword,
//         cleanSession: true,
//         onFailure: (err) => {
//           console.error(`MQTT connection failed for ${id}:`, err);
//           rej(err);
//         },
//         onSuccess: (data) => {
//           client.subscribe(id + "/#");
//           client.onMessageArrived = (e) => {
//             handleMessage(id, e.payloadString);
//           };
//           res(data);
//         },
//         reconnect: false,
//         keepAliveInterval: 120
//       });
//     });
//   };
//
//   const sendMessage = (topic: string, message: string) => {
//     if (!client.isConnected()) {
//       console.log("MQTT client not connected");
//       return;
//     }
//     console.log(`Sending MQTT message to topic: ${topic}, message: ${message}`);
//     client.send(topic, message);
//   };
//
//   const disconnect = () => {
//     client.disconnect();
//     console.log("Disconnected MQTT client");
//   };
//
//   return {
//     connect,
//     disconnect,
//     sendMessage
//   };
// };
//
// export { useMqtt };

import Paho from "paho-mqtt";
import { useGreenhouseStore, useIrrigationControllerStore, useMQTTBrokerStore } from "../zustand/store";

const createMqttClient = (id: string) => {
  const store = useMQTTBrokerStore();
  const client = new Paho.Client(store.brokerURL, store.brokerPort, id);
  return client;
};

const handleMessage = (id: string, payloadString: string, type: "Greenhouse" | "Irrigation") => {
  const store = type === "Greenhouse" ? useGreenhouseStore() : useIrrigationControllerStore();

  const lastTopic = payloadString.split(":")[0];

  if (lastTopic === "readings") {
    const category = payloadString.split("|");
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
  const client = createMqttClient(id);
  const store = useMQTTBrokerStore();
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
          client.onMessageArrived = (e) => {
            handleMessage(id, e.payloadString, type);
          };
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
