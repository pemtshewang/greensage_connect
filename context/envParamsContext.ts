import { createContext } from "react";

export const EnvtParamsContext = createContext<{
  temperature: number,
  humidity: number,
  soilMoisture: number,
  light: number,
}>({
  temperature: 0,
  humidity: 0,
  soilMoisture: 0,
  light: 0,
});
