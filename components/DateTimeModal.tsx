import { Button, Text, View } from "native-base";
import { Modal } from "native-base";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateTimeModal = ({
  modalVisible,
  setModalVisible,
  time,
  setTime
}: {
  modalVisible: boolean,
  setModalVisible: (state: boolean) => void,
  time: Date,
  setTime: (time: Date) => void
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const handleDateConfirm = (date: Date) => {
    setDatePickerVisibility(false);
    setTime(date)
    console.log("da", time);
  }

  const handleTimeConfirm = (date: Date) => {
    setTimePickerVisibility(false);
    setTime(date)
    console.log("da", time);
  }
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
            <Button backgroundColor="green.500"
              onPress={() => {
                setTimePickerVisibility(true)
              }}>
              Change
            </Button>
          </View>
          <View flexDirection="row" alignItems="center" justifyContent="space-between" alignContent="center">
            <View alignContent="center" flexDirection="column" justifyContent="center" alignItems="center">
              <Text fontWeight="500" textAlign="center">{time.toLocaleDateString()}</Text>
            </View>
            <Button
              backgroundColor="green.500"
              onPress={() => {
                setDatePickerVisibility(true)
              }}>
              Change
            </Button>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={time}
            onConfirm={handleDateConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            date={time}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={() => setTimePickerVisibility(false)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            backgroundColor="blue.500"
            onPress={() => {
              setModalVisible(false)
            }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
export default DateTimeModal;
