import { createContext } from "react";

export interface EnvtParamsContextType {
  values: {
    temperature: number;
    humidity: number;
    soilMoisture: number;
    light: number;
  };
  updateValues: (newValues: Partial<EnvtParamsContextType['values']>) => void;
}

export const EnvtParamsContext = createContext<EnvtParamsContextType | undefined>(undefined);


