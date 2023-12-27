import { useState } from 'react';
import { useGreenhouseStore } from '../zustand/store';

const useWebSocket = (ipAddress: string, portNumber: string, greenHouseId: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const store = useGreenhouseStore();

  const initSocket = () => {
    return new Promise<void>((resolve, reject) => {
      const newSocket = new WebSocket(`ws://${ipAddress}:${portNumber}`);

      newSocket.onopen = () => {
        console.log('Connected to WebSocket');
        resolve();
      };

      newSocket.onmessage = (event) => {
        const message = event.data as string;
        console.log('Received message:', message);

        const [dataType, value] = message.split(':');
        switch (dataType) {
          case 'temperature':
            store.updateGreenhouse(greenHouseId, {
              ...store.greenhouses.find((greenhouse) => greenhouse.id === greenHouseId),
              temperature: Number(value),
            });
            break;
          case 'humidity':
            store.updateGreenhouse(greenHouseId, {
              ...store.greenhouses.find((greenhouse) => greenhouse.id === greenHouseId),
              humidity: Number(value),
            });
            break;
          case 'soil_moisture':
            store.updateGreenhouse(greenHouseId, {
              ...store.greenhouses.find((greenhouse) => greenhouse.id === greenHouseId),
              soil_moisture: Number(value),
            });
            break;
          default:
            break;
        }
      };

      newSocket.onclose = () => {
        console.log('Disconnected from WebSocket');
        // Perform any cleanup or reconnection logic here
      };

      newSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        // Handle WebSocket errors here
        reject();
      };

      setSocket(newSocket);
    });
  };

  const connect = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        initSocket()
          .then(() => resolve())
          .catch((error) => {
            console.error('WebSocket connection error:', error);
            reject();
          });
      } else {
        resolve();
      }
    });
  };

  const disconnect = () => {
    if (socket) {
      socket.close();
    }
  };

  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      console.log('Sent message:', message);
    } else {
      console.error('WebSocket connection not established');
    }
  };

  return { connect, disconnect, sendMessage };
};

export default useWebSocket;
