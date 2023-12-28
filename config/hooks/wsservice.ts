import { useGreenhouseStore } from "../../zustand/store";
import { useRef, useEffect } from "react";

const useWebSocket = ({ id }: { id: string }) => {
  const store = useGreenhouseStore();
  const greenhouse = store.greenhouses.find((g) => g.id === id);
  const socket = useRef<WebSocket | null>(null);
  let heartbeatInterval: NodeJS.Timeout | null = null;

  const connect = () => {
    return new Promise<WebSocket>((res, rej) => {
      const ws = new WebSocket(`ws://${greenhouse?.ipAddress}:81`);

      ws.onopen = () => {
        console.log("WebSocket connected");
        socket.current = ws;
        store.updateGreenhouse(id, { isConnected: true });
        setupHeartbeat();
        res(ws);
      };

      ws.onerror = (e) => {
        rej(e);
      };

      ws.onmessage = (e) => {
        handleMessage(e);
      };

      ws.onclose = () => {
        handleDisconnect();
      };
    });
  };

  const disconnect = () => {
    socket.current?.close();
    clearInterval(heartbeatInterval!);
    heartbeatInterval = null;
  };

  const sendMessage = (message: string) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(message);
    } else {
      console.warn("WebSocket is not open");
    }
  };

  const setupHeartbeat = () => {
    heartbeatInterval = setInterval(() => {
      sendMessage("ping");
      setTimeout(() => {
        if (socket.current?.readyState !== WebSocket.OPEN) {
          handleDisconnect();
        }
      }, 5000);
    }, 10000);
  };

  const handleMessage = (e: MessageEvent) => {
    const [type, data] = e.data.split(":");
    switch (type) {
      case "temperature":
        console.log("temperature", data);
        store.updateGreenhouse(id, { temperature: Number(data) });
        break;
      case "humidity":
        console.log("humidity", data);
        store.updateGreenhouse(id, { humidity: Number(data) });
        break;
      case "soil":
        store.updateGreenhouse(id, { soil_moisture: Number(data) });
        break;
      default:
        break;
    }
  };

  const handleDisconnect = () => {
    console.log("WebSocket disconnected");
    store.updateGreenhouse(id, { isConnected: false });
    clearInterval(heartbeatInterval!);
    heartbeatInterval = null;
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return {
    connect,
    disconnect,
    sendMessage,
  };
};

export default useWebSocket;
