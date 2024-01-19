// import { useGreenhouseStore } from "../zustand/store";
// import { useRef, useEffect } from "react";
//
// const useWebSocket = ({ id }: { id: string }) => {
//   const store = useGreenhouseStore();
//   const greenhouse = store.items.find((g) => g.id === id);
//   const socket = useRef<WebSocket | null>(null);
//   let heartbeatInterval: NodeJS.Timeout | null = null;
//
//   useEffect(() => {
//     if (socket.current) {
//       connect();
//     }
//   }, [])
//
//   const connect = () => {
//     return new Promise<WebSocket>((res, rej) => {
//       const ws = new WebSocket(`ws://${greenhouse?.ipAddress}:80`);
//       ws.onopen = () => {
//         socket.current = ws;
//         console.log("WebSocket connected");
//         store.updateItem(id, { isConnected: true });
//         setupHeartbeat();
//         res(ws);
//       };
//       ws.onerror = (e) => {
//         rej(e);
//       };
//       ws.onmessage = (e) => {
//         handleMessage(e);
//       };
//       ws.onclose = () => {
//         handleDisconnect("WebSocket successfully disconnected");
//       };
//     });
//   };
//
//   const disconnect = () => {
//     socket.current?.close();
//     clearInterval(heartbeatInterval!);
//     heartbeatInterval = null;
//   };
//
//   const sendMessage = (message: string) => {
//     console.log("sending message from websocket")
//     if (socket.current && socket.current.readyState === WebSocket.OPEN) {
//       socket.current.send(message);
//     } else {
//       console.warn("WebSocket is not open");
//     }
//   };
//
//   const setupHeartbeat = () => {
//     heartbeatInterval = setInterval(() => {
//       sendMessage("ping");
//       setTimeout(() => {
//         if (socket.current?.readyState !== WebSocket.OPEN) {
//           handleDisconnect("The WebSocket is not connected [failed ping mechanism]");
//         }
//       }, 5000);
//     }, 10000);
//   };
//
//   const handleMessage = (e: MessageEvent) => {
//     const [type, data] = e.data.split(":");
//     switch (type) {
//       case "temperature":
//         // store.updateGreenhouse(id, { temperature: Number(data) });
//         break;
//       case "humidity":
//         // store.updateGreenhouse(id, { humidity: Number(data) });
//         break;
//       case "soilMoisture":
//         // store.updateGreenhouse(id, { soil_moisture: Number(data) });
//         break;
//       case "light":
//         // store.updateGreenhouse(id, { ldrReading: Number(data) });
//         break;
//       default:
//         break;
//     }
//   };
//
//   const handleDisconnect = (message: string) => {
//     console.log(message);
//     store.updateItem(id, { isConnected: false });
//     socket.current = null;
//     clearInterval(heartbeatInterval!);
//     heartbeatInterval = null;
//   };
//
//
//   return {
//     connect,
//     disconnect,
//     sendMessage,
//   };
// };
//
// export default useWebSocket;
import { useRef, useEffect } from "react";
import { useGreenhouseStore, useIrrigationControllerStore } from "../zustand/store";

const useWebSocket = ({ id, type }: { id: string; type: "Greenhouse" | "Irrigation" }) => {
  const store = type === "Greenhouse" ? useGreenhouseStore() : useIrrigationControllerStore();
  const device = store.items.find((d) => d.id === id);
  const socket = useRef<WebSocket | null>(null);
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
      };
      ws.onclose = () => {
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
    console.log("sending message from websocket");
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
          handleDisconnect("The WebSocket is not connected [failed ping mechanism]");
        }
      }, 5000);
    }, 10000);
  };

  const handleMessage = (e: MessageEvent) => {
    const [dataType, dataValue] = e.data.split(":");
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
      default:
        break;
    }
  };

  const handleDisconnect = (message: string) => {
    console.log(message);
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
