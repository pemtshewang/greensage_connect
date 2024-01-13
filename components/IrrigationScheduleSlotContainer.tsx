import { View, Badge, Text, Button, useToast } from "native-base"
import Icons from "../assets/Icons/Icons"
import { useState, useEffect } from "react"
import { Pressable, TouchableOpacity } from "react-native"
import { IWebSocket } from "../zustand/state"
import { useIrrigationControllerStore } from "../zustand/store"
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
  prevStartTime: Date | null,
  prevEndTime: Date | null,
  repDays: number,
}) => {
  const daysOfWeek = [
    { name: 'S', value: 0b00000001 },
    { name: 'M', value: 0b00000010 },
    { name: 'T', value: 0b00000100 },
    { name: 'W', value: 0b00001000 },
    { name: 'T', value: 0b00010000 },
    { name: 'F', value: 0b00100000 },
    { name: 'S', value: 0b01000000 },
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
    ws.sendMessage(`scheduleClear|${valveNumber}`);
    setStartTime(null);
    setEndTime(null);
    setRepetitionDays(0);
    store.updateIrrigationController(id, {
      ...store.irrigationControllers.find((g) => g.id === id),
      valveStates: {
        ...store.irrigationControllers.find((g) => g.id === id)?.valveStates,
        [valveNumber]: {
          state: false,
          startTime: null,
          endTime: null
        }
      }
    }
    )
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
      setErr("Please select a valid day(s)");
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
    <View flexDirection="column" alignItems="center">
      <View flexDirection="row" alignItems="center">
        <Badge colorScheme="info">Scheduler</Badge>
        <Icons.timer size={32} color="black" />
      </View>
      <View flexDirection="row" alignItems="center" justifyContent="center" padding="5">
        {
          daysOfWeek.map((day) => {
            return (
              <TouchableOpacity
                key={day.value}
                onPress={() => {
                  toggleDay(day.value);
                }}
              >
                <Badge
                  colorScheme={
                    repetitionDays & day.value ? "green" : "gray"
                  }
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {day.name}
                </Badge>
              </TouchableOpacity>
            )
          })
        }
      </View>
      {repetitionDays === 0 && (
        <Text color="red.500">
          Please select a valid day(s)
        </Text>
      )
      }
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
      <View padding="5" flexDirection="column" justifyContent="center" style={{
        gap: 5
      }}>
        <Button
          w={150}
          onPress={handleCommitChanges}
          backgroundColor={disabled ? "gray.300" : "green.600"} disabled={disabled} endIcon={<Icons.send size={20} color={disabled ? "gray" : "black"} />}>Commit Changes</Button>
        <Button
          w={150}
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
export default IrrigationSlotContainer;
