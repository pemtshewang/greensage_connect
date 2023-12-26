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
    temperature: number;
    humidity: number;
    ventilationFanState: boolean;
    lightState: boolean;
    ws: WebSocketService;
}

export { GreenhouseState, totalGreenhouseState };
