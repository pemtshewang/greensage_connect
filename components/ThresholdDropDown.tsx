import { Button, HStack, VStack, View } from "native-base";
import { useState, useRef, useEffect } from "react";
import { Modal, Badge, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import Icons from "../assets/Icons/Icons";
import getThresholdValues from "../api/data/threshold";
import { ThresholdValues } from "../api/data/threshold";
const ThresholdDropdown = ({
  type,
  setValue,
}: {
  type: "temperature" | "soil_moisture" | "humidity";
  setValue: (value: number) => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ThresholdValues, setThresholdValues] = useState<ThresholdValues>([]);
  const [isValuesFetching, setIsValuesFetching] = useState<boolean>(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  useEffect(() => {
    getThresholdValues().then((res) => {
      setThresholdValues(res);
    })
  }, [])
  return (
    <>
      <HStack space={2}>
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
              {
                isValuesFetching ? (
                  <View>
                    <Text textAlign="center">
                      Fetching Threshold Data, Please Wait ...
                    </Text>
                  </View>
                ) : (
                  ThresholdValues.length > 0 ? (
                    ThresholdValues.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                          onPress={() => {
                            setValue(item.value[type]);
                            setModalVisible(false);
                          }}
                        >
                          <HStack flexDirection="row" space={1}>
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
                    })
                  ) : (
                    <View flexDirection="column" alignItems="center">
                      <Icons.question />
                      <Text mt={3} bold color="#A0A0A0">No Threshold data has been listed</Text>
                    </View>
                  )
                )
              }
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ThresholdDropdown;
