import { View, Text, Input, Button, Badge, HStack, VStack } from "native-base";
import { IWebSocket } from "../../zustand/state";
import Icons from "../../assets/Icons/Icons";
import { useState } from "react";
import { useToast } from "native-base";
import { useGreenhouseStore } from "../../zustand/store";
import ThresholdDropDown from "../ThresholdDropDown";

const ThresholdSetForm = ({
  id,
  type,
  message,
  ws,
  defaultValue,
}: {
  id: string,
  type: "temperature" | "soil_moisture" | "humidity",
  message: string,
  ws: IWebSocket,
  defaultValue: number
}) => {
  const [changeState, setChangeState] = useState(false);
  const [value, setValue] = useState<number>(0);
  const toggleChangeState = () => setChangeState(!changeState);
  const toast = useToast();
  const store = useGreenhouseStore();
  const sendThreshold = () => {
    setValue(value);
    ws.sendMessage(`threshold:${type}:${value}`);
    console.log(`Sending ${type} threshold with ${value}`);
    toggleChangeState();
    toast.show({
      render: () => {
        return (
          <View padding="5" bg="green.600">
            <Text color="white">
              The ${type} threshold has been set to ${value}
            </Text>
          </View>
        )
      },
      placement: "bottom",
      duration: 2000,
    });
    if (type === "humidity") {
      store.updateGreenhouse(id, {
        ...store.greenhouses.find((greenhouse) => greenhouse.id === id),
        humidityThreshold: value
      });
    } else if (type === "temperature") {
      store.updateGreenhouse(id, {
        ...store.greenhouses.find((greenhouse) => greenhouse.id === id),
        temperatureThreshold: value
      });
    } else {
      store.updateGreenhouse(id, {
        ...store.greenhouses.find((greenhouse) => greenhouse.id === id),
        soilMoistureThreshold: value
      });
    }
  }
  return (
    <View
      margin="2"
      padding="5"
      style={{
        flexDirection: "column",
        marginTop: 20,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
        borderRadius: 9,
      }}>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between"
      }}>
        <Badge colorScheme="info">{message}</Badge>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}>
          {
            type === "temperature" ? <Icons.thermometer width={25} height={25} color="black" /> : type === "humidity" ? <Icons.humid width={25} height={25} color="black" /> : <Icons.soilMoisture width={25} height={25} color="black" />}
          <Icons.ArrowBigRight size={25} color="black" />
          {type === "temperature" ? <Icons.exhaustFan width={25} height={25} color="black" /> :
            type === "humidity" ? <Icons.exhaustFan width={25} height={25} color="black" />
              : <Icons.waterTap width={25} height={25} color="black" />}
        </View>
      </View>
      <View style={{
        flexDirection: "column",
        gap: 5,
        alignItems: "center"
      }}>
        <View position="relative" flexDirection="row" w="full" justifyContent="center" >
          <VStack space={2} alignItems="center">
            <Input
              placeholder={`${defaultValue < 1 ? "You haven't set a threshold yet" : defaultValue}`}
              placeholderTextColor="#A0A0A0"
              alignItems="center"
              style={{
                textAlign: "center",
                fontSize: 20,
                borderBottomWidth: 2,
                borderBottomColor: "black"
              }}
              inputMode="numeric"
              onChangeText={(text: string) => setValue(parseInt(text))}
              value={value.toString()}
              isDisabled={!changeState}
              w={60}
              borderWidth={0}
              autoFocus={changeState}
            />
            {
              changeState && (
                <VStack alignItems="center">
                  <HStack space={2} alignItems="center">
                    <Icons.keyboardIcon size={20} color="#A0A0A0" />
                    <Text color="#A0A0A0"> You may type the threshold manually</Text>
                  </HStack>
                  <View alignItems="center" marginTop="2">
                    <View flexDirection="row" padding="1" marginBottom="3" style={{
                      gap: 2
                    }}>
                      <Icons.help size={16} color="#A0A0A0" />
                      <Text color="#A0A0A0">
                        Select suitable threshold from dropdown
                      </Text>
                    </View>
                    <ThresholdDropDown type={type} value={value} setValue={setValue} />
                  </View>
                </VStack>
              )
            }
          </VStack>
        </View>
        <View
          style={{
            paddingTop: 10,
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 10
          }}
        >
          <Button
            onPress={changeState ? sendThreshold : toggleChangeState}
            padding="2"
            bg="info.300"
          >
            <Text color="#002">
              {
                changeState ? "Confirm" : "Change"
              }
            </Text>
          </Button>
          {
            changeState && (
              <Button bg="danger.500" onPress={
                () => {
                  setValue(defaultValue);
                  toggleChangeState();
                }
              }>
                Cancel
              </Button>
            )
          }
        </View>
      </View>
    </View >
  )
}

export default ThresholdSetForm;
