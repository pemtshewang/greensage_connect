import { Stack } from "expo-router";
import { View, Text } from "native-base";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Pressable } from "react-native";
import Icons from "../../../../../assets/Icons/Icons";
import TemperatureControllerContainer from "../../../../../components/TemperatureController";
import { useState } from "react";
import { useGreenhouseStore } from "../../../../../zustand/store";
import ThresholdSetForm from "../../../../../components/Forms/ThresholdSetForm";
import { ConnectionType, IWebSocket } from "../../../../../zustand/state";
import RollerShutterController from "../../../../../components/RollerShutterController";
import { ScrollView } from "native-base";

export default function ParamsContainer() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const store = useGreenhouseStore();
  const greenhouse = store.items.find((res) => res.id === id);
  const [state, updateFanState] = useState<boolean>(greenhouse?.ventilationFanState as boolean);
  const [rightShutterState, updateRightShutterState] = useState<boolean>(greenhouse?.rollerShutterRightState as boolean);
  const [leftShutterState, updateLeftShutterState] = useState<boolean>(greenhouse?.rollerShutterLeftState as boolean);

  const toggleState = () => {
    updateFanState(!state); // Update the state after performing actions
    const topic = id + "/ventilationFan";
    if (state) {
      console.log("sending message off");
      if (greenhouse?.connectionType === ConnectionType.MQTT) {
        greenhouse?.ws?.sendMessage(topic, "off")
      } else {
        greenhouse?.ws?.sendMessage("ventilationFan:off");
      }
      store.updateItem(id as string, {
        ...greenhouse,
        ventilationFanState: false
      });
    } else {
      console.log("sending message on");
      if (greenhouse?.connectionType === ConnectionType.MQTT) {
        greenhouse?.ws?.sendMessage(topic, "on")
      } else {
        greenhouse?.ws?.sendMessage("ventilationFan:on");
      }
      store.updateItem(id as string, {
        ...greenhouse,
        ventilationFanState: true
      });
    }
  };
  const toggleRightShutterState = () => {
    updateRightShutterState(!rightShutterState);
    if (rightShutterState) {
      if (greenhouse?.connectionType === ConnectionType.MQTT) {
        greenhouse?.ws?.sendMessage(id + "/rollerShutterRight", "down")
      } else {
        greenhouse?.ws?.sendMessage("rollerShutterRight:down");
      }
      store.updateItem(id as string, {
        ...greenhouse,
        rollerShutterRightState: false
      });
    } else {
      if (greenhouse?.connectionType === ConnectionType.MQTT) {
        greenhouse?.ws?.sendMessage(id + "/rollerShutterRight", "up")
      } else {
        greenhouse?.ws?.sendMessage("rollerShutterRight:up");
      }
      store.updateItem(id as string, {
        ...greenhouse,
        rollerShutterRightState: true
      });
    }
  }
  const toggleLeftShutterState = () => {
    updateLeftShutterState(!leftShutterState);
    if (leftShutterState) {
      if (greenhouse?.connectionType === ConnectionType.MQTT) {
        greenhouse?.ws?.sendMessage(id + "/rollerShutterLeft", "down")
      } else {
        greenhouse?.ws?.sendMessage("rollerShutterLeft:down");
      }
      store.updateItem(id as string, {
        ...greenhouse,
        rollerShutterLeftState: false
      })
    } else {
      if (greenhouse?.connectionType === ConnectionType.MQTT) {
        greenhouse?.ws?.sendMessage(id + "/rollerShutterLeft", "up")
      } else {
        greenhouse?.ws?.sendMessage("rollerShutterLeft:up");
      }
      store.updateItem(id as string, {
        ...greenhouse,
        rollerShutterLeftState: true
      })
    }
  }
  return (
    <ScrollView>
      <View style={{
        padding: 20
      }}>
        <Stack.Screen
          options={{
            header: () => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    padding: 10,
                    gap: 10,
                    backgroundColor: "green"
                  }}
                >
                  <Pressable
                    onPress={() => {
                      navigation.goBack();
                    }}
                  >
                    <Icons.navigateBack color="black" size={32} />
                  </Pressable>
                  <View
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Text
                      color="#fff"
                      fontSize="xl"
                    >Manage Temperature</Text>
                  </View>
                </View>
              );
            },
          }}
        />
        <TemperatureControllerContainer
          state={state}
          setState={toggleState} />
        <RollerShutterController
          leftRollerShutterState={leftShutterState}
          rightRollerShutterState={rightShutterState}
          setLeftRollerShutterState={toggleLeftShutterState}
          setRightRollerShutterState={toggleRightShutterState}
        />
        <ThresholdSetForm
          id={id as string}
          type="temperature"
          message="Set the temperature threshold"
          ws={greenhouse?.ws as IWebSocket}
          defaultValue={greenhouse?.temperatureThreshold || 0} />
        <ThresholdSetForm
          id={id as string}
          type="humidity"
          message="Set the humidity threshold"
          ws={greenhouse?.ws as IWebSocket}
          defaultValue={greenhouse?.humidityThreshold || 0} />
      </View>
    </ScrollView>
  )
}
