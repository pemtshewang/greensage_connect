export enum ConnectionType {
    WebSocket = 'websocket',
    MQTT = 'mqtt',
}
interface totalGreenhouseState {
    count: number;
    greenhouses: GreenhouseState[];
}
interface totalIrrigationControllerState {
    count: number;
    irrigationControllers: IrrigationControllerState[];
}
export interface IWebSocket {
    sendMessage: (topic?: string, message?: string) => void;
    connect: () => Promise<any>;
    disconnect: () => void;
}
interface MqttConnectOptions {
    userName: string;
    password: string;
    cleanSession?: boolean;
    onFailure?: (err: any) => void;
    onSuccess?: (data: any) => void;
    reconnect?: boolean;
    keepAliveInterval?: number;
}
export interface IMqttClient {
    connect(options: MqttConnectOptions): void;
    disconnect(): void;
    send(topic: string, message: string): void;
    subscribe(topic: string): void;
    unsubscribe(topic: string): void;
    isConnected(): boolean;
    sendMessage: (topic?: string, message?: string) => void;
}
interface TimeSets {
    repetitionDays: number; // bitmask
    startTime: string | null;
    endTime: string | null;
}
interface GreenhouseState {
    id: string;
    name: string;
    backgroundImage: string;
    ipAddress: string;
    ldrReading: number;
    isConnected: boolean;
    //parameters
    temperature: number;
    humidity: number;
    soil_moisture: number;
    temperatureThreshold: number;
    soilMoistureThreshold: number;
    humidityThreshold: number;
    //end parameters 
    ventilationFanState: boolean;
    rollerShutterRightState: boolean;
    rollerShutterLeftState: boolean;
    lightState: boolean;
    waterValveState: boolean;
    ws: IWebSocket | IMqttClient | null;
    firstSlot?: TimeSets | null;
    secondSlot?: TimeSets | null;
    thirdSlot?: TimeSets | null;
    connectionType: ConnectionType | null;
}
interface IrrigationControllerState {
    id: string;
    name: string;
    backgroundImage: string;
    ipAddress: string;
    isConnected: boolean;
    //parameters
    soil_moisture: number;
    ws: IWebSocket | null;
    connectionType: ConnectionType | null;
    valveStates: {
        firstSlot?: {
            state: boolean;
            startTime: Date | null;
            endTime: Date | null;
            repDays: number;
        } | null,
        secondSlot?: {
            state: boolean;
            startTime: Date | null;
            endTime: Date | null;
            repDays: number;
        } | null,
        thirdSlot?: {
            state: boolean;
            startTime: Date | null;
            endTime: Date | null;
            repDays: number;
        } | null,
        fourthSlot?: {
            state: boolean;
            startTime: Date | null;
            endTime: Date | null;
            repDays: number;
        } | null,
        fifthSlot?: {
            state: boolean;
            startTime: Date | null;
            endTime: Date | null;
            repDays: number;
        } | null,
    }
}
export { GreenhouseState, totalGreenhouseState, IrrigationControllerState, totalIrrigationControllerState };
