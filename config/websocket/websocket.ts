import { useGreenhouseStore } from "../../zustand/store";
import { StoreState } from "../../zustand/store";

export default class WebSocketService {
  private socket?: WebSocket;
  private portNumber: string;
  private greenHouseId: string;
  private store: StoreState;

  constructor(private ipAddress: string, portNumber: string, greenHouseId: string) {
    this.portNumber = portNumber;
    this.ipAddress = ipAddress;
    this.greenHouseId = greenHouseId;
    this.store = useGreenhouseStore();
  }

  private initSocket(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(`ws://${this.ipAddress}:${this.portNumber}`);

      this.socket.onopen = () => {
        console.log('Connected to WebSocket');
        resolve();
      };

      this.socket.onmessage = (event) => {
        const message = event.data as string;
        console.log('Received message:', message);

        const [dataType, value] = message.split(':');
        switch (dataType) {
          case "temperature":
            this.store.updateGreenhouse(this.greenHouseId, {
              ...this.store.greenhouses.find((greenhouse) => greenhouse.id === this.greenHouseId),
              temperature: Number(value)
            });
            break;
          case "humidity":
            this.store.updateGreenhouse(this.greenHouseId, {
              ...this.store.greenhouses.find((greenhouse) => greenhouse.id === this.greenHouseId),
              humidity: Number(value)
            });
            break;
          case "soil_moisture":
            this.store.updateGreenhouse(this.greenHouseId, {
              ...this.store.greenhouses.find((greenhouse) => greenhouse.id === this.greenHouseId),
              soil_moisture: Number(value)
            });
            break;
          default:
            break;
        }
      };

      this.socket.onclose = () => {
        console.log('Disconnected from WebSocket');
        // Perform any cleanup or reconnection logic here
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        // Handle WebSocket errors here
        reject();
      };
    });
  }

  public connect(): Promise<void> {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return this.initSocket();
    } else {
      return Promise.resolve();
    }
  }

  public disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  public sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
      console.log('Sent message:', message);
    } else {
      console.error('WebSocket connection not established');
    }
  }
}

