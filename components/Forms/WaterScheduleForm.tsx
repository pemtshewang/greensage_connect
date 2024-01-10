import { View } from "native-base";
import SlotContainer from "../WaterScheduleSlotContainer";
import { IWebSocket } from "../../zustand/state";
import { useGreenhouseStore } from "../../zustand/store";

const WaterSchedulerForm = ({ ws, id }: {
  id: string,
  ws: IWebSocket,
}) => {
  const store = useGreenhouseStore();
  const greenhouse = store.greenhouses.find((greenhouse) => greenhouse.id === id);
  return (
    <View
      margin="2"
      padding="5"
      style={{
        // shadowy container
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        borderRadius: 9,
        borderColor: "lightgray",
      }}>
      <SlotContainer
        slot={1}
        id={id}
        prevStartTime={greenhouse?.firstSlot?.startTime || null}
        prevEndTime={greenhouse?.firstSlot?.endTime || null}
        repDays={greenhouse?.firstSlot?.repetitionDays || 0}
        ws={ws} />
      <SlotContainer
        slot={2}
        id={id}
        prevStartTime={greenhouse?.secondSlot?.startTime || null}
        prevEndTime={greenhouse?.secondSlot?.endTime || null}
        repDays={greenhouse?.secondSlot?.repetitionDays || 0}
        ws={ws} />
      <SlotContainer
        slot={3}
        id={id}
        prevStartTime={greenhouse?.thirdSlot?.startTime || null}
        prevEndTime={greenhouse?.thirdSlot?.endTime || null}
        repDays={greenhouse?.thirdSlot?.repetitionDays || 0}
        ws={ws} />
    </View >
  );
};
export default WaterSchedulerForm;
