import { Button, HStack, VStack } from "native-base";
import ThresholdValues from "../api/data/threshold";
import { useState, useRef } from "react";
import { Modal, Badge, Text, Box } from "native-base";
import Icons from "../assets/Icons/Icons";
import { TouchableOpacity } from "react-native";
const ThresholdDropdown = ({
  type,
  value,
  setValue,
}: {
  type: "temperature" | "soil_moisture" | "humidity";
  value: number;
  setValue: (value: number) => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [icon, setIcon] = useState(
    <Icons.vegetablesIcon width={32} height={32} />,
  );
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  return (
    <>
      <HStack space={2}>
        {icon}
        <Button
          bg="green.600"
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          Select Threshold
        </Button>
      </HStack>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <Modal.Content>
          <Modal.CloseButton bg="white" />
          <Modal.Header bg="green.600">
            <Text color="white" bold>
              Choose a suitable threshold
            </Text>
          </Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              {ThresholdValues.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                    onPress={() => {
                      setValue(item.value[type]);
                      setIcon(<item._icon width={32} height={32} />);
                      setModalVisible(false);
                    }}
                  >
                    <HStack flexDirection="row" space={1}>
                      <item._icon width={32} height={32} />
                      <Badge colorScheme="coolGray">{item.label}</Badge>
                    </HStack>
                    <Badge colorScheme="info">
                      {(type === "temperature"
                        ? item.value.temperature
                        : type === "humidity"
                          ? item.value.humidity
                          : item.value.soil_moisture) +
                        (type === "temperature" ? "°C" : "%")}
                    </Badge>
                  </TouchableOpacity>
                );
              })}
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ThresholdDropdown;
