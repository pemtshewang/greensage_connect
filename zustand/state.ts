interface totalGreenhouseState {
    count: number;
    greenhouses: GreenhouseState[];
}
interface ws {
    sendMessage: (message: string) => void;
    connect: () => Promise<void>;
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
    //end parameters 
    ventilationFanState: boolean;
    lightState: boolean;
    ws: ws;
}

export { GreenhouseState, totalGreenhouseState };
