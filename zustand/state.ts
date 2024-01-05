
interface totalGreenhouseState {
    count: number;
    greenhouses: GreenhouseState[];
}

export interface IWebSocket {
    sendMessage: (message: string) => void;
    connect: () => Promise<WebSocket>;
    disconnect: () => void;
}

interface GreenhouseState {
    id: string;
    name: string;
    backgroundImage: string;
    ipAddress: string;
    isConnected: boolean;
    //parameters
    temperature: number;
    humidity: number;
    soil_moisture: number;
    temperatureThreshold: number;
    soilMoistureThreshold: number;
    //end parameters 
    ventilationFanState: boolean;
    lightState: boolean;
    waterValveState: boolean;
    ws: IWebSocket;
    waterScheduleSlots: {
        [key: string]: {
            startTime: Date;
            endTime: Date;
        }
    }
export { GreenhouseState, totalGreenhouseState };
