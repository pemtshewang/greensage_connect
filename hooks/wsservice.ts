import { useRef, useEffect } from "react";

import {
  useGreenhouseStore,
  useIrrigationControllerStore,
} from "../zustand/store";
import { useEnvironmentContext } from "../context/envParamsContext";

const useWebSocket = ({
  id,
  type,
}: {
  id: string;
  type: "Greenhouse" | "Irrigation";
}) => {
  const store =
    type === "Greenhouse"
      ? useGreenhouseStore()
      : useIrrigationControllerStore();
  const device = store.items.find((d) => d.id === id);
  const socket = useRef<WebSocket | null>(null);
  const { updateEnvironment } = useEnvironmentContext();
  let heartbeatInterval: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (socket.current) {
      connect();
    }
  }, []);

  const connect = () => {
    return new Promise<WebSocket>((res, rej) => {
      const ws = new WebSocket(`ws://${device?.ipAddress}:80`);
      ws.onopen = () => {
        socket.current = ws;
        console.log("WebSocket connected");
        store.updateItem(id, { isConnected: true });
        setupHeartbeat();
        res(ws);
      };
      ws.onerror = (e) => {
        rej(e);
      };
      ws.onmessage = (e) => {
        handleMessage(e);
      }; ws.onclose = () => {
        handleDisconnect("WebSocket successfully disconnected");
      };
    });
  };

  const disconnect = () => {
    socket.current?.close();
    clearInterval(heartbeatInterval!);
    heartbeatInterval = null;
  };

  const sendMessage = (message: string) => {
    try {
      socket?.current?.send(message);
    } catch (err) {
      console.log(err);
      connect();
      socket?.current?.send(message);
    }
  };

  const setupHeartbeat = () => {
    heartbeatInterval = setInterval(() => {
      sendMessage("ping");
      setTimeout(() => {
        if (socket.current?.readyState !== WebSocket.OPEN) {
          handleDisconnect(
            "The WebSocket is not connected [failed ping mechanism]"
          );
        }
      }, 5000);
    }, 10000);
  };

  const handleMessage = (e: MessageEvent) => {
    const [dataType, dataValue] = e.data.split(":");
    switch (dataType) {
      case "temperature":
        updateEnvironment({
          temperature: Number(dataValue)
        })
        break;
      case "humidity":
        updateEnvironment({
          humidity: Number(dataValue)
        })
        break;
      case "soilMoisture":
        updateEnvironment({
          soilMoisture: Number(dataValue)
        })
        break;
      case "light":
        updateEnvironment({
          light: Number(dataValue)
        })
        break;
      case "pressure":
        updateEnvironment({
          pressure: Number(dataValue)
        })
        break;
    }
  };

  const handleDisconnect = (message: string) => {
    store.updateItem(id, { isConnected: false });
    socket.current = null;
    clearInterval(heartbeatInterval!);
    heartbeatInterval = null;
  };

  return {
    connect,
    disconnect,
    sendMessage,
  };
};

export default useWebSocket;
