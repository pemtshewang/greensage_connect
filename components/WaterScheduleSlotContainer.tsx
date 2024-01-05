import { View, Text } from "native-base"
import Icons from "../assets/Icons/Icons"
import { useState } from "react"

const SlotContainer = ({
  slot,
  startTime,
  endTime
}: {
  slot: number,
  startTime: Date,
  endTime: Date
}) => {
  // calculate the time difference in minutes 
  const timeDiff = (Math.abs(startTime.getTime() - endTime.getTime())) / 60;
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
      backgroundColor: "lightgray",
      marginTop: 10,
      padding: 10,
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
      </View>
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
              <Text fontWeight="bold" fontSize="md">{startTime.getHours()}</Text>
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
              <Text fontWeight="bold" fontSize="md">{startTime.getMinutes()}</Text>
            </View>
          </View>
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
              <Text fontWeight="bold" fontSize="md">{endTime.getHours()}</Text>
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
              <Text fontWeight="bold" fontSize="md">{endTime.getMinutes()}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
      }}
        w="25"
      >
        <Text textAlign="center">Duration: {timeDiff.toString()}</Text>
      </View>
    </View>
  )
}

export default SlotContainer;
