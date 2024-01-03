
interface totalGreenhouseState {
    count: number;
    greenhouses: GreenhouseState[];
}
export interface IWebSocket {
    sendMessage: (message: string) => void;
    connect: () => Promise<WebSocket>;
    disconnect: () => void;
    isConnected: () => boolean | null | undefined;
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
    //end parameters 
    ventilationFanState: boolean;
    lightState: boolean;
    waterValveState: boolean;
    ws: IWebSocket;
}

export { GreenhouseState, totalGreenhouseState };
