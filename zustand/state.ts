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
    ws: IWebSocket | null;
    firstSlot?: TimeSets | null;
    secondSlot?: TimeSets | null;
    thirdSlot?: TimeSets | null;
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
