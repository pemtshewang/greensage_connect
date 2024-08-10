export enum ConnectionType {
  WebSocket = "websocket",
  MQTT = "mqtt",
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
  connect: () => Promise<unknown>;
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
  connect(options: MqttConnectOptions): Promise<unknown>;
  disconnect(): void;
  sendMessage: (topic: string, message?: string) => void;
}

interface TimeSets {
  repetitionDays: number; // bitmask
  startTime: string | null;
  endTime: string | null;
}
interface GreenhouseState {
  synced: boolean;
  id: string;
  name: string;
  backgroundImage: string;
  ipAddress: string;
  isConnected: boolean;
  //parameters
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
  synced: boolean;
  id: string;
  name: string;
  backgroundImage: string;
  ipAddress: string;
  soilMoisture: number;
  isConnected: boolean;
  //parameters
  ws: IWebSocket | IMqttClient | null;
  connectionType: ConnectionType | null;
  valveStates: {
    firstSlot?: {
      name: string | null;
      state: boolean;
      startTime: Date | null;
      endTime: Date | null;
      repDays: number;
    } | null;
    secondSlot?: {
      name: string | null;
      state: boolean;
      startTime: Date | null;
      endTime: Date | null;
      repDays: number;
    } | null;
    thirdSlot?: {
      name: string | null;
      state: boolean;
      startTime: Date | null;
      endTime: Date | null;
      repDays: number;
    } | null;
    fourthSlot?: {
      name: string | null;
      state: boolean;
      startTime: Date | null;
      endTime: Date | null;
      repDays: number;
    } | null;
    fifthSlot?: {
      name: string | null;
      state: boolean;
      startTime: Date | null;
      endTime: Date | null;
      repDays: number;
    } | null;
    sixthSlot?: {
      name: string | null;
      state: boolean;
      startTime: Date | null;
      endTime: Date | null;
      repDays: number;
    } | null;
    seventhSlot?: {
      name: string | null;
      state: boolean;
      startTime: Date | null;
      endTime: Date | null;
      repDays: number;
    } | null;
  };
}
export {
  GreenhouseState,
  totalGreenhouseState,
  IrrigationControllerState,
  totalIrrigationControllerState,
};
