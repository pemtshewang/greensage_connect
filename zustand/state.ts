import WebSocketService from "../config/websocket/websocket";

interface totalGreenhouseState {
    count: number;
    greenhouses: GreenhouseState[];
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
    ws: WebSocketService;
}

export { GreenhouseState, totalGreenhouseState };
