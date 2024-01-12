import { View, Text, Button, useToast } from "native-base"
import Icons from "../assets/Icons/Icons"
import { useState, useEffect } from "react"
import { Pressable } from "react-native"
import { IWebSocket } from "../zustand/state"
import { useGreenhouseStore, useIrrigationControllerStore } from "../zustand/store"
import { extractTime } from "../utils/dateFormat"
import DateTimePickerModal from "react-native-modal-datetime-picker"

const IrrigationSlotContainer = ({
  id,
  ws,
  valveNumber,
  prevStartTime,
  prevEndTime,
  repDays
}: {
  id: string,
  ws: IWebSocket;
  valveNumber: "firstSlot" | "secondSlot" | "thirdSlot" | "fourthSlot" | "fifthSlot"
  prevStartTime: string | null,
  prevEndTime: string | null,
  repDays: number,
}) => {
  const daysOfWeek = [
    { name: 'Sun', value: 0b00000001 },
    { name: 'Mon', value: 0b00000010 },
    { name: 'Tue', value: 0b00000100 },
    { name: 'Wed', value: 0b00001000 },
    { name: 'Thu', value: 0b00010000 },
    { name: 'Fri', value: 0b00100000 },
    { name: 'Sat', value: 0b01000000 },
  ];
  const store = useIrrigationControllerStore();
  const handleCommitChanges = () => {
    const formattedStartTime = extractTime(startTime as Date);
    const formattedEndTime = extractTime(endTime as Date);
    ws.sendMessage(`${valveNumber}|${formattedStartTime}|${formattedEndTime}|${repetitionDays}`);
    toast.show({
      render: () => {
        return (
          <View bg="green.600" padding="5" borderRadius="md">
            <Text color="white">Scheduled for {valveNumber.split("S")[0]} valve successfully</Text>
          </View>
        )
      },
      duration: 2000,
      placement: "bottom"
    })
    store.updateIrrigationController(id, {
      ...store.irrigationControllers.find((g) => g.id === id),
    })
  }
  const handleClearSlot = () => {
    ws.sendMessage(`scheduleClear|${slot}`);
    setStartTime(null);
    setEndTime(null);
    setRepetitionDays(0);
    store.updateGreenhouse(id, {
      ...store.greenhouses.find((greenhouse) => greenhouse.id === id),
      [slotKeys[slot]]: {
        startTime: null,
        endTime: null,
        repetitionDays: 0,
      }
    });
  }
  const [startTime, setStartTime] = useState<Date | null>(prevStartTime ? new Date(prevStartTime) : null);
  const [endTime, setEndTime] = useState<Date | null>(prevEndTime ? new Date(prevEndTime) : null);
  const [err, setErr] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [clearBtnDisabled, setClearBtnDisabled] = useState<boolean>(false);
  const [repetitionDays, setRepetitionDays] = useState(repDays); // Initialize bitmask
  const toast = useToast();
  const [startTimePickerVisible, setStartTimePickerVisible] = useState<boolean>(false);
  const [endTimePickerVisible, setEndTimePickerVisible] = useState<boolean>(false);

  useEffect(() => {
    if (repetitionDays === 0) {
      setErr("Please select a valid day(s) for schedule");
    } else {
      setErr(null);
    }
  }, [repetitionDays]);

  useEffect(() => {
    setDisabled(!(!(isNaN(startTime?.getTime() as number)) && !(isNaN(endTime?.getTime() as number)) && !err && repetitionDays !== 0));
    setClearBtnDisabled(!(!(isNaN(startTime?.getTime() as number)) && !(isNaN(endTime?.getTime() as number)) && !err && repetitionDays !== 0));
  }, [endTime, startTime, err, repetitionDays]);

  const toggleDay = (dayValue: number) => {
    const newRepetitionDays = repetitionDays ^ dayValue; // Toggle the selected day in bitmask
    setRepetitionDays(newRepetitionDays);
  };
  return (
    <View paddingY="2" borderBottomWidth={2} padding="2">
      <View flexDirection="row" justifyContent="space-between" alignContent="center" alignItems="center">
        <Text fontSize="sm" backgroundColor="">SLOT {slot}</Text>
        <Icons.timer size={25} color="black" />
      </View>
      <View flexDirection="row" justifyContent="center" padding="5">
        {/* Display selected days */}
        {daysOfWeek.map((day) => (
          <Pressable
            key={day.name}
            onPress={() => toggleDay(day.value)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: "center",
              marginVertical: 5,
              borderWidth: 2,
              borderRadius: 40,
              padding: 5,
              height: 37,
              width: 37,
              marginLeft: 3,
              backgroundColor: (repetitionDays & day.value) ? 'green' : 'white',
            }}
          >
            <Text>{day.name}</Text>
          </Pressable>
        ))}
      </View>
      <View flexDirection="row" w="100%" alignItems="center" marginTop="5">
        <View flexDirection="column" alignItems="center" justifyContent="center" w="50%" >
          <View flexDirection="row" style={{
            gap: 2,
          }}>
            <View padding="5" backgroundColor="gray.200" borderRadius="md">
              <Text>{startTime?.getHours() || "00"}</Text>
            </View>
            <View padding="5" backgroundColor="gray.200" borderRadius="md">
              <Text>{startTime?.getMinutes() || "00"}</Text>
            </View>
          </View>
          <Pressable style={{
            marginTop: 15,
            padding: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "green",
            gap: 3,
            borderRadius: 5,
            alignItems: "center"
          }}
            onPress={() => {
              setStartTimePickerVisible(true);
            }}
          >
            <Text color="white">Reschedule</Text>
            <Icons.timerReset size={25} color="black" />
          </Pressable>
        </View>
        <View flexDirection="column" alignItems="center" justifyContent="center" w="50%" >
          <View flexDirection="row" style={{
            gap: 2,
          }}>
            <View padding="5" backgroundColor="gray.200" borderRadius="md">
              <Text>{endTime?.getHours() || "00"}</Text>
            </View>
            <View padding="5" backgroundColor="gray.200" borderRadius="md">
              <Text>{endTime?.getMinutes() || "00"}</Text>
            </View>
          </View>
          <Pressable style={{
            marginTop: 15,
            padding: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "green",
            gap: 3,
            borderRadius: 5,
            alignItems: "center"
          }}
            onPress={() => {
              setEndTimePickerVisible(true);
            }}
          >
            <Text color="white">Reschedule</Text>
            <Icons.timerReset size={25} color="black" />
          </Pressable>
        </View>
      </View>
      <View padding="5" flexDirection="row" justifyContent="center" style={{
        gap: 5
      }}>
        <Button
          w={120}
          onPress={handleCommitChanges}
          backgroundColor={disabled ? "gray.300" : "green.600"} disabled={disabled} endIcon={<Icons.send size={20} color={disabled ? "gray" : "black"} />}>Commit Changes</Button>
        <Button
          w={120}
          onPress={handleClearSlot}
          backgroundColor={clearBtnDisabled ? "gray.300" : "red.500"} disabled={clearBtnDisabled} endIcon={<Icons.trash size={20} color={clearBtnDisabled ? "gray" : "black"} />}>Clear Slot</Button>
      </View>
      {
        err && (
          <View flexDirection="row">
            <Icons.danger size={20} color="red" />
            <Text marginRight="3" color="red.500">{err}</Text>
          </View>
        )
      }
      <DateTimePickerModal
        is24Hour={true}
        isVisible={startTimePickerVisible}
        mode="time"
        onConfirm={(date) => {
          setStartTimePickerVisible(false);
          setStartTime(date);
        }}
        display="spinner"
        onCancel={() => setStartTimePickerVisible(false)}
      />
      <DateTimePickerModal
        is24Hour={true}
        isVisible={endTimePickerVisible}
        mode="time"
        onConfirm={(date) => {
          setEndTimePickerVisible(false);
          setEndTime(date);
        }}
        display="spinner"
        onCancel={() => setEndTimePickerVisible(false)}
      />
    </View>
  )
}
export default SlotContainer;
