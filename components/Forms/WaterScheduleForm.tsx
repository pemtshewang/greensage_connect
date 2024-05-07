import { View } from "native-base";
import SlotContainer from "../WaterScheduleSlotContainer";
import { IMqttClient, IWebSocket } from "../../zustand/state";
import { useGreenhouseStore } from "../../zustand/store";

const WaterSchedulerForm = ({
  ws,
  id,
}: {
  id: string;
  ws: IWebSocket | IMqttClient;
}) => {
  const store = useGreenhouseStore();
  const greenhouse = store.items.find((greenhouse) => greenhouse.id === id);
  return (
    <View
    bg="white"
    borderRadius="md"
      padding="5"
      style={{
        // shadowy container
        elevation: 1,
        marginHorizontal: 5,
      }}
    >
      <SlotContainer
        slot={1}
        id={id}
        prevStartTime={greenhouse?.firstSlot?.startTime || null}
        prevEndTime={greenhouse?.firstSlot?.endTime || null}
        repDays={greenhouse?.firstSlot?.repetitionDays || 0}
        ws={ws}
      />
      <SlotContainer
        slot={2}
        id={id}
        prevStartTime={greenhouse?.secondSlot?.startTime || null}
        prevEndTime={greenhouse?.secondSlot?.endTime || null}
        repDays={greenhouse?.secondSlot?.repetitionDays || 0}
        ws={ws}
      />
      <SlotContainer
        slot={3}
        id={id}
        prevStartTime={greenhouse?.thirdSlot?.startTime || null}
        prevEndTime={greenhouse?.thirdSlot?.endTime || null}
        repDays={greenhouse?.thirdSlot?.repetitionDays || 0}
        ws={ws}
      />
    </View>
  );
};
export default WaterSchedulerForm;
