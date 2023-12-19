interface totalGreenhouseState {
    count: number;
    greenhouses : GreenhouseState[];
}

interface GreenhouseState { 
    id: string;
    name: string;
    backgroundImage: string;
    ipAddress: string;
    isConnected: boolean;
    temperature: number;
    humidity: number;
}

export { GreenhouseState, totalGreenhouseState };
