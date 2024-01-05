import { useState } from "react";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View } from "native-base";
import Icons from "../../assets/Icons/Icons";
import { format } from "date-fns";
import { Heading4 } from "lucide-react-native";
import { Text } from "react-native";
import SlotContainer from "../WaterScheduleSlotContainer";

const WaterSchedulerForm = () => {
  const [slot, setSlot] = useState<{
    start: {
      date: Date
    }
    end: {
      date: Date
    }
  }>();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  {/* <Button onPress={showDatepicker} title="Show date picker!" /> */ }
  {/* <Button onPress={showTimepicker} title="Show time picker!" /> */ }
  {/* <Text>selected: {date.toLocaleString()}</Text> */ }
  {/* {show && ( */ }
  {/*   <DateTimePicker */ }
  {/*     testID="dateTimePicker" */ }
  {/*     value={date} */ }
  {/*     mode="time" */ }
  {/*     is24Hour={true} */ }
  {/*     onChange={onChange} */ }
  {/*   /> */ }
  {/* )} */ }
  return (
    <View style={{
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
      padding: 20,
      marginTop: 20,
    }}>
      <SlotContainer slot={1} startTime={new Date('2022-08-18T16:28:00')} endTime={new Date('2022-08-18T16:50:00')} />
      <SlotContainer slot={2} startTime={new Date('2022-08-18T16:28:00')} endTime={new Date('2022-08-18T16:50:00')} />
      <SlotContainer slot={3} startTime={new Date('2022-08-18T16:28:00')} endTime={new Date('2022-08-18T16:50:00')} />
    </View >
  );
};
export default WaterSchedulerForm;
