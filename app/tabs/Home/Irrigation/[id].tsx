import { useLocalSearchParams } from "expo-router";
import { useIrrigationControllerStore } from "../../../../zustand/store";
import { useState, useEffect } from "react";
import IrrigationControllerContainer from "../../../../components/IrrigationControllerContainer";
import ThresholdSetForm from "../../../../components/Forms/ThresholdSetForm";
import { IMqttClient, IWebSocket } from "../../../../zustand/state";
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
  const irrigation = store.items.find(
    (g) => g.id === id
  );
  useEffect(() => {
    setParams({
      soil_moisture: irrigation?.soil_moisture as number,
    });
  }, [irrigation]);
  return (
    <ScrollView>
      <IrrigationControllerContainer soilMoistureReading={34} />
      <ThresholdSetForm
        id={id as string}
        storeType="Irrigation"
        message="Set a threshold for water valves"
        type="soil_moisture"
        ws={irrigation?.ws as IWebSocket | IMqttClient}
        defaultValue={irrigation?.soil_moisture as number || 0} />
      <IrrigationSchedulerContainer
        prevStartTime={irrigation?.valveStates.firstSlot?.startTime as Date || null}
        prevEndTime={irrigation?.valveStates.firstSlot?.endTime as Date || null}
        valveLabel="firstSlot"
        repDays={irrigation?.valveStates.firstSlot?.repDays as number || 0}
        id={id as string}
        state={irrigation?.valveStates.firstSlot?.state as boolean}
      />
      <IrrigationSchedulerContainer
        prevStartTime={irrigation?.valveStates.secondSlot?.startTime as Date || null}
        prevEndTime={irrigation?.valveStates.secondSlot?.endTime as Date || null}
        valveLabel="secondSlot"
        repDays={irrigation?.valveStates.secondSlot?.repDays as number || 0}
        id={id as string}
        state={irrigation?.valveStates.secondSlot?.state as boolean}
      />
      <IrrigationSchedulerContainer
        prevStartTime={irrigation?.valveStates.thirdSlot?.startTime as Date || null}
        prevEndTime={irrigation?.valveStates.thirdSlot?.endTime as Date || null}
        valveLabel="thirdSlot"
        repDays={irrigation?.valveStates.thirdSlot?.repDays as number || 0}
        id={id as string}
        state={irrigation?.valveStates.thirdSlot?.state as boolean}
      />
      <IrrigationSchedulerContainer
        valveLabel="fourthSlot"
        prevStartTime={irrigation?.valveStates.fourthSlot?.startTime as Date || null}
        prevEndTime={irrigation?.valveStates.fourthSlot?.endTime as Date || null}
        repDays={irrigation?.valveStates.fourthSlot?.repDays as number || 0}
        id={id as string}
        state={irrigation?.valveStates.fourthSlot?.state as boolean}
      />
      <IrrigationSchedulerContainer
        valveLabel="fifthSlot"
        prevStartTime={irrigation?.valveStates.fifthSlot?.startTime as Date || null}
        prevEndTime={irrigation?.valveStates.fifthSlot?.endTime as Date || null}
        repDays={irrigation?.valveStates.fifthSlot?.repDays as number || 0}
        id={id as string}
        state={irrigation?.valveStates.fifthSlot?.state as boolean}
      />
    </ScrollView>
  );
};

export default Page;
