import { Button, HStack, VStack, View } from "native-base";
import { useState, useRef, useEffect } from "react";
import { Modal, Badge, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import Icons from "../assets/Icons/Icons";
import getThresholdValues from "../api/data/threshold";
import { RefreshCwIcon } from "lucide-react-native";

// Define the type for each threshold item
type ThresholdItem = {
  id: string; // Assuming each item has a unique 'id' or similar unique field
  maxThreshold: number;
  minThreshold: number;
  name: string;
  type: "temperature" | "humidity" | "soilMoisture";
};

const ThresholdDropdown = ({
  type,
  setValue,
}: {
  type: "temperature" | "soil_moisture" | "humidity";
  setValue: (value: number) => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ThresholdValues, setThresholdValues] = useState<{
    temperatureValues: ThresholdItem[],
    humidityValues: ThresholdItem[],
    soilMoistureValues: ThresholdItem[]
  }>({
    temperatureValues: [],
    humidityValues: [],
    soilMoistureValues: []
  });
  
  const [isValuesFetching, setIsValuesFetching] = useState<boolean>(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const fetchThresholdValues = () => {
    setIsValuesFetching(true);
    getThresholdValues().then((res) => {
      setThresholdValues({
        temperatureValues: [],
        humidityValues: [],
        soilMoistureValues: []
      }); // Clear previous values
      res.forEach(item => {
        setThresholdValues(prev => {
          let newState = { ...prev };
          switch (item.type) {
            case "temperature":
              if (!newState.temperatureValues.some(val => val.id === item.id)) {
                newState.temperatureValues = [...newState.temperatureValues, item];
              }
              break;
            case "humidity":
              if (!newState.humidityValues.some(val => val.id === item.id)) {
                newState.humidityValues = [...newState.humidityValues, item];
              }
              break;
            case "soilMoisture":
              if (!newState.soilMoistureValues.some(val => val.id === item.id)) {
                newState.soilMoistureValues = [...newState.soilMoistureValues, item];
              }
              break;
            default:
              break;
          }
          return newState;
        });
      });
      setIsValuesFetching(false);
    });
  };

  useEffect(() => {
    fetchThresholdValues(); // Fetch initial values when component mounts
  }, []);

  // Filter the correct threshold values based on the type
  const filteredValues = 
    type === "temperature"
    ? ThresholdValues.temperatureValues
    : type === "humidity"
    ? ThresholdValues.humidityValues
    : ThresholdValues.soilMoistureValues;

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
          <Modal.CloseButton bg="#fff" mt={1} />
          <Modal.Header bg="green.600">
            <HStack alignItems="center" mr={2}>
              <Text color="white" bold>
                Choose a suitable threshold
              </Text>
            </HStack>
          </Modal.Header>
          <Modal.Body>
            <HStack alignItems="center" space={2} justifyContent="flex-start">
              <TouchableOpacity 
                style={{
                  marginLeft: 15,
                  backgroundColor: "green",
                  padding: 4,
                  borderRadius: 5,
                  width: 40,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
                onPress={() => fetchThresholdValues()} // Refresh threshold values
              >
                <RefreshCwIcon color="white" />
              </TouchableOpacity>
              <Text>
                Refresh Threshold Data
              </Text>
            </HStack>
            <VStack space={3} mt={2}>
              {
                isValuesFetching ? (
                  <View>
                    <Text textAlign="center">
                      Fetching Threshold Data, Please Wait ...
                    </Text>
                  </View>
                ) : (
                  filteredValues.length > 0 ? (
                    filteredValues.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                          onPress={() => {
                            setValue(item.maxThreshold);
                            setModalVisible(false);
                          }}
                        >
                          <HStack flexDirection="row" space={1}>
                            <Badge colorScheme="coolGray">{item.name}</Badge>
                          </HStack>
                          <Badge colorScheme="info">
                            {type === "temperature" ? item.maxThreshold + "°C" : item.maxThreshold + "%"}
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
