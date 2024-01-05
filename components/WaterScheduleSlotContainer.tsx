import { View, Text, useColorMode, useToast } from "native-base"
import Icons from "../assets/Icons/Icons"
import { useState, useEffect } from "react"
import { Pressable } from "react-native"
import DateTimeModal from "./DateTimeModal"
import { IWebSocket } from "../zustand/state"

const SlotContainer = ({
  ws,
  slot,
  prevStartTime,
  prevEndTime,
}: {
  ws: IWebSocket;
  slot: number,
  prevStartTime: Date,
  prevEndTime: Date
}) => {
  // calculate the time difference in minutes 
  const [timeDiff, setTimeDiff] = useState(0);
  const [err, setErr] = useState<string>("");
  const [startTime, setStartTime] = useState<Date>(prevStartTime);
  const [endTime, setEndTime] = useState<Date>(prevEndTime);
  const [startDate, setStartDate] = useState<Date>(prevStartTime);
  const [endDate, setEndDate] = useState<Date>(prevEndTime);
  const [isStartTimeChanged, setIsStartTimeChanged] = useState(false);
  const [isEndTimeChanged, setIsEndTimeChanged] = useState(false);
  const { colorMode } = useColorMode();
  const backgroundColor = colorMode === "light" ? "#B1F4CF" : "#252525";
  const disabledBackgroundColor = colorMode === "light" ? "#E5E5E5" : "#454545";
  const [disabled, setDisabled] = useState(true);
  const [startDateTime, setStartDateTime] = useState(prevStartTime);
  const [endDateTime, setEndDateTime] = useState(prevEndTime);
  const [showStartDateTimeModal, setShowStartDateTimeModal] = useState<boolean>(false);
  const [showEndDateTimeModal, setShowEndDateTimeModal] = useState<boolean>(false);
  const toast = useToast();

  const handleCommitEvent = () => {
    ws.sendMessage(`schedule:${slot.toString()}:${startDateTime.toString()}:${endDateTime.toString()}`);
    console.log("send")
    toast.show({
      render: () => {
        return (
          <View style={{
            backgroundColor: "green",
            padding: 10,
            borderRadius: 20
          }}>
            <Text color="white">
              The scheduled time has been updated for slot {slot}
            </Text>
          </View>
        )
      },
      placement: "bottom",
      duration: 2000,
    });
    setDisabled(true);
  }
  useEffect(() => {
    const differenceInMilliseconds = Math.abs(endDateTime.getTime() - startDateTime.getTime());
    const differenceInMinutes = differenceInMilliseconds / 60000; // Convert to minutes
    setTimeDiff(Math.round(differenceInMinutes)); // Round to whole minutes

    if (startTime >= endTime) {
      setErr("Start time cannot be equal to or later than end time.");
    } else {
      setErr(""); // Clear error if valid
    }

    setIsStartTimeChanged(prevStartTime !== startTime);
    setIsEndTimeChanged(prevEndTime !== endTime);

    // Check if start or end time has changed or there's an error
    if (!(isStartTimeChanged || isEndTimeChanged) || err) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    setStartDateTime(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.getHours(), startTime.getMinutes()));
    setEndDateTime(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime.getHours(), endTime.getMinutes()));
  }, [startTime, endTime, isStartTimeChanged, startDate, endDate, setStartDate, setEndDate, isEndTimeChanged, err]);
  return (
    <View
      style={{
        backgroundColor: "lightgray",
        marginTop: 10,
        padding: 7,
        borderRadius: 10,
        gap: 10,
      }}>
      <View style={{
        flexDirection: "row",
        gap: 5
      }}>
        <Icons.timer width={20} height={20} color="black" />
        <Text style={{
          fontWeight: "500"
        }}>SLOT {slot}</Text>
        <Text position="absolute" right="0" textAlign="center">Duration: {timeDiff.toString()} mins</Text>
      </View>
      <Text
        paddingY="4"
        style={{
          textAlign: "center",
          fontWeight: "600"
        }}>
        From {startDateTime.toLocaleDateString()} To {endDateTime.toLocaleDateString()}
      </Text>
      <View style={{
        flexDirection: "row"
      }}>
        <View style={{
          width: "50%",
        }}>
          <Text textAlign="center">From</Text>
          <View
            padding="5"
            style={{
              gap: 10
            }}
            flexDirection="row"
            justifyContent="center"
          >
            <View style={{
              backgroundColor: "#fff",
              padding: 10,
              flexDirection: "row",
              justifyContent: "center",
              borderRadius: 10
            }}
              w="10"
            >
              <Text fontWeight="bold" fontSize="md">{startDateTime.getHours()}</Text>
            </View>
            <View style={{
              backgroundColor: "#fff",
              padding: 10,
              flexDirection: "row",
              justifyContent: "center",
              borderRadius: 10
            }}
              w="10"
            >
              <Text fontWeight="bold" fontSize="md">{startDateTime.getMinutes()}</Text>
            </View>
          </View>
          <Pressable
            onPress={() => {
              setShowStartDateTimeModal(true);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
              backgroundColor: "#B1F4CF",
              padding: 5,
              borderRadius: 10,
              margin: 4,
            }}>
            <Text>Reschedule</Text>
            <Icons.timerReset width={20} height={20} color="black" />
          </Pressable>
        </View>
        <View style={{
          width: "50%"
        }}>
          <Text textAlign="center">To</Text>
          <View
            padding="5"
            style={{
              gap: 10
            }}
            flexDirection="row"
            justifyContent="center"
          >
            <View style={{
              backgroundColor: "#fff",
              padding: 10,
              flexDirection: "row",
              justifyContent: "center",
              borderRadius: 10
            }}
              w="10"
            >
              <Text fontWeight="bold" fontSize="md">{endDateTime.getHours()}</Text>
            </View>
            <View style={{
              backgroundColor: "#fff",
              padding: 10,
              flexDirection: "row",
              justifyContent: "center",
              borderRadius: 10
            }}
              w="10"
            >
              <Text fontWeight="bold" fontSize="md">{endDateTime.getMinutes()}</Text>
            </View>
          </View>
          <Pressable
            onPress={() => {
              setShowEndDateTimeModal(true);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
              backgroundColor: "#B1F4CF",
              padding: 5,
              borderRadius: 10,
              margin: 4,
            }}>
            <Text>Reschedule</Text>
            <Icons.timerReset width={20} height={20} color="black" />
          </Pressable>
        </View>
      </View>
      <Pressable
        disabled={disabled}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          backgroundColor: !disabled ? backgroundColor : disabledBackgroundColor,
          padding: 5,
          borderRadius: 10,
          margin: 4,
        }}
        onPress={handleCommitEvent}
      >
        <Text color={`${disabled ? "#A0A0A0" : "#000"}`}>
          Commit Changes
        </Text>
        <Icons.send width={20} height={20} color={`${disabled ? "#A0A0A0" : "#000"}`} />
      </Pressable>
      {
        err &&
        (
          <View style={{
            flexDirection: "row",
            gap: 5
          }}>
            <Icons.danger size={20} color="red" />
            <Text fontSize={11} color="red.500">
              {err}
            </Text>
          </View>
        )
      }
      {
        showStartDateTimeModal &&
        <DateTimeModal
          modalVisible={showStartDateTimeModal}
          setModalVisible={setShowStartDateTimeModal}
          date={startDate}
          setDate={setStartDate}
          time={startTime}
          setTime={setStartTime}
        />
      }
      {
        showEndDateTimeModal &&
        <DateTimeModal
          modalVisible={showEndDateTimeModal}
          setModalVisible={setShowEndDateTimeModal}
          date={endDate}
          setDate={setEndDate}
          time={endTime}
          setTime={setEndTime}
        />
      }
    </View>
  )
}

export default SlotContainer;
