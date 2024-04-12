import { View, Badge, Text, Button, useToast } from "native-base"
import Icons from "../assets/Icons/Icons"
import { useState, useEffect } from "react"
import { Pressable, TouchableOpacity } from "react-native"
import { ConnectionType, IMqttClient, IWebSocket } from "../zustand/state"
import { useIrrigationControllerStore } from "../zustand/store"
import { extractTime } from "../utils/dateFormat"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import createToast from "../hooks/toast"
import { useLocalNotification } from "../hooks/notification"
import { useNotificationStore } from "../zustand/store"
import * as Crypto from "expo-crypto"

const IrrigationSlotContainer = ({
  id,
  ws,
  valveNumber,
  prevStartTime,
  prevEndTime,
  repDays
}: {
  id: string,
  ws: IWebSocket | IMqttClient;
  valveNumber: "firstSlot" | "secondSlot" | "thirdSlot" | "fourthSlot" | "fifthSlot"
  prevStartTime: Date | null,
  prevEndTime: Date | null,
  repDays: number,
}) => {
  const daysOfWeek = [
    { name: 'S', value: 0b00000010 },
    { name: 'M', value: 0b00000100 },
    { name: 'T', value: 0b00001000 },
    { name: 'W', value: 0b00010000 },
    { name: 'T', value: 0b00100000 },
    { name: 'F', value: 0b01000000 },
    { name: 'S', value: 0b10000000 }
  ];

  const store = useIrrigationControllerStore();
  const { addNotification } = useNotificationStore();
  const { toastMessage } = createToast();
  const { scheduleNotification, clearNotification } = useLocalNotification();
  const handleCommitChanges = () => {
    const formattedStartTime = extractTime(startTime as Date);
    const formattedEndTime = extractTime(endTime as Date);
    if (store.items.find((greenhouse) => greenhouse.id === id)?.connectionType === ConnectionType.MQTT) {
      const topic = id + "/schedule";
      const message = `${valveNumber.split("S")[0] + "Valve"}|${formattedStartTime}|${formattedEndTime}|${repetitionDays}`;
      ws.sendMessage(topic, message);
    } else {
      ws.sendMessage(`schedule|${valveNumber.split("S")[0] + "Valve"}|${formattedStartTime}|${formattedEndTime}|${repetitionDays}`);
    }
    toastMessage({
      type: "success",
      message: `Scheduled for ${valveNumber.split("S")[0]} valve successful`
    })
    store.updateItem(id, {
      ...store.items.find((g) => g.id === id),
    })
    for (let i = 1; i <= 7; i++) {
      if (repetitionDays & (1 << i)) {
        //notify before 5 minutes
        try {
          scheduleNotification({
            content: {
              title: `Irrigation Schedule for ${store.items.find((greenhouse) => greenhouse.id === id)?.name}`,
              subtitle: "Irrigation Schedule",
              body: `Irrigation for ${valveNumber} is active now`,
            },
            trigger: {
              weekday: i,
              hour: Number(formattedStartTime.split(":")[0]),
              minute: Number(formattedStartTime.split(":")[1]),
              repeats: true,
            },
            identifier: `${id}-${valveNumber}-${i}`
          })
        } catch (err) {
          console.log(err);
        }
      }
    }
    addNotification({
      id: Crypto.randomUUID().toString(),
      seen: false,
      title: "Irrigation schedule added",
      message: `Watering schedule for ${valveNumber.split('S')[0]} valve updated to ${formattedStartTime} - ${formattedEndTime}`,
      footer: `Updated in irrigation ${store.items.find((greenhouse) => greenhouse.id === id)?.name}`,
      type: "waterSchedule",
      dateTime: new Date(),
    });
  }
  const handleClearSlot = () => {
    ws.sendMessage(`scheduleClear|${valveNumber}`);
    setStartTime(null);
    setEndTime(null);
    setRepetitionDays(0);
    store.updateItem(id, {
      ...store.items.find((g) => g.id === id),
      valveStates: {
        ...store.items.find((g) => g.id === id)?.valveStates,
        [valveNumber]: {
          state: false,
          startTime: null,
          endTime: null
        }
      }
    })
    for (let i = 1; i <= 7; i++) {
      clearNotification({
        identifier: `${id}-${valveNumber}-${i}`
      });
    }
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
    <View flexDirection="column">
      <View flexDirection="row" justifyContent="center">
        <Badge colorScheme="green">Scheduler</Badge>
        <Icons.timer size={32} color="black" />
      </View>
      <View flexDirection="row" justifyContent="space-between" paddingY="5">
        {
          daysOfWeek.map((day) => {
            return (
              <TouchableOpacity
                key={day.value}
                onPress={() => toggleDay(day.value)}
                style={{
                  borderRadius: 5,
                }}
              >
                <Badge
                  colorScheme={`${repetitionDays & day.value ? "green" : "gray"}`}
                  marginLeft={1}
                  borderWidth={1}
                  borderColor={"black"}
                >
                  {day.name}
                </Badge>
              </TouchableOpacity>
            )
          })
        }
      </View>
      {repetitionDays === 0 && (
        <Text textAlign="center" color="red.500">
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
      <View padding="5" flexDirection="column" alignItems="center" justifyContent="center" style={{
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
          <View flexDirection="row" justifyContent="center">
            <Icons.danger size={20} color="red" />
            <Text textAlign="center" marginRight="3" color="red.500">{err}</Text>
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
