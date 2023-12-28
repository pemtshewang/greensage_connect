import { useGreenhouseStore } from "../../zustand/store"
import { useEffect, useRef, useState } from "react";

const useWebSocket = ({ id }: {
  id: string
}) => {
  const store = useGreenhouseStore();
  const greenhouse = store.greenhouses.find((g) => g.id === id);
  const socket = useRef<WebSocket | null>(null);
  const connect = () => {
    return new Promise((res, rej) => {
      const ws = new WebSocket(`ws://${greenhouse?.ipAddress}:81`);
      socket.current = ws;
      ws.onopen = () => {
        console.log("WebSocket connected");
        store.updateGreenhouse(id, { isConnected: true });
        res(ws)
      };
      ws.onerror = (e) => {
        rej(e);
      };
      ws.onmessage = (e) => {
        const [type, data] = e.data.split(":");
        switch (type) {
          case "temperature":
            store.updateGreenhouse(id, { temperature: Number(data) });
            break;
          case "humidity":
            store.updateGreenhouse(id, { humidity: Number(data) });
            break;
          case "soil":
            store.updateGreenhouse(id, { soil_moisture: Number(data) });
            break;
          default:
            break;
        }
      }
      ws.onclose = () => {
        console.log("WebSocket disconnected");
        store.updateGreenhouse(id, { isConnected: false });
        socket.current = null;
      }
    });
  }

  const sendMessage = (message: string) => {
    if (greenhouse?.isConnected) {
      socket.current?.send(message);
    } else {
      console.error("Socket not open");
    }
  }

  const disconnect = () => {
    socket.current?.close();
  }

  return {
    connect,
    sendMessage,
    disconnect,
  }
}

export default useWebSocket;
