import Paho from "paho-mqtt";
import { getValueFor } from "../securestore";
import { useEffect, useState } from "react";
import { useEnvironmentContext } from "../context/envParamsContext";

const getBrokerValues = async () => {
  const val = await getValueFor("token");
  const parsedValues = JSON.parse(val as string);
  //executes too many
  const brokerConfigs = {
    brokerURL: parsedValues.brokerIp,
    brokerPort: parsedValues.brokerPort,
    brokerUsername: parsedValues.username,
    brokerPassword: parsedValues.password,
  };
  return brokerConfigs;
};
const createMqttClient = ({
  brokerURL,
  brokerPort,
  id,
}: {
  brokerURL: string;
  brokerPort: number;
  id: string;
}) => {
  const client = new Paho.Client(brokerURL, brokerPort, id);
  return client;
};

const useMqtt = ({ id }: { id: string }) => {
  const [brokerId, setBrokerId] = useState("");
  const [brokerValues, setBrokerValues] = useState({
    brokerURL: "",
    brokerPort: 0,
    brokerUsername: "",
    brokerPassword: "",
  });
  useEffect(() => {
    getBrokerValues().then((values) => {
      setBrokerValues(values);
    });
  }, []);
  const { updateEnvironment } = useEnvironmentContext();
  const client = createMqttClient({
    id,
    brokerURL: brokerValues.brokerURL,
    brokerPort: brokerValues.brokerPort,
  });
  useEffect(() => {
    getValueFor("token").then((token) => {
      setBrokerId(JSON.parse(token as string)?.brokerId);
    });
  }, []);
  const connect = () => {
    return new Promise((res, rej) => {
      client.connect({
        uris: [`wss://${brokerValues.brokerURL}:8084/mqtt`],
        useSSL: true,
        userName: brokerValues.brokerUsername,
        password: brokerValues.brokerPassword,
        cleanSession: false,
        onFailure: (err) => {
          console.error(`MQTT connection failed for ${id}:`, err);
          rej(err);
        },
        onSuccess: (data) => {
          client.subscribe("user/" + brokerId + "/#");
          client.onMessageArrived = (msg) => {
            try {
              handleMessage({
                topic: msg?.topic,
                payloadString: msg.payloadString,
              });
            } catch (err) {
              console.log(err);
            }
          };
          res(data);
        },
        reconnect: true,
      });
    });
  };
  const sendMessage = (topic: string, message: string) => {
    try {
      client.send(topic, message);
    } catch (err) {
      client.connect();
      client.send(topic, message);
    }
  };

  const disconnect = () => {
    client.disconnect();
    console.log("Disconnected MQTT client");
  };

  const handleMessage = ({
    topic,
    payloadString,
  }: {
    topic: string;
    payloadString: string;
  }) => {
    console.log(topic);
    const lastTopic = topic.split("/").pop();
    if (lastTopic === "readings") {
      const category = payloadString.split("|");
      console.log("Category", category);
      category.forEach((item) => {
        const [dataType, dataValue] = item.split(":");
        switch (dataType) {
          case "temperature":
            updateEnvironment({
              temperature: Number(dataValue),
            });
            break;
          case "humidity":
            updateEnvironment({
              humidity: Number(dataValue),
            });
            break;
          case "soilMoisture":
            updateEnvironment({
              soilMoisture: Number(dataValue),
            });
            break;
          case "light":
            updateEnvironment({
              light: Number(dataValue),
            });
            break;
        }
      });
    }
  };
  return {
    connect,
    disconnect,
    sendMessage,
  };
};

export { useMqtt };
