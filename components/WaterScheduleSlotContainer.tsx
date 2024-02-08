import { View, Badge, Text, Button } from "native-base"
import Icons from "../assets/Icons/Icons"
import { useState, useEffect } from "react"
import { Pressable } from "react-native"
import { ConnectionType, IMqttClient, IWebSocket } from "../zustand/state"
import { useGreenhouseStore } from "../zustand/store"
import { extractTime } from "../utils/dateFormat"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { TouchableOpacity } from "react-native"
import createToast from "../hooks/toast";
import { useLocalNotification } from "../hooks/notification"
import { useNotificationStore } from "../zustand/store"
import * as Crypto from "expo-crypto";
import { getValueFor } from "../securestore"

const SlotContainer = ({
  id,
  ws,
  slot,
  prevStartTime,
  prevEndTime,
  repDays
}: {
  id: string,
  ws: IWebSocket | IMqttClient;
  slot: number,
  prevStartTime: string | null,
  prevEndTime: string | null,
  repDays: number,
}) => {
  const daysOfWeek = [
    { name: 'Sun', value: 0b00000010 },
    { name: 'Mon', value: 0b00000100 },
    { name: 'Tue', value: 0b00001000 },
    { name: 'Wed', value: 0b00010000 },
    { name: 'Thu', value: 0b00100000 },
    { name: 'Fri', value: 0b01000000 },
    { name: 'Sat', value: 0b10000000 }
  ];
  const slotKeys: Record<number, string> = {
    1: "firstSlot",
    2: "secondSlot",
    3: "thirdSlot",
  };
  const { toastMessage } = createToast();
  const { scheduleNotification, clearNotification } = useLocalNotification();
  const [value, setValue] = useState();
  const [startTime, setStartTime] = useState<Date | null>(prevStartTime ? new Date(prevStartTime) : null);
  const [endTime, setEndTime] = useState<Date | null>(prevEndTime ? new Date(prevEndTime) : null);
  const [err, setErr] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [clearBtnDisabled, setClearBtnDisabled] = useState<boolean>(false);
  const [repetitionDays, setRepetitionDays] = useState(repDays); // Initialize bitmask
  const store = useGreenhouseStore();
  const [startTimePickerVisible, setStartTimePickerVisible] = useState<boolean>(false);
  const [endTimePickerVisible, setEndTimePickerVisible] = useState<boolean>(false);
  const { addNotification } = useNotificationStore();

  const handleCommitChanges = () => {
    const formattedStartTime = extractTime(startTime as Date);
    const formattedEndTime = extractTime(endTime as Date);
    if (store.items.find((greenhouse) => greenhouse.id === id)?.connectionType === ConnectionType.MQTT) {
      const topic = value + "/" + id + "/schedule";
      const message = `${slot}|${formattedStartTime}|${formattedEndTime}|${repetitionDays}`
      ws.sendMessage(topic, message);
    } else {
      ws.sendMessage(`schedule|${slot}|${formattedStartTime}|${formattedEndTime}|${repetitionDays}`);
    }
    toastMessage({
      message: `Schedule for slot ${slot} updated`,
      type: "success",
    });
    store.updateItem(id, {
      ...store.items.find((greenhouse) => greenhouse.id === id),
      [slotKeys[slot]]: {
        startTime: startTime,
        endTime: endTime,
        repetitionDays: repetitionDays,
      }
    });
    for (let i = 1; i <= 7; i++) {
      if (repetitionDays & (1 << i)) {
        //notify before 5 minutes
        try {
          scheduleNotification({
            content: {
              title: `Watering Schedule for ${store.items.find((greenhouse) => greenhouse.id === id)?.name}`,
              subtitle: "Watering Schedule",
              body: `Watering slot ${slot} is active now`,
            },
            trigger: {
              weekday: i,
              hour: Number(formattedStartTime.split(":")[0]),
              minute: Number(formattedStartTime.split(":")[1]),
              repeats: true,
            },
            identifier: `${id}-${slot}-${i}`
          })
        } catch (err) {
          console.log(err);
        }
      }
    }
    addNotification({
      id: Crypto.randomUUID().toString(),
      seen: false,
      title: "Watering schedule added",
      message: `Watering schedule of slot ${slot} updated to ${formattedStartTime} - ${formattedEndTime}`,
      footer: `Updated in greenhouse ${store.items.find((greenhouse) => greenhouse.id === id)?.name}`,
      type: "waterSchedule",
      dateTime: new Date(),
    });
  }
  const handleClearSlot = () => {
    if (store.items.find((greenhouse) => greenhouse.id === id)?.connectionType === ConnectionType.MQTT) {
      const topic = id + "/scheduleClear"
      ws.sendMessage(topic, slot.toString());
    } else {
      ws.sendMessage(`scheduleClear|${slot}`);
    }
    setStartTime(null);
    setEndTime(null);
    setRepetitionDays(0);
    toastMessage({
      message: `Slot ${slot} cleared`,
      type: "success",
    })
    store.updateItem(id, {
      ...store.items.find((greenhouse) => greenhouse.id === id),
      [slotKeys[slot]]: {
        startTime: null,
        endTime: null,
        repetitionDays: 0,
      }
    });
    // Clear all notifications for this slot
    for (let i = 1; i <= 7; i++) {
      clearNotification({
        identifier: `${id}-${slot}-${i}`
      });
    }
  }
  useEffect(() => {
    getValueFor("token").then((data) => {
      const val = JSON.parse(data as string);
      setValue(val?.brokerId);
    })
  }, [])
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
  }, [endTime, startTime, err]);

  const toggleDay = (dayValue: number) => {
    const newRepetitionDays = repetitionDays ^ dayValue; // Toggle the selected day in bitmask
    setRepetitionDays(newRepetitionDays);
  };
  return (
    <View paddingY="2" borderBottomWidth={2} padding="2">
      <View flexDirection="row" justifyContent="space-between" alignContent="center" alignItems="center">
        <Badge colorScheme="amber">{"Slot " + slot}</Badge>
        <Icons.timer size={25} color="black" />
      </View>
      <View flexDirection="row" justifyContent="center" padding="5">
        {/* Display selected days */}
        {daysOfWeek.map((day) => {
          return (
            <TouchableOpacity
              key={day.name}
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
