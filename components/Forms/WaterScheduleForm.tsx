import { useState } from "react";
import { View } from "native-base";
import SlotContainer from "../WaterScheduleSlotContainer";
import { IWebSocket } from "../../zustand/state";

const WaterSchedulerForm = ({ ws }: {
  ws: IWebSocket
}) => {
  const [slot, setSlot] = useState<{
    start: {
      date: Date
    }
    end: {
      date: Date
    }
  }>();
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
      <SlotContainer slot={1} prevStartTime={new Date()} prevEndTime={new Date()} ws={ws} />
      <SlotContainer slot={2} prevStartTime={new Date()} prevEndTime={new Date()} ws={ws} />
      <SlotContainer slot={3} prevStartTime={new Date()} prevEndTime={new Date()} ws={ws} />
    </View >
  );
};
export default WaterSchedulerForm;
