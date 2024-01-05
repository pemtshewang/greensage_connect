import { useState } from "react";
import { Button, Text, View } from "native-base";
import { Modal } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";


const DateTimeModal = ({
  modalVisible,
  setModalVisible,
  date,
  time,
  setTime,
  setDate
}: {
  modalVisible: boolean,
  setModalVisible: (bool: boolean) => void,
  date: Date,
  time: Date,
  setDate: (date: Date) => void,
  setTime: (time: Date) => void
}) => {
  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime;
    setShowTimePicker(false);
    setTime(currentTime);
  }
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);
  }
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  return (
    <Modal isOpen={modalVisible} onClose={setModalVisible}>
      <Modal.Content >
        <Modal.CloseButton backgroundColor="white" />
        <Modal.Header style={{
          backgroundColor: "green"
        }}>Schedule Date and Time</Modal.Header>
        <Modal.Body >
          <View flexDirection="row" marginBottom="5" alignItems="center" justifyContent="space-between" alignContent="center">
            <View alignContent="center" alignItems="center">
              <Text fontWeight="500">{time.getHours()}:{time.getMinutes()} (24hrs format)</Text>
            </View>
            <Button onPress={() => {
              setShowTimePicker(true);
            }}>
              Change
            </Button>
          </View>
          <View flexDirection="row" alignItems="center" justifyContent="space-between" alignContent="center">
            <View alignContent="center" flexDirection="column" justifyContent="center" alignItems="center">
              <Text fontWeight="500" textAlign="center">{date.toLocaleDateString()}</Text>
            </View>
            <Button onPress={() => {
              setShowDatePicker(true);
            }}>
              Change
            </Button>
          </View>
          {showTimePicker && (
            <DateTimePicker
              mode="time"
              is24Hour={true}
              value={time}
              onChange={handleTimeChange}
            />
          )}
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              value={date}
              onChange={handleDateChange}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "green"
            }}
            onPress={() => {
              setModalVisible(false);
            }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
export default DateTimeModal;
