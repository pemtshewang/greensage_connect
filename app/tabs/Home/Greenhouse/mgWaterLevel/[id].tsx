import { Stack } from "expo-router";
import { View, Text, ScrollView } from "native-base";
import { useNavigation } from "expo-router";
import { Pressable } from "react-native";
import Icons from "../../../../../assets/Icons/Icons";
import WaterValveControllerContainer from "../../../../../components/WaterValveController";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useGreenhouseStore } from "../../../../../zustand/store";
import ThresholdSetForm from "../../../../../components/Forms/ThresholdSetForm";
import WaterSchedulerForm from "../../../../../components/Forms/WaterScheduleForm";
import {
  ConnectionType,
  IMqttClient,
  IWebSocket,
} from "../../../../../zustand/state";
import { getValueFor } from "../../../../../securestore";
import { LinearGradient } from "expo-linear-gradient";

export default function ParamsContainer() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const store = useGreenhouseStore();
  const greenhouse = store.items.find((res) => res.id === id);
  const [state, opState] = useState<boolean>(
    greenhouse?.waterValveState || false
  );
  const [value, setValue] = useState();
  useEffect(() => {
    getValueFor("token").then((res) => {
      const parsed = JSON.parse(res as string);
      setValue(parsed.brokerId);
    });
  }, []);
  // session ends
  const toggleState = () => {
    const updatedState = !state; // Calculate the updated state value
    // Perform actions based on the updatedState
    if (!updatedState) {
      if (greenhouse?.connectionType === ConnectionType.MQTT) {
        const topic = "user/" + value + "/" + id + "/actuator" + "/waterValve";
        greenhouse?.ws?.sendMessage(topic, "close");
      } else {
        greenhouse?.ws?.sendMessage("waterValve:close");
      }
      store.updateItem(id as string, {
        ...greenhouse,
        waterValveState: false,
      });
    } else {
      if (greenhouse?.connectionType === ConnectionType.MQTT) {
        const topic = "user/" + value + "/" + id + "/actuator" + "/waterValve";
        greenhouse?.ws?.sendMessage(topic, "open");
      } else {
        greenhouse?.ws?.sendMessage("waterValve:open");
      }
      store.updateItem(id as string, {
        ...greenhouse,
        waterValveState: true,
      });
    }
    opState(updatedState); // Update the state after performing actions
  };
  return (
    <View>
      <Stack.Screen
        options={{
          header: () => {
            return (
              <LinearGradient
                colors={["#228929", "#6A4"]}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                  paddingBottom: 20,
                  gap: 10,
                }}
              >
                <Pressable
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Icons.navigateBack color="black" size={36} />
                </Pressable>
                <View flexDirection="column" justifyContent="center">
                  <Text
                    color="#fff"
                    fontSize="xl"
                    style={{
                      fontFamily: "OpenSans",
                    }}
                  >
                    Manage Waterflow
                  </Text>
                </View>
              </LinearGradient>
            );
          },
        }}
      />
      <ScrollView w="container">
        <WaterValveControllerContainer state={state} setState={toggleState} />
        <View marginBottom="3">
          <ThresholdSetForm
            id={id as string}
            storeType="Greenhouse"
            type="soil_moisture"
            message="Set the soil moisture threshold"
            ws={greenhouse?.ws as IWebSocket | IMqttClient}
            defaultValue={10}
          />
        </View>
        <WaterSchedulerForm
          id={id as string}
          ws={greenhouse?.ws as IWebSocket | IMqttClient}
        />
      </ScrollView>
    </View>
  );
}
