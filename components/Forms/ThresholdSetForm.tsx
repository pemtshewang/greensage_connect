import { View, Text, Input, Button, Badge, HStack, VStack } from "native-base";
import { ConnectionType, IMqttClient, IWebSocket } from "../../zustand/state";
import Icons from "../../assets/Icons/Icons";
import { useEffect, useState } from "react";
import { useGreenhouseStore, useIrrigationControllerStore } from "../../zustand/store";
import ThresholdDropDown from "../ThresholdDropDown";
import createToast from "../../hooks/toast";
import { useNotificationStore } from "../../zustand/store";
import * as Crypto from "expo-crypto";
import { getValueFor } from "../../securestore";

const ThresholdSetForm = ({
  id,
  type,
  message,
  ws,
  defaultValue,
  storeType
}: {
  id: string,
  type: "temperature" | "soil_moisture" | "humidity",
  message: string,
  ws: IWebSocket | IMqttClient,
  defaultValue: number,
  storeType: "Irrigation" | "Greenhouse";
}) => {
  const [changeState, setChangeState] = useState(false);
  const [value, setValue] = useState<number>(defaultValue);
  const toggleChangeState = () => setChangeState(!changeState);
  const { toastMessage } = createToast();
  const { addNotification } = useNotificationStore();
  const [userId, setUserId] = useState();
  const store = storeType === "Irrigation" ? useIrrigationControllerStore() : useGreenhouseStore();
  useEffect(() => {
    getValueFor("token").then((data) => {
      const val = JSON.parse(data as string);
      setUserId(val?.brokerId);
    })
  }, [])
  const sendThreshold = () => {
    setValue(value);
    if (store.items.find((greenhouse) => greenhouse.id === id)?.connectionType === ConnectionType.MQTT) {
      const topic = "user/" + userId + '/' + id + "/threshold/" + type;
      ws.sendMessage(topic, value.toString());
    } else {
      ws.sendMessage(`threshold:${type}:${value}`);
    }
    toastMessage({
      message: `Threshold for ${type === "soil_moisture" ? "soil moisture" : type} updated`,
      type: "success",
    });
    toggleChangeState();
    if (type === "humidity") {
      store.updateItem(id, {
        humidityThreshold: value
      });
    } else if (type === "temperature") {
      store.updateItem(id, {
        temperatureThreshold: value
      });
    } else {
      store.updateItem(id, {
        soilMoistureThreshold: value
      });
    }
    addNotification({
      id: Crypto.randomUUID().toString(),
      seen: false,
      title: "Threshold updated",
      message: `Threshold for ${type === "soil_moisture" ? "soil moisture" : type} updated to ${value}`,
      footer: `Updated in greenhouse ${store.items.find((greenhouse) => greenhouse.id === id)?.name}`,
      dateTime: new Date(),
      type: type,
    });
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
        <Badge colorScheme="info" marginBottom="3">{message}</Badge>
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
              value={value as unknown as string}
              isDisabled={!changeState}
              w={70}
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
