import { useRef } from "react";
import { useGreenhouseStore } from "../zustand/store";

const useWebSocket = ({ id }: { id: string }) => {
  const store = useGreenhouseStore();
  const greenhouse = store.greenhouses.find((g) => g.id === id);
  const socket = useRef<WebSocket | null>(null);
  let heartbeatInterval: NodeJS.Timeout | null = null;

  const connect = (): Promise<WebSocket> => {
    return new Promise<WebSocket>((res, rej) => {
      const ws = new WebSocket(`ws://${greenhouse?.ipAddress}`);
      ws.onopen = () => {
        socket.current = ws;
        console.log("WebSocket connected");
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
        handleDisconnect("WebSocket successfully disconnected");
      };
    });
  };

  const disconnect = () => {
    if (socket.current) {
      socket.current?.close();
      clearInterval(heartbeatInterval!);
      heartbeatInterval = null;
    } else {
      console.log("socket is null");
    }
  };

  const sendMessage = (message: string) => {
    if (socket.current === null) {
      console.error("socket is null");
      return;
    }
    socket.current?.send(message);
  };

  const setupHeartbeat = () => {
    heartbeatInterval = setInterval(() => {
      sendMessage("ping");
      let isDisconnected = false;
      // Send ping and handle disconnect if no response received after 5 seconds
      setTimeout(() => {
        if (!isDisconnected && socket.current?.readyState === WebSocket.OPEN) {
          handleDisconnect("The WebSocket is not responding [no response]");
          isDisconnected = true;
        }
      }, 5000);
    }, 10000);
  };

  const isConnected = () => {
    return socket.current?.readyState === WebSocket.OPEN;
  }

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
    }
  };

  const handleDisconnect = (message: string) => {
    console.log(message);
    store.updateGreenhouse(id, { isConnected: false });
    socket.current = null;
    clearInterval(heartbeatInterval!);
    heartbeatInterval = null;
  };

  return {
    connect,
    disconnect,
    sendMessage,
    isConnected
  };
};

export default useWebSocket;
