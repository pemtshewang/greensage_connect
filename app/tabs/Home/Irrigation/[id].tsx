import { useLocalSearchParams } from "expo-router";
import { useIrrigationControllerStore } from "../../../../zustand/store";
import { useState, useEffect } from "react";
import IrrigationControllerContainer from "../../../../components/IrrigationControllerContainer";
import ThresholdSetForm from "../../../../components/Forms/ThresholdSetForm";
import { IWebSocket } from "../../../../zustand/state";
import { ScrollView } from "native-base";
import IrrigationSchedulerContainer from "../../../../components/IrrigationSchedulerContainer";


const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [params, setParams] = useState<{
    soil_moisture: number;
  }>({
    soil_moisture: 0,
  });
  const store = useIrrigationControllerStore();
  const irrigation = store.irrigationControllers.find(
    (g) => g.id === id
  );
  useEffect(() => {
    setParams({
      soil_moisture: irrigation?.soil_moisture as number,
    });
  }, [irrigation]);
  return (
    <ScrollView>
      <IrrigationControllerContainer soilMoistureReading={params.soil_moisture} />
      <ThresholdSetForm
        id={id as string}
        message="Set a threshold for water valves"
        type="soil_moisture"
        ws={irrigation?.ws as IWebSocket}
        defaultValue={irrigation?.soil_moisture as number} />
      <IrrigationSchedulerContainer
        valveLabel="firstSlot"
        id={id as string}
        state={irrigation?.valveStates.firstSlot?.state as boolean}
      />
      <IrrigationSchedulerContainer
        valveLabel="secondSlot"
        id={id as string}
        state={irrigation?.valveStates.secondSlot?.state as boolean}
      />
      <IrrigationSchedulerContainer
        valveLabel="thirdSlot"
        id={id as string}
        state={irrigation?.valveStates.thirdSlot?.state as boolean}
      />
      <IrrigationSchedulerContainer
        valveLabel="fourthSlot"
        id={id as string}
        state={irrigation?.valveStates.fourthSlot?.state as boolean}
      />
      <IrrigationSchedulerContainer
        valveLabel="fifthSlot"
        id={id as string}
        state={irrigation?.valveStates.fifthSlot?.state as boolean}
      />
    </ScrollView>
  );
};

export default Page;
