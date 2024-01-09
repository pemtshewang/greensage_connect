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
import { IWebSocket } from "../../../../../zustand/state";
import RollerShutterController from "../../../../../components/RollerShutterController";
import { ScrollView } from "native-base";

export default function ParamsContainer() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const store = useGreenhouseStore();
  const greenhouse = store.greenhouses.find((res) => res.id === id);
  const [state, updateFanState] = useState<boolean>(greenhouse?.ventilationFanState as boolean);
  const [rightShutterState, updateRightShutterState] = useState<boolean>(greenhouse?.rollerShutterRightState as boolean);
  const [leftShutterState, updateLeftShutterState] = useState<boolean>(greenhouse?.rollerShutterLeftState as boolean);
  const toggleState = () => {
    updateFanState(!state); // Update the state after performing actions
    if (state) {
      console.log("sending message off");
      greenhouse.ws?.sendMessage("ventilationFan:off");
      store.updateGreenhouse(id as string, {
        ...greenhouse,
        ventilationFanState: false
      });
    } else {
      console.log("sending message on");
      greenhouse.ws?.sendMessage("ventilationFan:on");
      store.updateGreenhouse(id as string, {
        ...greenhouse,
        ventilationFanState: true
      });
    }
  };
  const toggleRightShutterState = () => {
    updateRightShutterState(!rightShutterState);
    if (rightShutterState) {
      greenhouse.ws?.sendMessage("rollerShutterRight:down");
      store.updateGreenhouse(id as string, {
        ...greenhouse,
        rollerShutterRightState: false
      });
    } else {
      greenhouse.ws?.sendMessage("rollerShutterRight:up");
      console.log("rightshutter is up")
      store.updateGreenhouse(id as string, {
        ...greenhouse,
        rollerShutterRightState: true
      });
    }
  }
  const toggleLeftShutterState = () => {
    updateLeftShutterState(!leftShutterState);
    if (leftShutterState) {
      greenhouse.ws?.sendMessage("rollerShutterLeft:down");
      store.updateGreenhouse(id as string, {
        ...greenhouse,
        rollerShutterLeftState: false
      })
    } else {
      console.log("leftshutter is up")
      greenhouse.ws?.sendMessage("rollerShutterLeft:up");
      store.updateGreenhouse(id as string, {
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
