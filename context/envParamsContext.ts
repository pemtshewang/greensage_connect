import { createContext, useContext } from 'react';

// Create a context with initial values
export const EnvironmentContext = createContext({
  environment: {
    temperature: 0,
    humidity: 0,
    soilMoisture: 0,
    light: 0
  },
  updateEnvironment: (data: any) => { }
});

export const useEnvironmentContext = () => useContext(EnvironmentContext);



