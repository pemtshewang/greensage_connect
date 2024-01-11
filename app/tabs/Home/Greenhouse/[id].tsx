import { useLocalSearchParams } from "expo-router";
import { useGreenhouseStore } from "../../../../zustand/store";
import { useState, useEffect } from "react";
import IrrigationControllerContainer from "../../../../components/IrrigationControllerContainer";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [params, setParams] = useState<{
    temperature: number;
    humidity: number;
    soil_moisture: number;
    ldr: number;
  }>({
    temperature: 0,
    humidity: 0,
    soil_moisture: 0,
    ldr: 0,
  });
  const store = useGreenhouseStore();
  const greenhouse = store.greenhouses.find(
    (g) => g.id === id
  );
  useEffect(() => {
    setParams({
      temperature: greenhouse?.temperature as number,
      humidity: greenhouse?.humidity as number,
      soil_moisture: greenhouse?.soil_moisture as number,
      ldr: greenhouse?.soil_moisture as number,
    });
  }, [greenhouse]);
  return (
    <>
      <IrrigationControllerContainer soilMoistureReading={34} />
    </>
  );
};

export default Page;
