import { View, Text, Button, useToast } from "native-base"
import Icons from "../assets/Icons/Icons"
import { useState, useEffect } from "react"
import { Pressable } from "react-native"
import { IWebSocket } from "../zustand/state"
import DateTimeModal from "./DateTimeModal"
import { useGreenhouseStore } from "../zustand/store"
import { changeToISO } from "../utils/dateFormat"
import { useColorModeValue } from "native-base"

const SlotContainer = ({
  id,
  ws,
  slot,
  prevStartTime,
  prevEndTime,
}: {
  id: string,
  ws: IWebSocket;
  slot: number,
  prevStartTime: string | null,
  prevEndTime: string | null,
}) => {
  const handleCommitChanges = () => {
    const formattedStartTime = changeToISO(startTime as Date);
    const formattedEndTime = changeToISO(endTime as Date);
    ws.sendMessage(`schedule|${slot}|${formattedStartTime}|${formattedEndTime}`)
    console.log(`sending schedule|${slot}|${formattedStartTime}|${formattedEndTime}`)
    toast.show({
      render: () => {
        return (
          <View bg="green.600" padding="5" borderRadius="md">
            <Text color="white">Scheduled for slot {slot} successfully</Text>
          </View>
        )
      },
      duration: 2000,
      placement: "bottom"
    })
  }
  const [startTime, setStartTime] = useState<Date | null>(prevStartTime ? new Date(prevStartTime) : null);
  const [endTime, setEndTime] = useState<Date | null>(prevEndTime ? new Date(prevEndTime) : null);
  const [err, setErr] = useState<string | null>(null);
  const [startTimeModal, setStartTimeModal] = useState<boolean>(false);
  const [endTimeModal, setEndTimeModal] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const store = useGreenhouseStore();
  const toast = useToast();
  useEffect(() => {
    if (startTime && endTime && !err) {
      store.updateGreenhouse(id, {
        ...store.greenhouses.find((greenhouse) => greenhouse.id === id),
        [slot === 1 ? "firstSlot" : slot === 2 ? "secondSlot" : "thirdSlot"]: {
          startTime,
          endTime,
        }
      });
      console.log(`updated greenhouse ${id} with slot ${slot} with startTime ${startTime} and endTime ${endTime}`)
      if (startTime.getTime() > endTime.getTime()) {
        setErr("Start time cannot be greater than end time");
      }
      else {
        setErr(null);
      }
    }
    if (startTime) {
      if (startTime < new Date()) {
        setErr("Start time cannot be less than current time");
      } else {
        setErr(null);
      }
    }
    if (!startTime || !endTime) {
      setErr("Please select a valid time for schedule");
    }
    if (startTime && endTime && !err) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [endTime, startTime, err])
  return (
    <View paddingY="2" borderBottomWidth={2}>
      <View flexDirection="row" justifyContent="space-between" alignContent="center" alignItems="center">
        <Text fontSize="sm" backgroundColor="">SLOT {slot}</Text>
        <Icons.timer size={25} color="black" />
      </View>
      <View flexDirection="row" justifyContent="center" backgroundColor="gray.200" padding="3" marginTop="5" borderRadius="full">
        {/* display the dates */}
        <Text>FROM {startTime?.toLocaleDateString() || "00/00/00"}</Text>
        <Text>{" : "}</Text>
        <Text>TO {endTime?.toLocaleDateString() || "00/00/00"}</Text>
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
              setStartTimeModal(true);
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
              setEndTimeModal(true);
            }}
          >
            <Text color="white">Reschedule</Text>
            <Icons.timerReset size={25} color="black" />
          </Pressable>
        </View>
      </View>
      <View flexDirection="row" justifyContent="center" padding="5">
        <Button
          onPress={handleCommitChanges}
          backgroundColor={disabled ? "gray.300" : "green.600"} disabled={disabled} endIcon={<Icons.send size={20} color={disabled ? "gray" : "black"} />}>Commit Changes</Button>
      </View>
      {
        startTimeModal && (
          <DateTimeModal
            modalVisible={startTimeModal}
            setModalVisible={setStartTimeModal}
            time={startTime || new Date()}
            setTime={setStartTime}
          />
        )
      }
      {
        endTimeModal && (
          <DateTimeModal
            modalVisible={endTimeModal}
            setModalVisible={setEndTimeModal}
            time={endTime || new Date()}
            setTime={setEndTime}
          />
        )
      }
      {
        err && (
          <View flexDirection="row">
            <Icons.danger size={20} color="red" />
            <Text fontSize="sm" color="red.500" marginLeft="1">{err}</Text>
          </View>
        )
      }
    </View>
  )
}
export default SlotContainer;
